// GPU Orchestrator Showcase – modal + carousel logic
document.addEventListener('DOMContentLoaded', () => {
    const backdrop = document.getElementById('showcase-backdrop');
    const modal = document.getElementById('showcase-modal');
    if (!backdrop || !modal) return;

    const slides = modal.querySelectorAll('.carousel-slide');
    const dots = modal.querySelectorAll('.carousel-dot');
    const prevBtn = modal.querySelector('.carousel-arrow.prev');
    const nextBtn = modal.querySelector('.carousel-arrow.next');
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

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); startAuto(); });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); startAuto(); });
    });

    // Open
    const trigger = document.getElementById('gpu-showcase-trigger');
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            backdrop.classList.add('open');
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            goTo(0);
            startAuto();
        });
    }

    // Close
    function close() {
        backdrop.classList.remove('open');
        modal.classList.remove('open');
        document.body.style.overflow = '';
        stopAuto();
    }

    backdrop.addEventListener('click', close);
    modal.querySelector('.showcase-close').addEventListener('click', close);
    modal.querySelector('.showcase-panel').addEventListener('click', (e) => e.stopPropagation());

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') { goTo(current - 1); startAuto(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
    });

    // Touch swipe
    let touchStartX = 0;
    const viewport = modal.querySelector('.carousel-viewport');
    viewport.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 40) {
            goTo(diff > 0 ? current - 1 : current + 1);
            startAuto();
        }
    }, { passive: true });
});
