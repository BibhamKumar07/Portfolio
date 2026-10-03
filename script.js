document.getElementById('year').textContent = new Date().getFullYear();

// Smooth anchors (with offset)
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const el = document.querySelector(href);
            if (!el) return;
            const y = el.getBoundingClientRect().top + window.scrollY - 18;
            window.scrollTo({ top: y, behavior: 'smooth' });
            closeMobileNav();
        }
    });
});
// === Responsive Nav Toggle ===
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close menu when a link is clicked (mobile UX)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// Portrait tilt (mouse + touch)
(function () {
    const stage = document.querySelector('.profile-stage');
    const portrait = document.querySelector('.portrait');
    const card = document.querySelector('.profile-card');
    if (!stage || !portrait || !card) return;
    function move(clientX, clientY) {
        const r = stage.getBoundingClientRect();
        const x = (clientX - r.left) / r.width - 0.5;
        const y = (clientY - r.top) / r.height - 0.5;
        const rotY = x * 14;
        const rotX = -y * 10;
        portrait.style.transform = `translateZ(18px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.02)`;
        card.style.transform = `translateZ(0px) rotateY(${rotY / 6}deg) rotateX(${rotX / 6}deg)`;
    }
    stage.addEventListener('mousemove', e => move(e.clientX, e.clientY));
    stage.addEventListener('touchmove', e => { if (e.touches && e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    stage.addEventListener('mouseleave', () => { portrait.style.transform = 'none'; card.style.transform = 'none'; });
})();

// Aura parallax on scroll
(function () {
    const a1 = document.querySelector('.a1'); const a2 = document.querySelector('.a2');
    if (!a1 || !a2) return;
    window.addEventListener('scroll', () => {
        const t = window.scrollY;
        a1.style.transform = `translateY(${t * -0.02}px) translateX(${t * -0.01}px)`;
        a2.style.transform = `translateY(${t * -0.03}px) translateX(${t * 0.01}px)`;
    }, { passive: true });
})();

// Scroll reveal
(function () {
    const items = document.querySelectorAll('section, .project, .hero-card');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.transition = 'transform 700ms cubic-bezier(.2,.9,.3,1), opacity 700ms';
                e.target.style.transform = 'translateY(0px) scale(1)';
                e.target.style.opacity = 1;
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach(it => {
        it.style.transform = 'translateY(18px) scale(.996)';
        it.style.opacity = 0;
        io.observe(it);
    });
})();

// Project modal (accessible)
  // Initialize likes from localStorage
  document.querySelectorAll(".like-btn").forEach(button => {
    const projectId = button.getAttribute("data-id");
    const storedLikes = localStorage.getItem(`likes_${projectId}`) || 0;
    button.querySelector(".like-count").textContent = storedLikes;

    button.addEventListener("click", () => {
      let count = parseInt(localStorage.getItem(`likes_${projectId}`) || 0);
      count++;
      localStorage.setItem(`likes_${projectId}`, count);
      button.querySelector(".like-count").textContent = count;
      button.classList.add("liked");
    });
  });
// Skill bar animation when visible
(function () {
    const boxes = document.querySelectorAll('.skill-box');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.progress-bar');
                bars.forEach(bar => {
                    const val = bar.dataset.value || 0;
                    bar.style.width = val + '%';
                    bar.animate([{ boxShadow: '0 0 0 rgba(0,0,0,0)' }, { boxShadow: '0 0 18px rgba(123,97,255,0.08)' }, { boxShadow: '0 0 0 rgba(0,0,0,0)' }], { duration: 900, iterations: 1 });
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.28 });
    boxes.forEach(b => obs.observe(b));
})();

// Contact form (demo)
function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    if (!name || !email || !msg) { alert('Please fill name, email and message.'); return; }
    alert(`Thanks ${name}! Message demo sent. Opening your mail client...`);
    const subject = encodeURIComponent(document.getElementById('subject').value || 'Contact from portfolio');
    const body = encodeURIComponent(`Hi, my name is ${name}.\n\n${msg}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:bibhamkumar16@gmail.com?subject=${subject}&body=${body}`;
    e.target.reset();
}

// Keyboard shortcut 'c' to focus contact name
window.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey && !e.altKey) { const n = document.getElementById('name'); if (n) { n.focus(); n.select(); } } });

// Accessibility: focus-visible behavior
(function () {
    function handleFirstTab(e) { if (e.key === 'Tab') { document.documentElement.classList.add('show-focus'); window.removeEventListener('keydown', handleFirstTab); } }
    window.addEventListener('mousedown', () => { document.documentElement.classList.remove('show-focus'); window.addEventListener('keydown', handleFirstTab); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Tab') document.documentElement.classList.add('show-focus'); });
})();

var typed = new Typed('#element', {
    strings: [' Web Devloper', 'Web Designer', 'Software Devloper'],
    typeSpeed: 100,
});

