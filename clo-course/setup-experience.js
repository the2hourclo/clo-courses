/* Presentation adapter: gives the setup wizard the same shell as every checkpoint. */
(function () {
  'use strict';

  var COMMUNITY = 'https://www.polynet.ai/c/ai-employee-builders';
  var mounted = false;

  function titleFor(step) {
    if (step.virtual === 'claim') return 'Confirm your access';
    var el = step.el && document.getElementById(step.el);
    var title = el && el.querySelector('.step-t, .card-title, h1, h2, h3, strong');
    return title ? title.textContent.trim() : 'Complete this setup step';
  }

  function trackLabel() {
    return window.wizTrackName === 'cowork' ? 'Claude Cowork'
      : window.wizTrackName === 'codex' ? 'Codex'
      : window.wizTrackName === 'cc' ? 'Claude Code'
      : 'Choose your build app';
  }

  function visibleStepId() {
    var visible = document.querySelector('#doc-content .wiz-visible[id]');
    return visible ? visible.id : '';
  }

  function renderRail() {
    var list = document.querySelector('.setup-rail-steps');
    if (!list) return;
    var progress = document.querySelector('.setup-progress-label');
    var subtitle = document.querySelector('.setup-rail-subtitle');
    var mobileTitle = document.querySelector('.setup-mobile-title');
    var mobileCount = document.querySelector('.setup-mobile-count');
    var mobileDots = document.querySelector('.setup-mobile-dots');
    var currentId = visibleStepId();
    var steps = [];
    try { steps = window.wizTrackName && typeof window.wizSteps === 'function' ? window.wizSteps() : []; } catch (e) {}

    if (subtitle) subtitle.textContent = trackLabel();
    list.replaceChildren();

    if (!steps.length) {
      var choose = document.createElement('div');
      choose.className = 'setup-rail-step active';
      choose.setAttribute('aria-current', 'step');
      choose.innerHTML = '<span class="n">1</span><span><b>Choose where you\u2019ll build</b><small>Cowork, Claude Code, or Codex</small></span>';
      list.appendChild(choose);
      if (progress) progress.textContent = 'Choose your build app';
      if (mobileTitle) mobileTitle.textContent = 'Choose where you\u2019ll build';
      if (mobileCount) mobileCount.textContent = 'Start here';
      var emptySurface = document.querySelector('.setup-mobile-surface-select');
      if (emptySurface) emptySurface.value = '';
      var emptyDock = document.querySelector('.setup-mobile-dock');
      if (emptyDock) emptyDock.hidden = true;
      return;
    }
    var mobileDock = document.querySelector('.setup-mobile-dock');
    if (mobileDock) mobileDock.hidden = false;

    var activeIndex = steps.findIndex(function (step) { return step.el === currentId; });
    if (activeIndex < 0 && typeof window.wizCurIdx === 'number') activeIndex = Math.min(window.wizCurIdx, steps.length - 1);
    var allDone = steps.every(function (step) { try { return step.isDone(); } catch (e) { return false; } });

    steps.forEach(function (step, index) {
      var done = false;
      try { done = step.isDone(); } catch (e) {}
      var active = !allDone && index === activeIndex;
      var item = document.createElement('div');
      item.className = 'setup-rail-step ' + (active ? 'active' : done ? 'complete' : 'upcoming');
      if (active) item.setAttribute('aria-current', 'step');
      var number = document.createElement('span');
      number.className = 'n';
      number.textContent = done && !active ? '\u2713' : String(index + 1);
      var copy = document.createElement('span');
      var title = document.createElement('b');
      title.textContent = titleFor(step);
      var meta = document.createElement('small');
      meta.textContent = step.connect ? 'Connect \u00b7 required' : (step.min ? '~' + step.min + ' min' : 'Access check');
      copy.appendChild(title);
      copy.appendChild(meta);
      item.appendChild(number);
      item.appendChild(copy);
      list.appendChild(item);
    });

    if (progress) {
      progress.textContent = allDone ? 'Setup complete' : 'Step ' + (activeIndex + 1) + ' of ' + steps.length + ' \u00b7 ' + trackLabel();
    }
    if (mobileTitle) mobileTitle.textContent = allDone ? 'Setup complete' : titleFor(steps[activeIndex] || {});
    if (mobileCount) mobileCount.textContent = allDone ? 'Done' : 'Step ' + (activeIndex + 1) + ' of ' + steps.length;
    if (mobileDots) {
      mobileDots.replaceChildren();
      steps.forEach(function (step, index) {
        var dot = document.createElement('span');
        var done = false;
        try { done = step.isDone(); } catch (e) {}
        dot.className = index === activeIndex && !allDone ? 'active' : done ? 'complete' : 'upcoming';
        mobileDots.appendChild(dot);
      });
    }
    var mobileSurface = document.querySelector('.setup-mobile-surface-select');
    if (mobileSurface && window.wizTrackName) mobileSurface.value = window.wizTrackName;
    var sourceBack = document.getElementById('wizBackBtn');
    var sourceNext = document.getElementById('wizNextBtn');
    var dockBack = document.querySelector('.setup-mobile-dock .dock-back');
    var dockNext = document.querySelector('.setup-mobile-dock .dock-next');
    if (dockBack) dockBack.disabled = !!(sourceBack && sourceBack.disabled);
    if (dockNext) {
      dockNext.disabled = !!(sourceNext && sourceNext.disabled);
      dockNext.hidden = !!(sourceNext && sourceNext.hidden);
      dockNext.textContent = sourceNext ? sourceNext.textContent.trim() : 'Next \u2192';
    }
  }

  function mount() {
    if (mounted || document.body.classList.contains('activation-mode')) return;
    var doc = document.getElementById('doc-content');
    var inner = document.getElementById('cloInner');
    if (!doc || !inner) return;
    mounted = true;
    document.body.classList.add('aieb-redesign', 'aieb-setup');

    var globalBrand = document.querySelector('.clo-logo');
    if (globalBrand) {
      globalBrand.href = COMMUNITY;
      globalBrand.target = '_blank';
      globalBrand.rel = 'noopener';
      var wordmark = globalBrand.querySelector('span');
      if (wordmark) wordmark.textContent = 'AI Employee Builders';
    }

    var win = document.createElement('section');
    win.className = 'setup-window';
    win.setAttribute('aria-label', 'Get set up checkpoint');
    win.innerHTML = '<div class="setup-windowbar"><div class="setup-brand"><img src="assets/aieb-avatar-180.png" alt=""><span>AI Employee Builder</span></div><div class="setup-progress-label" aria-live="polite"></div></div><div class="setup-grid"><aside class="setup-rail"><span class="setup-rail-label">Your active checkpoint</span><h1>Get set up</h1><p class="setup-rail-subtitle"></p><div class="setup-mobile-summary"><div><span class="setup-mobile-count"></span><b class="setup-mobile-title"></b></div><div class="setup-mobile-dots" aria-hidden="true"></div></div><div class="setup-rail-steps" aria-label="Setup steps"></div><div class="setup-rail-note"><b>Set up once. Build from the Board.</b><span>Your progress is saved as you connect your chosen app.</span></div></aside><main class="setup-main"><label class="setup-mobile-surface"><span>Building in</span><select class="setup-mobile-surface-select" aria-label="Choose where you build"><option value="">Choose an app</option><option value="cowork">Claude Cowork</option><option value="cc">Claude Code</option><option value="codex">Codex</option></select></label></main></div><nav class="setup-mobile-dock" aria-label="Setup navigation"><button type="button" class="dock-back">\u2190 Back</button><button type="button" class="dock-next">Next \u2192</button></nav>';
    var boardBack = document.createElement('a');
    boardBack.className = 'setup-back';
    boardBack.href = 'ai-employee-board.html';
    boardBack.textContent = '\u2190 Back to board';
    inner.appendChild(boardBack);
    inner.appendChild(win);
    win.querySelector('.setup-main').appendChild(doc);
    win.querySelector('.setup-mobile-surface-select').addEventListener('change', function () {
      if (!this.value) return;
      applyTrack(this.value, false); wizTrackName = this.value; wizPos = null; wizRender();
    });
    win.querySelector('.setup-mobile-dock .dock-back').addEventListener('click', function () {
      var source = document.getElementById('wizBackBtn'); if (source) source.click();
    });
    win.querySelector('.setup-mobile-dock .dock-next').addEventListener('click', function () {
      var source = document.getElementById('wizNextBtn'); if (source && !source.disabled) source.click();
    });

    if (typeof window.wizRender === 'function') {
      var originalRender = window.wizRender;
      window.wizRender = function () {
        var result = originalRender.apply(this, arguments);
        window.requestAnimationFrame(renderRail);
        return result;
      };
    }
    renderRail();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
