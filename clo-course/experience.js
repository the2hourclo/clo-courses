/* Presentation adapter for the invitation-page course UI. */
(function(){
  'use strict';
  function phase(){
    if(!window.CONFIG||!Array.isArray(CONFIG.steps))return'learn';
    var steps=typeof activeSteps==='function'?activeSteps():CONFIG.steps;
    var at=typeof pos==='number'?Math.min(pos,Math.max(0,steps.length-1)):0;
    var type=(steps[at]||{}).type;
    return type==='gate'?'prove':(type==='build'||type==='share'?'build':'learn');
  }
  function updateRail(){
    var p=phase();
    document.querySelectorAll('.rail-step').forEach(function(el){el.classList.toggle('active',el.getAttribute('data-phase')===p)});
    var label=document.querySelector('.checkpoint-progress-label');
    if(label&&window.CONFIG&&typeof activeSteps==='function'){
      var n=activeSteps().length,current=Math.min((typeof pos==='number'?pos:0)+1,n);
      label.textContent='Step '+current+' of '+n+' · '+p;
    }
  }
  function mountCheckpoint(){
    var wrap=document.querySelector('.wrap'),stage=document.getElementById('stage');
    if(!wrap||!stage||!window.CONFIG)return;
    document.body.classList.add('aieb-redesign','aieb-checkpoint');
    var surface=wrap.querySelector('.surface-row'),wiz=wrap.querySelector('.wizbar');
    if(!surface||!wiz)return;
    var win=document.createElement('section');win.className='checkpoint-window';win.setAttribute('aria-label',CONFIG.name+' checkpoint');
    var bar=document.createElement('div');bar.className='checkpoint-windowbar';bar.innerHTML='<div class="checkpoint-brand"><i>AE</i><span>AI Employee Builder</span></div><div class="checkpoint-progress-label" aria-live="polite"></div>';
    var grid=document.createElement('div');grid.className='checkpoint-grid';
    var rail=document.createElement('aside');rail.className='learning-rail';rail.innerHTML='<span class="learning-rail-label">Your active checkpoint</span><h1>'+CONFIG.name+'</h1><div class="rail-steps"><div class="rail-step" data-phase="learn"><span class="n">1</span><div><b>Learn</b><small>See the concept you need now</small></div></div><div class="rail-step" data-phase="build"><span class="n">2</span><div><b>Build</b><small>Use it on one real process</small></div></div><div class="rail-step" data-phase="prove"><span class="n">3</span><div><b>Prove it works</b><small>Run it on real business data</small></div></div></div><div class="rail-note"><b>No prerequisite course.</b><span>The lesson appears inside the checkpoint where you use it.</span></div>';
    var main=document.createElement('main');main.className='checkpoint-main';
    wrap.insertBefore(win,surface);win.appendChild(bar);win.appendChild(grid);grid.appendChild(rail);grid.appendChild(main);main.appendChild(surface);main.appendChild(wiz);main.appendChild(stage);
    updateRail();new MutationObserver(updateRail).observe(stage,{childList:true,subtree:true});
  }
  function mountBoard(){
    var board=document.getElementById('board');if(!board)return;
    document.body.classList.add('aieb-redesign','aieb-board');
    var label=document.querySelector('.map-label');if(label)label.textContent='The full build · each card is one real step inside the course';
    board.setAttribute('aria-label','Your six-stage AI Employee build journey');
  }
  function mountHome(){if(document.querySelector('.home'))document.body.classList.add('aieb-redesign','aieb-home')}
  function mount(){mountBoard();mountHome();mountCheckpoint()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
