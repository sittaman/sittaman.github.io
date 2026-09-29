#!/usr/bin/env node
/* Translation coverage check.
 *
 * This is what makes the single-DOM i18n approach safe to maintain: a string added to
 * index.html but forgotten in one dictionary becomes a red build instead of a blank space
 * in production. Zero dependencies — the dictionary is evaluated in a vm sandbox that
 * provides only `window`.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = new URL('../../', import.meta.url);
const HTML = fileURLToPath(new URL('index.html', ROOT));
const DICT = fileURLToPath(new URL('assets/js/i18n.js', ROOT));

const LIST_ATTRS = ['data-i18n-list', 'data-i18n-list-html'];

function loadDict() {
  const src = readFileSync(DICT, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const dict = sandbox.window.SITE_I18N;
  if (!dict) throw new Error('i18n.js did not define window.SITE_I18N');
  return dict;
}

function keysUsedInHtml(html) {
  const used = new Map(); // key -> attribute
  const attrRe = /\b(data-i18n(?:-[a-z-]+)?)\s*=\s*"([^"]+)"/g;
  let m;
  while ((m = attrRe.exec(html)) !== null) {
    const [, attr, key] = m;
    if (!used.has(key)) used.set(key, attr);
  }
  return used;
}

const errors = [];
const warnings = [];

const dict = loadDict();
const langs = Object.keys(dict);
if (langs.length < 2) errors.push(`expected at least 2 languages, found ${langs.length}`);

const html = readFileSync(HTML, 'utf8');
const used = keysUsedInHtml(html);

// 1. Every key used in the HTML must exist in every language.
for (const [key, attr] of used) {
  for (const lang of langs) {
    if (!Object.prototype.hasOwnProperty.call(dict[lang], key)) {
      errors.push(`${lang}: missing key "${key}" (used by ${attr} in index.html)`);
    }
  }
}

// 2. Every key defined in any language must exist in all of them.
const allKeys = new Set();
for (const lang of langs) Object.keys(dict[lang]).forEach((k) => allKeys.add(k));
for (const key of allKeys) {
  for (const lang of langs) {
    if (!Object.prototype.hasOwnProperty.call(dict[lang], key)) {
      errors.push(`${lang}: dictionary is missing key "${key}"`);
    }
  }
}

// 3. Type agreement: a *-list key must be an array everywhere, a scalar key a string.
for (const key of allKeys) {
  const values = langs.map((l) => dict[l][key]).filter((v) => v !== undefined);
  const isArray = values.map((v) => Array.isArray(v));
  if (isArray.some((v) => v) && !isArray.every((v) => v)) {
    errors.push(`"${key}": array in some languages but not others`);
    continue;
  }
  if (!Array.isArray(values[0])) {
    const nonString = values.find((v) => typeof v !== 'string');
    if (nonString !== undefined) errors.push(`"${key}": expected a string`);
  }
}

// 4. A key used with a *-list attribute must actually be an array.
for (const [key, attr] of used) {
  if (!LIST_ATTRS.includes(attr)) continue;
  for (const lang of langs) {
    const v = dict[lang][key];
    if (v !== undefined && !Array.isArray(v)) {
      errors.push(`${lang}: "${key}" is used with ${attr} but is not an array`);
    }
  }
}

// 5. Unused keys are only a warning — they may be staged for content not yet in the HTML.
for (const key of allKeys) {
  if (!used.has(key) && !key.startsWith('meta.')) {
    warnings.push(`unused key "${key}" (defined but not referenced in index.html)`);
  }
}

console.log(`i18n: ${langs.length} languages (${langs.join(', ')}), ${allKeys.size} keys, ${used.size} referenced in index.html`);
for (const w of warnings) console.warn(`  warn: ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  error: ${e}`);
  process.exit(1);
}
console.log('i18n: OK');
