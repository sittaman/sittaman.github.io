#!/usr/bin/env node
/* Internal link, asset and anchor check for the static site.
 *
 *   node .github/scripts/check-site.mjs --root . --allow-missing assets/cv/
 *
 * Everything referenced from any page in the tree must exist on disk, and every "#fragment"
 * must match a real id. Paths under an --allow-missing prefix are reported as warnings instead
 * of failures, which is how the CV PDFs can be linked before they are supplied without blocking
 * the first deploy. Zero dependencies beyond the shared page discovery.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve, dirname, relative, sep } from 'node:path';
import { discoverPages } from './pages.mjs';

const argv = process.argv.slice(2);
function arg(name, fallback) {
  const i = argv.indexOf(name);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}
const ROOT = resolve(arg('--root', '.'));
const PAGES = discoverPages(ROOT);
const allowMissing = argv
  .map((a, i) => (a === '--allow-missing' ? argv[i + 1] : null))
  .filter(Boolean)
  .map((p) => p.replace(/^\.?\//, ''));

const errors = [];
const warnings = [];
let checked = 0;

function isExternal(url) {
  return /^(https?:)?\/\//i.test(url) || /^(mailto|tel|sms|data|javascript):/i.test(url);
}

function allowMissingMatch(pathFromRoot) {
  return allowMissing.some((prefix) => pathFromRoot.startsWith(prefix));
}

function collectIds(html) {
  const set = new Set();
  for (const m of html.matchAll(/\bid\s*=\s*"([^"]+)"/g)) set.add(m[1]);
  for (const m of html.matchAll(/\bname\s*=\s*"([^"]+)"/g)) set.add(m[1]);
  return set;
}

// Anchor targets per page, read on demand and cached. A cross-page link has to be checked
// against the document it lands in, not the one it was written on.
const idsCache = new Map();
function idsOf(relPath) {
  if (!idsCache.has(relPath)) {
    const file = join(ROOT, relPath);
    idsCache.set(relPath, existsSync(file) ? collectIds(readFileSync(file, 'utf8')) : new Set());
  }
  return idsCache.get(relPath);
}

for (const page of PAGES) {
  const file = join(ROOT, page);
  if (!existsSync(file)) {
    errors.push(`${page}: file is missing`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  idsCache.set(page, collectIds(html)); // already in hand

  // --- every href/src
  for (const m of html.matchAll(/\b(href|src)\s*=\s*"([^"]+)"/g)) {
    const [, attr, raw] = m;
    checked++;
    if (!raw) continue;

    if (raw.startsWith('#')) {
      // Same-document anchor.
      if (attr === 'href' && raw.length > 1 && !idsOf(page).has(raw.slice(1))) {
        errors.push(`${page}: ${raw} points at a missing id`);
      }
      continue;
    }
    if (isExternal(raw)) continue;

    const hashAt = raw.indexOf('#');
    const frag = hashAt === -1 ? '' : raw.slice(hashAt + 1);
    const [pathPart] = raw.split(/[?#]/);
    if (!pathPart) continue;

    // 404.html is served for unknown paths at any depth, so its links are root-absolute.
    const fromRoot = pathPart.startsWith('/') ? pathPart.slice(1) : join(dirname(page), pathPart);
    const normalized = fromRoot.replace(/\\/g, '/').replace(/^\.\//, '');

    const target = join(ROOT, normalized);
    // One "../" too many climbs out of the repo and resolves to something that exists on the
    // developer's machine, so it would pass every check below and 404 once published.
    const relTarget = relative(ROOT, target).split(sep).join('/');
    if (relTarget.startsWith('..')) {
      errors.push(`${page}: ${raw} points outside the site root`);
      continue;
    }

    if (!existsSync(target)) {
      if (allowMissingMatch(normalized)) {
        warnings.push(`${page}: ${raw} not present yet (allowed to be missing)`);
      } else {
        errors.push(`${page}: ${raw} -> ${normalized} does not exist`);
      }
      continue;
    }

    // Where the link actually lands, which is what a fragment has to be checked against. A
    // directory target needs its own index.html or Pages serves a 404 — `work/` is that case.
    let landed = null;
    if (statSync(target).isDirectory()) {
      if (!existsSync(join(target, 'index.html'))) {
        errors.push(`${page}: ${raw} -> ${normalized || '.'} is a directory with no index.html`);
        continue;
      }
      landed = relTarget ? `${relTarget}/index.html` : 'index.html';
    } else if (pathPart.endsWith('/')) {
      errors.push(`${page}: ${raw} should point at a directory`);
      continue;
    } else if (normalized.endsWith('.html')) {
      landed = normalized;
    }

    // A path alone still resolves after an id is renamed, so check the fragment too.
    if (frag && landed && !idsOf(landed).has(frag)) {
      errors.push(`${page}: ${raw} points at a missing id "#${frag}" in ${landed}`);
    }
  }
}

// --- the CV files the user supplies, surfaced loudly in every run until they land
for (const pdf of ['assets/cv/felipe-sitta-cv-pt-BR.pdf', 'assets/cv/felipe-sitta-cv-en.pdf']) {
  if (!existsSync(join(ROOT, pdf))) {
    warnings.push(`CV PDF still missing: ${pdf} — the site links it, so the button 404s until it is added`);
  }
}

console.log(`checked ${checked} references across ${PAGES.length} pages in ${ROOT}`);
for (const w of warnings) console.warn(`  warn: ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} broken reference(s):`);
  for (const e of errors) console.error(`  error: ${e}`);
  process.exit(1);
}
console.log(`site: OK${warnings.length ? ` (${warnings.length} warning(s))` : ''}`);
