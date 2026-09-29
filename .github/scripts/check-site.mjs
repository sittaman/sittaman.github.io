#!/usr/bin/env node
/* Internal link, asset and anchor check for the static site.
 *
 *   node .github/scripts/check-site.mjs --root . --allow-missing assets/cv/
 *
 * Everything referenced from index.html / 404.html must exist on disk, and every
 * "#fragment" must match a real id. Paths under an --allow-missing prefix are reported as
 * warnings instead of failures, which is how the CV PDFs can be linked before they are
 * supplied without blocking the first deploy. Zero dependencies.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve, dirname } from 'node:path';

const argv = process.argv.slice(2);
function arg(name, fallback) {
  const i = argv.indexOf(name);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}
const ROOT = resolve(arg('--root', '.'));
const PAGES = ['index.html', '404.html'];
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

for (const page of PAGES) {
  const file = join(ROOT, page);
  if (!existsSync(file)) {
    errors.push(`${page}: file is missing`);
    continue;
  }
  const html = readFileSync(file, 'utf8');

  // --- ids available as anchor targets in this document
  const ids = new Set();
  for (const m of html.matchAll(/\bid\s*=\s*"([^"]+)"/g)) ids.add(m[1]);
  for (const m of html.matchAll(/\bname\s*=\s*"([^"]+)"/g)) ids.add(m[1]);

  // --- every href/src
  for (const m of html.matchAll(/\b(href|src)\s*=\s*"([^"]+)"/g)) {
    const [, attr, raw] = m;
    checked++;
    if (!raw || raw.startsWith('#')) {
      if (attr === 'href' && raw.length > 1) {
        const id = raw.slice(1);
        if (!ids.has(id)) errors.push(`${page}: ${raw} points at a missing id`);
      }
      continue;
    }
    if (isExternal(raw)) continue;

    const [pathPart] = raw.split(/[?#]/);
    if (!pathPart) continue;

    // 404.html is served for unknown paths at any depth, so its links are root-absolute.
    const fromRoot = pathPart.startsWith('/') ? pathPart.slice(1) : join(dirname(page), pathPart);
    const normalized = fromRoot.replace(/\\/g, '/').replace(/^\.\//, '');

    const target = join(ROOT, normalized);
    if (!existsSync(target)) {
      if (allowMissingMatch(normalized)) {
        warnings.push(`${page}: ${raw} not present yet (allowed to be missing)`);
      } else {
        errors.push(`${page}: ${raw} -> ${normalized} does not exist`);
      }
      continue;
    }
    if (pathPart.endsWith('/') && !statSync(target).isDirectory()) {
      errors.push(`${page}: ${raw} should point at a directory`);
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
