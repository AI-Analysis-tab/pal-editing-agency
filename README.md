# 🎬 Pal Editing Agency — Website

**Premium Video Editing & AI Content Studio**
> We don't just edit videos — we create content that helps brands grow.

🌐 Live: [palediting.agency](#) | 📧 Palagencyofficial@gmail.com | 🔗 [Upwork Profile](https://www.upwork.com/freelancers/~01064a0e6a2c24bf97)

---

## 📁 File Structure

```
pal-editing-agency/
│
├── index.html          ← Main website (all sections)
├── style.css           ← All CSS styles + animations
├── script.js           ← All JavaScript (cursor, chat, currency, reveal)
├── README.md           ← This file
│
├── /images/            ← All images go here
│   ├── khokon.jpg          ← Your founder photo (replace placeholder)
│   ├── og-image.jpg        ← Social media preview image (1200x630)
│   ├── favicon.ico         ← Browser tab icon
│   └── /tools/             ← Tool logos (optional, uses emoji fallback)
│       ├── veo.svg
│       ├── sora.svg
│       └── ...
│
└── /videos/            ← Optional local demo videos
    ├── hero-bg.mp4         ← Hero background video (optional)
    └── demo-reel.mp4       ← Main demo video (optional)
```

---

## 🚀 How to Deploy

### Option 1: GitHub Pages (Free — Recommended)
```bash
# 1. Go to your GitHub repo → Settings → Pages
# 2. Source: Deploy from branch → main → / (root)
# 3. Your site will be live at: https://yourusername.github.io/pal-editing-agency
```

### Option 2: Netlify (Free — Fastest)
```bash
# Drag & drop the entire folder to netlify.com/drop
# Done — instant live URL
```

### Option 3: Vercel (Free)
```bash
npm i -g vercel
cd pal-editing-agency
vercel
```

---

## 📝 How to Edit Content

### Change Pricing
Open `index.html` → Find the pricing section → Update `data-usd` and `data-inr` values:
```html
<span class="pa" data-usd="199" data-inr="16,499">199</span>
```

### Change Upwork Link
Search for `upwork.com/freelancers/~01064a0e6a2c24bf97` → Replace with your link

### Change Contact Email
Search for `Palagencyofficial@gmail.com` → Replace with your email

### Change Stats
In `script.js` → Find the counter section:
```js
[['s1',50,'+'],[' s2',10,'+'],[' s3',100,'K+'],[' s4',5,'★']]
```
Update numbers to your real stats.

### Add Your Photo
Replace the `K` letter avatar in the About section with a real photo:
```html
<!-- Find this in index.html -->
<div class="founder-photo">K</div>

<!-- Replace with -->
<img src="images/khokon.jpg" alt="Khokon" style="width:80px;height:80px;border-radius:50%;object-fit:cover">
```

### Add WhatsApp Link
In `index.html` → Find `https://wa.me/` → Add your number:
```html
href="https://wa.me/8801XXXXXXXXX"
```

---

## 🎨 Color Customization

In `style.css` → CSS Variables (top of file):
```css
:root {
  --blue: #00c8ff;    /* Neon blue accent */
  --purple: #8b5cf6;  /* Purple accent */
  --pink: #f472b6;    /* Pink accent */
  --bg: #050508;      /* Main background */
}
```

---

## 🛠️ Tools Used (as shown on website)

| Category | Tools |
|----------|-------|
| **AI Video Gen** | Veo 3.1, Sora 2, Kling AI, Seedance 2.0 |
| **AI Image** | Gemini AI, Midjourney, DALL·E 3 |
| **Video Editing** | Premiere Pro, DaVinci Resolve, After Effects, CapCut |
| **AI Coding** | GitHub, Claude, ChatGPT, Cursor AI |
| **Automation** | n8n, Make.com, Google Drive, Slack |

---

## ✅ Features

- [x] Dark neon theme (blue + purple)
- [x] Custom cursor (desktop)
- [x] Animated hero with grid background
- [x] Scrolling marquee banner
- [x] Services section with SVG icons
- [x] Tools showcase (5 categories, 20 tools)
- [x] Portfolio with Google Drive folder embed + filter tabs
- [x] About / Founder section
- [x] 4-step process section
- [x] Pricing with **auto currency detection** (INR for India, USD global)
- [x] Testimonials auto-scroll
- [x] Upwork integration section
- [x] Footer with all links
- [x] Smart AI Chat widget (quick replies + keyword detection)
- [x] Fully responsive (mobile + tablet + desktop)
- [x] Smooth scroll reveal animations
- [x] No external JS libraries (pure vanilla JS)

---

## 📞 Contact

**Khokon** — Founder & Creative Editor  
📧 Palagencyofficial@gmail.com  
🔗 [Upwork Profile](https://www.upwork.com/freelancers/~01064a0e6a2c24bf97)

---

*© 2025 Pal Editing Agency. All rights reserved.*
