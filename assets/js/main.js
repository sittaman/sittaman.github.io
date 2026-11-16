/* Portfolio behaviour: language, project cards, nav highlighting.
 *
 * One IIFE, one deliberate global (window.SITE_I18N, defined in i18n.js). No dependencies.
 * The inline <head> script resolves language before first paint; everything here runs after
 * the DOM is parsed and refines it.
 *
 * NOTE: `data-i18n-html` and `data-i18n-list-html` inject strings from SITE_I18N, which is
 * author-controlled content. If that dictionary ever carries anything user-supplied, those
 * two paths must be removed.
 */
(function () {
  'use strict';

  var LANG_KEY = 'site.lang';
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

  /* ---------- case studies ---------- */

  var caseSections = Array.prototype.slice.call(document.querySelectorAll('[data-case-study]'));

  function currentCaseSlug() {
    try { return new URLSearchParams(location.search).get('case'); } catch (e) { return null; }
  }

  function findCase(slug) {
    for (var i = 0; i < caseSections.length; i++) {
      if (caseSections[i].getAttribute('data-slug') === slug) return caseSections[i];
    }
    return null;
  }

  function setMetaContent(property, value) {
    if (typeof value !== 'string') return;
    var meta = document.querySelector('meta[property="' + property + '"]');
    if (meta) meta.setAttribute('content', value);
  }

  function updateCaseMetadata(lang, slug, section) {
    var title = get(lang, section.getAttribute('data-i18n-meta-title'));
    var description = get(lang, section.getAttribute('data-i18n-meta-description'));

    if (typeof title === 'string') document.title = title;
    var descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag && typeof description === 'string') descriptionTag.setAttribute('content', description);

    var url = 'https://sittaman.github.io/work/case.html?case=' + encodeURIComponent(slug);
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
    setMetaContent('og:url', url);
    setMetaContent('og:title', title);
    setMetaContent('og:description', description);

    var locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.setAttribute('content', lang === 'en' ? 'en_US' : 'pt_BR');
    var alternate = document.querySelector('meta[property="og:locale:alternate"]');
    if (alternate) alternate.setAttribute('content', lang === 'en' ? 'pt_BR' : 'en_US');
  }

  /* One document holds every case; the query string selects one. Without JS nothing here runs and
     all sections stay visible, which is what keeps the page readable without scripts. */
  function applyCase(lang) {
    if (!caseSections.length) return;

    var slug = currentCaseSlug();
    var selected = slug ? findCase(slug) : null;
    if (!selected) {
      try { location.replace('../404.html'); } catch (e) { location.href = '../404.html'; }
      return;
    }

    caseSections.forEach(function (section) { section.hidden = section !== selected; });
    selected.hidden = false;
    root.setAttribute('data-case', slug);
    root.removeAttribute('data-case-pending');
    updateCaseMetadata(lang, slug, selected);
  }

  function setLanguage(lang, announce) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
    applyLanguage(lang);
    syncUrl(lang);
    applyCase(lang);
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

    if (name === 'nav-link') {
      var href = action.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        document.querySelectorAll('.site-nav a').forEach(function (a) { a.removeAttribute('aria-current'); });
        action.setAttribute('aria-current', 'true');
      }
    }
  });

  var s = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], i = 0, a = null, b = null, h = null, f = 0, o = null, w = null;

  function y() {
    h = a.createBufferSource();
    h.buffer = b;
    h.loop = true;
    h.connect(a.destination);
    h.start();
  }

  function x() {
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    if (!a) a = new C();
    if (a.state === 'suspended') a.resume();
    if (h) { try { h.stop(); } catch (e) { } h = null; }
    if (b) return y();
    if (f) return;
    f = 1;
    fetch('assets/spin.mp3').then(function (r) { return r.arrayBuffer(); }).then(function (r) {
      return a.decodeAudioData(r);
    }).then(function (r) {
      var q = r.numberOfChannels, m = r.length,
        n = Math.min(Math.round(r.sampleRate * 0.04), m >> 3);
      var B = a.createBuffer(q, m - n, r.sampleRate);
      for (var u = 0; u < q; u++) {
        var c = r.getChannelData(u), d = B.getChannelData(u);
        d.set(c.subarray(0, m - n));
        for (var e = 0; e < n; e++) {
          var w = e / n;
          d[e] = c[e] * w + c[m - n + e] * (1 - w);
        }
      }
      b = B;
      f = 0;
      if (root.hasAttribute('data-t') && !h) y();
    }).catch(function () { f = 0; });
  }

  function v() {
    if (!w) {
      w = document.createElement('div');
      w.className = 'p';
      w.style.cssText = 'display:flex;flex-direction:column;flex:1 0 auto;width:100%;min-height:100dvh';
      while (document.body.firstChild) w.appendChild(document.body.firstChild);
      document.body.appendChild(w);

      var d = [
        ['255,255,255', 280],
        ['198,240,24', 480],
        ['255,0,168', 720],
        ['0,229,255', 1000]
      ];
      o = document.createElement('div');
      o.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:hidden';
      for (var j = 0; j < 2; j++) {
        var c = document.createElement('div');
        c.style.cssText = 'position:absolute;top:8px;' + (j ? 'right:8px' : 'left:8px') + ';width:clamp(100px,16.25vw,225px);aspect-ratio:1';
        for (var n = 0; n < d.length; n++) {
          var l = document.createElement('div');
          l.style.cssText = 'position:absolute;left:50%;top:50%;width:' + d[n][1] + '%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(' + d[n][0] + ',.95),rgba(' + d[n][0] + ',0) 60%);opacity:0;animation:u .36s steps(1,end) infinite;animation-delay:' + ((j ? -0.18 : 0) - n * 0.09) + 's';
          c.appendChild(l);
        }
        var g = document.createElement('img');
        g.src = 'assets/disco.gif';
        g.alt = '';
        g.style.cssText = 'position:relative;display:block;width:100%;height:100%;object-fit:contain' + (j ? ';transform:scaleX(-1)' : '');
        c.appendChild(g);
        o.appendChild(c);
      }
      document.body.appendChild(o);
    }
    o.hidden = false;
    root.setAttribute('data-t', '');
    x();
  }

  function k(e) {
    if (e.key === 'Escape') {
      root.removeAttribute('data-t');
      if (o) o.hidden = true;
      if (h) { try { h.stop(); } catch (e) { } h = null; }
      return;
    }
    var t = e.target;
    if (t && (t.isContentEditable || t.tagName === 'TEXTAREA' ||
      (t.tagName === 'INPUT' && !/^(radio|checkbox|button|submit|reset)$/i.test(t.type)))) return;
    var c = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (c === s[i]) {
      i++;
      if (i === s.length) { i = 0; v(); }
    } else {
      i = c === s[0] ? 1 : 0;
    }
  }
  if (document.querySelector('[data-projects]')) document.addEventListener('keydown', k);

  document.addEventListener('change', function (event) {
    var input = event.target;
    if (input && input.matches && input.matches('input[name="lang"]')) {
      setLanguage(input.value, true);
    }
  });

  /* ---------- boot ---------- */

  function init() {
    var lang = /^en/i.test(root.lang) ? 'en' : 'pt-BR';
    applyLanguage(lang);
    applyCase(lang);
    renderProjects(lang);
    propagateLang(lang);
    initActiveSection();
    root.removeAttribute('data-i18n-pending');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
