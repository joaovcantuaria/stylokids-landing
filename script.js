// ===== Stylo Kids - Landing Page Script =====

document.addEventListener('DOMContentLoaded', () => {
    // ===== Scroll Reveal =====
    const sections = document.querySelectorAll('.about, .team, .mascot-cta, .milestone');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    sections.forEach(section => observer.observe(section));

    // ===== Staggered button entry =====
    const buttons = document.querySelectorAll('.seller-btn');
    buttons.forEach((btn, i) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            btn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateX(0)';
        }, 900 + (i * 120));
    });

    // ===== Confetti on button click =====
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            createConfetti(e.clientX, e.clientY);
        });
    });

    // ===== Parallax on mouse (desktop only) =====
    if (window.matchMedia('(hover: hover) and (min-width: 768px)').matches) {
        const bubbles = document.querySelectorAll('.rb');
        let mouseX = 0, mouseY = 0, rafId = null;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!rafId) rafId = requestAnimationFrame(parallax);
        });
        function parallax() {
            bubbles.forEach((b, i) => {
                const speed = (i % 5 + 1) * 0.008;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                b.style.marginLeft = `${x}px`;
                b.style.marginBottom = `${y}px`;
            });
            rafId = null;
        }
    }

    // ===== Animated counter for 6 anos =====
    const numberEl = document.querySelector('.number-value');
    if (numberEl) {
        const target = 6;
        let counted = false;
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                let current = 0;
                const interval = setInterval(() => {
                    current++;
                    numberEl.textContent = current;
                    if (current >= target) clearInterval(interval);
                }, 200);
            }
        }, { threshold: 0.5 });
        counterObserver.observe(numberEl);
    }

    // ===== Logo click easter egg =====
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            const rect = logo.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            logo.style.animation = 'none';
            logo.offsetHeight;
            logo.style.animation = 'logoEntry 0.6s ease-out';
        });
    }

    // ===== Smooth scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Tilt effect on feature cards =====
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// ===== Confetti =====
function createConfetti(x, y) {
    const colors = ['#E91E8C', '#00B4D8', '#2ECC40', '#F5A623', '#8B5CF6', '#FFD60A'];
    for (let i = 0; i < 18; i++) {
        const c = document.createElement('div');
        const size = Math.random() * 8 + 4;
        c.style.cssText = `
            position:fixed; width:${size}px; height:${size}px;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events:none; z-index:9999;
            left:${x}px; top:${y}px; opacity:1;
            transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
        `;
        document.body.appendChild(c);
        const angle = (Math.PI * 2 * i) / 18;
        const vel = Math.random() * 100 + 60;
        requestAnimationFrame(() => {
            c.style.left = `${x + Math.cos(angle) * vel}px`;
            c.style.top = `${y + Math.sin(angle) * vel - 40}px`;
            c.style.opacity = '0';
            c.style.transform = `scale(0) rotate(${Math.random() * 540}deg)`;
        });
        setTimeout(() => c.remove(), 800);
    }
}
