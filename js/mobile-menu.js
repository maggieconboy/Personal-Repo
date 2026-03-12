// Mobile menu toggle functionality
// Used across all pages for consistent mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!isExpanded));
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!toggle.contains(event.target) && !menu.contains(event.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    }
});
