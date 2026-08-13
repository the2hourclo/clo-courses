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
    var mobileTitle=document.querySelector('.mobile-current-title');
    var mobileCount=document.querySelector('.mobile-step-count');
    var mobileDots=document.querySelector('.mobile-step-dots');
    if(mobileTitle)mobileTitle.textContent=current>=steps.length?'Checkpoint complete':plainTitle((steps[current]||{}).title);
    if(mobileCount)mobileCount.textContent=current>=steps.length?'Done':'Step '+(current+1)+' of '+steps.length;
    if(mobileDots){
      mobileDots.replaceChildren();
      steps.forEach(function(step,index){
        var dot=document.createElement('span');
        dot.className=index<current?'complete':(index===current&&current<steps.length?'active':'upcoming');
        mobileDots.appendChild(dot);
      });
    }
    var mobileSurface=document.querySelector('.mobile-surface-select');
    if(mobileSurface&&typeof surface==='string')mobileSurface.value=surface;
    var dockNext=document.querySelector('.mobile-course-dock .dock-next');
    if(dockNext)dockNext.textContent=current===steps.length-1?'Finish →':'Next →';
  }
  function mountCheckpoint(){
    var wrap=document.querySelector('.wrap'),stage=document.getElementById('stage');
    if(!wrap||!stage||!window.CONFIG)return;
    document.body.classList.add('aieb-redesign','aieb-checkpoint');
    var surface=wrap.querySelector('.surface-row'),wiz=wrap.querySelector('.wizbar');
    if(!surface||!wiz)return;
    var win=document.createElement('section');win.className='checkpoint-window';win.setAttribute('aria-label',CONFIG.name+' checkpoint');
    var bar=document.createElement('div');bar.className='checkpoint-windowbar';bar.innerHTML='<div class="checkpoint-brand"><img src="assets/aieb-avatar-180.png" alt=""><span>AI Employee Builder</span></div><div class="checkpoint-progress-label" aria-live="polite"></div>';
    var grid=document.createElement('div');grid.className='checkpoint-grid';
    var rail=document.createElement('aside');rail.className='learning-rail';rail.innerHTML='<span class="learning-rail-label">Your active checkpoint</span><h1></h1><div class="mobile-step-summary"><div><span class="mobile-step-count"></span><b class="mobile-current-title"></b></div><div class="mobile-step-dots" aria-hidden="true"></div></div><div class="rail-steps" aria-label="Checkpoint steps"></div><div class="rail-note"><b>No prerequisite course.</b><span>The lesson appears inside the checkpoint where you use it.</span></div>';
    rail.querySelector('h1').textContent=CONFIG.name;
    var main=document.createElement('main');main.className='checkpoint-main';
    var mobileSurface=document.createElement('label');mobileSurface.className='mobile-surface';mobileSurface.innerHTML='<span>Building in</span><select class="mobile-surface-select" aria-label="Choose where you build"><option value="cowork">Cowork</option><option value="claude-code">Claude Code</option><option value="codex">Codex</option></select>';
    mobileSurface.querySelector('select').addEventListener('change',function(){if(typeof setSurface==='function')setSurface(this.value)});
    var dock=document.createElement('nav');dock.className='mobile-course-dock';dock.setAttribute('aria-label','Lesson navigation');dock.innerHTML='<button type="button" class="dock-back">← Back</button><button type="button" class="dock-next">Next →</button>';
    dock.querySelector('.dock-back').addEventListener('click',function(){if(typeof back==='function')back()});
    dock.querySelector('.dock-next').addEventListener('click',function(){if(typeof next==='function')next()});
    wrap.insertBefore(win,surface);win.appendChild(bar);win.appendChild(grid);grid.appendChild(rail);grid.appendChild(main);main.appendChild(mobileSurface);main.appendChild(surface);main.appendChild(wiz);main.appendChild(stage);main.appendChild(dock);
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
