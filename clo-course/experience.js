/* Presentation adapter for the invitation-page course UI. */
(function(){
  'use strict';
  function stepKind(type){
    return {video:'Learn',build:'Build',share:'Share',gate:'Prove'}[type]||'Step';
  }
  function plainTitle(value){
    var decoder=document.createElement('textarea');
    decoder.innerHTML=String(value||'Untitled step');
    return decoder.value;
  }
  function makeRailStep(step,index,current,total){
    var item=document.createElement('div');
    var state=index<current?'complete':(index===current&&current<total?'active':'upcoming');
    item.className='rail-step '+state;
    if(state==='active')item.setAttribute('aria-current','step');
    var number=document.createElement('span');
    number.className='n';
    number.textContent=state==='complete'?'✓':String(index+1);
    var copy=document.createElement('div');
    var title=document.createElement('b');
    title.textContent=plainTitle(step.title);
    var meta=document.createElement('small');
    meta.textContent=stepKind(step.type)+(step.optional?' · Optional':'');
    copy.appendChild(title);copy.appendChild(meta);
    item.appendChild(number);item.appendChild(copy);
    return item;
  }
  function updateRail(){
    if(!window.CONFIG)return;
    var steps=typeof activeSteps==='function'?activeSteps():CONFIG.steps;
    var current=Math.min(typeof pos==='number'?pos:0,steps.length);
    var list=document.querySelector('.rail-steps');
    if(list){
      list.replaceChildren();
      steps.forEach(function(step,index){list.appendChild(makeRailStep(step,index,current,steps.length))});
    }
    var label=document.querySelector('.checkpoint-progress-label');
    if(label){
      label.textContent=current>=steps.length
        ? 'Checkpoint complete'
        : 'Step '+(current+1)+' of '+steps.length+' · '+stepKind((steps[current]||{}).type).toLowerCase();
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
    var rail=document.createElement('aside');rail.className='learning-rail';rail.innerHTML='<span class="learning-rail-label">Your active checkpoint</span><h1></h1><div class="rail-steps" aria-label="Checkpoint steps"></div><div class="rail-note"><b>No prerequisite course.</b><span>The lesson appears inside the checkpoint where you use it.</span></div>';
    rail.querySelector('h1').textContent=CONFIG.name;
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
