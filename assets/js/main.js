/* Portfolio behaviour: language, theme, project cards, nav highlighting.
 *
 * One IIFE, one deliberate global (window.SITE_I18N, defined in i18n.js). No dependencies.
 * The inline <head> script resolves language + theme before first paint; everything here
 * runs after the DOM is parsed and refines it.
 *
 * NOTE: `data-i18n-html` and `data-i18n-list-html` inject strings from SITE_I18N, which is
 * author-controlled content. If that dictionary ever carries anything user-supplied, those
 * two paths must be removed.
 */
(function () {
  'use strict';

  var LANG_KEY = 'site.lang';
  var THEME_KEY = 'site.theme';
  var root = document.documentElement;
  var DICT = window.SITE_I18N || {};

  var ATTR_MAP = {
    'data-i18n-aria-label': 'aria-label',
    'data-i18n-title': 'title',
    'data-i18n-alt': 'alt',
    'data-i18n-placeholder': 'placeholder',
    'data-i18n-content': 'content'
  };

  function strings(lang) {
    return DICT[lang] || DICT['pt-BR'] || {};
  }

  function get(lang, key) {
    var s = strings(lang);
    if (Object.prototype.hasOwnProperty.call(s, key)) return s[key];
    console.warn('[i18n] missing key "' + key + '" for "' + lang + '" — keeping authored text');
    return undefined;
  }

  /* ---------- language ---------- */

  function applyLanguage(lang) {
    var set = strings(lang);

    // Text nodes.
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = get(lang, el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.textContent = v;
    });

    // Author-controlled markup.
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = get(lang, el.getAttribute('data-i18n-html'));
      if (typeof v === 'string') el.innerHTML = v;
    });

    // Fixed attribute map.
    Object.keys(ATTR_MAP).forEach(function (dataAttr) {
      document.querySelectorAll('[' + dataAttr + ']').forEach(function (el) {
        var v = get(lang, el.getAttribute(dataAttr));
        if (typeof v === 'string') el.setAttribute(ATTR_MAP[dataAttr], v);
      });
    });

    // List rebuilds (chips, bullets) — plain text entries.
    document.querySelectorAll('[data-i18n-list]').forEach(function (el) {
      var v = get(lang, el.getAttribute('data-i18n-list'));
      if (Array.isArray(v)) replaceList(el, v, false);
    });

    // List rebuilds — entries carrying inline markup.
    document.querySelectorAll('[data-i18n-list-html]').forEach(function (el) {
      var v = get(lang, el.getAttribute('data-i18n-list-html'));
      if (Array.isArray(v)) replaceList(el, v, true);
    });

    // Head metadata. Subpages author their own <title data-i18n> and meta description, which the
    // generic passes above already handle — so the home page's blanket override must stand down
    // there, or every subpage would end up with the home page's title.
    if (!document.querySelector('title[data-i18n]') && set['meta.title']) document.title = set['meta.title'];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && !desc.hasAttribute('data-i18n-content') && set['meta.description']) desc.setAttribute('content', set['meta.description']);

    root.lang = lang;
    root.setAttribute('data-lang', lang);

    document.querySelectorAll('input[name="lang"]').forEach(function (input) {
      input.checked = input.value === lang;
    });

    updateThemeButton();
    // Must run after the innerHTML updates above, which wipe any hint already inside a link.
    addNewTabHints(lang);
  }

  function replaceList(el, entries, asHtml) {
    var frag = document.createDocumentFragment();
    entries.forEach(function (entry) {
      var li = document.createElement('li');
      if (asHtml) li.innerHTML = entry;
      else li.textContent = entry;
      frag.appendChild(li);
    });
    el.textContent = '';
    el.appendChild(frag);
  }

  function setLanguage(lang, announce) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
    applyLanguage(lang);
    syncUrl(lang);
    renderProjects(lang);
    // After syncUrl (so the URL carries the new lang) and after renderProjects (so the links it
    // just created are rewritten too). Running it inside applyLanguage would be too early on the
    // first toggle away from a bare URL, leaving the choice to localStorage alone.
    propagateLang(lang);
    if (announce) {
      var live = document.querySelector('[data-lang-announcer]');
      var msg = get(lang, 'a11y.langChanged');
      if (live && msg) {
        live.setAttribute('lang', lang);
        live.textContent = msg;
      }
    }
  }

  /* Keep ?lang= in the URL so a copied link carries the language.
     replaceState (not pushState) — no history entry for a view preference.
     It throws on file://, hence the try/catch. The canonical stays the bare root. */
  function syncUrl(lang) {
    try {
      var url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    } catch (e) { /* file:// or sandboxed */ }
  }

  /* Carry ?lang= across internal links — but only when the current URL carries it explicitly.
     A shared /?lang=en link has to still open in English after the visitor clicks through to
     /work/, while a bare URL must keep producing bare URLs so crawlers and the sitemap only ever
     see the canonical forms. localStorage already covers the everyday case, so this is strictly
     the shared-link path.

     Hrefs are rewritten in place rather than intercepted on click, so middle-click and
     "open in new tab" behave exactly like a plain click. Rewriting is idempotent: an existing
     lang= is replaced rather than appended to, which keeps a language switch from stacking them.

     Called from init() and setLanguage(), never from applyLanguage() — it has to run after
     syncUrl has written the parameter, or the first toggle away from a bare URL would be a no-op. */
  function propagateLang(lang) {
    var explicit = null;
    try { explicit = new URLSearchParams(location.search).get('lang'); } catch (e) { return; }
    if (!explicit) return;

    document.querySelectorAll('a[href]').forEach(function (a) {
      var raw = a.getAttribute('href');
      if (!raw || raw.charAt(0) === '#' || raw.indexOf('//') === 0) return;   // fragment, protocol-relative
      if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return;                           // http:, mailto:, tel:, data:

      var cut = raw.indexOf('#');
      var base = cut === -1 ? raw : raw.slice(0, cut);
      var hash = cut === -1 ? '' : raw.slice(cut);
      if (!base) return;

      // Pages only. A ?lang= on a PDF or an image is noise that buys nothing.
      var last = base.split('/').pop();
      if (last && last.indexOf('.') !== -1 && !/\.html?$/i.test(last)) return;

      if (/[?&]lang=/.test(base)) base = base.replace(/([?&]lang=)[^&]*/, '$1' + lang);
      else base += (base.indexOf('?') === -1 ? '?' : '&') + 'lang=' + lang;

      a.setAttribute('href', base + hash);
    });
  }

  /* ---------- theme ---------- */

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function resolvedTheme() {
    var explicit = root.getAttribute('data-theme');
    return explicit === 'light' || explicit === 'dark' ? explicit : systemTheme();
  }

  function updateThemeButton() {
    var btn = document.querySelector('[data-action="set-theme"]');
    if (!btn) return;
    var isDark = resolvedTheme() === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    var key = isDark ? 'a11y.themeToLight' : 'a11y.themeToDark';
    var label = get(root.lang, key);
    if (label) btn.setAttribute('aria-label', label);
    else btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* private mode */ }
    updateThemeButton();
  }

  /* ---------- project cards ---------- */

  var DATA = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  function pick(obj, lang) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['pt-BR'] || '';
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* One list, no grouping — the section carries personal projects only. While the array is
     empty the grid hides itself (:empty) and the "coming soon" note stands in for it. */
  function renderProjects(lang) {
    var grid = document.querySelector('[data-projects]');
    var note = document.querySelector('[data-empty-note]');
    if (!grid) return;
    grid.textContent = '';
    if (!DATA.length) {
      if (note) note.hidden = false;
      return;
    }
    if (note) note.hidden = true;
    DATA.forEach(function (item) { grid.appendChild(buildCard(item, lang)); });
  }

  function buildCard(item, lang) {
    var card = el('article', 'card');
    card.appendChild(el('h4', null, pick(item.title, lang)));

    var meta = [pick(item.org, lang), pick(item.period, lang)].filter(Boolean).join(' · ');
    if (meta) card.appendChild(el('p', 'card-meta', meta));

    if (item.summary) card.appendChild(el('p', 'card-summary', pick(item.summary, lang)));

    var highlights = (item.highlights || []).map(function (h) { return pick(h, lang); }).filter(Boolean);
    if (highlights.length) card.appendChild(list('bullets', highlights));

    if (Array.isArray(item.stack) && item.stack.length) card.appendChild(list('chips', item.stack));

    var links = [];
    if (item.repo) links.push({ href: item.repo, label: 'GitHub' });
    if (item.demo) links.push({ href: item.demo, label: pick(item.demoLabel, lang) || 'Demo' });
    (item.links || []).forEach(function (l) {
      if (l && l.url) links.push({ href: l.url, label: pick(l.label, lang) || l.url });
    });
    if (links.length) {
      var wrap = el('p', 'card-links');
      links.forEach(function (l, i) {
        if (i) wrap.appendChild(document.createTextNode(' · '));
        var a = el('a', null, l.label);
        a.href = l.href;
        a.rel = 'noopener';
        a.target = '_blank';
        wrap.appendChild(a);
      });
      card.appendChild(wrap);
    }
    return card;
  }

  function list(className, entries) {
    var ul = el('ul', className);
    entries.forEach(function (e) { ul.appendChild(el('li', null, e)); });
    return ul;
  }

  /* ---------- new-tab hints ---------- */

  function addNewTabHints(lang) {
    var label = get(lang, 'a11y.newTab');
    if (!label) return;
    document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
      var hint = a.querySelector('.new-tab-hint');
      if (!hint) {
        hint = el('span', 'sr-only new-tab-hint');
        a.appendChild(hint);
      }
      hint.textContent = ' (' + label + ')';
    });
  }

  /* ---------- nav highlighting ---------- */

  function initActiveSection() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var sections = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- events ---------- */

  document.addEventListener('click', function (event) {
    var action = event.target.closest && event.target.closest('[data-action]');
    if (!action) return;
    var name = action.getAttribute('data-action');

    if (name === 'set-theme') setTheme(resolvedTheme() === 'dark' ? 'light' : 'dark');

    if (name === 'nav-link') {
      var href = action.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        document.querySelectorAll('.site-nav a').forEach(function (a) { a.removeAttribute('aria-current'); });
        action.setAttribute('aria-current', 'true');
      }
    }
  });

  document.addEventListener('change', function (event) {
    var input = event.target;
    if (input && input.matches && input.matches('input[name="lang"]')) {
      setLanguage(input.value, true);
    }
  });

  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () { if (!root.getAttribute('data-theme')) updateThemeButton(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- boot ---------- */

  function init() {
    var lang = /^en/i.test(root.lang) ? 'en' : 'pt-BR';
    applyLanguage(lang);
    renderProjects(lang);
    propagateLang(lang);
    initActiveSection();
    root.removeAttribute('data-i18n-pending');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
