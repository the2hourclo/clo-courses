/* ============================================================
   shell.js — builds the Claude-Docs-style chrome around each page and
   owns the license gate (so EVERY page is gated, not just the old shell).
   Depends on nav.js (window.CLO_PRODUCTS) and optionally toc.js (window.CLO_TOC).
   Load order in each page: nav.js → toc.js → shell.js (last).
   ============================================================ */
(function () {
  'use strict';

  // ── Temp-open flag. Flip to false to re-enable the live license gate
  //    on EVERY page at once (replaces the old per-page `if (true)`).
  var GATE_OPEN = true;

  var params = new URLSearchParams(location.search);
  var PRODUCT_KEY = params.get('product') === 'aieb' ? 'aieb' : 'clo';
  var P = window.CLO_PRODUCTS[PRODUCT_KEY];
  var STORAGE_KEY = P.storageKey;
  var PAGE = document.body.getAttribute('data-page') || 'home';
  document.title = document.title || P.title;

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
  };

  // Every portal page lives one level under the repo root → prefix '../' to root-relative hrefs.
  var ROOT = '../';
  var LOGO = ROOT + 'clo-community/assets/clo-logo-full.png';
  var HOME = 'clo-course/index.html';

  // ════════ INIT / GATE ════════
  (async function init() {
    if (GATE_OPEN) return buildShell();

    var key = params.get('license_key') || localStorage.getItem(STORAGE_KEY);
    // skip re-validation within a session
    if (key && sessionStorage.getItem(STORAGE_KEY + '_ok') === '1') return buildShell();
    if (!key) return renderLock();

    var r = await validateLicense(key);
    if (!r.ok) {
      localStorage.removeItem(STORAGE_KEY);
      return r.reason === 'expired' ? renderExpired() : renderLock(r.message);
    }
    localStorage.setItem(STORAGE_KEY, key);
    sessionStorage.setItem(STORAGE_KEY + '_ok', '1');
    if (params.has('license_key')) {
      params.delete('license_key');
      var q = params.toString();
      history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash);
    }
    buildShell();
  })();

  // ════════ LICENSE VALIDATION (identical to onboarding page) ════════
  async function validateLicense(key) {
    try {
      var res = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ license_key: key })
      });
      var data = await res.json();
      if (!data.valid) {
        var st = data.license_key && data.license_key.status;
        if (st === 'expired' || st === 'disabled' || st === 'inactive') return { ok: false, reason: 'expired' };
        return { ok: false, reason: 'invalid', message: (data.error || 'Invalid license key.') };
      }
      if (data.meta && (data.meta.store_id !== P.license.store_id || data.meta.product_id !== P.license.product_id))
        return { ok: false, reason: 'wrong_product', message: 'This license is for a different product.' };
      if (P.license.variant_id && data.meta && data.meta.variant_id !== P.license.variant_id)
        return { ok: false, reason: 'wrong_variant', message: 'This license is for a different subscription tier.' };
      if (data.license_key && data.license_key.status && data.license_key.status !== 'active')
        return { ok: false, reason: 'expired' };
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: 'network', message: 'Could not reach the license server. Check your connection.' };
    }
  }

  // ════════ LOCK / EXPIRED ════════
  function lockShell(inner) {
    document.getElementById('doc-content') && (document.getElementById('doc-content').hidden = true);
    var el = document.createElement('div');
    el.className = 'clo-lock';
    el.innerHTML = '<div class="clo-lock-card">' + inner + '</div>';
    document.body.prepend(el);
    document.body.hidden = false;
  }
  function renderLock(msg) {
    lockShell(
      '<div class="clo-lock-icon">🔒</div>' +
      '<h1>' + P.brand + ' Course Portal</h1>' +
      '<p class="clo-lock-lead">Enter your license key to unlock the course library.</p>' +
      '<form class="clo-lock-form" id="cloUnlock">' +
        '<label for="cloKey">License key</label>' +
        '<input type="text" id="cloKey" placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" required autofocus>' +
        '<button type="submit" id="cloUnlockBtn">Unlock Portal</button>' +
        '<div class="clo-lock-err ' + (msg ? 'show' : '') + '" id="cloErr">' + (msg || '') + '</div>' +
      '</form>' +
      '<div class="clo-lock-hint">Find your license key in your purchase confirmation email.</div>' +
      '<div class="clo-lock-hint">No license yet? <a href="' + P.checkout_url + '" target="_blank">Join the community →</a></div>'
    );
    document.getElementById('cloUnlock').addEventListener('submit', handleUnlock);
  }
  function renderExpired() {
    lockShell(
      '<div class="clo-lock-icon">⏱</div>' +
      '<h1>Your subscription has ended</h1>' +
      '<p class="clo-lock-lead">This license is no longer active. Renew to regain access to the course portal and the ' + P.pluginName + ' plugin.</p>' +
      '<a href="' + P.checkout_url + '" target="_blank" class="btn btn-primary">Renew Subscription</a>' +
      '<div class="clo-lock-hint" style="margin-top:32px">Already renewed? <a href="javascript:location.reload()">Reload page</a></div>'
    );
  }
  async function handleUnlock(e) {
    e.preventDefault();
    var key = document.getElementById('cloKey').value.trim();
    var err = document.getElementById('cloErr'), btn = document.getElementById('cloUnlockBtn');
    if (!key) return;
    btn.disabled = true; btn.textContent = 'Verifying…'; err.classList.remove('show');
    var r = await validateLicense(key);
    if (!r.ok) {
      btn.disabled = false; btn.textContent = 'Unlock Portal';
      err.textContent = r.reason === 'expired'
        ? 'This license has expired. Renew your subscription to regain access.'
        : (r.message || 'Could not verify license. Check the key and try again.');
      err.classList.add('show');
      return;
    }
    localStorage.setItem(STORAGE_KEY, key);
    sessionStorage.setItem(STORAGE_KEY + '_ok', '1');
    location.reload();
  }

  // ════════ BUILD SHELL ════════
  // nav.js hrefs are authored ROOT-RELATIVE; resolveHref prefixes ROOT ('../') so they work
  // from whichever folder the current page lives in (clo-course/, meta-create-skill/, …).
  function resolveHref(href) {
    if (/^https?:/.test(href)) return href;            // external/absolute — leave alone
    var out = ROOT + href;
    if (PRODUCT_KEY === 'aieb' && /\.html(\?|#|$)/.test(href))
      out += (out.indexOf('?') > -1 ? '&' : '?') + 'product=aieb';
    return out;
  }

  function buildShell() {
    var MODE = document.body.getAttribute('data-shell') || 'doc';
    var lessons = window.CLO_COURSE_LESSONS || null;
    // content slot: a normal page exposes #doc-content; a course SPA exposes its own main
    var doc = document.getElementById('doc-content');
    if (!doc && MODE === 'course') doc = document.getElementById('main') || document.querySelector('main.main') || document.querySelector('.main');
    if (doc) doc.remove();

    var flat = [];
    P.nav.forEach(function (g) { g.items.forEach(function (it) { flat.push(Object.assign({ group: g.group }, it)); }); });
    var active = flat.filter(function (it) { return it.page === PAGE; })[0];

    var ext = P.community.external ? ' target="_blank" rel="noopener"' : '';
    var sidebar = P.nav.map(function (g) {
      return '<div class="clo-nav-group"><div class="clo-nav-grouplabel">' + g.group + '</div>' +
        g.items.map(function (it) {
          var a = '<a class="clo-nav-item' + (it.page === PAGE ? ' active' : '') + '" href="' + resolveHref(it.href) + '">' + it.label + '</a>';
          // nest the active course's lessons under it (Claude-Docs expanded-section style)
          if (it.page === PAGE && lessons && lessons.length) a += renderLessons(lessons);
          return a;
        }).join('') + '</div>';
    }).join('');

    var shell = document.createElement('div');
    shell.className = 'clo-shell';
    shell.innerHTML =
      '<header class="clo-topbar">' +
        '<button class="clo-hamburger" id="cloHam" aria-label="Toggle navigation">' + ICON.menu + '</button>' +
        '<a class="clo-logo" href="' + resolveHref(HOME) + '"><img src="' + LOGO + '" alt="' + P.brand + '"><span>' + P.brand + '</span></a>' +
        '<button class="clo-search-trigger" id="cloSearchBtn" aria-label="Search">' + ICON.search + '<span class="s-label">Search…</span><span class="kbd">⌘K</span></button>' +
        '<span class="clo-topbar-spacer"></span>' +
        '<a class="clo-topbar-link" href="' + resolveHref(P.community.url) + '"' + ext + '>' + P.community.label + '</a>' +
        '<button class="clo-signout" id="cloSignout">Sign out</button>' +
      '</header>' +
      '<div class="clo-scrim" id="cloScrim"></div>' +
      '<div class="clo-body">' +
        '<aside class="clo-sidebar" id="cloSidebar">' + sidebar + '</aside>' +
        '<main class="clo-content"><div class="clo-content-inner" id="cloInner"></div></main>' +
        '<aside class="clo-toc" id="cloToc"></aside>' +
      '</div>';
    if (MODE === 'course') document.body.classList.add('clo-course');
    document.body.prepend(shell);

    var inner = shell.querySelector('#cloInner');
    if (active && PAGE !== 'home')
      inner.insertAdjacentHTML('beforeend', '<div class="clo-breadcrumb">' + active.group + '<span class="sep">/</span>' + active.label + '</div>');
    if (doc) { doc.hidden = false; inner.appendChild(doc); }

    document.body.hidden = false;

    // wire chrome
    document.getElementById('cloSignout').addEventListener('click', signOut);
    var ham = document.getElementById('cloHam'), sb = document.getElementById('cloSidebar'), scrim = document.getElementById('cloScrim');
    function closeNav() { sb.classList.remove('open'); scrim.classList.remove('open'); }
    ham.addEventListener('click', function () { sb.classList.toggle('open'); scrim.classList.toggle('open'); });
    scrim.addEventListener('click', closeNav);
    sb.addEventListener('click', function (e) { if (e.target.classList.contains('clo-nav-item') && !e.target.classList.contains('clo-sublesson')) closeNav(); });

    if (MODE === 'course' && lessons) wireLessons();
    enhanceCodeBlocks(MODE === 'course' ? null : doc); // course pages keep their own code styling
    initSearch(flat);
    if (MODE !== 'course' && window.CLO_TOC) window.CLO_TOC.build(doc);
  }

  // ── course-mode lesson rail (renders the page's own LESSONS in the shared sidebar) ──
  function renderLessons(lessons) {
    var html = '<div class="clo-sublist">', last = '';
    lessons.forEach(function (l) {
      if (l.group !== last) { html += '<div class="clo-sublabel">' + l.group + '</div>'; last = l.group; }
      html += '<a class="clo-nav-item clo-sublesson" data-lesson="' + l.id + '" href="#">' + l.name + '</a>';
    });
    return html + '</div>';
  }
  function markLesson(id) {
    var nodes = document.querySelectorAll('.clo-sublesson');
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.toggle('active', nodes[i].getAttribute('data-lesson') === id);
  }
  function wireLessons() {
    // wrap the page's own nav function (goToLesson / goTo / …) so the shared rail stays in sync.
    var gname = window.CLO_COURSE_GOTO_NAME || 'goToLesson';
    if (typeof window[gname] === 'function' && !window.__cloLessonPatch) {
      var orig = window[gname];
      window[gname] = function (id) {
        orig(id); markLesson(id); window.scrollTo(0, 0);
        var sb = document.getElementById('cloSidebar'), sc = document.getElementById('cloScrim');
        if (sb) sb.classList.remove('open'); if (sc) sc.classList.remove('open');
      };
      window.__cloLessonPatch = true;
    }
    document.querySelectorAll('.clo-sublesson').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); var f = window[gname]; if (typeof f === 'function') f(a.getAttribute('data-lesson')); });
    });
    if (window.CLO_CURRENT_LESSON) markLesson(window.CLO_CURRENT_LESSON);
  }

  function signOut() { localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem(STORAGE_KEY + '_ok'); location.reload(); }

  // ════════ CODE BLOCK ENHANCE (copy + language label) ════════
  function enhanceCodeBlocks(scope) {
    if (!scope) return;
    scope.querySelectorAll('pre > code').forEach(function (code) {
      var pre = code.parentElement;
      if (pre.closest('.clo-codeblock')) return;
      var wrap = document.createElement('div');
      wrap.className = 'clo-codeblock';
      var langMatch = (code.className || '').match(/language-([\w-]+)/);
      if (langMatch) { var l = document.createElement('span'); l.className = 'clo-code-lang'; l.textContent = langMatch[1]; wrap.appendChild(l); }
      pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(pre);
      var btn = document.createElement('button'); btn.className = 'clo-code-copy'; btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(code.textContent).then(function () {
          btn.textContent = 'Copied'; btn.classList.add('copied');
          setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1400);
        });
      });
      wrap.appendChild(btn);
    });
  }

  // ════════ SEARCH (⌘K — Phase 1: nav index) ════════
  function initSearch(flat) {
    var overlay = document.createElement('div');
    overlay.className = 'clo-search-overlay';
    overlay.innerHTML =
      '<div class="clo-search-panel">' +
        '<div class="clo-search-head">' + ICON.search +
          '<input class="clo-search-input" id="cloQ" placeholder="Search the portal…" autocomplete="off">' +
          '<span class="clo-search-esc">ESC</span></div>' +
        '<div class="clo-search-results" id="cloRes"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    var q = overlay.querySelector('#cloQ'), res = overlay.querySelector('#cloRes'), sel = 0, shown = [];

    function score(it, tokens) {
      var label = it.label.toLowerCase(), group = it.group.toLowerCase();
      var kw = (it.keywords || []).join(' ').toLowerCase();
      var hay = label + ' ' + group + ' ' + kw;
      var hit = '';
      for (var i = 0; i < tokens.length; i++) { if (hay.indexOf(tokens[i]) === -1) return null; }
      var t = tokens[0], s;
      if (label.indexOf(t) === 0) s = 100;
      else if (label.indexOf(t) > -1) s = 80;
      else if ((' ' + kw + ' ').indexOf(' ' + t) > -1) { s = 60; hit = matchKw(it, t); }
      else if (kw.indexOf(t) > -1) { s = 50; hit = matchKw(it, t); }
      else if (group.indexOf(t) > -1) s = 30;
      else s = 10;
      return { it: it, s: s, hit: hit };
    }
    function matchKw(it, t) {
      var found = (it.keywords || []).filter(function (k) { return k.toLowerCase().indexOf(t) > -1; })[0];
      return found ? 'matches “' + found + '”' : '';
    }
    function render() {
      var term = q.value.trim().toLowerCase();
      if (!term) { shown = flat.map(function (it) { return { it: it, hit: '' }; }); }
      else {
        var toks = term.split(/\s+/);
        shown = flat.map(function (it) { return score(it, toks); }).filter(Boolean)
          .sort(function (a, b) { return b.s - a.s; });
      }
      sel = 0;
      res.innerHTML = shown.length
        ? shown.map(function (x, i) {
            var it = x.it;
            return '<a class="clo-search-result' + (i === 0 ? ' active' : '') + '" href="' + resolveHref(it.href) + '">' +
              '<span class="r-title">' + it.label + '</span><span class="r-group">' + it.group + (x.hit ? ' · ' + x.hit : '') + '</span></a>';
          }).join('')
        : '<div class="clo-search-empty">No matches.</div>';
    }
    function open() { overlay.classList.add('open'); q.value = ''; render(); q.focus(); }
    function close() { overlay.classList.remove('open'); }

    document.getElementById('cloSearchBtn').addEventListener('click', open);
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); }
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); paint(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); paint(); }
      if (e.key === 'Enter' && shown[sel]) { location.href = resolveHref(shown[sel].it.href); }
    });
    function paint() { res.querySelectorAll('.clo-search-result').forEach(function (r, i) { r.classList.toggle('active', i === sel); }); }
    q.addEventListener('input', render);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  }
})();
