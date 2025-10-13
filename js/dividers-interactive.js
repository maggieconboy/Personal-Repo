/* ===================================================================
   INTERACTIVE DIVIDERS JAVASCRIPT
   Intersection Observer for scroll-triggered animations (Concept 3)
   
   This script adds the 'visible' class to interactive divider elements
   when they come into view, triggering CSS animations.
   
   Target elements:
   - .divider-bold
   - .section-title-interactive
   =================================================================== */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initInteractiveDividers();
});

function initInteractiveDividers() {
    // Observer options
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    // Intersection Observer callback
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation triggers for better performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all interactive divider elements
    const dividerElements = document.querySelectorAll('.divider-bold, .section-title-interactive');
    
    dividerElements.forEach(el => {
        observer.observe(el);
    });
    
    // Log initialization for debugging
    if (dividerElements.length > 0) {
        console.log(`Interactive dividers initialized: ${dividerElements.length} elements`);
    }
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initInteractiveDividers };
}
