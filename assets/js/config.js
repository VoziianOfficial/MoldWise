'use strict';

window.SiteConfig = {
    brand: {
        name: 'MoldWise',
        tagline: 'Independent Mold Remediation Provider Matching',
        logo: 'assets/images/logo.svg',
        logoAlt: 'MoldWise logo'
    },

    company: {
        name: 'MoldWise',
        legalName: 'MoldWise',
        companyId: 'MW-MOLD-2048',
        address: 'USA Service Area',
        serviceArea: 'Independent mold remediation provider matching across selected service areas'
    },

    contact: {
        phoneRaw: '+18885550148',
        phoneDisplay: '(888) 555-0148',
        phoneButtonText: 'Start Request',
        email: 'hello@moldwise.com',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM'
    },

    pages: {
        home: 'index.html',
        about: 'about.html',
        services: 'all-services.html',
        contact: 'contact.html',
        privacy: 'privacy-policy.html',
        terms: 'terms-of-service.html',
        cookies: 'cookie-policy.html'
    },

    images: {
        heroHome: 'assets/images/hero-home.jpg',
        heroAbout: 'assets/images/hero-about.jpg',
        heroServices: 'assets/images/hero-services.jpg',
        heroContact: 'assets/images/hero-contact.jpg',
        aboutOverlapMain: 'assets/images/about-overlap-main.jpg',
        aboutOverlapSmall: 'assets/images/about-overlap-small.jpg',
        aboutCircleFront: 'assets/images/about-circle-front.jpg',
        aboutCircleBack: 'assets/images/about-circle-back.jpg',
        trustProviderComparison: 'assets/images/trust-provider-comparison.jpg',
        contactNext: 'assets/images/contact-next.jpg',
        contactFormBg: 'assets/images/contact-form-bg.jpg',
        finalCta: 'assets/images/final-cta.jpg'
    },

    services: [
        {
            title: 'Mold Remediation',
            shortTitle: 'Remediation',
            file: 'mold-remediation.html',
            icon: 'shield-check',
            image: 'assets/images/service-mold-remediation.jpg',
            heroImage: 'assets/images/hero-mold-remediation.jpg',
            description: 'Compare local provider options for mold remediation needs in affected indoor areas.',
            purpose: 'Review available provider options for mold-related concerns in affected indoor spaces.',
            metaDescription: 'Start a MoldWise request and compare local provider options for mold remediation needs in affected indoor areas.'
        },
        {
            title: 'Mold Inspection',
            shortTitle: 'Inspection',
            file: 'mold-inspection.html',
            icon: 'search-check',
            image: 'assets/images/service-mold-inspection.jpg',
            heroImage: 'assets/images/hero-mold-inspection.jpg',
            description: 'Find available providers who can evaluate visible mold concerns and moisture-related warning signs.',
            purpose: 'Connect with provider options for evaluating visible mold concerns and moisture-related warning signs.',
            metaDescription: 'Compare provider options for mold inspection requests involving visible concerns, odors, stains, or moisture warning signs.'
        },
        {
            title: 'Mold Testing',
            shortTitle: 'Testing',
            file: 'mold-testing.html',
            icon: 'flask-conical',
            image: 'assets/images/service-mold-testing.jpg',
            heroImage: 'assets/images/hero-mold-testing.jpg',
            description: 'Connect with provider options for air or surface testing when more information is needed.',
            purpose: 'Review provider options for air or surface testing when homeowners want more information.',
            metaDescription: 'Start a mold testing request through MoldWise and compare local provider options for air or surface testing needs.'
        },
        {
            title: 'Black Mold Concerns',
            shortTitle: 'Black Mold',
            file: 'black-mold-concerns.html',
            icon: 'alert-triangle',
            image: 'assets/images/service-black-mold.jpg',
            heroImage: 'assets/images/hero-black-mold-concerns.jpg',
            description: 'Start a request related to dark mold growth concerns and compare available local provider options.',
            purpose: 'Submit a dark mold growth concern and compare available local provider options.',
            metaDescription: 'Submit a black mold concern through MoldWise and compare available provider options for dark mold growth concerns.'
        },
        {
            title: 'Basement Mold Help',
            shortTitle: 'Basement Mold',
            file: 'basement-mold-help.html',
            icon: 'home',
            image: 'assets/images/service-basement-mold.jpg',
            heroImage: 'assets/images/hero-basement-mold-help.jpg',
            description: 'Compare options for damp basement areas, musty odors, wall growth, and moisture-linked mold concerns.',
            purpose: 'Review provider options for damp basement areas, musty odors, wall growth, and moisture-linked concerns.',
            metaDescription: 'Compare local provider options for basement mold help, damp basement concerns, musty odors, and moisture-linked mold issues.'
        },
        {
            title: 'Moisture & Mold Prevention',
            shortTitle: 'Prevention',
            file: 'moisture-mold-prevention.html',
            icon: 'droplets',
            image: 'assets/images/service-prevention.jpg',
            heroImage: 'assets/images/hero-moisture-mold-prevention.jpg',
            description: 'Review provider options for moisture control, ventilation improvements, and mold prevention planning.',
            purpose: 'Compare provider options for moisture control, ventilation improvements, and prevention planning.',
            metaDescription: 'Use MoldWise to compare provider options for moisture control, ventilation improvements, and mold prevention planning.'
        }
    ],

    concernCategories: [
        {
            title: 'Visible mold growth',
            icon: 'scan-search',
            label: 'Visible concern',
            description: 'Share where the growth appears and review provider options that may fit the affected area.',
            nextStep: 'Start with photos, room details, and when the concern first appeared.'
        },
        {
            title: 'Musty odors',
            icon: 'wind',
            label: 'Odor concern',
            description: 'Musty smells can be connected to moisture, hidden materials, or ventilation concerns.',
            nextStep: 'Describe the room, odor pattern, and any recent leaks or humidity changes.'
        },
        {
            title: 'Basement dampness',
            icon: 'home',
            label: 'Lower-level moisture',
            description: 'Damp basements can involve moisture source questions, surface growth, or prevention planning.',
            nextStep: 'Mention wall stains, flooring type, drainage concerns, or recurring humidity.'
        },
        {
            title: 'Moisture stains',
            icon: 'droplets',
            label: 'Water sign',
            description: 'Stains near ceilings, walls, or windows may help providers understand the request context.',
            nextStep: 'Include location, size, and whether the area feels damp or has changed recently.'
        },
        {
            title: 'Black mold concerns',
            icon: 'alert-triangle',
            label: 'Dark growth concern',
            description: 'Dark spots can be reviewed with participating providers who handle mold-related requests.',
            nextStep: 'Avoid making assumptions and compare provider options for next steps.'
        },
        {
            title: 'Post-leak mold risk',
            icon: 'waves',
            label: 'After water event',
            description: 'Recent leaks or flooding can create questions about affected materials and timing.',
            nextStep: 'Describe the leak source, timeline, room, and visible material changes.'
        }
    ],

    problemSelector: [
        {
            title: 'Musty odor',
            tab: 'Musty odor',
            icon: 'wind',
            image: 'assets/images/service-mold-inspection.jpg',
            description: 'A persistent odor can help frame your request for participating providers.',
            detail: 'Include where the smell is strongest, whether it changes during the day, and if there has been any recent water issue.',
            nextStep: 'Start a request and compare provider options for evaluation or testing questions.'
        },
        {
            title: 'Basement dampness',
            tab: 'Basement dampness',
            icon: 'home',
            image: 'assets/images/service-basement-mold.jpg',
            description: 'Basements often involve moisture patterns, ventilation, and visible surface changes.',
            detail: 'Mention wall stains, floor dampness, humidity, storage areas, and any recurring seasonal pattern.',
            nextStep: 'Review providers that may discuss basement mold and moisture-related concerns.'
        },
        {
            title: 'Wall spots',
            tab: 'Wall spots',
            icon: 'scan-line',
            image: 'assets/images/service-mold-remediation.jpg',
            description: 'Spots on walls or ceilings may require context about moisture, materials, and area size.',
            detail: 'Describe the surface, room, approximate size, and whether the area is expanding or changing.',
            nextStep: 'Compare provider options and ask about scope, testing, or moisture-source discussion.'
        },
        {
            title: 'Post-leak concern',
            tab: 'Post-leak concern',
            icon: 'waves',
            image: 'assets/images/service-prevention.jpg',
            description: 'After a leak, homeowners often want to understand what provider options are available.',
            detail: 'Include the leak timeline, affected materials, and whether drying or repair has already happened.',
            nextStep: 'Submit the request details and review available local options.'
        },
        {
            title: 'Testing questions',
            tab: 'Testing questions',
            icon: 'flask-conical',
            image: 'assets/images/service-mold-testing.jpg',
            description: 'Testing may be discussed when homeowners want more information before deciding on next steps.',
            detail: 'Mention whether you are asking about air testing, surface testing, or provider recommendations.',
            nextStep: 'Compare provider options and ask each provider about their testing approach and terms.'
        }
    ],

    processSteps: [
        {
            title: 'Submit your mold concern',
            icon: 'clipboard-list',
            description: 'Share the room, visible signs, odor concerns, moisture history, and service category.'
        },
        {
            title: 'Review available provider options',
            icon: 'list-checks',
            description: 'MoldWise helps organize the request so participating providers may be easier to compare.'
        },
        {
            title: 'Compare details',
            icon: 'columns-3',
            description: 'Ask about availability, scope, testing, pricing details, and provider terms.'
        },
        {
            title: 'Choose whether to continue',
            icon: 'check-check',
            description: 'You decide whether to move forward with any participating provider.'
        }
    ],

    comparisonPoints: [
        'Availability',
        'Service area',
        'Pricing details',
        'Inspection or testing options',
        'Moisture source discussion',
        'Provider terms',
        'Licensing and insurance verification where required'
    ],

    faqs: {
        home: [
            {
                question: 'Does MoldWise perform mold remediation directly?',
                answer: 'No. MoldWise is an independent provider-matching platform. The actual inspection, testing, remediation, scheduling, pricing, and service terms are handled by participating providers.'
            },
            {
                question: 'What happens after I submit a request?',
                answer: 'Your request details may be used to help connect you with participating providers. Providers may contact you to discuss availability, scope, pricing, and next steps.'
            },
            {
                question: 'Can I compare more than one provider?',
                answer: 'Yes. MoldWise is designed to help homeowners review available provider options before deciding whether to continue.'
            },
            {
                question: 'What affects mold remediation pricing?',
                answer: 'Pricing may depend on the affected area, materials, moisture source, testing needs, provider availability, and final provider terms.'
            },
            {
                question: 'Should I ask providers about testing or moisture sources?',
                answer: 'Yes. It is reasonable to ask participating providers how they approach testing questions, moisture-source discussion, scope, and follow-up terms.'
            }
        ],

        about: [
            {
                question: 'Is MoldWise a mold remediation company?',
                answer: 'No. MoldWise is an independent platform that helps homeowners organize requests and compare provider options.'
            },
            {
                question: 'Why compare providers?',
                answer: 'Comparing providers can help you review availability, service area, scope, pricing details, and provider terms before making a decision.'
            },
            {
                question: 'Does MoldWise guarantee provider work?',
                answer: 'No. Providers are independent, and final agreements, warranties, licensing, insurance, and service outcomes are between the homeowner and the provider.'
            },
            {
                question: 'Should I verify provider details?',
                answer: 'Yes. Homeowners should verify licensing, insurance, credentials, and terms where required before hiring any provider.'
            }
        ],

        contact: [
            {
                question: 'Will I be contacted by providers?',
                answer: 'Participating providers may contact you after you submit your request details.'
            },
            {
                question: 'Does submitting a form create an agreement?',
                answer: 'No. Submitting a request does not create a service agreement. Final terms are between you and any provider you choose.'
            },
            {
                question: 'Can I ask about testing first?',
                answer: 'Yes. You can describe your testing questions in the message field and ask providers about their approach.'
            },
            {
                question: 'Should I verify licensing and insurance?',
                answer: 'Yes. You should verify licensing, insurance, and other provider details where required.'
            },
            {
                question: 'Can availability vary by area?',
                answer: 'Yes. Availability, pricing, scheduling, and service categories may vary by location and provider.'
            }
        ]
    },

    servicePageContent: {
        'mold-remediation.html': {
            eyebrow: 'Provider options for affected areas',
            heroTitle: 'Compare mold remediation provider options',
            heroText: 'Submit your mold concern and review available local provider options for affected indoor areas.',
            overviewTitle: 'Mold remediation requests can involve different rooms, materials, and moisture patterns.',
            overviewText: 'MoldWise helps homeowners organize the concern before comparing participating provider options. Final scope, pricing, schedule, and service terms are handled by independent providers.',
            factorsTitleOne: 'Affected materials and moisture history matter',
            factorsTextOne: 'Providers may ask about drywall, flooring, ceilings, previous leaks, humidity, and whether the affected area is changing.',
            factorsTitleTwo: 'Compare scope before moving forward',
            factorsTextTwo: 'Ask each provider about proposed scope, moisture-source discussion, timing, pricing details, and final terms.',
            faq: [
                {
                    question: 'Does MoldWise remove mold?',
                    answer: 'No. MoldWise does not perform remediation. It helps homeowners compare participating provider options.'
                },
                {
                    question: 'What details should I include?',
                    answer: 'Include room type, visible growth, odor, moisture history, affected materials, and approximate area size.'
                },
                {
                    question: 'Who provides the final price?',
                    answer: 'Final pricing is provided by the participating provider, not MoldWise.'
                },
                {
                    question: 'Can I ask about moisture sources?',
                    answer: 'Yes. Ask providers how they discuss moisture sources and prevention-related follow-up.'
                },
                {
                    question: 'Do providers vary by area?',
                    answer: 'Yes. Availability and terms may vary by location and provider.'
                },
                {
                    question: 'Should I verify credentials?',
                    answer: 'Yes. Homeowners should verify licensing, insurance, and provider details where required.'
                }
            ]
        },

        'mold-inspection.html': {
            eyebrow: 'Visible signs and moisture concerns',
            heroTitle: 'Compare mold inspection provider options',
            heroText: 'Start a request for visible concerns, musty odors, moisture stains, or related warning signs.',
            overviewTitle: 'Inspection requests often start with visible signs, odor, or moisture history.',
            overviewText: 'MoldWise helps organize your request so you can review available provider options and ask informed questions before deciding whether to continue.',
            factorsTitleOne: 'Visible signs help frame the request',
            factorsTextOne: 'Providers may ask about stains, spots, odors, water events, room conditions, and whether the concern is recurring.',
            factorsTitleTwo: 'Ask what the evaluation includes',
            factorsTextTwo: 'Compare what each provider says about visual review, moisture discussion, testing recommendations, and written terms.',
            faq: [
                {
                    question: 'Does MoldWise inspect homes?',
                    answer: 'No. MoldWise does not inspect homes directly. It helps connect users with participating provider options.'
                },
                {
                    question: 'What can I describe in the request?',
                    answer: 'Describe visible signs, musty smells, water stains, room location, and any recent leaks.'
                },
                {
                    question: 'Can inspection and testing be separate?',
                    answer: 'Provider approaches vary, so you should ask each provider what is included.'
                },
                {
                    question: 'Will providers contact me?',
                    answer: 'Participating providers may contact you to discuss availability and next steps.'
                },
                {
                    question: 'Does submitting a request commit me?',
                    answer: 'No. Submitting a request does not create a service agreement.'
                },
                {
                    question: 'Who handles final terms?',
                    answer: 'Final pricing, scheduling, and terms are handled by participating providers.'
                }
            ]
        },

        'mold-testing.html': {
            eyebrow: 'Air or surface testing questions',
            heroTitle: 'Compare mold testing provider options',
            heroText: 'Review available provider options for testing questions when more information is needed.',
            overviewTitle: 'Testing questions may involve air samples, surface samples, or provider recommendations.',
            overviewText: 'MoldWise helps homeowners submit testing-related concerns and compare participating provider options without implying any direct testing service by MoldWise.',
            factorsTitleOne: 'Testing approach can vary by provider',
            factorsTextOne: 'Ask whether a provider discusses air testing, surface testing, reporting, timing, and how results may be used.',
            factorsTitleTwo: 'Clarify what is included',
            factorsTextTwo: 'Before continuing, compare pricing details, service area, reporting format, and whether follow-up options are available.',
            faq: [
                {
                    question: 'Does MoldWise perform mold testing?',
                    answer: 'No. MoldWise does not perform testing directly. Participating providers handle testing-related services and terms.'
                },
                {
                    question: 'Can I ask about air or surface testing?',
                    answer: 'Yes. Include your testing questions in the request so providers can discuss their approach.'
                },
                {
                    question: 'Do all providers test the same way?',
                    answer: 'No. Testing approach, reporting, pricing, and timing may vary by provider.'
                },
                {
                    question: 'Who explains the testing terms?',
                    answer: 'Participating providers explain their own testing terms, scope, and pricing.'
                },
                {
                    question: 'Does testing create a remediation agreement?',
                    answer: 'No. Any service agreement is between you and the provider you choose.'
                },
                {
                    question: 'Should I compare reporting details?',
                    answer: 'Yes. Ask about what type of report or follow-up information may be included.'
                }
            ]
        },

        'black-mold-concerns.html': {
            eyebrow: 'Dark growth concerns',
            heroTitle: 'Compare provider options for black mold concerns',
            heroText: 'Submit a dark mold growth concern and review available provider options in your area.',
            overviewTitle: 'Dark growth concerns should be described clearly without assumptions.',
            overviewText: 'MoldWise helps homeowners organize dark mold concern requests and compare provider options. Participating providers handle evaluation, testing, scope, pricing, and final terms.',
            factorsTitleOne: 'Location and context are important',
            factorsTextOne: 'Mention where the dark growth appears, whether moisture is present, and if there has been a recent leak or humidity issue.',
            factorsTitleTwo: 'Ask providers about next steps',
            factorsTextTwo: 'Compare how providers discuss evaluation, testing questions, containment, scope, availability, and terms.',
            faq: [
                {
                    question: 'Does MoldWise identify black mold?',
                    answer: 'No. MoldWise does not identify, test, diagnose, or inspect. Participating providers handle their own evaluations and terms.'
                },
                {
                    question: 'What should I include in the request?',
                    answer: 'Include location, visible appearance, moisture history, odor, and whether the affected area is changing.'
                },
                {
                    question: 'Can I ask providers about testing?',
                    answer: 'Yes. Ask participating providers whether testing is recommended and what their approach includes.'
                },
                {
                    question: 'Is MoldWise a medical provider?',
                    answer: 'No. MoldWise does not provide medical guidance or health-related guarantees.'
                },
                {
                    question: 'Who determines the final scope?',
                    answer: 'Participating providers determine their own proposed scope and terms.'
                },
                {
                    question: 'Should I compare multiple options?',
                    answer: 'Yes. Comparing options can help you review availability, scope, pricing, and provider terms.'
                }
            ]
        },

        'basement-mold-help.html': {
            eyebrow: 'Basement moisture and mold concerns',
            heroTitle: 'Compare basement mold provider options',
            heroText: 'Review options for damp basement areas, musty odors, wall growth, and moisture-linked mold concerns.',
            overviewTitle: 'Basement concerns often involve moisture patterns and ventilation questions.',
            overviewText: 'MoldWise helps homeowners describe damp basement concerns and compare available provider options for next steps.',
            factorsTitleOne: 'Moisture patterns can shape the request',
            factorsTextOne: 'Providers may ask about wall stains, humidity, floor dampness, storage areas, drainage concerns, or previous water events.',
            factorsTitleTwo: 'Compare prevention-related discussion',
            factorsTextTwo: 'Ask providers how they discuss ventilation, recurring moisture, material conditions, and prevention planning.',
            faq: [
                {
                    question: 'Does MoldWise fix basement mold directly?',
                    answer: 'No. MoldWise is an independent provider-matching platform and does not perform basement services.'
                },
                {
                    question: 'What basement details help?',
                    answer: 'Mention musty odors, damp walls, visible spots, water history, humidity, and affected materials.'
                },
                {
                    question: 'Can providers discuss moisture control?',
                    answer: 'Provider approaches vary, so ask each provider about moisture control or prevention planning.'
                },
                {
                    question: 'Can availability vary?',
                    answer: 'Yes. Availability, scope, pricing, and service terms vary by provider and location.'
                },
                {
                    question: 'Does submitting a request create an agreement?',
                    answer: 'No. Final agreements are between the homeowner and participating provider.'
                },
                {
                    question: 'Should I verify provider details?',
                    answer: 'Yes. Verify licensing, insurance, and provider terms where required.'
                }
            ]
        },

        'moisture-mold-prevention.html': {
            eyebrow: 'Moisture control and prevention planning',
            heroTitle: 'Compare moisture and mold prevention options',
            heroText: 'Review provider options for moisture control, ventilation improvements, and mold prevention planning.',
            overviewTitle: 'Prevention requests often focus on moisture conditions and recurring patterns.',
            overviewText: 'MoldWise helps homeowners organize prevention-related concerns and compare participating provider options for moisture and mold planning.',
            factorsTitleOne: 'Recurring moisture deserves clear context',
            factorsTextOne: 'Describe humidity, ventilation, window condensation, past leaks, basement dampness, and affected materials.',
            factorsTitleTwo: 'Ask about prevention-related scope',
            factorsTextTwo: 'Compare what providers say about moisture control, ventilation, repair coordination, pricing, availability, and final terms.',
            faq: [
                {
                    question: 'Does MoldWise provide prevention work?',
                    answer: 'No. MoldWise does not perform prevention work directly. It helps users compare provider options.'
                },
                {
                    question: 'What prevention concerns can I submit?',
                    answer: 'You can describe moisture, humidity, ventilation concerns, past leaks, or recurring mold-related signs.'
                },
                {
                    question: 'Can providers discuss ventilation?',
                    answer: 'Participating providers may discuss their own approach and terms, which can vary.'
                },
                {
                    question: 'Who gives final recommendations?',
                    answer: 'Participating providers provide their own scope, recommendations, pricing, and terms.'
                },
                {
                    question: 'Should I compare more than price?',
                    answer: 'Yes. Compare scope, moisture discussion, availability, terms, and provider details.'
                },
                {
                    question: 'Is MoldWise responsible for provider work?',
                    answer: 'No. Providers are independent, and MoldWise does not warrant or guarantee provider work.'
                }
            ]
        }
    },

    legal: {
        privacy: 'privacy-policy.html',
        terms: 'terms-of-service.html',
        cookies: 'cookie-policy.html',
        disclaimer: 'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.'
    },

    footer: {
        description: 'MoldWise is an independent mold remediation provider-matching platform that helps homeowners compare available local provider options for mold-related concerns.',
        copyright: 'All rights reserved.'
    },

    form: {
        endpoint: 'contact.php',
        recipient: 'hello@moldwise.com',
        successMessage: 'Thank you. Your request has been received.',
        errorMessage: 'Please check the required fields and try again.'
    }
};