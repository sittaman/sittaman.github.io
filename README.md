# sittaman.github.io

Single-page developer portfolio for **Felipe Sitta** — Senior Flutter Developer.
Published at <https://sittaman.github.io> on GitHub Pages.

No build step, no framework, no dependencies. Plain HTML, CSS and JavaScript committed as-is.

---

## Local preview

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# then open http://127.0.0.1:8080/
```

Use `127.0.0.1` rather than `localhost` — `http.server` binds IPv4 while `localhost` may
resolve to `::1` first and intermittently refuse the connection.

`index.html` also works opened directly as a `file://` URL. That is deliberate and is why the
dictionaries are inlined JavaScript rather than fetched JSON, and why scripts are classic
(`<script src>`) rather than ES modules — both would be blocked from a `file://` origin.

## Editing content

| I want to change… | Edit |
|---|---|
| Any visible text in either language | `assets/js/i18n.js` — the two dictionaries |
| Structure, sections, markup | the page itself (`index.html`, `work/index.html`, `work/<slug>.html`) |
| Colours, spacing, type | `assets/css/styles.css` (all tokens are at the top) |
| The printed/PDF layout | `assets/css/print.css` |
| Projects | `assets/data/projects.js` (schema documented in the file) |
| Case studies | `work/` — see "Adding a case study" below |
| The CV PDFs | `assets/cv/` — see that folder's README |

**Every page is authored in Portuguese.** The dictionaries only ever transform *away* from the
markup, so a visitor without JavaScript — and any crawler reading raw HTML — still gets a
complete Portuguese page. When you add a string: put the Portuguese text in the HTML **and** in
the `pt-BR` dictionary, then add the English to `en`. `check-i18n.mjs` fails the build if the two
dictionaries disagree, so a forgotten translation can't reach production.

Every page is its own file — no directory ever exists just to hold one `index.html`:

```
index.html          /                  home — hero, about, skills, experience, projects, …
work/index.html     /work/             every case study, as cards
work/<slug>.html    /work/<slug>.html  one page per case study
```

`work/` is a directory because it holds `index.html` **and** the case pages beside it; a case page
is flat, so `work/digio.html` is reachable at `/work/digio.html`. If one of them ever needs its own
images, that is the moment to give it a directory — not before.

Links between pages are **relative** (`../assets/…`, `../#experience`, `work/digio.html`), which is
what keeps the site working from a `file://` origin. Do not introduce root-absolute paths.

### Adding a project

Open `assets/data/projects.js` and push an entry into `company` or `personal`. Both languages
sit side by side in one entry. The section renders its headings and a localized "coming soon"
line while the arrays are empty; add an entry and the cards appear. Full schema with a worked
example is in the comments at the top of that file.

### Adding a case study

The home page shows the **three most recent** jobs as a short line each; `/work/` lists **all** of
them; each one links to its own page. A case study therefore lives in four places:

1. **`work/<slug>.html`** — copy an existing one (`work/digio.html` is the plainest) and swap the
   slug, the company name, the `exp.<slug>.*` keys and the two absolute URLs (`canonical`, `og:url`).
   While the write-up does not exist, leave the `case.pending` notice in place rather than inventing
   content — an honest placeholder beats a padded page.
2. **`work/index.html`** — add a `<li class="card">` for it.
3. **`index.html`** — add a `<li>` to the experience `<ol class="timeline">`, keeping the list to
   the three most recent and dropping the oldest into /work only.
4. **`assets/js/i18n.js`** — add `case.<slug>.meta.title` and `.meta.description` to **both**
   dictionaries, plus the shared `exp.<slug>.role` / `.start` / `.end` / `.summary` keys.

Role and period are defined once (`exp.<slug>.*`) and read by all three places, so they cannot
drift apart. `sitemap.xml` is the fifth place: add the new URL there too.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs the checks and only
publishes if they pass. A broken link or a missing translation cannot reach production.

**One-time setup** (not yet done — the repo does not exist on GitHub):

1. Create a **public** repo named exactly `sittaman.github.io` at
   <https://github.com/new>. Do **not** initialize it with a README — that creates a divergent
   history and turns the first push into a force-push.
2. Push: `git remote add origin git@github.com:sittaman/sittaman.github.io.git && git push -u origin main`
3. Settings → Pages → Build and deployment → **Source: GitHub Actions**.

`.nojekyll` is committed as insurance: it is a no-op under Actions deploys, but if you ever
switch to branch-based deploys it is what stops Jekyll from mangling the site.

## Curriculum PDFs

Both files are linked from the page but **you supply them**. Expected paths:

```
assets/cv/felipe-sitta-cv-pt-BR.pdf
assets/cv/felipe-sitta-cv-en.pdf
```

No dates or version suffixes in the filenames, so the URLs never change and never rot.
`check-site.mjs` warns on every run until they exist, and the CV buttons 404 until then —
nothing is blocked, but the gap is visible. Export rules are in `assets/cv/README.md`.

## Verification

```bash
node .github/scripts/check-i18n.mjs                      # translation coverage
node .github/scripts/check-site.mjs --root . --allow-missing assets/cv/
npx --yes html-validate@9 $(find . -name '*.html' -not -path './node_modules/*' -not -path './shots/*')

python3 -m http.server 8080 --bind 127.0.0.1 &
node .github/scripts/shots.mjs                           # screenshot matrix (needs Playwright)
```

These are the same three commands CI runs, and both `.mjs` checks discover their pages rather
than listing them — a new case study is covered the moment the file exists.

`shots.mjs` writes desktop/mobile × light/dark × pt/en captures to `shots/` (gitignored) and
fails if a page overflows horizontally or the no-flash flag is left on. It uses Playwright's
`locale` and `colorScheme` context options, so it exercises the real detection path rather than
a URL parameter. It is a dev tool and is deliberately not part of CI.

### QA-only URL parameters

Both are read before first paint and are not part of the public contract:

- `?lang=en` — force a language (this one *is* shareable; it is what the toggle writes)
- `?theme=dark` — force a theme, which makes screenshots deterministic

Precedence for language on load: `?lang=` → `localStorage` → `navigator.languages` → `pt-BR`.
The URL wins over storage on purpose, so a link someone shares shows the language they sent
rather than the one the recipient last picked.

## Notes for future edits

- **`.htmlvalidate.json` turns off one rule on purpose.** `no-redundant-role` is disabled so the
  `<ul role="list">` attributes are allowed. The role *is* redundant per spec — the element
  already maps to it — but Safari drops list semantics from any list whose `list-style` is
  `none`, which is every list on this site, so VoiceOver would stop announcing them as lists.
  The rule has no allow-list; disabling it is the documented workaround.
- **`check-site.mjs` follows links across pages.** It resolves a relative path against the page it
  was written on, requires a directory target to actually contain an `index.html` (Pages 404s
  otherwise), refuses a path that climbs out of the repo, and checks that a `#fragment` exists in
  the document the link lands in — so `../../#experience` from a case page is verified against the
  home page's ids, not just against the path.
- **Storage keys are namespaced** (`site.lang`, `site.theme`). Every project page hosted under
  `sittaman.github.io` shares one origin, so unprefixed keys would collide.
- **Cache-busting is manual.** GitHub Pages hard-codes `Cache-Control: max-age=600` and gives
  you no header control and no content hashes without a build. When you edit a CSS or JS file,
  bump the `?v=` on its `<link>`/`<script>` in **every** page that loads it — six files today
  (`index.html`, `404.html`, `work/index.html` and the three case pages) — not just the one you
  were editing, or some pages keep serving the old file.
- **Never run `npm install` in this repo.** `upload-pages-artifact` drops dotfiles but *not*
  `node_modules`, so it would be published. The checks use `npx` and dependency-free `.mjs`.
- The `<html>` element carries no `data-theme` attribute by default; its **absence** means
  "follow the operating system". The theme button writes an explicit `light`/`dark` override.
