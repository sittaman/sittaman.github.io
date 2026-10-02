#!/usr/bin/env node
/* Regenerates the raster assets from source: favicon.ico, apple-touch-icon.png, og-cover.png.
 *
 *   node .github/scripts/make-icons.mjs
 *
 * Chrome is the only renderer used (no ImageMagick/inkscape on this machine), and it needs a
 * dedicated --user-data-dir: if a Chrome is already running, a bare `--headless --screenshot`
 * hands the URL to that instance and exits having written nothing. The .ico is assembled here
 * because PNG-in-ICO is a valid container and avoids needing a converter.
 *
 * Lives under .github/ so upload-pages-artifact drops it — this never ships to the site.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const IMG = resolve(new URL('../../assets/img', import.meta.url).pathname);
// favicon.ico and apple-touch-icon.png belong at the site root: browsers request /favicon.ico
// unprompted, and iOS looks for /apple-touch-icon.png.
const ROOT = resolve(new URL('../../', import.meta.url).pathname);
/* Straight from the CSS tokens: accent hsl(187 74% 32%) and secondary hsl(270 70% 45%), both
   light-dark()'s light arm. The icon sits next to the header's .brand-mark, so it has to be the
   same gradient — the previous hexes here (#158e80/#7a2fc9) had drifted from the stylesheet. */
const BRAND = { teal: '#15808e', purple: '#7322c3', bg: '#0b0f14' };

function chromeShot(htmlFile, width, height, outPath, background = 'ffffffff') {
  const profile = mkdtempSync(join(tmpdir(), 'pf-icon-'));
  execFileSync('google-chrome', [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`,
    `--default-background-color=${background}`,
    '--virtual-time-budget=3000',
    `--screenshot=${outPath}`,
    `file://${htmlFile}`
  ], { stdio: 'pipe', timeout: 90000 });
}

function writeTemp(name, contents) {
  const dir = mkdtempSync(join(tmpdir(), 'pf-src-'));
  const file = join(dir, name);
  writeFileSync(file, contents);
  return file;
}

function page(bodyHtml, css) {
  return `<!doctype html><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:100%;height:100%;overflow:hidden}
  body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
  ${css}</style>${bodyHtml}`;
}

/* ---------- 1. favicon.ico (32x32, full-bleed square) ---------- */

/* The header's ">_" mark as geometry, not text: an icon must not depend on a monospace font
   being installed, and <text> would re-flow on every machine that renders it. Proportions are
   measured off a rendered .brand-mark — see the note in assets/img/favicon.svg, which carries
   the same glyph with the rounded tile. Full-bleed here because iOS masks the touch icon into
   its own squircle; rounded corners would leave white notches inside that mask. */
const MARK = `<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
<path d="M19.6 25.4 L28.9 30.3 L19.6 35.2" stroke-width="3.2"/>
<path d="M33.3 40.9 H45.7" stroke-width="2.8"/></g>`;

const squareSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${BRAND.teal}"/><stop offset="1" stop-color="${BRAND.purple}"/></linearGradient></defs>
<rect width="64" height="64" fill="url(#g)"/>
${MARK}</svg>`;

const iconHtml = (size) =>
  page(squareSvg(size), `body{background:transparent}svg{display:block;width:100%;height:100%}`);

const ico32 = join(mkdtempSync(join(tmpdir(), 'pf-out-')), 'ico32.png');
chromeShot(writeTemp('ico.html', iconHtml(32)), 32, 32, ico32, '00000000');

const png = readFileSync(ico32);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);   // reserved
header.writeUInt16LE(1, 2);   // type: 1 = icon
header.writeUInt16LE(1, 4);   // image count

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);        // width
entry.writeUInt8(32, 1);        // height
entry.writeUInt8(0, 2);         // palette colours
entry.writeUInt8(0, 3);         // reserved
entry.writeUInt16LE(1, 4);      // colour planes
entry.writeUInt16LE(32, 6);     // bits per pixel
entry.writeUInt32LE(png.length, 8);
entry.writeUInt32LE(22, 12);    // offset: 6 + 16

writeFileSync(join(ROOT, 'favicon.ico'), Buffer.concat([header, entry, png]));
console.log('favicon.ico        32x32');

/* ---------- 2. apple-touch-icon.png (180x180) ---------- */

chromeShot(writeTemp('ati.html', iconHtml(180)), 180, 180, join(ROOT, 'apple-touch-icon.png'));
console.log('apple-touch-icon.png  180x180');

/* ---------- 3. og-cover.png (1200x630 social card) ---------- */

const og = page(
  `<div class="card">
     <div class="rule"></div>
     <p class="name">Felipe Sitta</p>
     <h1>Desenvolvedor Sênior<br>Flutter</h1>
     <p class="sub">Design Systems &nbsp;·&nbsp; Arquitetura modular &nbsp;·&nbsp; IA aplicada ao desenvolvimento</p>
     <p class="url">sittaman.github.io</p>
   </div>`,
  `body{background:${BRAND.bg};color:#e8edf2;display:flex;align-items:center;padding:72px}
   .card{width:100%}
   .rule{width:104px;height:6px;border-radius:3px;background:linear-gradient(to right,${BRAND.teal},${BRAND.purple});margin-bottom:40px}
   .name{font-size:26px;font-weight:650;letter-spacing:.16em;text-transform:uppercase;color:#8fd8d0;margin-bottom:22px}
   h1{font-size:74px;line-height:1.06;font-weight:700;letter-spacing:-.03em;margin-bottom:28px}
   .sub{font-size:27px;color:#a9b4c0;line-height:1.4}
   .url{position:absolute;left:72px;bottom:56px;font-size:23px;color:#7f8b98;letter-spacing:.02em}`);

chromeShot(writeTemp('og.html', og), 1200, 630, join(IMG, 'og-cover.png'), '0b0f14ff');
console.log('og-cover.png      1200x630');
