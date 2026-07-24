/* slides.js — swipeable slide viewer for the checkpoint wizards.
   Drops a slide deck into a wizard step until its video is recorded:
   swipe / arrow keys / edge buttons to navigate, tap the slide to enlarge.
   Usage: give a step  slides:[ 'url1.png', ... ]  and the wizard's render()
   calls  AIEBSlides.mount(el, { slides, title })  after painting the stage.
   Styling follows journey.css (white-excali) and inherits --cp per checkpoint. */
(function(){
'use strict';

var CSS =
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
'@media(max-width:520px){.sv-hint{display:none}}' +
/* lightbox */
'.sv-lb{position:fixed;inset:0;z-index:400;background:rgba(20,20,18,.93);display:flex;align-items:center;justify-content:center;touch-action:pan-y}' +
'.sv-lb img{max-width:94vw;max-height:88vh;border-radius:8px;background:#fff;display:block}' +
'.sv-lb .sv-arr{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.45);color:#fff}' +
'.sv-lb .sv-arr:hover{background:var(--cp,#2D8C3C);border-color:var(--cp,#2D8C3C)}' +
'.sv-lb .sv-prev{left:14px}.sv-lb .sv-next{right:14px}' +
'.sv-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.14);color:#fff;font-size:16px;cursor:pointer;z-index:2}' +
'.sv-x:hover{background:rgba(255,255,255,.3)}' +
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
  var i = 0, lb = null;

  el.innerHTML =
    '<div class="sv" role="region" aria-roledescription="carousel" aria-label="' + title + ' — slides">' +
      '<img class="sv-img" alt="">' +
      '<button class="sv-arr sv-prev" aria-label="Previous slide">&#8592;</button>' +
      '<button class="sv-arr sv-next" aria-label="Next slide">&#8594;</button>' +
    '</div>' +
    '<div class="sv-bar">' +
      '<span class="sv-count" aria-live="polite"></span>' +
      '<div class="sv-dots"></div>' +
      '<span class="sv-hint">swipe, tap to enlarge, or &#8592; &#8594;</span>' +
    '</div>';

  var box   = el.querySelector('.sv');
  var img   = el.querySelector('.sv-img');
  var prev  = el.querySelector('.sv-prev');
  var next  = el.querySelector('.sv-next');
  var count = el.querySelector('.sv-count');
  var dots  = el.querySelector('.sv-dots');

  slides.forEach(function(_, d){
    var b = document.createElement('button');
    b.className = 'sv-dot';
    b.setAttribute('aria-label', 'Go to slide ' + (d + 1));
    b.onclick = function(){ show(d, d > i ? 1 : -1); };
    dots.appendChild(b);
  });

  function preload(n){
    if (n >= 0 && n < slides.length){ var p = new Image(); p.src = slides[n]; }
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
  bindSwipe(box, function(e){ if (e.target === img) openLb(); });

  if (!keysBound){ document.addEventListener('keydown', onKey); keysBound = true; }
  active = { go: go, lbOpen: function(){ return !!lb; }, closeLb: closeLb };

  show(0, 1);
  return active;
}

window.AIEBSlides = { mount: mount };
})();
