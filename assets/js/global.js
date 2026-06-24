'use strict';

/* ==================================================
   MoldWise — Global JavaScript
   Shared behavior only:
   config injection, header/footer build, dropdown,
   mobile menu, cookie banner, AOS, Lucide,
   accordions, shared CTA, service links.
   ================================================== */

(function () {
    const config = window.SiteConfig || {};

    const SELECTORS = {
        headerMount: '[data-site-header]',
        footerMount: '[data-site-footer]',
        sharedCtaMount: '[data-shared-cta]',
        configText: '[data-config]',
        currentYear: '[data-current-year]',
        dropdownServices: '[data-dropdown-services]',
        mobileServices: '[data-mobile-services]',
        footerServices: '[data-footer-services]',
        serviceOptions: '[data-service-options]',
        menuOpen: '[data-menu-open]',
        menuClose: '[data-menu-close]',
        mobileMenu: '[data-mobile-menu]',
        cookieBanner: '[data-cookie-banner]',
        accordion: '[data-accordion]'
    };

    const state = {
        dropdownTimer: null
    };

    /* ==================================================
       Helpers
       ================================================== */

    function getCurrentPage() {
        const path = window.location.pathname.split('/').pop();
        return path || 'index.html';
    }

    function isServicePage(pageName) {
        return Array.isArray(config.services)
            ? config.services.some((service) => service.file === pageName)
            : false;
    }

    function safeText(value) {
        if (value === null || value === undefined) return '';

        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function safeAttr(value) {
        return safeText(value).replaceAll('`', '&#096;');
    }

    function getNestedValue(source, path) {
        if (!source || !path) return '';

        return path.split('.').reduce((current, key) => {
            if (current && Object.prototype.hasOwnProperty.call(current, key)) {
                return current[key];
            }

            return '';
        }, source);
    }

    function createIcon(iconName, extraClass = '') {
        return `<i data-lucide="${safeAttr(iconName)}" class="${safeAttr(extraClass)}" aria-hidden="true"></i>`;
    }

    function getPhoneHref() {
        return `tel:${safeAttr(config.contact?.phoneRaw || '')}`;
    }

    function getEmailHref() {
        return `mailto:${safeAttr(config.contact?.email || '')}`;
    }

    function getMapHref() {
        const address = encodeURIComponent(config.company?.address || '');
        return `https://www.google.com/maps/search/?api=1&query=${address}`;
    }

    function closeMobileMenu() {
        const menu = document.querySelector(SELECTORS.mobileMenu);
        const openButtons = document.querySelectorAll(SELECTORS.menuOpen);

        if (!menu) return;

        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-menu-open');

        openButtons.forEach((button) => {
            button.setAttribute('aria-expanded', 'false');
        });
    }

    function openMobileMenu() {
        const menu = document.querySelector(SELECTORS.mobileMenu);
        const openButtons = document.querySelectorAll(SELECTORS.menuOpen);

        if (!menu) return;

        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-menu-open');

        openButtons.forEach((button) => {
            button.setAttribute('aria-expanded', 'true');
        });

        const firstFocusable = menu.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');

        if (firstFocusable) {
            window.setTimeout(() => firstFocusable.focus(), 120);
        }
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function refreshAos() {
        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            window.setTimeout(() => window.AOS.refreshHard(), 120);
        } else if (window.AOS && typeof window.AOS.refresh === 'function') {
            window.setTimeout(() => window.AOS.refresh(), 120);
        }
    }

    /* ==================================================
       Header Build
       ================================================== */

    function buildHeader() {
        const mounts = document.querySelectorAll(SELECTORS.headerMount);

        if (!mounts.length) return;

        const currentPage = getCurrentPage();
        const servicesActive = currentPage === 'all-services.html' || isServicePage(currentPage);

        const navItems = [
            {
                label: 'Home',
                href: config.pages?.home || 'index.html',
                icon: 'home'
            },
            {
                label: 'About',
                href: config.pages?.about || 'about.html',
                icon: 'badge-info'
            },
            {
                label: 'Contact',
                href: config.pages?.contact || 'contact.html',
                icon: 'send'
            }
        ];

        const navHtml = navItems.map((item) => {
            const isActive = currentPage === item.href;

            return `
                <a href="${safeAttr(item.href)}" class="nav-link ${isActive ? 'is-active' : ''}">
                    ${safeText(item.label)}
                </a>
            `;
        }).join('');

        const headerHtml = `
            <header class="site-header" data-header>
                <div class="site-header__inner">
                    <a href="${safeAttr(config.pages?.home || 'index.html')}" class="site-logo" aria-label="${safeAttr(config.brand?.name || 'MoldWise')} home">
                        <img src="${safeAttr(config.brand?.logo || 'assets/images/logo.svg')}" alt="${safeAttr(config.brand?.logoAlt || 'MoldWise logo')}" width="420" height="110">
                    </a>

                    <nav class="desktop-nav" aria-label="Main navigation">
                        <a href="${safeAttr(config.pages?.home || 'index.html')}" class="nav-link ${currentPage === 'index.html' ? 'is-active' : ''}">
                            Home
                        </a>

                        <a href="${safeAttr(config.pages?.about || 'about.html')}" class="nav-link ${currentPage === 'about.html' ? 'is-active' : ''}">
                            About
                        </a>

                        <div class="services-nav ${servicesActive ? 'is-active' : ''}" data-services-nav>
                            <a href="${safeAttr(config.pages?.services || 'all-services.html')}" class="services-trigger ${servicesActive ? 'is-active' : ''}" aria-haspopup="true" aria-expanded="false" data-services-trigger>
                                Services
                                ${createIcon('chevron-down')}
                            </a>

                            <div class="services-dropdown" data-services-dropdown>
                                <div class="services-dropdown__grid" data-dropdown-services></div>
                            </div>
                        </div>

                        <a href="${safeAttr(config.pages?.contact || 'contact.html')}" class="nav-link ${currentPage === 'contact.html' ? 'is-active' : ''}">
                            Contact
                        </a>
                    </nav>

                    <div class="header-actions">
                        <a href="${getPhoneHref()}" class="header-icon-btn" aria-label="Call ${safeAttr(config.brand?.name || 'MoldWise')}">
                            ${createIcon('phone')}
                        </a>

                        <a href="${getEmailHref()}" class="header-icon-btn header-icon-btn--email" aria-label="Email ${safeAttr(config.brand?.name || 'MoldWise')}">
                            ${createIcon('mail')}
                        </a>

                        <button class="menu-toggle" type="button" aria-label="Open mobile menu" aria-controls="mobile-menu" aria-expanded="false" data-menu-open>
                            ${createIcon('menu')}
                        </button>
                    </div>
                </div>
            </header>

            <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu>
                <div class="mobile-menu__top">
                    <a href="${safeAttr(config.pages?.home || 'index.html')}" class="site-logo" aria-label="${safeAttr(config.brand?.name || 'MoldWise')} home">
                        <img src="${safeAttr(config.brand?.logo || 'assets/images/logo.svg')}" alt="${safeAttr(config.brand?.logoAlt || 'MoldWise logo')}" width="420" height="110">
                    </a>

                    <button class="mobile-menu__close" type="button" aria-label="Close mobile menu" data-menu-close>
                        ${createIcon('x')}
                    </button>
                </div>

                <div class="mobile-menu__content">
                    <nav aria-label="Mobile main navigation">
                        <p class="mobile-menu__label">Navigation</p>

                        <div class="mobile-menu__main">
                            <a href="${safeAttr(config.pages?.home || 'index.html')}" class="mobile-menu__link">
                                ${createIcon('home')}
                                <span>Home</span>
                            </a>

                            <a href="${safeAttr(config.pages?.about || 'about.html')}" class="mobile-menu__link">
                                ${createIcon('badge-info')}
                                <span>About</span>
                            </a>

                            <a href="${safeAttr(config.pages?.services || 'all-services.html')}" class="mobile-menu__link">
                                ${createIcon('layers-3')}
                                <span>Services</span>
                            </a>

                            <a href="${safeAttr(config.pages?.contact || 'contact.html')}" class="mobile-menu__link">
                                ${createIcon('send')}
                                <span>Contact</span>
                            </a>
                        </div>
                    </nav>

                    <nav aria-label="Mobile service navigation">
                        <p class="mobile-menu__label">Mold concern categories</p>
                        <div class="mobile-menu__services" data-mobile-services></div>
                    </nav>

                    <div>
                        <p class="mobile-menu__label">Contact</p>

                        <div class="mobile-menu__contact">
                            <a href="${getPhoneHref()}" class="mobile-menu__contact-link">
                                ${createIcon('phone')}
                                <span>${safeText(config.contact?.phoneDisplay || '')}</span>
                            </a>

                            <a href="${getEmailHref()}" class="mobile-menu__contact-link">
                                ${createIcon('mail')}
                                <span>${safeText(config.contact?.email || '')}</span>
                            </a>

                            <a href="${getMapHref()}" class="mobile-menu__contact-link" target="_blank" rel="noopener">
                                ${createIcon('map-pin')}
                                <span>${safeText(config.company?.address || '')}</span>
                            </a>
                        </div>
                    </div>

                    <p class="mobile-menu__note">
                        ${safeText(config.brand?.name || 'MoldWise')} is an independent provider-matching platform. Final pricing, scheduling, service terms, licensing, insurance, and work scope are handled by participating providers.
                    </p>
                </div>
            </div>
        `;

        mounts.forEach((mount) => {
            mount.outerHTML = headerHtml;
        });
    }

    /* ==================================================
       Footer Build
       ================================================== */

    function buildFooter() {
        const mounts = document.querySelectorAll(SELECTORS.footerMount);

        if (!mounts.length) return;

        const footerHtml = `
            <footer class="site-footer">
                <div class="container-wide">
                    <div class="site-footer__main">
                        <div class="site-footer__brand">
                            <a href="${safeAttr(config.pages?.home || 'index.html')}" class="site-footer__logo" aria-label="${safeAttr(config.brand?.name || 'MoldWise')} home">
                                <img src="${safeAttr(config.brand?.logo || 'assets/images/logo.svg')}" alt="${safeAttr(config.brand?.logoAlt || 'MoldWise logo')}" width="420" height="110">
                            </a>

                            <p class="site-footer__description">
                                ${safeText(config.footer?.description || '')}
                            </p>

                            <div class="site-footer__meta" aria-label="Company details">
                                <span class="site-footer__meta-item">
                                    ${createIcon('badge-check')}
                                    <span>${safeText(config.company?.companyId || '')}</span>
                                </span>

                                <a href="${getMapHref()}" class="site-footer__contact-link" target="_blank" rel="noopener">
                                    ${createIcon('map-pin')}
                                    <span>${safeText(config.company?.address || '')}</span>
                                </a>

                                <span class="site-footer__meta-item">
                                    ${createIcon('map')}
                                    <span>${safeText(config.company?.serviceArea || '')}</span>
                                </span>
                            </div>
                        </div>

                        <div class="site-footer__column">
                            <h2 class="site-footer__title">Pages</h2>

                            <nav class="site-footer__list" aria-label="Footer page navigation">
                                <a href="${safeAttr(config.pages?.home || 'index.html')}" class="site-footer__link">
                                    ${createIcon('home')}
                                    <span>Home</span>
                                </a>

                                <a href="${safeAttr(config.pages?.about || 'about.html')}" class="site-footer__link">
                                    ${createIcon('badge-info')}
                                    <span>About</span>
                                </a>

                                <a href="${safeAttr(config.pages?.services || 'all-services.html')}" class="site-footer__link">
                                    ${createIcon('layers-3')}
                                    <span>All Services</span>
                                </a>

                                <a href="${safeAttr(config.pages?.contact || 'contact.html')}" class="site-footer__link">
                                    ${createIcon('send')}
                                    <span>Contact</span>
                                </a>
                            </nav>
                        </div>

                        <div class="site-footer__column">
                            <h2 class="site-footer__title">Services</h2>
                            <nav class="site-footer__list" aria-label="Footer service navigation" data-footer-services></nav>
                        </div>

                        <div class="site-footer__column">
                            <h2 class="site-footer__title">Contact</h2>

                            <div class="site-footer__list">
                                <a href="${getPhoneHref()}" class="site-footer__contact-link">
                                    ${createIcon('phone')}
                                    <span>${safeText(config.contact?.phoneDisplay || '')}</span>
                                </a>

                                <a href="${getEmailHref()}" class="site-footer__contact-link">
                                    ${createIcon('mail')}
                                    <span>${safeText(config.contact?.email || '')}</span>
                                </a>

                                <span class="site-footer__meta-item">
                                    ${createIcon('clock')}
                                    <span>${safeText(config.contact?.supportHours || '')}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="site-footer__disclaimer">
                        <p>${safeText(config.legal?.disclaimer || '')}</p>
                    </div>

                    <div class="site-footer__bottom">
                        <p>
                            © <span data-current-year></span> ${safeText(config.company?.name || config.brand?.name || 'MoldWise')}. ${safeText(config.footer?.copyright || 'All rights reserved.')}
                        </p>

                        <nav class="site-footer__bottom-links" aria-label="Legal navigation">
                            <a href="${safeAttr(config.legal?.privacy || 'privacy-policy.html')}">Privacy Policy</a>
                            <a href="${safeAttr(config.legal?.terms || 'terms-of-service.html')}">Terms of Service</a>
                            <a href="${safeAttr(config.legal?.cookies || 'cookie-policy.html')}">Cookie Policy</a>
                        </nav>
                    </div>
                </div>
            </footer>
        `;

        mounts.forEach((mount) => {
            mount.outerHTML = footerHtml;
        });
    }

    /* ==================================================
       Shared Final CTA Build
       ================================================== */

    function buildSharedCta() {
        const mounts = document.querySelectorAll(SELECTORS.sharedCtaMount);

        if (!mounts.length) return;

        const ctaHtml = `
            <section class="final-cta-section" aria-labelledby="final-cta-title">
                <div class="container-wide">
                    <div class="final-cta shine-surface">
                        <div class="final-cta__content">
                            <p class="section-kicker">Start with clarity</p>

                            <h2 id="final-cta-title">
                                Ready to compare provider options?
                            </h2>

                            <p>
                                Start your request and review available local options. MoldWise is independent, and final pricing, availability, scheduling, warranties, and service terms are provided by participating providers.
                            </p>

                            <div class="btn-group final-cta__actions">
                                <a href="${safeAttr(config.pages?.contact || 'contact.html')}" class="btn btn--primary">
                                    <span>Submit Your Details</span>
                                    ${createIcon('arrow-right')}
                                </a>

                                <a href="${safeAttr(config.pages?.services || 'all-services.html')}" class="btn btn--light">
                                    <span>View Services</span>
                                    ${createIcon('layers-3')}
                                </a>
                            </div>
                        </div>

                        <figure class="final-cta__media photo-cover">
                            <img src="${safeAttr(config.images?.finalCta || 'assets/images/final-cta.jpg')}" alt="Clean indoor home area prepared for mold-related provider comparison" width="760" height="520" loading="lazy">
                        </figure>
                    </div>
                </div>
            </section>
        `;

        mounts.forEach((mount) => {
            mount.outerHTML = ctaHtml;
        });
    }

    /* ==================================================
       Config Injection
       ================================================== */

    function injectConfigText() {
        const nodes = document.querySelectorAll(SELECTORS.configText);

        nodes.forEach((node) => {
            const path = node.getAttribute('data-config');
            const attr = node.getAttribute('data-config-attr');
            const prefix = node.getAttribute('data-config-prefix') || '';
            const suffix = node.getAttribute('data-config-suffix') || '';
            const value = getNestedValue(config, path);
            const output = `${prefix}${value}${suffix}`;

            if (attr) {
                node.setAttribute(attr, output);
            } else {
                node.textContent = output;
            }
        });
    }

    function injectCurrentYear() {
        document.querySelectorAll(SELECTORS.currentYear).forEach((node) => {
            node.textContent = new Date().getFullYear();
        });
    }

    function injectSmartLinks() {
        document.querySelectorAll('[data-phone-link]').forEach((link) => {
            link.setAttribute('href', getPhoneHref());

            if (!link.textContent.trim()) {
                link.textContent = config.contact?.phoneDisplay || '';
            }
        });

        document.querySelectorAll('[data-email-link]').forEach((link) => {
            link.setAttribute('href', getEmailHref());

            if (!link.textContent.trim()) {
                link.textContent = config.contact?.email || '';
            }
        });

        document.querySelectorAll('[data-map-link]').forEach((link) => {
            link.setAttribute('href', getMapHref());
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');

            if (!link.textContent.trim()) {
                link.textContent = config.company?.address || '';
            }
        });

        document.querySelectorAll('[data-contact-link]').forEach((link) => {
            link.setAttribute('href', config.pages?.contact || 'contact.html');
        });
    }

    /* ==================================================
       Service Link Injection
       ================================================== */

    function buildServiceDropdownLink(service) {
        return `
            <a href="${safeAttr(service.file)}" class="services-dropdown__link">
                ${createIcon(service.icon || 'shield-check')}
                <span>${safeText(service.title)}</span>
            </a>
        `;
    }

    function buildMobileServiceLink(service) {
        return `
            <a href="${safeAttr(service.file)}" class="mobile-menu__service">
                ${createIcon(service.icon || 'shield-check')}
                <span>${safeText(service.title)}</span>
            </a>
        `;
    }

    function buildFooterServiceLink(service) {
        return `
            <a href="${safeAttr(service.file)}" class="site-footer__link">
                ${createIcon(service.icon || 'shield-check')}
                <span>${safeText(service.shortTitle || service.title)}</span>
            </a>
        `;
    }

    function injectServiceLinks() {
        const services = Array.isArray(config.services) ? config.services : [];

        document.querySelectorAll(SELECTORS.dropdownServices).forEach((container) => {
            container.innerHTML = services.map(buildServiceDropdownLink).join('');
        });

        document.querySelectorAll(SELECTORS.mobileServices).forEach((container) => {
            container.innerHTML = services.map(buildMobileServiceLink).join('');
        });

        document.querySelectorAll(SELECTORS.footerServices).forEach((container) => {
            container.innerHTML = services.map(buildFooterServiceLink).join('');
        });

        document.querySelectorAll(SELECTORS.serviceOptions).forEach((select) => {
            const firstLabel = select.getAttribute('data-placeholder') || 'Select category';

            select.innerHTML = `
                <option value="">${safeText(firstLabel)}</option>
                ${services.map((service) => `
                    <option value="${safeAttr(service.title)}">${safeText(service.title)}</option>
                `).join('')}
            `;
        });
    }

    /* ==================================================
       Header Behavior
       ================================================== */

    function initStickyHeader() {
        const header = document.querySelector('[data-header]');

        if (!header) return;

        function updateHeader() {
            header.classList.toggle('is-scrolled', window.scrollY > 10);
        }

        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
    }

    function initServicesDropdown() {
        const nav = document.querySelector('[data-services-nav]');
        const trigger = document.querySelector('[data-services-trigger]');

        if (!nav || !trigger) return;

        function openDropdown() {
            window.clearTimeout(state.dropdownTimer);
            nav.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        }

        function closeDropdownWithDelay() {
            window.clearTimeout(state.dropdownTimer);

            state.dropdownTimer = window.setTimeout(() => {
                nav.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }, 260);
        }

        nav.addEventListener('mouseenter', openDropdown);
        nav.addEventListener('mouseleave', closeDropdownWithDelay);
        nav.addEventListener('focusin', openDropdown);
        nav.addEventListener('focusout', (event) => {
            if (!nav.contains(event.relatedTarget)) {
                closeDropdownWithDelay();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                nav.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initMobileMenu() {
        const openButtons = document.querySelectorAll(SELECTORS.menuOpen);
        const closeButtons = document.querySelectorAll(SELECTORS.menuClose);
        const menu = document.querySelector(SELECTORS.mobileMenu);

        if (!menu) return;

        openButtons.forEach((button) => {
            button.addEventListener('click', openMobileMenu);
        });

        closeButtons.forEach((button) => {
            button.addEventListener('click', closeMobileMenu);
        });

        menu.addEventListener('click', (event) => {
            const target = event.target;

            if (target instanceof Element && target.closest('a')) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMobileMenu();
            }
        });
    }

    function initActiveLinks() {
        const currentPage = getCurrentPage();
        const links = document.querySelectorAll('a[href]');

        links.forEach((link) => {
            const href = link.getAttribute('href');

            if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;

            const linkPage = href.split('/').pop();

            if (linkPage === currentPage) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    /* ==================================================
       Cookie Consent
       ================================================== */

    function createCookieBanner() {
        if (document.querySelector(SELECTORS.cookieBanner)) return;

        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('data-cookie-banner', '');
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <div class="cookie-banner__inner">
                <p>
                    We use essential cookies and localStorage to remember your cookie choice and improve basic website functionality.
                    Review our
                    <a href="${safeAttr(config.legal?.privacy || 'privacy-policy.html')}">Privacy Policy</a>,
                    <a href="${safeAttr(config.legal?.cookies || 'cookie-policy.html')}">Cookie Policy</a>,
                    and
                    <a href="${safeAttr(config.legal?.terms || 'terms-of-service.html')}">Terms</a>.
                </p>

                <div class="cookie-banner__actions">
                    <button type="button" class="cookie-btn cookie-btn--decline" data-cookie-decline>
                        Decline
                    </button>

                    <button type="button" class="cookie-btn cookie-btn--accept" data-cookie-accept>
                        Accept
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
    }

    function initCookieBanner() {
        createCookieBanner();

        const banner = document.querySelector(SELECTORS.cookieBanner);
        const accept = document.querySelector('[data-cookie-accept]');
        const decline = document.querySelector('[data-cookie-decline]');

        if (!banner || !accept || !decline) return;

        const storedChoice = window.localStorage.getItem('moldwise_cookie_choice');

        if (!storedChoice) {
            banner.classList.add('is-visible');
        }

        function setChoice(choice) {
            window.localStorage.setItem('moldwise_cookie_choice', choice);
            banner.classList.remove('is-visible');
        }

        accept.addEventListener('click', () => setChoice('accepted'));
        decline.addEventListener('click', () => setChoice('declined'));
    }

    /* ==================================================
       Accordion Helper
       ================================================== */

    function initAccordion(root, options = {}) {
        if (!root) return;

        const items = Array.from(root.querySelectorAll('[data-accordion-item]'));
        const closeOthers = options.closeOthers !== false;

        items.forEach((item, index) => {
            const trigger = item.querySelector('[data-accordion-trigger]');
            const panel = item.querySelector('[data-accordion-panel]');

            if (!trigger || !panel) return;

            const panelId = panel.id || `accordion-panel-${Math.random().toString(16).slice(2)}`;

            panel.id = panelId;
            trigger.setAttribute('aria-controls', panelId);
            trigger.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');

            if (index === 0 && root.hasAttribute('data-open-first')) {
                item.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }

            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                if (closeOthers) {
                    items.forEach((otherItem) => {
                        const otherTrigger = otherItem.querySelector('[data-accordion-trigger]');
                        otherItem.classList.remove('is-open');
                        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                    });
                }

                if (!isOpen) {
                    item.classList.add('is-open');
                    trigger.setAttribute('aria-expanded', 'true');
                } else if (!root.hasAttribute('data-keep-one-open')) {
                    item.classList.remove('is-open');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    function initGlobalAccordions() {
        document.querySelectorAll(SELECTORS.accordion).forEach((accordion) => {
            initAccordion(accordion, {
                closeOthers: true
            });
        });
    }

    /* ==================================================
       FAQ Schema Helper
       ================================================== */

    function injectFaqSchema(faqs, id = 'faq-schema') {
        if (!Array.isArray(faqs) || !faqs.length) return;

        const existing = document.getElementById(id);

        if (existing) {
            existing.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;

        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer
                }
            }))
        });

        document.head.appendChild(script);
    }

    /* ==================================================
       Smooth Same-Page Scroll
       ================================================== */

    function initSmoothAnchors() {
        document.addEventListener('click', (event) => {
            const target = event.target;

            if (!(target instanceof Element)) return;

            const link = target.closest('a[href^="#"]');

            if (!link) return;

            const href = link.getAttribute('href');

            if (!href || href === '#') return;

            const targetElement = document.querySelector(href);

            if (!targetElement) return;

            event.preventDefault();
            closeMobileMenu();

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    /* ==================================================
       Library Initialization
       ================================================== */

    function initLibraries() {
        if (window.AOS && typeof window.AOS.init === 'function') {
            window.AOS.init({
                duration: 760,
                easing: 'ease-out-cubic',
                once: true,
                offset: 72,
                delay: 0,
                anchorPlacement: 'top-bottom'
            });
        }

        refreshIcons();

        window.addEventListener('load', () => {
            refreshIcons();
            refreshAos();
        });
    }

    /* ==================================================
       Public API
       ================================================== */

    window.MoldWise = {
        config,
        safeText,
        safeAttr,
        getNestedValue,
        createIcon,
        refreshIcons,
        refreshAos,
        initAccordion,
        injectFaqSchema,
        getCurrentPage,
        isServicePage,
        closeMobileMenu
    };

    /* ==================================================
       Init
       ================================================== */

    function init() {
        buildHeader();
        buildFooter();
        buildSharedCta();

        injectConfigText();
        injectCurrentYear();
        injectSmartLinks();
        injectServiceLinks();

        initStickyHeader();
        initServicesDropdown();
        initMobileMenu();
        initActiveLinks();
        initCookieBanner();
        initGlobalAccordions();
        initSmoothAnchors();
        initLibraries();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();