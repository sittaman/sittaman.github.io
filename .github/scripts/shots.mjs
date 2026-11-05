#!/usr/bin/env node
/* Local verification harness — screenshots the matrix a reviewer cares about.
 *
 *   python3 -m http.server 8080 --bind 127.0.0.1   # in the repo root
 *   node .github/scripts/shots.mjs
 *   node .github/scripts/shots.mjs http://127.0.0.1:8080/work/case.html
 *
 * Playwright is used for one decisive reason: newContext({ locale }) sets
 * navigator.language BEFORE the first navigation, so this exercises the real detection path
 * rather than the ?lang= escape hatch.
 *
 * When the target is the consolidated case page, the harness runs every case in the URL
 * instead of a single page: five cases x two languages x two viewports.
 *
 * This is a DEV tool, not part of CI — it is deliberately not referenced by the workflow, so
 * the deploy pipeline needs no browser download. Point PW at your install if it is not in the
 * default location.
 */
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require_ = createRequire(import.meta.url);

function loadPlaywright() {
  const candidates = [
    process.env.PW,
    'playwright',
    '/home/sittaman/workspace/career-ops/node_modules/playwright'
  ].filter(Boolean);
  for (const c of candidates) {
    try { return require_(c); } catch { /* try the next */ }
  }
  throw new Error('Playwright not found. Set PW=/path/to/playwright and retry.');
}

const URL_ = process.argv[2] || 'http://127.0.0.1:8080/';
const OUT = 'shots';
const LOCALES = ['pt-BR', 'en-US'];
const VIEWPORTS = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }]
];
const CASES = [
  ['grupo-bemol', 'Grupo Bemol'],
  ['banco-bv', 'Banco BV'],
  ['digio', 'Digio'],
  ['mobyan', 'Mobyan'],
  ['oruspay', 'Oruspay']
];

const isCasePage = /\/work\/case\.html$/.test(new URL(URL_).pathname);

function caseUrl(slug) {
  const url = new URL(URL_);
  url.searchParams.set('case', slug);
  return url.toString();
}

const targets = isCasePage
  ? CASES.map(([slug, expectedTitle]) => ({ slug, expectedTitle, url: caseUrl(slug) }))
  : [{ slug: null, expectedTitle: null, url: URL_ }];

const { chromium } = loadPlaywright();
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const rows = [];

for (const target of targets) {
  for (const locale of LOCALES) {
    for (const [name, viewport] of VIEWPORTS) {
      const context = await browser.newContext({ locale, viewport, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const response = await page.goto(target.url, { waitUntil: 'networkidle' });
      const tag = isCasePage
        ? `case-${target.slug}-${name}-${locale.slice(0, 2)}`
        : `${name}-${locale.slice(0, 2)}`;

      // Full page and above-the-fold separately: in a full-page capture every section is
      // "in view" at once, so nav highlighting read from one would be misleading.
      await page.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
      await page.screenshot({ path: `${OUT}/${tag}-fold.png` });

      const info = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        title: document.title,
        pending: document.documentElement.hasAttribute('data-i18n-pending'),
        pendingCase: document.documentElement.hasAttribute('data-case-pending'),
        navCurrent: document.querySelector('.site-nav a[aria-current="true"]')?.textContent || '—',
        heroRole: document.querySelector('#hero-title')?.textContent?.trim() || 'MISSING',
        caseTitle: document.querySelector('[data-case-study]:not([hidden]) h1')?.textContent?.trim() || null,
        visibleCases: document.querySelectorAll('[data-case-study]:not([hidden])').length,
        cards: document.querySelectorAll('.card').length,
        emptyNotes: Array.from(document.querySelectorAll('.empty-note')).filter((n) => !n.hidden).length,
        docWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth
      }));

      rows.push({ tag, expectedTitle: target.expectedTitle, isCase: isCasePage, status: response?.status(), ...info });
      console.log(
        `${tag.padEnd(30)} ${response?.status() ?? ''} lang=${info.lang.padEnd(5)}` +
        (isCasePage
          ? ` case="${info.caseTitle || 'MISSING'}" visible=${info.visibleCases} title="${info.title}"`
          : ` hero="${info.heroRole}" nav=${info.navCurrent} cards=${info.cards} notes=${info.emptyNotes}`) +
        ` overflow=${info.docWidth > info.winWidth ? 'YES' : 'no'}` +
        `${info.pending ? ' PENDING-FLAG-LEFT-ON' : ''}` +
        `${info.pendingCase ? ' CASE-PENDING-LEFT-ON' : ''}`
      );
      await context.close();
    }
  }
}

await browser.close();

const bad = rows.filter((r) =>
  r.status !== 200 ||
  r.pending ||
  r.pendingCase ||
  r.docWidth > r.winWidth ||
  (r.isCase
    ? r.visibleCases !== 1 || r.caseTitle !== r.expectedTitle
    : r.heroRole === 'MISSING')
);
console.log(`\n${rows.length} captures in ${OUT}/`);
if (bad.length) {
  console.error(`${bad.length} capture(s) with a problem:`);
  for (const b of bad) {
    console.error(
      `  ${b.tag}: status=${b.status} pending=${b.pending} casePending=${b.pendingCase}` +
      ` overflow=${b.docWidth > b.winWidth} case="${b.caseTitle}" expected="${b.expectedTitle}"` +
      ` visible=${b.visibleCases} hero=${b.heroRole}`
    );
  }
  process.exit(1);
}
console.log('shots: OK');
