// Initialize Lucide Icons
lucide.createIcons();

// 1. Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-slate-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'py-4');
        navbar.classList.remove('bg-transparent', 'py-6');
    } else {
        navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'py-4');
        navbar.classList.add('bg-transparent', 'py-6');
    }
});

// 2. Scroll Reveal Animation Logic
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// 3. Dynamic IP Pricing (India = INR, Rest = USD)
fetch('[https://ipapi.co/json/](https://ipapi.co/json/)')
    .then(res => res.json())
    .then(data => {
        if (data.country_code === 'IN') {
            document.querySelectorAll('.price-usd').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.price-usd').forEach(el => el.classList.remove('block'));
            document.querySelectorAll('.price-inr').forEach(el => el.classList.remove('hidden'));
            document.querySelectorAll('.price-inr').forEach(el => el.classList.add('block'));
        }
    })
    .catch(err => console.log('IP Fetch failed'));

// 4. AI Chatbot Logic
const chatBtn = document.getElementById('ai-chat-btn');
const chatWindow = document.getElementById('ai-chat-window');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatOptions = document.getElementById('chat-options');
const typingIndicator = document.getElementById('typing-indicator');

let chatStep = 0;

chatBtn.addEventListener('click', () => {
    chatWindow.classList.remove('scale-0', 'opacity-0', 'pointer-events-none');
    chatBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    if(chatStep === 0) startConversation();
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.add('scale-0', 'opacity-0', 'pointer-events-none');
    chatBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
});

function appendMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${sender === 'ai' ? 'bg-slate-800 text-gray-200 self-start rounded-tl-sm border border-white/5' : 'bg-cyan-600 text-white self-end rounded-tr-sm shadow-md'}`;
    div.innerText = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateAIResponse(text, delay = 1000, callback = null) {
    chatOptions.innerHTML = '';
    typingIndicator.classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    setTimeout(() => {
        typingIndicator.classList.add('hidden');
        appendMessage(text, 'ai');
        if(callback) callback();
    }, delay);
}

function showOptions(step) {
    chatOptions.innerHTML = '';
    if(step === 1) {
        chatOptions.innerHTML = `
            <button onclick="handleUserReply('Video Ads', 2)" class="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-sm font-semibold transition-colors">Video Ads</button>
            <button onclick="handleUserReply('Short Form Content', 2)" class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-semibold transition-colors">Short Form Content</button>
            <button onclick="handleUserReply('AI Videos', 2)" class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-semibold transition-colors">AI Videos</button>
        `;
    } else if(step === 2) {
        chatOptions.innerHTML = `
            <button onclick="handleUserReply('Low Sales / Bad ROAS', 3)" class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-semibold transition-colors">Low Sales / Bad ROAS</button>
            <button onclick="handleUserReply('Low Engagement', 3)" class="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-sm font-semibold transition-colors">Low Engagement</button>
            <button onclick="handleUserReply('Need more volume', 3)" class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-semibold transition-colors">Need more volume</button>
        `;
    } else if(step === 3) {
        chatOptions.innerHTML = `
            <a href="[https://www.upwork.com/freelancers/~01064a0e6a2c24bf97](https://www.upwork.com/freelancers/~01064a0e6a2c24bf97)" target="_blank" class="w-full py-3 rounded-xl bg-[#14a800] hover:bg-[#14a800]/90 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(20,168,0,0.3)]">
                Secure Payment via Upwork
            </a>
            <a href="#pricing" onclick="document.getElementById('close-chat').click()" class="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors text-center mt-2 block">
                View Pricing Packages
            </a>
        `;
    }
}

window.handleUserReply = function(text, nextStep) {
    appendMessage(text, 'user');
    chatStep = nextStep;
    
    if(nextStep === 2) {
        simulateAIResponse("Awesome! And what's the biggest challenge you're facing with your content or ads?", 1000, () => showOptions(2));
    } else if(nextStep === 3) {
        simulateAIResponse("I understand completely. Usually, that means we need to fix the visual hooks and editing pacing to grab attention instantly.", 1000, () => {
            simulateAIResponse("I highly recommend checking out our Growth package. Plus, you can order safely via Upwork for full buyer protection. Want to see the packages?", 2000, () => showOptions(3));
        });
    }
};

function startConversation() {
    chatStep = 1;
    simulateAIResponse("Hey! 👋 Thanks for visiting. What type of videos are you looking to create right now?", 1000, () => showOptions(1));
}

// Auto Open Chat after 5s
setTimeout(() => {
    if(chatStep === 0) chatBtn.click();
}, 5000);
