/* ============================================================
   toc.js — builds the right-rail "On this page" TOC from the VISIBLE
   h2/h3 headings of the current content and highlights the in-view
   section (scroll-spy). Rebuild-safe: course pages call build() again
   on every lesson change. Skips hidden lesson sections (offsetParent null)
   and disconnects the previous observer so observers don't pile up.
   Defines window.CLO_TOC.build(scope).
   ============================================================ */
(function () {
  'use strict';
  var io = null;

  function slug(t) {
    return t.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60);
  }
  function headingText(h) {
    // first text node = the label without the appended anchor link
    return (h.firstChild && h.firstChild.textContent ? h.firstChild.textContent : h.textContent).trim();
  }

  function build(scope) {
    var toc = document.getElementById('cloToc');
    scope = scope || document.getElementById('cloInner') || document.getElementById('doc-content');
    if (!toc || !scope) return;
    if (io) { io.disconnect(); io = null; }

    var heads = [].slice.call(scope.querySelectorAll('h2, h3')).filter(function (h) {
      return h.offsetParent !== null; // visible only (hidden lesson sections drop out)
    });
    if (heads.length < 2) { toc.classList.add('clo-toc-empty'); toc.innerHTML = ''; return; }
    toc.classList.remove('clo-toc-empty');

    var seen = {};
    var links = heads.map(function (h) {
      if (!h.id) { var s = slug(headingText(h)) || 'section'; if (seen[s]) { s += '-' + (++seen[s]); } else { seen[s] = 1; } h.id = s; }
      if (!h.querySelector('.clo-anchor')) {
        var a = document.createElement('a'); a.className = 'clo-anchor'; a.href = '#' + h.id; a.textContent = '#'; a.setAttribute('aria-hidden', 'true');
        h.appendChild(a);
      }
      return '<a href="#' + h.id + '" class="' + (h.tagName === 'H3' ? 'lvl-3' : '') + '" data-id="' + h.id + '">' + headingText(h) + '</a>';
    }).join('');

    toc.innerHTML = '<div class="clo-toc-title">On this page</div>' + links;
    var tlinks = [].slice.call(toc.querySelectorAll('a'));
    function setActive(id) { tlinks.forEach(function (l) { l.classList.toggle('active', l.dataset.id === id); }); }

    if ('IntersectionObserver' in window) {
      var visible = {};
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
        var top = null, best = -1;
        heads.forEach(function (h) { if ((visible[h.id] || 0) > best) { best = visible[h.id] || 0; top = h.id; } });
        if (top && best > 0) setActive(top);
      }, { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] });
      heads.forEach(function (h) { io.observe(h); });
    }
    setActive(heads[0].id);

    tlinks.forEach(function (l) {
      l.addEventListener('click', function (e) {
        var t = document.getElementById(l.dataset.id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#' + l.dataset.id); setActive(l.dataset.id); }
      });
    });
  }
  window.CLO_TOC = { build: build };
})();
