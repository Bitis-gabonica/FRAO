document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Hero Animations (Elements that appear immediately on load)
    const heroTitle = document.querySelector('.hero-title, .section-title');
    const heroIntro = document.querySelector('.hero-intro, .news-hero p');
    const heroCards = document.querySelectorAll('.glass-card');
    const header = document.querySelector('.header');

    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Fancy progressive text reveal for hero text
    const animateTextReveal = (element, delayOffset = 0) => {
        if (!element) return;
        const text = element.textContent.trim();
        const words = text.split(/\s+/);
        element.innerHTML = '';
        words.forEach((word, index) => {
            const wrapper = document.createElement('span');
            wrapper.style.display = 'inline-block';
            wrapper.style.overflow = 'hidden';
            wrapper.style.verticalAlign = 'bottom';
            // Important: keep the space
            wrapper.style.marginRight = '0.3em'; 

            const inner = document.createElement('span');
            inner.textContent = word;
            inner.style.display = 'inline-block';
            inner.style.transform = 'translateY(100%)';
            inner.style.opacity = '0';
            // Very smooth and fine cubic bezier for a modern feel
            inner.style.transition = `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset + (index * 0.04)}s, opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset + (index * 0.04)}s`;

            wrapper.appendChild(inner);
            element.appendChild(wrapper);

            // Trigger reflow then animate
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    inner.style.transform = 'translateY(0)';
                    inner.style.opacity = '1';
                });
            });
        });
    };

    if (heroTitle) {
        animateTextReveal(heroTitle, 0.2); // Start after header
    }

    if (heroIntro) {
        animateTextReveal(heroIntro, 0.5); // Start after title begins
    }

    heroCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 1s ease ${0.6 + (index * 0.2)}s, transform 1s ease ${0.6 + (index * 0.2)}s`;
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Add animation classes to elements we want to animate on scroll
    const selectorsToAnimate = [
        '.stat-item',
        '.about-image',
        '.about-content',
        '.mission-title',
        '.timeline-item',
        '.program-card',
        '.news-card',
        '.featured-news-card',
        '.principles-banner',
        '.footer-cta',
        '.sidebar-block',
        '.article-body h2',
        '.article-body p'
    ];

    // Frise objectifs : observer dédié, ne marque pas .animate-on-scroll
    // (les transitions sont gérées par la CSS .frise-item.is-visible)
    const friseObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.frise-item').forEach(el => friseObserver.observe(el));

    // Give them a pre-animation state
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1);
            }
            .animate-on-scroll.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
            /* Add some staggering for grid items */
            .programs-grid .program-card:nth-child(2n) { transition-delay: 0.1s; }
            .programs-grid .program-card:nth-child(3n) { transition-delay: 0.2s; }
            
            .stats-right .stat-item:nth-child(1) { transition-delay: 0.1s; }
            .stats-right .stat-item:nth-child(2) { transition-delay: 0.2s; }
            .stats-right .stat-item:nth-child(3) { transition-delay: 0.3s; }
            .stats-right .stat-item:nth-child(4) { transition-delay: 0.4s; }
            
            .timeline-item:nth-child(1) { transition-delay: 0.1s; }
            .timeline-item:nth-child(2) { transition-delay: 0.2s; }
            .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        </style>
    `);

    // We use a timeout to let JS cleanly render dynamically generated elements like program-cards before querying them
    setTimeout(() => {
        selectorsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('animate-on-scroll');
                scrollObserver.observe(el);
            });
        });
    }, 500); // 500ms delay to ensure JS data is mapped
});
