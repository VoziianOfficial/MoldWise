'use strict';



(function () {
    const app = window.MoldWise;
    const config = window.SiteConfig || {};

    if (!app) return;

    function getCurrentService() {
        const currentPage = app.getCurrentPage();

        if (!Array.isArray(config.services)) {
            return null;
        }

        return config.services.find((service) => service.file === currentPage) || null;
    }

    function initServiceFaqSwiper() {
        const swiperElements = document.querySelectorAll('[data-service-faq-swiper]');

        if (!swiperElements.length || typeof Swiper === 'undefined') return;

        swiperElements.forEach((swiperElement) => {
            const wrap = swiperElement.closest('.service-faq-swiper-wrap');
            const nextButton = wrap?.querySelector('[data-service-faq-next]');
            const prevButton = wrap?.querySelector('[data-service-faq-prev]');
            const pagination = wrap?.querySelector('[data-service-faq-pagination]');

            const swiper = new Swiper(swiperElement, {
                slidesPerView: 1,
                spaceBetween: 18,
                loop: true,
                speed: 680,
                autoHeight: false,
                grabCursor: true,
                keyboard: {
                    enabled: true,
                    onlyInViewport: true
                },
                pagination: pagination
                    ? {
                        el: pagination,
                        clickable: true
                    }
                    : false,
                navigation: {
                    nextEl: nextButton || null,
                    prevEl: prevButton || null
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 14
                    },
                    760: {
                        slidesPerView: 1,
                        spaceBetween: 18
                    },
                    1120: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    }
                },
                on: {
                    init() {
                        app.refreshIcons();
                        app.refreshAos();
                    }
                }
            });

            swiperElement.dataset.swiperReady = 'true';

            window.setTimeout(() => {
                swiper.update();
            }, 350);
        });
    }

    function initServiceFaqSchema() {
        const cards = Array.from(document.querySelectorAll('.service-faq-card'));
        const currentService = getCurrentService();

        if (!cards.length) return;

        const faqs = cards
            .map((card) => {
                const question = card.querySelector('h3')?.textContent?.trim() || '';
                const answer = card.querySelector('p')?.textContent?.trim() || '';

                return {
                    question,
                    answer
                };
            })
            .filter((item) => item.question && item.answer);

        if (faqs.length) {
            const schemaId = currentService
                ? `${currentService.shortTitle || currentService.title}-faq-schema`
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')
                : 'service-faq-schema';

            app.injectFaqSchema(faqs, schemaId);
        }
    }

    function initServiceAnchorLinks() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const hash = link.getAttribute('href');

                if (!hash || hash === '#') return;

                const target = document.querySelector(hash);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    function initServiceCardMotion() {
        const motionItems = document.querySelectorAll(
            '.service-icon-button, .service-process__card, .service-related__card, .service-faq-card'
        );

        motionItems.forEach((item) => {
            item.addEventListener('pointermove', (event) => {
                if (!window.matchMedia('(hover: hover)').matches) return;

                const rect = item.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

                item.style.setProperty('--service-motion-x', `${x.toFixed(3)}`);
                item.style.setProperty('--service-motion-y', `${y.toFixed(3)}`);
            });

            item.addEventListener('pointerleave', () => {
                item.style.removeProperty('--service-motion-x');
                item.style.removeProperty('--service-motion-y');
            });
        });
    }

    function initServiceImageLoading() {
        const images = document.querySelectorAll('.service-overview img, .service-factors img, .service-process img');

        images.forEach((image) => {
            if (image.complete) {
                image.closest('figure')?.classList.add('is-loaded');
                return;
            }

            image.addEventListener('load', () => {
                image.closest('figure')?.classList.add('is-loaded');
            });
        });
    }

    function initCurrentServiceMeta() {
        const currentService = getCurrentService();

        if (!currentService) return;

        document.body.dataset.currentService = currentService.file.replace('.html', '');

        const relatedCards = document.querySelectorAll('.service-related__card');

        relatedCards.forEach((card) => {
            const href = card.getAttribute('href');

            if (href === currentService.file) {
                card.setAttribute('aria-current', 'page');
            }
        });
    }

    (function initServiceCompareChecklist() {
        const sections = document.querySelectorAll('.service-compare-checklist');

        sections.forEach((section) => {
            const intro = section.querySelector('[data-compare-intro]');
            const title = section.querySelector('[data-compare-title]');
            const text = section.querySelector('[data-compare-text]');
            const lines = Array.from(section.querySelectorAll('[data-compare-line]'));

            if (!intro || !title || !text || !lines.length) return;

            function setActiveLine(activeLine) {
                const nextTitle = activeLine.getAttribute('data-intro-title');
                const nextText = activeLine.getAttribute('data-intro-text');

                if (!nextTitle || !nextText) return;

                lines.forEach((line) => {
                    line.classList.toggle('is-active', line === activeLine);
                });

                intro.classList.add('is-changing');

                window.setTimeout(() => {
                    title.textContent = nextTitle;
                    text.textContent = nextText;
                    intro.classList.remove('is-changing');

                    if (window.MoldWise && typeof window.MoldWise.refreshAos === 'function') {
                        window.MoldWise.refreshAos();
                    }
                }, 140);
            }

            lines.forEach((line) => {
                line.addEventListener('click', () => {
                    setActiveLine(line);
                });

                line.addEventListener('mouseenter', () => {
                    if (window.matchMedia('(hover: hover)').matches) {
                        setActiveLine(line);
                    }
                });
            });

            const firstActive = section.querySelector('.service-compare-checklist__line.is-active') || lines[0];
            setActiveLine(firstActive);
        });
    })();

    function init() {
        initCurrentServiceMeta();
        initServiceFaqSwiper();
        initServiceFaqSchema();
        initServiceAnchorLinks();
        initServiceCardMotion();
        initServiceImageLoading();

        app.refreshIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
