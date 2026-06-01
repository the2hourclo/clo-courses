/* ============================================================
   toc.js — builds the right-rail "On this page" TOC from the content's
   h2/h3 headings and highlights the in-view section (scroll-spy).
   Defines window.CLO_TOC.build(scope); shell.js calls it after layout.
   Observes only headings (O(headings), not O(DOM)) so it stays cheap
   even on the 6k-line lesson pages.
   ============================================================ */
(function () {
  'use strict';
  function slug(t) {
    return t.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60);
  }
  function build(scope) {
    var toc = document.getElementById('cloToc');
    scope = scope || document.getElementById('doc-content');
    if (!toc || !scope) return;

    var heads = [].slice.call(scope.querySelectorAll('h2, h3'));
    if (heads.length < 2) { toc.classList.add('clo-toc-empty'); return; }

    var seen = {};
    var links = heads.map(function (h) {
      if (!h.id) { var s = slug(h.textContent) || 'section'; if (seen[s]) s += '-' + (++seen[s]); else seen[s] = 1; h.id = s; }
      // hover anchor on the heading
      if (!h.querySelector('.clo-anchor')) {
        var a = document.createElement('a'); a.className = 'clo-anchor'; a.href = '#' + h.id; a.textContent = '#'; a.setAttribute('aria-hidden', 'true');
        h.appendChild(a);
      }
      return '<a href="#' + h.id + '" class="' + (h.tagName === 'H3' ? 'lvl-3' : '') + '" data-id="' + h.id + '">' + h.firstChild.textContent + '</a>';
    }).join('');

    toc.innerHTML = '<div class="clo-toc-title">On this page</div>' + links;

    var tlinks = [].slice.call(toc.querySelectorAll('a'));
    function setActive(id) { tlinks.forEach(function (l) { l.classList.toggle('active', l.dataset.id === id); }); }

    if ('IntersectionObserver' in window) {
      var visible = {};
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
        var top = null, best = -1;
        heads.forEach(function (h) { if ((visible[h.id] || 0) > best) { best = visible[h.id] || 0; top = h.id; } });
        if (top && best > 0) setActive(top);
      }, { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] });
      heads.forEach(function (h) { io.observe(h); });
    }
    setActive(heads[0].id);

    // smooth-scroll TOC clicks (keep hash)
    tlinks.forEach(function (l) {
      l.addEventListener('click', function (e) {
        var t = document.getElementById(l.dataset.id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#' + l.dataset.id); setActive(l.dataset.id); }
      });
    });
  }
  window.CLO_TOC = { build: build };
})();
