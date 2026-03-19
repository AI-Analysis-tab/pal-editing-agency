// ===== HERO CANVAS ANIMATION =====
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Create particles
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6 ? '#8b5cf6' : '#00c8ff'
    });
  }

  // Gradient orbs
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Moving gradient background
    const grad1 = ctx.createRadialGradient(
      W * 0.7 + Math.sin(t * 0.4) * 80, H * 0.3 + Math.cos(t * 0.3) * 60, 0,
      W * 0.7 + Math.sin(t * 0.4) * 80, H * 0.3 + Math.cos(t * 0.3) * 60, W * 0.45
    );
    grad1.addColorStop(0, 'rgba(0,200,255,0.07)');
    grad1.addColorStop(1, 'transparent');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, W, H);

    const grad2 = ctx.createRadialGradient(
      W * 0.2 + Math.cos(t * 0.35) * 70, H * 0.65 + Math.sin(t * 0.4) * 50, 0,
      W * 0.2 + Math.cos(t * 0.35) * 70, H * 0.65 + Math.sin(t * 0.4) * 50, W * 0.38
    );
    grad2.addColorStop(0, 'rgba(139,92,246,0.07)');
    grad2.addColorStop(1, 'transparent');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, W, H);

    // Particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity * (0.7 + 0.3 * Math.sin(t + p.x));
      ctx.fill();
      ctx.globalAlpha = 1;

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });

    // Connecting lines between nearby particles
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00c8ff';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    t += 0.008;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== CUSTOM CURSOR =====
(function() {
  if (!window.matchMedia('(hover:hover)').matches) return;
  const cur = document.getElementById('cur');
  const curR = document.getElementById('cur-r');
  if (!cur || !curR) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
  }, { passive: true });
  (function anim() {
    rx += (mx - rx - 15) * 0.13;
    ry += (my - ry - 15) * 0.13;
    curR.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a,button,.srv-card,.tc,.pc,.port-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('h'); curR.classList.add('h'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('h'); curR.classList.remove('h'); });
  });
})();

// ===== NAVBAR SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('sc', scrollY > 45);
}, { passive: true });

// ===== MOBILE MENU =====
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
const mobX = document.getElementById('mob-x');
function closeMob() { mob.classList.remove('open'); ham.classList.remove('open'); }
ham.addEventListener('click', () => { mob.classList.toggle('open'); ham.classList.toggle('open'); });
mobX.addEventListener('click', closeMob);
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

// ===== REVEAL ON SCROLL =====
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.1 });
document.querySelectorAll('.rev').forEach(el => ro.observe(el));

// ===== PORTFOLIO ITEMS REVEAL =====
const po = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.12 });
document.querySelectorAll('.port-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.08) + 's';
  po.observe(el);
});

// ===== PORTFOLIO FILTER =====
function filterPort(cat, btn) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.port-item').forEach(item => {
    const show = cat === 'all' || item.dataset.cat === cat;
    item.style.display = show ? '' : 'none';
    if (show) setTimeout(() => item.classList.add('on'), 30);
    else item.classList.remove('on');
  });
}

// ===== TOOLS STAGGER REVEAL =====
const toolObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.tc');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.transition = 'all .32s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 55);
      });
      toolObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.tool-grid').forEach(row => {
  row.querySelectorAll('.tc').forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(16px)'; });
  toolObs.observe(row);
});

// ===== HERO STATS COUNTER =====
const statsData = [
  { id: 's1', val: 50, suffix: '+' },
  { id: 's2', val: 10, suffix: '+' },
  { id: 's3', val: 100, suffix: 'K+' },
  { id: 's4', val: 5, suffix: '★' }
];
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statsData.forEach(({ id, val, suffix }) => {
        const el = document.getElementById(id);
        if (!el) return;
        let n = 0;
        const step = val / (1800 / 16);
        const t = setInterval(() => {
          n = Math.min(n + step, val);
          el.textContent = Math.floor(n) + suffix;
          if (n >= val) clearInterval(t);
        }, 16);
      });
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.stats-row');
if (heroStats) statsObs.observe(heroStats);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CURRENCY AUTO-DETECT =====
const CURR = {
  USD: { sym: '$', amounts: ['199', '499', '1,999'], periods: ['/project', '/project', '/mo'] },
  INR: { sym: '₹', amounts: ['16,499', '41,499', '1,66,499'], periods: ['/project', '/project', '/mo'] }
};
function setCurrency(c, src) {
  const p = CURR[c];
  const fade = el => {
    el.style.transition = 'opacity .26s';
    el.style.opacity = '0';
    setTimeout(() => { el.style.opacity = '1'; }, 140);
  };
  document.querySelectorAll('.psym').forEach(el => { fade(el); setTimeout(() => el.textContent = p.sym, 120); });
  document.querySelectorAll('.pval').forEach((el, i) => { fade(el); setTimeout(() => el.textContent = p.amounts[i], 120); });
  document.querySelectorAll('.pperiod').forEach((el, i) => { fade(el); setTimeout(() => el.textContent = p.periods[i], 120); });
  const bi = document.getElementById('btn-inr');
  const bu = document.getElementById('btn-usd');
  const on = 'background:linear-gradient(135deg,#00c8ff,#8b5cf6);color:#fff';
  const off = 'background:transparent;color:#7878a0';
  if (bi && bu) { bi.style.cssText = c === 'INR' ? on : off; bu.style.cssText = c === 'USD' ? on : off; }
  const loc = document.getElementById('curr-loc');
  if (loc) {
    if (c === 'INR') {
      loc.innerHTML = '📍 India — Showing <strong>₹ INR</strong> prices';
      loc.style.color = 'var(--blue)';
    } else {
      const country = (src && src !== 'auto' && src !== 'USD') ? src : 'Global';
      loc.innerHTML = `🌐 ${country} — Showing <strong>$ USD</strong> prices`;
      loc.style.color = '';
    }
  }
}
async function detectCurrency() {
  try {
    const r = await fetch('https://ipapi.co/json/');
    const d = await r.json();
    if (d.country_code === 'IN') setCurrency('INR', 'auto');
    else setCurrency('USD', d.country_name || 'Global');
  } catch (e) { setCurrency('USD', 'auto'); }
}
detectCurrency();

// ===== CHAT WIDGET =====
let chatOpen = false;
function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('cpanel').classList.toggle('open', chatOpen);
  document.getElementById('cnotif').style.display = 'none';
}
function addMsg(text, type) {
  const b = document.getElementById('cbody');
  const m = document.createElement('div');
  m.className = 'cm ' + type;
  m.textContent = text;
  b.appendChild(m);
  b.scrollTop = b.scrollHeight;
}
function hideQR() { const q = document.getElementById('cqr'); if (q) q.style.display = 'none'; }

const botFlow = {
  ads: 'Great choice! 🎬 For video ads, I recommend the Growth package ($499) — unlimited revisions + all platform exports. Want to start? Hire on Upwork or WhatsApp us at +91 97495 50260',
  ai: 'Amazing! 🤖 Our AI video service includes AI avatars, AI voiceovers & script-to-video. Starting from $499. Check portfolio above or hire us on Upwork!',
  shortform: '📱 Short-form is king right now! Fast edits, subtitles, trending style — starting $199. DM us on WhatsApp: +91 97495 50260',
  pricing: '💰 Our pricing:\n• Starter: $199 / ₹16,499\n• Growth: $499 / ₹41,499\n• Agency: $1,999/mo\nAll secure via Upwork escrow!',
  whatsapp: '📱 Message us directly on WhatsApp: +91 97495 50260 — We reply fast!',
  upwork: '✅ Hire us on Upwork for 100% secure payment: upwork.com/freelancers/~01064a0e6a2c24bf97',
  default: [
    'Thanks for reaching out! Tell me — are you looking for video ads, AI content, or short-form reels?',
    'I\'d love to help! What platform are you creating for — Meta, TikTok, or YouTube?',
    'Great! To suggest the right package, tell me: are you a brand, creator, or agency?'
  ]
};
function getReply(input) {
  const l = input.toLowerCase();
  if (l.match(/video ad|ad |advertisement|meta|facebook/)) return botFlow.ads;
  if (l.match(/ai|avatar|artificial|sora|veo|kling/)) return botFlow.ai;
  if (l.match(/short|reel|tiktok|shorts|insta/)) return botFlow.shortform;
  if (l.match(/price|cost|how much|rate|package|₹|\$/)) return botFlow.pricing;
  if (l.match(/whatsapp|phone|call|number/)) return botFlow.whatsapp;
  if (l.match(/upwork|hire|freelan|order/)) return botFlow.upwork;
  const d = botFlow.default;
  return d[Math.floor(Math.random() * d.length)];
}
function typeReply(text) {
  const b = document.getElementById('cbody');
  addMsg('...', 'bot');
  setTimeout(() => {
    b.removeChild(b.lastChild);
    addMsg(text, 'bot');
  }, 650);
}
function qr(type) {
  hideQR();
  addMsg(type, 'user');
  const map = { 'Video Ads': 'ads', 'AI Video': 'ai', 'Pricing': 'pricing', 'WhatsApp': 'whatsapp' };
  setTimeout(() => typeReply(botFlow[map[type]] || botFlow.default[0]), 300);
}
function sendMsg() {
  const inp = document.getElementById('cinp');
  const text = inp.value.trim();
  if (!text) return;
  hideQR();
  addMsg(text, 'user');
  inp.value = '';
  setTimeout(() => typeReply(getReply(text)), 300);
}
const csend = document.getElementById('csend');
const cinp = document.getElementById('cinp');
if (csend) csend.addEventListener('click', sendMsg);
if (cinp) cinp.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
