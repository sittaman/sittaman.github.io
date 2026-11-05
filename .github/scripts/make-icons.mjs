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
/* Straight from the brutalist CSS tokens: acid lime accent #c6f018 and ink #0a0a0a.
   The icon sits next to the header's .brand-mark, so it uses the same flat fill. */
const BRAND = { accent: '#c6f018', ink: '#0a0a0a', paper: '#f4f1ea' };

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
   measured off a rendered .brand-mark — see the note in assets/img/favicon.svg. Full-bleed
   here because iOS masks the touch icon into its own squircle; rounded corners would leave
   white notches inside that mask. */
const MARK = `<g fill="none" stroke="${BRAND.ink}" stroke-linecap="round" stroke-linejoin="round">
<path d="M19.6 25.4 L28.9 30.3 L19.6 35.2" stroke-width="3.8"/>
<path d="M33.3 40.9 H45.7" stroke-width="3.4"/></g>`;

const squareSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
<rect width="64" height="64" fill="${BRAND.accent}"/>
<rect x="3" y="3" width="58" height="58" fill="none" stroke="${BRAND.ink}" stroke-width="6"/>
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
     <p class="name">Felipe Sitta</p>
     <h1>Engenheiro Mobile</h1>
     <p class="sub">Android &nbsp;·&nbsp; iOS &nbsp;·&nbsp; Flutter</p>
     <p class="url">sittaman.github.io</p>
   </div>`,
  `body{background:${BRAND.accent};color:${BRAND.ink};display:flex;align-items:center;padding:72px;
        font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}
   .card{position:relative;width:100%;height:100%;display:flex;flex-direction:column;
         justify-content:center;border-left:16px solid ${BRAND.ink};padding-left:48px}
   .name{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:24px;
         font-weight:700;letter-spacing:.18em;text-transform:uppercase;margin-bottom:26px}
   h1{font-size:92px;line-height:.88;font-weight:900;letter-spacing:-.045em;text-transform:uppercase}
   .sub{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:25px;
        margin-top:30px;letter-spacing:.02em}
   .url{position:absolute;right:0;bottom:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
        font-size:22px;font-weight:700;border:3px solid ${BRAND.ink};padding:6px 12px}`);

chromeShot(writeTemp('og.html', og), 1200, 630, join(IMG, 'og-cover.png'), 'c6f018ff');
console.log('og-cover.png      1200x630');
