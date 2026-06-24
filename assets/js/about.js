'use strict';



(function () {
    const app = window.MoldWise;
    const config = window.SiteConfig || {};

    if (!app) return;

    function initAboutFaqSchema() {
        const aboutFaqs = config.faqs?.about;

        if (Array.isArray(aboutFaqs) && aboutFaqs.length) {
            app.injectFaqSchema(aboutFaqs, 'about-faq-schema');
        }
    }

    function initAboutHoverMotion() {
        const cards = document.querySelectorAll('.about-help__card');

        cards.forEach((card) => {
            card.addEventListener('pointermove', (event) => {
                if (!window.matchMedia('(hover: hover)').matches) return;

                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

                card.style.transform = `translateY(-5px) rotateX(${(-y * 1.4).toFixed(2)}deg) rotateY(${(x * 1.4).toFixed(2)}deg)`;
            });

            card.addEventListener('pointerleave', () => {
                card.style.transform = '';
            });
        });
    }

    (function initAboutLens() {
        const tabs = Array.from(document.querySelectorAll('[data-lens-tab]'));
        const panel = document.querySelector('[data-lens-panel]');

        if (!tabs.length || !panel) {
            return;
        }

        const data = [
            {
                eyebrow: 'Scope comparison',
                title: 'Ask what is included before comparing prices',
                text: 'Two providers may describe the same mold-related concern differently. Ask what is included, what is excluded, and what may change after an on-site conversation.',
                note: 'MoldWise helps organize the comparison. Participating providers handle final scope and terms.',
                icon: 'file-check-2'
            },
            {
                eyebrow: 'Moisture source',
                title: 'Look for how each provider talks about moisture',
                text: 'Mold-related concerns often connect to leaks, humidity, condensation, ventilation, or recurring dampness. Compare how providers discuss the possible moisture source.',
                note: 'MoldWise does not diagnose moisture sources directly. Providers explain their own approach.',
                icon: 'droplets'
            },
            {
                eyebrow: 'Testing questions',
                title: 'Compare whether testing is discussed clearly',
                text: 'Testing may or may not be part of a provider conversation. Ask what type of testing is mentioned, who performs it, how results are explained, and what costs may apply.',
                note: 'Participating providers handle testing discussions, timing, reporting, and related terms.',
                icon: 'flask-conical'
            },
            {
                eyebrow: 'Provider terms',
                title: 'Verify details before choosing any provider',
                text: 'Before moving forward, compare availability, service area, pricing terms, warranty language, licensing, insurance, and any written provider agreement.',
                note: 'Homeowners should verify provider credentials and terms where required before hiring.',
                icon: 'shield-check'
            }
        ];

        const eyebrow = panel.querySelector('[data-lens-eyebrow]');
        const title = panel.querySelector('[data-lens-title]');
        const text = panel.querySelector('[data-lens-text]');
        const note = panel.querySelector('[data-lens-note]');
        const icon = panel.querySelector('[data-lens-icon]');

        const setActive = (index) => {
            const item = data[index];

            if (!item) {
                return;
            }

            tabs.forEach((tab, tabIndex) => {
                const isActive = tabIndex === index;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
            });

            panel.classList.remove('is-changing');
            void panel.offsetWidth;
            panel.classList.add('is-changing');

            if (eyebrow) eyebrow.textContent = item.eyebrow;
            if (title) title.textContent = item.title;
            if (text) text.textContent = item.text;
            if (note) note.textContent = item.note;

            if (icon) {
                icon.setAttribute('data-lucide', item.icon);
            }

            app.refreshIcons();
            app.refreshAos();
        };

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                setActive(Number(tab.dataset.lensTab || 0));
            });

            tab.addEventListener('mouseenter', () => {
                setActive(Number(tab.dataset.lensTab || 0));
            });
        });
    })();

    (function initAboutProblemsSwiper() {
        const swiperEl = document.querySelector('[data-problems-swiper]');

        if (!swiperEl || typeof Swiper === 'undefined') {
            return;
        }

        new Swiper(swiperEl, {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 18,
            speed: 650,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '[data-problems-pagination]',
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 14
                },
                760: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 18
                }
            },
            on: {
                init() {
                    app.refreshIcons();
                    app.refreshAos();
                }
            }
        });
    })();

    function init() {
        initAboutFaqSchema();
        initAboutHoverMotion();

        app.refreshIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
