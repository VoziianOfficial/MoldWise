'use strict';

/* ==================================================
   MoldWise — Legal Pages JavaScript
   Shared by:
   privacy-policy.html
   terms-of-service.html
   cookie-policy.html
   ================================================== */

(function () {
    const app = window.MoldWise;

    if (!app) return;

    const navLinks = Array.from(document.querySelectorAll('.legal-nav a[href^="#"]'));
    const articleSections = Array.from(document.querySelectorAll('.legal-article section[id]'));

    function initCurrentDate() {
        const dateTargets = document.querySelectorAll('[data-current-date]');

        if (!dateTargets.length) return;

        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const currentDate = formatter.format(new Date());

        dateTargets.forEach((target) => {
            target.textContent = currentDate;
        });
    }

    function initLegalSmoothScroll() {
        navLinks.forEach((link) => {
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

                history.replaceState(null, '', hash);
            });
        });
    }

    function setActiveLink(sectionId) {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;

            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function initLegalScrollSpy() {
        if (!navLinks.length || !articleSections.length || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

                if (!visibleEntry) return;

                setActiveLink(visibleEntry.target.id);
            },
            {
                root: null,
                rootMargin: '-22% 0px -62% 0px',
                threshold: [0.08, 0.18, 0.32, 0.5]
            }
        );

        articleSections.forEach((section) => observer.observe(section));

        const initialHash = window.location.hash.replace('#', '');

        if (initialHash) {
            setActiveLink(initialHash);
        } else if (articleSections[0]) {
            setActiveLink(articleSections[0].id);
        }
    }

    function initLegalCardMotion() {
        const motionItems = document.querySelectorAll(
            '.legal-nav a, .legal-mini-card, .legal-contact-card a, .legal-contact-card > span, .legal-disclaimer-block'
        );

        motionItems.forEach((item) => {
            item.addEventListener('pointermove', (event) => {
                if (!window.matchMedia('(hover: hover)').matches) return;

                const rect = item.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

                item.style.setProperty('--legal-motion-x', `${x.toFixed(3)}`);
                item.style.setProperty('--legal-motion-y', `${y.toFixed(3)}`);
            });

            item.addEventListener('pointerleave', () => {
                item.style.removeProperty('--legal-motion-x');
                item.style.removeProperty('--legal-motion-y');
            });
        });
    }

    function initExternalLegalLinks() {
        const links = document.querySelectorAll('.legal-article a[href^="http"]');

        links.forEach((link) => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    function init() {
        initCurrentDate();
        initLegalSmoothScroll();
        initLegalScrollSpy();
        initLegalCardMotion();
        initExternalLegalLinks();

        app.refreshIcons();
        app.refreshAos();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();