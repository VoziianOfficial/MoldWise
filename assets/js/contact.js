'use strict';

/* ==================================================
   MoldWise — Contact Page JavaScript
   Contact-specific interactions only:
   form validation, AJAX submission,
   category cards → form select,
   contact FAQ schema.
   ================================================== */

(function () {
    const app = window.MoldWise;
    const config = window.SiteConfig || {};

    if (!app) return;

    const form = document.querySelector('[data-contact-form]');
    const formMessage = document.querySelector('[data-form-message]');
    const serviceSelect = document.querySelector('#service');
    const categoryCards = document.querySelectorAll('[data-contact-category]');

    function showMessage(type, message) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.classList.remove('is-success', 'is-error');
        formMessage.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
    }

    function clearMessage() {
        if (!formMessage) return;

        formMessage.textContent = '';
        formMessage.classList.remove('is-visible', 'is-success', 'is-error');
    }

    function getFieldValue(formData, fieldName) {
        return String(formData.get(fieldName) || '').trim();
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm(formData) {
        const fullName = getFieldValue(formData, 'fullName');
        const email = getFieldValue(formData, 'email');
        const phone = getFieldValue(formData, 'phone');
        const service = getFieldValue(formData, 'service');
        const message = getFieldValue(formData, 'message');
        const privacyConsent = formData.get('privacyConsent');

        if (!fullName || fullName.length < 2) {
            return 'Please enter your full name.';
        }

        if (!email || !isValidEmail(email)) {
            return 'Please enter a valid email address.';
        }

        if (!phone || phone.length < 7) {
            return 'Please enter a valid phone number.';
        }

        if (!service) {
            return 'Please select a service category.';
        }

        if (!message || message.length < 10) {
            return 'Please describe the concern with at least a few details.';
        }

        if (!privacyConsent) {
            return 'Please confirm that you understand how your request may be used.';
        }

        return '';
    }

    function setSubmitting(isSubmitting) {
        if (!form) return;

        const submitButton = form.querySelector('button[type="submit"]');

        form.classList.toggle('is-submitting', isSubmitting);

        if (submitButton) {
            submitButton.disabled = isSubmitting;

            const buttonText = submitButton.querySelector('span');

            if (buttonText) {
                buttonText.textContent = isSubmitting ? 'Submitting...' : 'Submit Request';
            }
        }
    }

    async function submitForm(event) {
        event.preventDefault();

        if (!form) return;

        clearMessage();

        const formData = new FormData(form);
        const validationError = validateForm(formData);

        if (validationError) {
            showMessage('error', validationError);
            return;
        }

        setSubmitting(true);

        try {
            const endpoint = form.getAttribute('action') || config.form?.endpoint || 'contact.php';

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            const data = await response.json().catch(() => ({
                success: false,
                message: config.form?.errorMessage || 'Please check the required fields and try again.'
            }));

            if (!response.ok || !data.success) {
                showMessage(
                    'error',
                    data.message || config.form?.errorMessage || 'Please check the required fields and try again.'
                );
                return;
            }

            showMessage(
                'success',
                data.message || config.form?.successMessage || 'Thank you. Your request has been received.'
            );

            form.reset();

            if (serviceSelect) {
                serviceSelect.value = '';
            }
        } catch (error) {
            showMessage(
                'error',
                'The form could not be submitted right now. Please try again or contact MoldWise by phone or email.'
            );
        } finally {
            setSubmitting(false);
        }
    }

    function initContactForm() {
        if (!form) return;

        form.addEventListener('submit', submitForm);

        const fields = form.querySelectorAll('input, select, textarea');

        fields.forEach((field) => {
            field.addEventListener('input', clearMessage);
            field.addEventListener('change', clearMessage);
        });
    }

    function initCategoryCards() {
        if (!categoryCards.length || !serviceSelect) return;

        categoryCards.forEach((card) => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-contact-category');

                if (!category) return;

                serviceSelect.value = category;

                window.setTimeout(() => {
                    serviceSelect.focus({
                        preventScroll: true
                    });
                }, 480);
            });
        });
    }

    function initContactFaqSchema() {
        const contactFaqs = config.faqs?.contact;

        if (Array.isArray(contactFaqs) && contactFaqs.length) {
            app.injectFaqSchema(contactFaqs, 'contact-faq-schema');
        }
    }

    function initContactCardMotion() {
        const cards = document.querySelectorAll('.contact-category, .contact-form, .contact-next__list li');

        cards.forEach((card) => {
            card.addEventListener('pointermove', (event) => {
                if (!window.matchMedia('(hover: hover)').matches) return;

                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

                card.style.setProperty('--contact-motion-x', `${x.toFixed(3)}`);
                card.style.setProperty('--contact-motion-y', `${y.toFixed(3)}`);
            });

            card.addEventListener('pointerleave', () => {
                card.style.removeProperty('--contact-motion-x');
                card.style.removeProperty('--contact-motion-y');
            });
        });
    }

    function init() {
        initContactForm();
        initCategoryCards();
        initContactFaqSchema();
        initContactCardMotion();

        app.refreshIcons();
        app.refreshAos();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();