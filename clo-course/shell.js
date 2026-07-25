/* ============================================================
   shell.js — builds the Claude-Docs-style chrome around each page.
   Depends on nav.js (window.CLO_PRODUCT) and optionally toc.js (window.CLO_TOC).
   Load order in each page: nav.js → toc.js → shell.js (last).

   ONE product since 2026-07-25 — the `?product=aieb` / data-product switch is
   gone. Access is decided by the gated MCP off the buyer's Lemon Squeezy
   product ID, so the portal shows every course to everyone and the Full Access
   courses carry an upgrade CTA instead of a second nav. Old ?product= links
   still work; the param is simply ignored.
   ============================================================ */

/* ⚠ LAST-RESORT UNHIDE. Every shell page ships <body hidden> and ONLY this file
   unhides it, so ANY uncaught error here = a silent blank white page for a buyer.
   There is no CI on this repo and nav.js/shell.js cache independently, so a bad
   deploy or a stale-cache pairing would ship exactly that. This listener runs
   before anything else and converts "blank page" into "unstyled but readable".
   Registered outside the IIFE so it survives a throw during setup. */
window.addEventListener('error', function () {
  try { if (document.body) document.body.hidden = false; } catch (e) {}
});

(function () {
  'use strict';

  var params = new URLSearchParams(location.search);
  // Defensive: tolerate a stale cached nav.js that still exports only the old
  // two-key map. Never let this be undefined — see the unhide guard above.
  var P = window.CLO_PRODUCT
       || (window.CLO_PRODUCTS && (window.CLO_PRODUCTS.clo || window.CLO_PRODUCTS.aieb))
       || {};
  if (!P.nav) P.nav = [];
  // NOTE: nothing in the shell reads a storage key any more (the gate, the sign-out
  // button and the onboarding widget all went with the collapse). `P.storageKey` is
  // kept in nav.js only so a stale cached shell.js doesn't trip over its absence.
  // Surface-aware nav: hide items tagged for the OTHER build surface (Cowork vs
  // Claude Code). Nothing carries a `surface` tag today — the merged nav shows
  // every course to everyone — but the mechanism is kept for future use.
  var curSurface = null; try { curSurface = localStorage.getItem('aieb_surface'); } catch (e) {}
  function surfaceOK(it) { if (!it || !it.surface) return true; if (!curSurface) return true; return it.surface === curSurface; }
  var PAGE = document.body.getAttribute('data-page') || 'home';

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
  // The AI Employee Builder avatar. 180px asset for a 30px slot (retina headroom);
  // cut with a transparent circle so it sits on the paper skin with no white box.
  var LOGO = ROOT + 'clo-course/assets/aieb-avatar-180.png';
  var HOME = 'clo-course/index.html';
  // Robot favicon — the brand mark in the browser tab. Same robot as the launcher's.
  // Injected here so all 14 shell pages get it from one place.
  var FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='10' y='28' width='80' height='55' rx='16' fill='white' stroke='%2321211E' stroke-width='6'/%3E%3Crect x='22' y='41' width='56' height='28' rx='12' fill='%2321211E'/%3E%3Ccircle cx='40' cy='55' r='6' fill='%232D8C3C'/%3E%3Ccircle cx='60' cy='55' r='6' fill='%232D8C3C'/%3E%3Cline x1='50' y1='28' x2='47' y2='10' stroke='%2321211E' stroke-width='6' stroke-linecap='round'/%3E%3Ccircle cx='46' cy='8' r='7' fill='%232D8C3C'/%3E%3C/svg%3E";

  // ════════ INIT ════════
  // The portal itself is OPEN. Entitlement is enforced by the gated MCP server off
  // the buyer's Lemon Squeezy product ID at the moment a skill actually runs — not
  // by hiding pages here. The old license gate (validateLicense / renderLock /
  // renderExpired / handleUnlock, ~100 lines) was already unreachable behind a
  // permanently-true GATE_OPEN flag and was deleted 2026-07-25 with the product
  // collapse. `P.checkout_url` survives as the Full Access upgrade target.
  buildShell();

  // ════════ BUILD SHELL ════════
  // nav.js hrefs are authored ROOT-RELATIVE; resolveHref prefixes ROOT ('../') so they work
  // from whichever folder the current page lives in (clo-course/, meta-create-skill/, …).
  function resolveHref(href) {
    if (/^https?:/.test(href)) return href;            // external/absolute — leave alone
    return ROOT + href;
  }

  // `rewriteContentLinks` was deleted 2026-07-25. It existed to (a) carry ?product=aieb
  // onto in-body links and (b) remap get-access.html → get-access-aieb.html. (a) is gone
  // with the product split; (b) is now fixed at source — the 11 stale links in
  // business-x-ray.html, business-x-ray/index.html and meta-create-skill/index.html point
  // at the AIEB install page directly. It never actually reached them anyway: on a course
  // SPA the #main it was handed is still empty when the shell runs.

  function buildShell() {
    var MODE = document.body.getAttribute('data-shell') || 'doc';
    var lessons = window.CLO_COURSE_LESSONS || null;
    // content slot: a normal page exposes #doc-content; a course SPA exposes its own main
    var doc = document.getElementById('doc-content');
    if (!doc && MODE === 'course') doc = document.getElementById('main') || document.querySelector('main.main') || document.querySelector('.main');
    if (doc) doc.remove();

    var flat = [];
    P.nav.forEach(function (g) { g.items.filter(surfaceOK).forEach(function (it) { flat.push(Object.assign({ group: g.group }, it)); }); });
    var active = flat.filter(function (it) { return it.page === PAGE; })[0];

    var sidebar = P.nav.map(function (g) {
      var gitems = g.items.filter(surfaceOK);
      if (!gitems.length) return '';
      return '<div class="clo-nav-group"><div class="clo-nav-grouplabel">' + g.group + '</div>' +
        gitems.map(function (it) {
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

    // The tier badge is gone (2026-07-25). It rendered an "AI Employee Builder" pill
    // beside the wordmark -- which now IS "AI Employee Builder", so it read twice.

    // Robot favicon on every shell page. Most shipped none at all, so the tab showed a
    // blank sheet; only the launcher carried one.
    if (!document.querySelector('link[rel="icon"]')) {
      var fav = document.createElement('link');
      fav.rel = 'icon'; fav.href = FAVICON;
      document.head.appendChild(fav);
    }

    var shell = document.createElement('div');
    shell.className = 'clo-shell';
    shell.innerHTML =
      '<header class="clo-topbar">' +
        '<button class="clo-hamburger" id="cloHam" aria-label="Toggle navigation">' + ICON.menu + '</button>' +
        '<a class="clo-logo" href="' + resolveHref(HOME) + '"><img src="' + LOGO + '" alt="' + P.brand + '"><span>' + P.brand + '</span></a>' +
        '<button class="clo-search-trigger" id="cloSearchBtn" aria-label="Search">' + ICON.search + '<span class="s-label">Search…</span><span class="kbd">⌘K</span></button>' +
        '<span class="clo-topbar-spacer"></span>' +
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
  function searchItems() {
    var items = [];
    P.nav.forEach(function (g) { g.items.filter(surfaceOK).forEach(function (it) {
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

  // The bottom-right "Getting started 0/4" quick-start widget was removed 2026-07-25.
  // It only ever existed on the retired CLO product, two of its four links were stale
  // (the dead SkillStack install page, a checkpoint reached from the board), and the
  // Build Board is the checklist now. Removing it also drops the last consumer of the
  // per-product storage key.
})();
