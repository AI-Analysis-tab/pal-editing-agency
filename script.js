// CURSOR
const C=document.getElementById('cur'),CR=document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
if(window.matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;C.style.transform=`translate(${mx-5}px,${my-5}px)`});
  (function a(){rx+=(mx-rx-16)*.14;ry+=(my-ry-16)*.14;CR.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(a)})();
  document.querySelectorAll('a,button,.sc,.pi,.pc').forEach(el=>{
    el.addEventListener('mouseenter',()=>{C.classList.add('h');CR.classList.add('h')});
    el.addEventListener('mouseleave',()=>{C.classList.remove('h');CR.classList.remove('h')});
  });
}

// NAV SCROLL
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('sc',scrollY>45),{passive:true});

// MOBILE MENU
const ham=document.getElementById('ham'),mob=document.getElementById('mob');
ham.addEventListener('click',()=>{mob.classList.toggle('open');ham.classList.toggle('open')});
document.getElementById('mob-x').addEventListener('click',()=>{mob.classList.remove('open');ham.classList.remove('open')});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mob.classList.remove('open');ham.classList.remove('open')}));

// REVEAL
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.1});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

// PORTFOLIO ITEMS
const po=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});
document.querySelectorAll('.pi').forEach((el,i)=>{el.style.transitionDelay=(i*.09)+'s';po.observe(el)});

// PORTFOLIO FILTER
function fp(cat,btn){
  document.querySelectorAll('.tb').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.pi').forEach(item=>{
    const show=cat==='all'||item.dataset.cat===cat;
    item.style.display=show?'':'none';
    if(show)setTimeout(()=>item.classList.add('on'),30);
    else item.classList.remove('on');
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

// CURRENCY
const CURR={
  USD:{sym:'$',a:['199','499','1,999'],p:['/project','/project','/mo']},
  INR:{sym:'₹',a:['16,499','41,499','1,66,499'],p:['/project','/project','/mo']}
};
function setC(c,src){
  const p=CURR[c];
  const fade=el=>{el.style.transition='opacity .28s';el.style.opacity='0';setTimeout(()=>{el.style.opacity='1'},260)};
  document.querySelectorAll('.ps').forEach(el=>{fade(el);setTimeout(()=>el.textContent=p.sym,130)});
  document.querySelectorAll('.pa').forEach((el,i)=>{fade(el);setTimeout(()=>el.textContent=p.a[i],130)});
  document.querySelectorAll('.pp-p').forEach((el,i)=>{fade(el);setTimeout(()=>el.textContent=p.p[i],130)});
  const bi=document.getElementById('bi'),bu=document.getElementById('bu');
  const on='background:linear-gradient(135deg,#00c8ff,#8b5cf6);color:#fff';
  const off='background:transparent;color:#7a7a9a';
  bi.style.cssText=c==='INR'?on:off;
  bu.style.cssText=c==='USD'?on:off;
  const loc=document.getElementById('cloc');
  loc.innerHTML=c==='INR'?'📍 India — Showing <strong>₹ INR</strong> prices':`🌐 ${src&&src!=='auto'?'':'Global — '}Showing <strong>$ USD</strong> prices`;
  loc.style.color=c==='INR'?'var(--blue)':'';
}
async function detectC(){
  try{const r=await fetch('https://ipapi.co/json/');const d=await r.json();
    setC(d.country_code==='IN'?'INR':'USD','auto');
    if(d.country_code!=='IN'){const loc=document.getElementById('cloc');loc.innerHTML=`🌐 ${d.country_name||'Global'} — Showing <strong>$ USD</strong> prices`}
  }catch(e){setC('USD','auto')}
}
detectC();

// CHAT - Smart AI assistant
let chatOpen=false;
function toggleChat(){
  chatOpen=!chatOpen;
  document.getElementById('cpanel').classList.toggle('open',chatOpen);
  document.getElementById('cnotif').style.display='none';
}
function addMsg(t,type){
  const m=document.createElement('div');m.className=`cm ${type}`;m.textContent=t;
  const b=document.getElementById('cbody');b.appendChild(m);b.scrollTop=b.scrollHeight;
}
// Hide quick replies after first use
function hideQR(){document.getElementById('cqr').style.display='none'}

// Smart conversation flow
const botFlow={
  greeting:["👋 Hey! I'm here to help. What kind of video content do you need?"],
  ads:["Great choice! 🎬 Video ads are perfect for Meta, TikTok, and YouTube.\n\nFor a single high-converting ad, I'd recommend our **Starter ($199)** or **Growth ($499)** package.\n\nWhat's your main goal — more sales or more views?"],
  ai:["Amazing! 🤖 AI video is our most unique service.\n\nWe create AI avatar videos, AI voiceovers, and script-to-video content.\n\nThis is included in the **Growth ($499)** package. Want to see examples? Check our portfolio above!"],
  shortform:["📱 Short-form content is what goes viral!\n\nWe specialize in fast-paced reels, TikTok edits, and YouTube Shorts with subtitles.\n\nStarting from **$199/video**. What platform are you focused on?"],
  price:["Here's our pricing:\n\n💠 Starter — $199 (₹16,499 in India)\n✨ Growth — $499 (₹41,499)\n🏢 Agency — $1,999/mo\n\nAll payments are secure via Upwork. Which package fits your needs?"],
  sales:["For boosting sales, I'd recommend starting with a **video ad** — direct response style with a strong hook.\n\nOur Growth package ($499) includes unlimited revisions + all platform exports.\n\nReady to start? → upwork.com/freelancers/~01064a0e6a2c24bf97"],
  engagement:["For better engagement, **short-form content** is king right now.\n\nFast cuts, captions, trending audio — we handle everything.\n\nStarter package starts at just $199. Want to try one video first?"],
  upwork:["✅ You can hire us safely via Upwork — payments are 100% protected.\n\n👉 Profile: upwork.com/freelancers/~01064a0e6a2c24bf97\n\nStart with a small test project — no risk!"],
  default:["That's a great question! Let me help you find the right service.\n\nCan you tell me: are you looking for more sales, more views, or brand awareness?","I'd love to help! Email us at Palagencyofficial@gmail.com or hire directly on Upwork for the fastest response.","Great! To recommend the best package, tell me: what platform are you posting on — Meta, TikTok, or YouTube?"]
};
function qr(type){
  hideQR();
  addMsg(type,'user');
  const map={'Video Ads':'ads','AI Video':'ai','Short Form':'shortform','Pricing':'price'};
  setTimeout(()=>typeBot(botFlow[map[type]]||botFlow.default),600);
}
function typeBot(arr){
  const msg=Array.isArray(arr)?arr[Math.floor(Math.random()*arr.length)]:arr;
  addMsg('...','bot');
  const b=document.getElementById('cbody');
  setTimeout(()=>{b.removeChild(b.lastChild);addMsg(msg,'bot')},700);
}
function getBotReply(input){
  const l=input.toLowerCase();
  if(l.match(/video ad|advertisement|ad |commercial/)) return botFlow.ads;
  if(l.match(/ai|avatar|artificial/)) return botFlow.ai;
  if(l.match(/short|reel|tiktok|shorts|instagram/)) return botFlow.shortform;
  if(l.match(/price|cost|how much|rate|package/)) return botFlow.price;
  if(l.match(/sale|revenue|convert|buy|purchase/)) return botFlow.sales;
  if(l.match(/view|engag|watch|follower|subscriber/)) return botFlow.engagement;
  if(l.match(/upwork|hire|order|start/)) return botFlow.upwork;
  return botFlow.default;
}
function sendMsg(){
  const inp=document.getElementById('cinp'),t=inp.value.trim();
  if(!t)return;
  hideQR();addMsg(t,'user');inp.value='';
  setTimeout(()=>typeBot(getBotReply(t)),500);
}
document.getElementById('csend').addEventListener('click',sendMsg);
document.getElementById('cinp').addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg()});

// ===== TOOLS SECTION - stagger reveal =====
const toolObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.tool-card');
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity .5s ease, transform .5s ease, border-color .35s, box-shadow .35s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      });
      toolObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tools-row').forEach(row => {
  row.querySelectorAll('.tool-card').forEach(c => { c.style.opacity = '0'; });
  toolObs.observe(row);
});
