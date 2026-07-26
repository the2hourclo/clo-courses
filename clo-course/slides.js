/* slides.js — swipeable slide viewer for the checkpoint wizards.
   Drops a slide deck into a wizard step until its video is recorded:
   swipe / arrow keys / edge buttons to navigate, tap the slide to enlarge.
   Usage: give a step  slides:[ 'url1.png', ... ]  and the wizard's render()
   calls  AIEBSlides.mount(el, { slides, title, notes })  after painting the stage.
   Styling follows journey.css (white-excali) and inherits --cp per checkpoint.

   NARRATION (notes) — a step may also carry  slideNotes:[ 'html', ... ]  parallel
   to its slides. The viewer then prints a caption UNDER the deck that changes as
   the reader navigates, so the prose walks them through the slide they're looking
   at instead of one static paragraph covering the whole deck. A deck with no notes
   behaves exactly as before. (Rashid, 2026-07-26: "if people navigate the slides
   the text below updates to explain what's going on in the slides itself, as if I
   was explaining it myself.") */
(function(){
'use strict';

var CSS =
/* ── The width problem ───────────────────────────────────────────────────────
   Slides are authored on a 1600px canvas. In a 640px wizard column they render
   548px wide — a 0.34 scale — so the design system's 26px minimum body text
   lands at 8.9px and 17px sub-labels at 5.8px. Unreadable.
   Fix: on a wide viewport the wizard column opens up for slide steps only, and
   the prose inside it stays at a sane measure. ~1140px puts sub-labels back
   near 12px. 800px is NOT enough — the annotation tier is still ~8.5px there.
   The wizard sets body.slides-step when the current step carries a deck.
   Phones can't be solved by width (390px = 0.24 scale) — that's what the
   Enlarge chip and the lightbox are for. ────────────────────────────────── */
'body.slides-step .wrap{max-width:1160px}' +
'body.slides-step .step-type,body.slides-step .step h2,body.slides-step .step p,' +
'body.slides-step .step .cmd,body.slides-step .step .gate,body.slides-step .step ul.sub{max-width:680px}' +
'.sv{position:relative;width:100%;aspect-ratio:1600/1050;border-radius:var(--radius,9px);border:1px solid var(--border-2,#E2E2DC);background:#fff;overflow:hidden;margin:4px 0 8px;user-select:none;-webkit-user-select:none;touch-action:pan-y}' +
'.sv img.sv-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;cursor:zoom-in;display:block}' +
'.sv-in-r{animation:svInR .22s cubic-bezier(.2,.7,.2,1) both}' +
'.sv-in-l{animation:svInL .22s cubic-bezier(.2,.7,.2,1) both}' +
'@keyframes svInR{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}' +
'@keyframes svInL{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}' +
'.sv-arr{position:absolute;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;border:1px solid var(--border-ink,#21211E);background:rgba(255,255,255,.92);color:var(--text,#21211E);font-size:15px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;z-index:2}' +
'.sv-arr:hover{background:var(--cp,#2D8C3C);border-color:var(--cp,#2D8C3C);color:#fff}' +
'.sv-arr:disabled{opacity:.22;cursor:default;pointer-events:none}' +
'.sv-prev{left:10px}.sv-next{right:10px}' +
'.sv-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 2px 16px}' +
'.sv-count{font-family:var(--font-accent,inherit);font-size:13px;color:var(--text-muted,#6B6B63);min-width:44px}' +
'.sv-dots{display:flex;gap:6px;align-items:center}' +
'.sv-dot{width:7px;height:7px;border-radius:50%;background:var(--border-2,#E2E2DC);border:0;padding:0;cursor:pointer;transition:all .18s}' +
'.sv-dot.on{background:var(--cp,#2D8C3C);transform:scale(1.25)}' +
'.sv-hint{font-size:12px;color:var(--text-dim,#9A9A90)}' +
/* the narration under the deck — same measure as the step's prose so the column
   doesn't jump between a slide step and a plain one. Re-animates on every change
   so the reader notices the text moved with them. */
'.sv-note{max-width:680px;margin:-4px 0 6px;padding:2px 0 2px 16px;' +
'border-left:3px solid color-mix(in srgb,var(--cp,#2D8C3C) 45%,transparent);' +
'color:var(--text-muted,#6B6B63);font-size:15.5px;line-height:1.62}' +
'.sv-note strong{color:var(--text,#21211E);font-weight:700}' +
'.sv-note-in{animation:svNote .26s cubic-bezier(.2,.7,.2,1) both}' +
'@keyframes svNote{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}' +
/* The Enlarge chip is ALWAYS visible. It used to be a text hint that was
   display:none under 520px — hiding the affordance on phones, the one place
   width can't rescue legibility and enlarging is the only way to read a slide. */
'.sv-zoom{position:absolute;right:9px;bottom:9px;z-index:2;display:inline-flex;align-items:center;gap:5px;' +
'font-family:inherit;font-size:12px;font-weight:700;padding:6px 11px;border-radius:20px;cursor:pointer;' +
'border:1px solid var(--border-ink,#21211E);background:rgba(255,255,255,.94);color:var(--text,#21211E);transition:all .15s}' +
'.sv-zoom:hover{background:var(--cp,#2D8C3C);border-color:var(--cp,#2D8C3C);color:#fff}' +
'@media(max-width:520px){.sv-hint{display:none}}' +
/* lightbox */
'.sv-lb{position:fixed;inset:0;z-index:400;background:rgba(20,20,18,.93);display:flex;align-items:center;justify-content:center;touch-action:pan-y}' +
'.sv-lb img{max-width:94vw;max-height:88vh;border-radius:8px;background:#fff;display:block}' +
/* Solid dark chips, not translucent white: on a phone the slide fills the width, so the
   controls sit ON white paper — a translucent white button disappears against it. */
'.sv-lb .sv-arr{background:rgba(20,20,18,.82);border-color:rgba(255,255,255,.7);color:#fff}' +
'.sv-lb .sv-arr:hover{background:var(--cp,#2D8C3C);border-color:var(--cp,#2D8C3C)}' +
'.sv-lb .sv-prev{left:14px}.sv-lb .sv-next{right:14px}' +
'.sv-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(20,20,18,.82);color:#fff;font-size:16px;cursor:pointer;z-index:2}' +
'.sv-x:hover{background:rgba(20,20,18,.95)}' +
'.sv-lb .sv-count{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.75);font-size:13px;min-width:0}';

function injectCSS(){
  if (document.getElementById('sv-css')) return;
  var st = document.createElement('style');
  st.id = 'sv-css';
  st.textContent = CSS;
  document.head.appendChild(st);
}

var active = null;      // one live viewer at a time (wizard shows one step)
var keysBound = false;

function onKey(e){
  if (!active) return;
  var t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
  if (e.key === 'ArrowRight'){ active.go(1); }
  else if (e.key === 'ArrowLeft'){ active.go(-1); }
  else if (e.key === 'Escape' && active.lbOpen()){ active.closeLb(); }
}

function mount(el, opts){
  injectCSS();
  var slides = (opts && opts.slides) || [];
  if (!el || !slides.length) return null;
  var title = (opts && opts.title) || 'Explainer';
  var notes = (opts && opts.notes) || null;
  if (notes && !notes.length) notes = null;
  var i = 0, lb = null;

  el.innerHTML =
    '<div class="sv" role="region" aria-roledescription="carousel" aria-label="' + title + ' — slides">' +
      '<img class="sv-img" alt="">' +
      '<button class="sv-arr sv-prev" aria-label="Previous slide">&#8592;</button>' +
      '<button class="sv-arr sv-next" aria-label="Next slide">&#8594;</button>' +
      '<button class="sv-zoom" aria-label="Enlarge slide">&#10530; Enlarge</button>' +
    '</div>' +
    '<div class="sv-bar">' +
      '<span class="sv-count" aria-live="polite"></span>' +
      '<div class="sv-dots"></div>' +
      '<span class="sv-hint">swipe, or &#8592; &#8594;</span>' +
    '</div>' +
    (notes ? '<p class="sv-note" aria-live="polite"></p>' : '');

  var box   = el.querySelector('.sv');
  var img   = el.querySelector('.sv-img');
  var prev  = el.querySelector('.sv-prev');
  var next  = el.querySelector('.sv-next');
  var count = el.querySelector('.sv-count');
  var dots  = el.querySelector('.sv-dots');
  var note  = el.querySelector('.sv-note');

  slides.forEach(function(_, d){
    var b = document.createElement('button');
    b.className = 'sv-dot';
    b.setAttribute('aria-label', 'Go to slide ' + (d + 1));
    b.onclick = function(){ show(d, d > i ? 1 : -1); };
    dots.appendChild(b);
  });

  /* Hold each preloaded Image in `warmed` — a bare `new Image()` inside the function
     goes out of scope immediately and Chrome can collect it mid-fetch, so the neighbour
     wasn't reliably warm and the picture lagged a beat behind the caption/counter. */
  var warmed = [];
  function preload(n){
    if (n >= 0 && n < slides.length && !warmed[n]){
      var p = new Image();
      p.src = slides[n];
      warmed[n] = p;
    }
  }

  function show(n, dir){
    i = Math.max(0, Math.min(n, slides.length - 1));
    img.src = slides[i];
    img.alt = 'Slide ' + (i + 1) + ' of ' + slides.length + ' — ' + title;
    img.classList.remove('sv-in-r', 'sv-in-l');
    void img.offsetWidth; /* restart the css animation */
    img.classList.add(dir < 0 ? 'sv-in-l' : 'sv-in-r');
    count.textContent = (i + 1) + ' / ' + slides.length;
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
    [].forEach.call(dots.children, function(d, k){ d.classList.toggle('on', k === i); });
    if (note){
      note.innerHTML = notes[i] || '';
      note.classList.remove('sv-note-in');
      void note.offsetWidth; /* restart the css animation */
      note.classList.add('sv-note-in');
    }
    if (lb){
      lb.img.src = slides[i];
      lb.img.alt = img.alt;
      lb.count.textContent = count.textContent;
      lb.prev.disabled = prev.disabled;
      lb.next.disabled = next.disabled;
    }
    preload(i + 1); preload(i - 1);
  }

  function go(d){ show(i + d, d); }

  /* swipe — pointer events cover touch + mouse drag */
  function bindSwipe(surface, tapAction){
    var x0 = null, y0 = null;
    surface.addEventListener('pointerdown', function(e){ x0 = e.clientX; y0 = e.clientY; });
    surface.addEventListener('pointerup', function(e){
      if (x0 === null) return;
      var dx = e.clientX - x0, dy = e.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.4){ go(dx < 0 ? 1 : -1); }
      else if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && tapAction){ tapAction(e); }
    });
  }

  /* lightbox — tap/click the slide to read it full-screen (matters on mobile) */
  function openLb(){
    if (lb) return;
    var o = document.createElement('div');
    o.className = 'sv-lb';
    o.innerHTML =
      '<img alt="">' +
      '<button class="sv-arr sv-prev" aria-label="Previous slide">&#8592;</button>' +
      '<button class="sv-arr sv-next" aria-label="Next slide">&#8594;</button>' +
      '<button class="sv-x" aria-label="Close">&#10005;</button>' +
      '<span class="sv-count"></span>';
    document.body.appendChild(o);
    lb = {
      el: o,
      img: o.querySelector('img'),
      prev: o.querySelector('.sv-prev'),
      next: o.querySelector('.sv-next'),
      count: o.querySelector('.sv-count')
    };
    lb.prev.onclick = function(e){ e.stopPropagation(); go(-1); };
    lb.next.onclick = function(e){ e.stopPropagation(); go(1); };
    o.querySelector('.sv-x').onclick = closeLb;
    o.addEventListener('click', function(e){ if (e.target === o) closeLb(); });
    bindSwipe(lb.img, null);
    document.body.style.overflow = 'hidden';
    show(i, 1);
  }

  function closeLb(){
    if (!lb) return;
    lb.el.remove();
    lb = null;
    document.body.style.overflow = '';
  }

  prev.onclick = function(){ go(-1); };
  next.onclick = function(){ go(1); };
  el.querySelector('.sv-zoom').onclick = function(e){ e.stopPropagation(); openLb(); };
  bindSwipe(box, function(e){ if (e.target === img) openLb(); });

  if (!keysBound){ document.addEventListener('keydown', onKey); keysBound = true; }
  active = { go: go, lbOpen: function(){ return !!lb; }, closeLb: closeLb };

  show(0, 1);
  return active;
}

window.AIEBSlides = { mount: mount };
})();
