'use strict';

/* ==================================================
   MoldWise — About Page JavaScript
   About-specific interactions only:
   Why Compare Providers swiper,
   About FAQ schema,
   refresh helpers.
   ================================================== */

(function () {
    const app = window.MoldWise;
    const config = window.SiteConfig || {};

    if (!app) return;

    function initCompareSwiper() {
        const swiperElement = document.querySelector('[data-compare-swiper]');

        if (!swiperElement || !window.Swiper) return;

        new window.Swiper(swiperElement, {
            slidesPerView: 1,
            spaceBetween: 18,
            speed: 620,
            loop: true,
            grabCursor: true,
            autoHeight: false,
            keyboard: {
                enabled: true
            },
            pagination: {
                el: '[data-compare-pagination]',
                clickable: true
            },
            navigation: {
                nextEl: '[data-compare-next]',
                prevEl: '[data-compare-prev]'
            },
            breakpoints: {
                768: {
                    spaceBetween: 22
                }
            },
            on: {
                init: function () {
                    app.refreshIcons();
                    app.refreshAos();
                },
                slideChangeTransitionEnd: function () {
                    app.refreshIcons();
                    app.refreshAos();
                }
            }
        });
    }

    function initAboutFaqSchema() {
        const aboutFaqs = config.faqs?.about;

        if (Array.isArray(aboutFaqs) && aboutFaqs.length) {
            app.injectFaqSchema(aboutFaqs, 'about-faq-schema');
        }
    }

    function initAboutHoverMotion() {
        const cards = document.querySelectorAll('.about-help__card, .about-compare__slide');

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

    function init() {
        initCompareSwiper();
        initAboutFaqSchema();
        initAboutHoverMotion();

        app.refreshIcons();
        app.refreshAos();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();