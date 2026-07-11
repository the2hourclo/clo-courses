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
  var PRODUCT_KEY = (params.get('product') === 'aieb' || document.body.getAttribute('data-product') === 'aieb') ? 'aieb' : 'clo';
  var P = window.CLO_PRODUCTS[PRODUCT_KEY];
  var STORAGE_KEY = P.storageKey;
  var PAGE = document.body.getAttribute('data-page') || 'home';
  document.title = document.title || P.title;

  // The AIEB device handoff is a deliberately chrome-free, one-action page.
  // It must stay reachable even when the course license gate is enabled: the
  // buyer is here to establish that entitlement, not to browse course content.
  if (PAGE === 'get-access' && params.has('activate')) {
    document.body.hidden = false;
    return;
  }

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    chev: '<svg class="clo-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
  };

  // Every portal page lives one level under the repo root → prefix '../' to root-relative hrefs.
  var ROOT = '../';
  var LOGO = ROOT + 'clo-community/assets/clo-logo-full.png';
  var HOME = 'clo-course/index.html';

  // ════════ INIT / GATE ════════
  (async function init() {
    // A product without a `license` block in nav.js is ungated by design
    // (AIEB's dead placeholder gate was removed 2026-07-11).
    if (GATE_OPEN || !P.license) return buildShell();

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
      '<h1>' + P.brand + ' Wiki</h1>' +
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

  // Keep in-body content links inside the current product. CLO is a no-op (links authored for clo);
  // in AIEB mode, remap the CLO get-access page to its AIEB twin and carry ?product=aieb on local .html links
  // so a buyer never clicks through from the AIEB portal into the CLO install flow.
  function rewriteContentLinks(scope) {
    if (PRODUCT_KEY !== 'aieb' || !scope) return;
    scope.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|#|javascript:)/.test(href)) return; // external/anchor — leave alone
      if (!/\.html(\?|#|$)/.test(href)) return;                                  // only local .html pages
      href = href.replace('get-access.html', 'get-access-aieb.html');           // CLO install page → AIEB twin
      var hash = '', q = href, hi = href.indexOf('#');
      if (hi > -1) { hash = href.slice(hi); q = href.slice(0, hi); }
      if (!/[?&]product=/.test(q)) q += (q.indexOf('?') > -1 ? '&' : '?') + 'product=aieb';
      a.setAttribute('href', q + hash);
    });
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

    var sidebar = P.nav.map(function (g) {
      return '<div class="clo-nav-group"><div class="clo-nav-grouplabel">' + g.group + '</div>' +
        g.items.map(function (it) {
          var isActive = it.page === PAGE;
          // active course with lessons → a collapsible group (click the row to fold/unfold)
          if (isActive && lessons && lessons.length) {
            return '<div class="clo-coursewrap">' +
              '<a class="clo-nav-item active has-sub" href="' + resolveHref(it.href) + '"><span>' + it.label + '</span>' + ICON.chev + '</a>' +
              renderLessons(lessons) +
            '</div>';
          }
          return '<a class="clo-nav-item' + (isActive ? ' active' : '') + '" href="' + resolveHref(it.href) + '">' + it.label + '</a>';
        }).join('') + '</div>';
    }).join('');

    // tier badge next to the wordmark — constant CLO brand, swappable tier (AI Employee Builder ↔ ★ Full Access)
    var tb = P.tierBadge;
    var tierStyle = 'display:inline-flex;align-items:center;margin-left:4px;font-size:11px;font-weight:800;letter-spacing:.2px;padding:3px 9px;border-radius:99px;white-space:nowrap;';
    var tierHtml = tb
      ? '<span class="clo-tier" style="' + tierStyle + (tb.star
          ? 'color:#0a0a0a;background:var(--accent);border:1px solid var(--accent);'
          : 'color:var(--text-300);background:var(--bg-100);border:1px solid var(--border-100);') + '">'
        + (tb.star ? '★ ' : '') + tb.label + '</span>'
      : '';

    var shell = document.createElement('div');
    shell.className = 'clo-shell';
    shell.innerHTML =
      '<header class="clo-topbar">' +
        '<button class="clo-hamburger" id="cloHam" aria-label="Toggle navigation">' + ICON.menu + '</button>' +
        '<a class="clo-logo" href="' + resolveHref(HOME) + '"><img src="' + LOGO + '" alt="' + P.brand + '"><span>' + P.brand + '</span></a>' + tierHtml +
        '<button class="clo-search-trigger" id="cloSearchBtn" aria-label="Search">' + ICON.search + '<span class="s-label">Search…</span><span class="kbd">⌘K</span></button>' +
        '<span class="clo-topbar-spacer"></span>' +
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
    if (doc) { doc.hidden = false; inner.appendChild(doc); rewriteContentLinks(doc); }

    document.body.hidden = false;

    // wire chrome
    document.getElementById('cloSignout').addEventListener('click', signOut);
    var ham = document.getElementById('cloHam'), sb = document.getElementById('cloSidebar'), scrim = document.getElementById('cloScrim');
    function closeNav() { sb.classList.remove('open'); scrim.classList.remove('open'); }
    ham.addEventListener('click', function () { sb.classList.toggle('open'); scrim.classList.toggle('open'); });
    scrim.addEventListener('click', closeNav);
    sb.addEventListener('click', function (e) {
      var subToggle = e.target.closest('.has-sub');
      if (subToggle) { e.preventDefault(); subToggle.parentElement.classList.toggle('collapsed'); return; } // fold/unfold the course
      var item = e.target.closest('.clo-nav-item');
      if (item && !item.classList.contains('clo-sublesson')) closeNav();
    });

    if (MODE === 'course' && lessons) wireLessons();
    // honor a #lesson deep-link on load (so cross-course search jumps land on the right lesson)
    if (MODE === 'course' && location.hash) {
      var lid = location.hash.slice(1), gn = window.CLO_COURSE_GOTO_NAME || 'goToLesson';
      if (lessons && lessons.some(function (l) { return l.id === lid; }) && typeof window[gn] === 'function') window[gn](lid);
    }
    enhanceCodeBlocks(MODE === 'course' ? null : doc); // course pages keep their own code styling
    initSearch();
    buildOnboarding();
    if (window.CLO_TOC) window.CLO_TOC.build(inner); // "On this page" on every page (incl. course lessons)
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
        if (window.CLO_TOC) window.CLO_TOC.build(document.getElementById('cloInner')); // refresh "On this page" for the new lesson
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

  // ════════ SEARCH (⌘K — pages + the current course's lessons + this page's sections) ════════
  function activeCourseLabel() {
    var found = '';
    P.nav.forEach(function (g) { g.items.forEach(function (it) { if (it.page === PAGE) found = it.label; }); });
    return found;
  }
  function searchItems() {
    var items = [];
    P.nav.forEach(function (g) { g.items.forEach(function (it) {
      items.push({ type: 'Page', label: it.label, sub: it.group, keywords: it.keywords || [], act: { href: resolveHref(it.href) } });
    }); });
    // every course's lessons (global) — same-course lessons swap in place; others deep-link to their page
    (window.CLO_LESSON_INDEX || []).forEach(function (c) {
      var sameCourse = c.page === PAGE, gname = window.CLO_COURSE_GOTO_NAME || 'goToLesson';
      c.lessons.forEach(function (l) {
        var act = sameCourse ? { lesson: l.id, gname: gname } : { href: resolveHref(c.href) + '#' + l.id };
        items.push({ type: 'Lesson', label: l.name, sub: c.label + (l.group ? ' · ' + l.group : ''), keywords: [], act: act });
      });
    });
    var inner = document.getElementById('cloInner');
    if (inner) {
      [].slice.call(inner.querySelectorAll('h2[id], h3[id]')).filter(function (h) { return h.offsetParent !== null; }).forEach(function (h) {
        var t = (h.firstChild && h.firstChild.textContent ? h.firstChild.textContent : h.textContent).trim();
        if (t) items.push({ type: 'Section', label: t, sub: 'On this page', keywords: [], act: { anchor: h.id } });
      });
    }
    return items;
  }
  function initSearch() {
    var overlay = document.createElement('div');
    overlay.className = 'clo-search-overlay';
    overlay.innerHTML =
      '<div class="clo-search-panel">' +
        '<div class="clo-search-head">' + ICON.search +
          '<input class="clo-search-input" id="cloQ" placeholder="Search pages, lessons, sections…" autocomplete="off">' +
          '<span class="clo-search-esc">ESC</span></div>' +
        '<div class="clo-search-results" id="cloRes"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    var q = overlay.querySelector('#cloQ'), res = overlay.querySelector('#cloRes'), sel = 0, shown = [];

    function score(it, tokens) {
      var hay = (it.label + ' ' + (it.sub || '') + ' ' + (it.keywords || []).join(' ')).toLowerCase();
      for (var i = 0; i < tokens.length; i++) { if (hay.indexOf(tokens[i]) === -1) return null; }
      var label = it.label.toLowerCase(), kw = (it.keywords || []).join(' ').toLowerCase(), t = tokens[0], s;
      if (label.indexOf(t) === 0) s = 100; else if (label.indexOf(t) > -1) s = 80;
      else if ((' ' + kw + ' ').indexOf(' ' + t) > -1) s = 60; else if (kw.indexOf(t) > -1) s = 50;
      else s = 20;
      s += it.type === 'Page' ? 3 : it.type === 'Lesson' ? 2 : 0; // tie-break: pages > lessons > sections
      return { it: it, s: s };
    }
    function go(it) {
      close();
      if (!it) return;
      var a = it.act;
      if (a.lesson) { var f = window[a.gname]; if (typeof f === 'function') f(a.lesson); }
      else if (a.anchor) { var el = document.getElementById(a.anchor); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
      else if (a.href) { location.href = a.href; }
    }
    function render() {
      var term = q.value.trim().toLowerCase(), all = searchItems();
      if (!term) shown = all.map(function (it) { return { it: it }; });
      else { var toks = term.split(/\s+/); shown = all.map(function (it) { return score(it, toks); }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }); }
      sel = 0;
      res.innerHTML = shown.length
        ? shown.map(function (x, i) {
            var it = x.it;
            return '<div class="clo-search-result' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '">' +
              '<span class="r-title">' + it.label + '</span>' +
              '<span class="r-meta"><span class="r-type r-' + it.type.toLowerCase() + '">' + it.type + '</span>' + (it.sub ? '<span class="r-sub">' + it.sub + '</span>' : '') + '</span></div>';
          }).join('')
        : '<div class="clo-search-empty">No matches.</div>';
    }
    function open() { overlay.classList.add('open'); q.value = ''; render(); q.focus(); }
    function close() { overlay.classList.remove('open'); }
    function paint() { res.querySelectorAll('.clo-search-result').forEach(function (r, i) { r.classList.toggle('active', i === sel); }); }
    function scrollSel() { var el = res.querySelector('.clo-search-result.active'); if (el) el.scrollIntoView({ block: 'nearest' }); }

    document.getElementById('cloSearchBtn').addEventListener('click', open);
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); }
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); paint(); scrollSel(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); paint(); scrollSel(); }
      else if (e.key === 'Enter') { e.preventDefault(); go(shown[sel] && shown[sel].it); }
    });
    q.addEventListener('input', render);
    res.addEventListener('click', function (e) { var r = e.target.closest('.clo-search-result'); if (r) go(shown[+r.dataset.idx] && shown[+r.dataset.idx].it); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  }

  // ════════ ONBOARDING CHECKLIST WIDGET (bottom-right) ════════
  function buildOnboarding() {
    var steps = P.onboarding || [];
    if (!steps.length) return;
    var KEY = STORAGE_KEY + '_onb', done = {};
    try { done = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { done = {}; }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }
    function count() { var n = 0; steps.forEach(function (s, i) { if (done[i]) n++; }); return n; }

    var w = document.createElement('div');
    w.className = 'clo-onb';
    function render() {
      var n = count(), total = steps.length, all = n === total;
      w.innerHTML =
        '<button class="clo-onb-launch" id="cloOnbLaunch" aria-label="Quick start">' +
          '<span class="clo-onb-ico">' + (all ? '✓' : '🚀') + '</span>' +
          '<span class="clo-onb-txt">' + (all ? "You're all set" : 'Getting started') + '</span>' +
          '<span class="clo-onb-count">' + n + '/' + total + '</span>' +
        '</button>' +
        '<div class="clo-onb-panel">' +
          '<div class="clo-onb-head"><span class="clo-onb-title">Quick start</span>' +
            '<button class="clo-onb-x" id="cloOnbX" aria-label="Minimize">&times;</button></div>' +
          '<div class="clo-onb-bar"><span style="width:' + Math.round(n / total * 100) + '%"></span></div>' +
          steps.map(function (s, i) {
            return '<div class="clo-onb-item' + (done[i] ? ' done' : '') + '">' +
              '<button class="clo-onb-check" data-check="' + i + '" aria-label="Toggle done">' + (done[i] ? '✓' : '') + '</button>' +
              '<a class="clo-onb-link" href="' + resolveHref(s.href) + '"' + (/^https?:/.test(s.href) ? ' target="_blank" rel="noopener"' : '') + '>' +
                '<span class="clo-onb-step">' + s.label + '</span>' +
                (s.hint ? '<span class="clo-onb-hint">' + s.hint + '</span>' : '') +
              '</a></div>';
          }).join('') +
        '</div>';
      w.querySelector('#cloOnbLaunch').addEventListener('click', function () { w.classList.toggle('open'); });
      var x = w.querySelector('#cloOnbX'); if (x) x.addEventListener('click', function () { w.classList.remove('open'); });
      w.querySelectorAll('.clo-onb-check').forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.preventDefault(); e.stopPropagation();
          var i = +b.dataset.check; done[i] = !done[i]; save();
          var wasOpen = w.classList.contains('open'); render(); if (wasOpen) w.classList.add('open');
        });
      });
    }
    render();
    document.body.appendChild(w);
  }
})();
