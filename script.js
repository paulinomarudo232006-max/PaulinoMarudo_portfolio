(function(){
  var root=document.documentElement, btn=document.getElementById('theme');
  function dark(){return root.dataset.theme==='dark'||(!root.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches)}
  function label(){btn.textContent=dark()?'Light mode':'Dark mode'}
  btn.addEventListener('click',function(){root.dataset.theme=dark()?'light':'dark';label()});
  label();
  document.getElementById('yr').textContent=new Date().getFullYear();

  var links=[].slice.call(document.querySelectorAll('nav ul a'));
  var obs=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  ['home','about','projects','contact'].forEach(function(id){obs.observe(document.getElementById(id))});

  document.getElementById('form').addEventListener('submit',function(ev){
    ev.preventDefault();
    var f=ev.target,out=document.getElementById('msg');
    if(!f.name.value.trim()||!/^\S+@\S+\.\S+$/.test(f.email.value)||!f.message.value.trim()){
      out.textContent='Please enter your name, a valid email, and a message.';return;
    }
    var body=encodeURIComponent(f.message.value+'\n\nFrom: '+f.name.value+' ('+f.email.value+')');
    location.href='mailto:paulino.marudo232006@gmail.com?subject='+encodeURIComponent('Portfolio message from '+f.name.value)+'&body='+body;
    out.textContent='Opening your email app. Thank you for reaching out!';
  });
  var resumeDialog=document.getElementById('resumeModal');
document.getElementById('viewResume').addEventListener('click',function(e){e.preventDefault();resumeDialog.showModal()});
document.getElementById('closeResume').addEventListener('click',function(){resumeDialog.close()});
resumeDialog.addEventListener('click',function(e){if(e.target===resumeDialog)resumeDialog.close()});
})();
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr=Math.min(window.devicePixelRatio||1,2);

  function galaxy(c){
    var ctx=c.getContext('2d'), stars=[], shots=[], w=0, h=0;
    function size(){
      var r=c.parentNode.getBoundingClientRect();
      w=r.width; h=r.height;
      c.width=w*dpr; c.height=h*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.round(w*h/6000); stars=[];
      for(var i=0;i<n;i++){
        stars.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+.2,p:Math.random()*6.28,s:Math.random()*.02+.005});
      }
    }
    function shoot(){
      shots.push({x:Math.random()*w*.8+w*.2,y:Math.random()*h*.4,vx:-(6+Math.random()*4),vy:3+Math.random()*3,life:1});
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      stars.forEach(function(s){
        s.p+=s.s;
        ctx.globalAlpha=.4+.6*Math.abs(Math.sin(s.p));
        ctx.fillStyle='#fff';
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.28); ctx.fill();
      });
      ctx.globalAlpha=1;
      shots.forEach(function(s){
        var x2=s.x-s.vx*8, y2=s.y-s.vy*8;
        var g=ctx.createLinearGradient(s.x,s.y,x2,y2);
        g.addColorStop(0,'rgba(255,255,255,'+s.life+')');
        g.addColorStop(1,'rgba(255,255,255,0)');
        ctx.strokeStyle=g; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(x2,y2); ctx.stroke();
        s.x+=s.vx; s.y+=s.vy; s.life-=.012;
      });
      shots=shots.filter(function(s){return s.life>0});
      if(Math.random()<.008 && shots.length<1) shoot();
      if(!reduce) requestAnimationFrame(draw);
    }
       size(); draw();
    if(window.ResizeObserver){new ResizeObserver(size).observe(c.parentNode)}
    else{addEventListener('resize',size)}
  }

  [].slice.call(document.querySelectorAll('canvas.galaxy')).forEach(galaxy);
})();
(function(){
  var dlg=document.getElementById('certModal'), img=document.getElementById('certImg');
  [].slice.call(document.querySelectorAll('.cert-card')).forEach(function(card){
    card.addEventListener('click',function(){
      img.src=card.dataset.img;
      img.alt=card.dataset.alt;
      dlg.showModal();
    });
  });
  document.getElementById('closeCert').addEventListener('click',function(){dlg.close()});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
})();
(function(){
  document.documentElement.classList.add('js');
  var items=[].slice.call(document.querySelectorAll('.facts li,.resume-bar,.project,.cert-card,.profile,.about-text h2'));
  items.forEach(function(el){
    el.classList.add('reveal');
    var i=[].indexOf.call(el.parentNode.children,el);
    el.style.setProperty('--d',Math.min(i,5)*0.1+'s');
  });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
    });
  },{threshold:.15});
  items.forEach(function(el){io.observe(el)});
})();