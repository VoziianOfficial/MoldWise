'use strict';



(function () {
    const app = window.MoldWise;
    const config = window.SiteConfig || {};

    if (!app) return;

    const concernTabs = Array.from(document.querySelectorAll('[data-concern-tab]'));
    const concernPanel = document.querySelector('[data-concern-panel]');
    const concernLabel = document.querySelector('[data-concern-label]');
    const concernTitle = document.querySelector('[data-concern-title]');
    const concernDescription = document.querySelector('[data-concern-description]');
    const concernNext = document.querySelector('[data-concern-next]');
    const concernIcon = document.querySelector('[data-concern-icon]');

    function getConcernItems() {
        return Array.isArray(config.concernCategories) ? config.concernCategories : [];
    }

    function setActiveConcern(index) {
        const concerns = getConcernItems();
        const item = concerns[index];

        if (!item || !concernPanel) return;

        concernTabs.forEach((tab, tabIndex) => {
            const isActive = tabIndex === index;

            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        concernPanel.classList.add('is-changing');

        window.setTimeout(() => {
            if (concernLabel) {
                concernLabel.textContent = item.label || 'Mold concern';
            }

            if (concernTitle) {
                concernTitle.textContent = item.title || '';
            }

            if (concernDescription) {
                concernDescription.textContent = item.description || '';
            }

            if (concernNext) {
                concernNext.textContent = item.nextStep || '';
            }

            if (concernIcon) {
                concernIcon.setAttribute('data-lucide', item.icon || 'shield-check');
            }

            app.refreshIcons();

            concernPanel.classList.remove('is-changing');
            app.refreshAos();
        }, 120);
    }

    function initConcernTabs() {
        if (!concernTabs.length || !concernPanel) return;

        concernTabs.forEach((tab) => {
            const rawIndex = tab.getAttribute('data-concern-tab');
            const index = Number.parseInt(rawIndex, 10);

            if (Number.isNaN(index)) return;

            tab.addEventListener('click', () => {
                setActiveConcern(index);
            });

            tab.addEventListener('mouseenter', () => {
                if (window.matchMedia('(hover: hover)').matches) {
                    setActiveConcern(index);
                }
            });

            tab.addEventListener('keydown', (event) => {
                const currentIndex = concernTabs.indexOf(tab);
                let nextIndex = currentIndex;

                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                    nextIndex = currentIndex + 1;
                }

                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                    nextIndex = currentIndex - 1;
                }

                if (event.key === 'Home') {
                    nextIndex = 0;
                }

                if (event.key === 'End') {
                    nextIndex = concernTabs.length - 1;
                }

                if (nextIndex !== currentIndex) {
                    event.preventDefault();

                    if (nextIndex < 0) {
                        nextIndex = concernTabs.length - 1;
                    }

                    if (nextIndex >= concernTabs.length) {
                        nextIndex = 0;
                    }

                    concernTabs[nextIndex].focus();
                    setActiveConcern(nextIndex);
                }
            });
        });

        setActiveConcern(0);
    }

    function initHomeFaqSchema() {
        const homeFaqs = config.faqs?.home;

        if (Array.isArray(homeFaqs) && homeFaqs.length) {
            app.injectFaqSchema(homeFaqs, 'home-faq-schema');
        }
    }

    function initHomeCardMotion() {
        const cards = document.querySelectorAll('.home-popular__card, .home-process__card, .home-platform__card');

        cards.forEach((card) => {
            card.addEventListener('pointermove', (event) => {
                if (!window.matchMedia('(hover: hover)').matches) return;

                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

                card.style.setProperty('--tilt-x', `${(-y * 2).toFixed(2)}deg`);
                card.style.setProperty('--tilt-y', `${(x * 2).toFixed(2)}deg`);
            });

            card.addEventListener('pointerleave', () => {
                card.style.removeProperty('--tilt-x');
                card.style.removeProperty('--tilt-y');
            });
        });
    }

    function init() {
        initConcernTabs();
        initHomeFaqSchema();
        initHomeCardMotion();

        app.refreshIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
