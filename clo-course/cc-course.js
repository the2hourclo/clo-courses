/* cc-course.js — shared copy-to-clipboard for module prompt blocks */
(function(){
  function fallback(t){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(a)}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.cc-copy'); if(!b)return;
    e.preventDefault();
    var box=b.closest('.cc-prompt'); var p=box&&box.querySelector('p'); if(!p)return;
    var t=p.innerText.trim();
    var done=function(){b.classList.add('copied');var o=b.textContent;b.textContent='Copied';setTimeout(function(){b.classList.remove('copied');b.textContent=o||'Copy'},1500)};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done).catch(function(){fallback(t);done()})}else{fallback(t);done()}
  });
})();
