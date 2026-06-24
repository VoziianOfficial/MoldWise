'use strict';



(function () {
    const app = window.MoldWise;
    const config = window.SiteConfig || {};

    if (!app) return;

    const problemTabs = Array.from(document.querySelectorAll('[data-problem-tab]'));
    const problemPanel = document.querySelector('[data-problem-panel]');
    const problemLabel = document.querySelector('[data-problem-label]');
    const problemTitle = document.querySelector('[data-problem-title]');
    const problemDescription = document.querySelector('[data-problem-description]');
    const problemDetail = document.querySelector('[data-problem-detail]');
    const problemNext = document.querySelector('[data-problem-next]');
    const problemIcon = document.querySelector('[data-problem-icon]');
    const problemImage = document.querySelector('[data-problem-image]');

    function getProblems() {
        return Array.isArray(config.problemSelector) ? config.problemSelector : [];
    }

    function setActiveProblem(index) {
        const problems = getProblems();
        const item = problems[index];

        if (!item || !problemPanel) return;

        problemTabs.forEach((tab, tabIndex) => {
            const isActive = tabIndex === index;

            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        problemPanel.classList.add('is-changing');

        window.setTimeout(() => {
            if (problemLabel) {
                problemLabel.textContent = item.tab || item.title || 'Mold concern';
            }

            if (problemTitle) {
                problemTitle.textContent = item.title || '';
            }

            if (problemDescription) {
                problemDescription.textContent = item.description || '';
            }

            if (problemDetail) {
                problemDetail.textContent = item.detail || '';
            }

            if (problemNext) {
                problemNext.textContent = item.nextStep || '';
            }

            if (problemIcon) {
                problemIcon.setAttribute('data-lucide', item.icon || 'shield-check');
            }

            if (problemImage) {
                problemImage.setAttribute('src', item.image || 'assets/images/service-mold-inspection.jpg');
                problemImage.setAttribute(
                    'alt',
                    `${item.title || 'Mold-related concern'} selected for provider option comparison`
                );
            }

            app.refreshIcons();

            problemPanel.classList.remove('is-changing');
            app.refreshAos();
        }, 140);
    }

    function initProblemSelector() {
        if (!problemTabs.length || !problemPanel) return;

        problemTabs.forEach((tab) => {
            const rawIndex = tab.getAttribute('data-problem-tab');
            const index = Number.parseInt(rawIndex, 10);

            if (Number.isNaN(index)) return;

            tab.addEventListener('click', () => {
                setActiveProblem(index);
            });

            tab.addEventListener('keydown', (event) => {
                const currentIndex = problemTabs.indexOf(tab);
                let nextIndex = currentIndex;

                if (event.key === 'ArrowRight') {
                    nextIndex = currentIndex + 1;
                }

                if (event.key === 'ArrowLeft') {
                    nextIndex = currentIndex - 1;
                }

                if (event.key === 'Home') {
                    nextIndex = 0;
                }

                if (event.key === 'End') {
                    nextIndex = problemTabs.length - 1;
                }

                if (nextIndex !== currentIndex) {
                    event.preventDefault();

                    if (nextIndex < 0) {
                        nextIndex = problemTabs.length - 1;
                    }

                    if (nextIndex >= problemTabs.length) {
                        nextIndex = 0;
                    }

                    problemTabs[nextIndex].focus();
                    setActiveProblem(nextIndex);
                }
            });
        });

        setActiveProblem(0);
    }

    function initServiceGridMotion() {
        const cards = document.querySelectorAll(
            '.services-guide__column, .services-overview__card, .services-compare__item, .problem-selector__panel'
        );

        cards.forEach((card) => {
            card.addEventListener('pointermove', (event) => {
                if (!window.matchMedia('(hover: hover)').matches) return;

                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

                card.style.setProperty('--motion-x', `${x.toFixed(3)}`);
                card.style.setProperty('--motion-y', `${y.toFixed(3)}`);
            });

            card.addEventListener('pointerleave', () => {
                card.style.removeProperty('--motion-x');
                card.style.removeProperty('--motion-y');
            });
        });
    }

    function init() {
        initProblemSelector();
        initServiceGridMotion();

        app.refreshIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
