# Curriculum PDFs

The Currículo section links exactly these two files:

```
assets/cv/felipe-sitta-cv-pt-BR.pdf     ← Portuguese
assets/cv/felipe-sitta-cv-en.pdf        ← English
```

Drop them in with those names and the buttons work — no code change needed.

Keep the filenames free of dates and version suffixes. The link is written once against a
stable URL; a dated filename means the link silently rots every time the CV is re-exported.
Overwrite the file in place instead.

## Export rules for a CV that stays parseable

If you generate the PDFs from `~/workspace/career-ops` (which already applies these rules via
`generate-pdf.mjs`, and scores the result with `verify-ats.mjs`), you get them for free. If you
export from anywhere else — Google Docs, Word, Canva, Figma — check the output against this
list, because applicant tracking systems are the first reader of any CV you send:

- **Single column, top-to-bottom reading order.** This is the one that breaks most often, and
  Canva/Figma templates violate it almost by default.
- **No `<table>`-based layout.** Aligned columns are fine if built with `display: table` on
  divs, which is what the career-ops template does.
- **No CSS multi-column and no absolutely-positioned text blocks.**
- **All text must be real, selectable text** — never bake headings, labels or contact details
  into an image or SVG. Screenshot-of-a-CV is the worst case.
- **Contact details in normal document flow**, not inside `<header>`/`<footer>` elements; some
  parsers drop those regions and the email disappears with them.
- **Standard, embeddable sans-serif fonts.** Webfonts with unusual metrics make some extractors
  inject spaces inside words ("SUM M ARY"). Ligatures disabled is what prevents the same class
  of breakage in the other direction.
- **Page margins around 0.6in** (career-ops' default), A4 or Letter.
- **Plain ASCII in the body text** where possible — em-dashes, smart quotes, ellipses, arrows
  and bullets get mangled by extractors. The career-ops normalizer maps them all to ASCII.

## About the phone number

`~/workspace/career-ops/cv.md` contains a phone number, and the site deliberately omits it. If
you would rather not publish it, remove it from the CV source before exporting — and check the
PDF metadata too (author/subject fields), since a number in document properties is just as
public as one in the body.
