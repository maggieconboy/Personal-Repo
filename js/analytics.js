// ============================================================
// Google Analytics 4 — Site Analytics
// ============================================================
// SETUP REQUIRED: Replace 'G-XXXXXXXXXX' below with your
// Google Analytics Measurement ID.
// See ANALYTICS_SETUP.md for step-by-step instructions.
//
// Note: This Measurement ID will be visible in the public
// repository — that is normal and expected for client-side
// analytics. GA4 Measurement IDs are not sensitive secrets.
// ============================================================

var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// GitHub profile username — used to identify outbound GitHub clicks
var GITHUB_USERNAME = 'maggieconboy';

// Only run if the Measurement ID has been configured
if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {

    // Inject the Google Analytics script tag into <head>
    (function () {
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        document.head.appendChild(script);
    })();

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href
    });

    // --------------------------------------------------------
    // Custom Event Tracking — tracks meaningful interactions
    // --------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {

        // Track outbound link and email clicks
        document.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                var href = this.getAttribute('href') || '';
                var hostname = '';
                try {
                    hostname = new URL(href, window.location.href).hostname;
                } catch (e) {
                    return;
                }

                if (hostname === 'www.linkedin.com' || hostname === 'linkedin.com') {
                    gtag('event', 'outbound_click', {
                        event_category: 'Social',
                        event_label: 'LinkedIn'
                    });
                } else if ((hostname === 'github.com' || hostname === 'www.github.com') && href.indexOf(GITHUB_USERNAME) !== -1) {
                    gtag('event', 'outbound_click', {
                        event_category: 'Social',
                        event_label: 'GitHub Profile'
                    });
                } else if (href.indexOf('mailto:') === 0) {
                    gtag('event', 'contact_click', {
                        event_category: 'Contact',
                        event_label: 'Email'
                    });
                }
            });
        });

        // Track CTA button clicks (primary/secondary buttons and nav CTA)
        document.querySelectorAll('.btn, .cta-button-link, .nav-cta').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var label = (this.textContent || '').trim() ||
                            this.getAttribute('aria-label') ||
                            this.getAttribute('href') ||
                            'Unknown';
                gtag('event', 'cta_click', {
                    event_category: 'CTA',
                    event_label: label
                });
            });
        });

        // Track section visibility — fire once when key sections scroll into view
        var trackedSections = [
            { selector: '.hero', label: 'Hero' },
            { selector: '.metrics-grid', label: 'Metrics' },
            { selector: '.case-study', label: 'Case Study' },
            { selector: '.portfolio-section', label: 'Portfolio' },
            { selector: '.footer', label: 'Footer' }
        ];

        if ('IntersectionObserver' in window) {
            var sectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var sectionLabel = entry.target.getAttribute('data-analytics-label') || entry.target.className;
                        gtag('event', 'section_view', {
                            event_category: 'Engagement',
                            event_label: sectionLabel
                        });
                        sectionObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            trackedSections.forEach(function (item) {
                var el = document.querySelector(item.selector);
                if (el) {
                    el.setAttribute('data-analytics-label', item.label);
                    sectionObserver.observe(el);
                }
            });
        }

        // Track time on page using visibilitychange for reliable cross-browser/mobile support
        var pageStartTime = Date.now();
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                var secondsOnPage = Math.round((Date.now() - pageStartTime) / 1000);
                if (secondsOnPage > 3) {
                    // gtag() uses sendBeacon internally when available for reliable delivery
                    gtag('event', 'time_on_page', {
                        event_category: 'Engagement',
                        event_label: document.title,
                        value: secondsOnPage
                    });
                }
            }
        });
    });
}

