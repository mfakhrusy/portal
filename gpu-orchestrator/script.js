document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll Reveal
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0 }
        );

        const windowHeight = window.innerHeight;
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                el.classList.add('revealed');
            } else {
                revealObserver.observe(el);
            }
        });
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }

    // Real-time Clock
    const clockElement = document.getElementById('clock');
    function updateClock() {
        const now = new Date();
        clockElement.textContent =
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0') + ':' +
            String(now.getSeconds()).padStart(2, '0');
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Theme Dropdown
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;

    const initialTheme = document.documentElement.getAttribute('data-theme') || 'simple';
    if (initialTheme === 'simple') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', initialTheme);
    }
    themeSelect.value = initialTheme;
    updateDynamicContent(initialTheme);

    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        if (selectedTheme === 'simple') {
            body.removeAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', 'simple');
        } else {
            body.setAttribute('data-theme', selectedTheme);
            document.documentElement.setAttribute('data-theme', selectedTheme);
        }
        updateDynamicContent(selectedTheme);
    });

    function updateDynamicContent(theme) {
        document.querySelectorAll('[data-text-terminal]').forEach(el => {
            if (theme === 'terminal') {
                if (el.dataset.textTerminal) el.textContent = el.dataset.textTerminal;
            } else {
                if (el.dataset.textSimple) el.textContent = el.dataset.textSimple;
            }
        });
    }

    // Carousel
    const carousel = document.querySelector('.showcase-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        let current = 0;
        let autoTimer = null;

        function goTo(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = index;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        function startAuto() {
            stopAuto();
            autoTimer = setInterval(() => goTo(current + 1), 4500);
        }

        function stopAuto() {
            if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        }

        prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
        nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { goTo(i); startAuto(); });
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { goTo(current - 1); startAuto(); }
            if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
        });

        // Touch swipe
        let touchStartX = 0;
        const viewport = carousel.querySelector('.carousel-viewport');
        viewport.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
        viewport.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(diff) > 40) {
                goTo(diff > 0 ? current - 1 : current + 1);
                startAuto();
            }
        }, { passive: true });

        startAuto();
    }

    // Hero ambient parallax
    const heroAmbient = document.querySelector('.hero-ambient');
    if (heroAmbient) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 12;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 12;
            heroAmbient.style.setProperty('--hero-parallax-x', `${moveX}px`);
            heroAmbient.style.setProperty('--hero-parallax-y', `${moveY}px`);
        });
    }

    // Magnetic hover on social links
    document.querySelectorAll('.social-links a').forEach(el => {
        el.style.transition = 'transform 0.25s ease-out';
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const moveX = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
            const moveY = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0, 0)'; });
    });
});
