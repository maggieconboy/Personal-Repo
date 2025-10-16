// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Scroll-triggered animations for section visibility
function initScrollAnimations() {
    // Select all elements to animate
    const fadeElements = document.querySelectorAll('.scroll-fade-in');
    const staggerContainers = document.querySelectorAll('.stagger-children');
    const sectionTitles = document.querySelectorAll('.section-title');
    const animatedTitles = document.querySelectorAll('.section-title-animated');
    const animatedGrids = document.querySelectorAll('.metrics-grid, .initiatives-grid, .story-content, .brands-grid, .timeline-visual, .value-props');
    
    // Combine all elements and remove duplicates using Set
    const allElementsSet = new Set([
        ...fadeElements,
        ...staggerContainers,
        ...sectionTitles,
        ...animatedTitles,
        ...animatedGrids
    ]);
    
    const allElements = Array.from(allElementsSet);
    
    if (allElements.length === 0) return;
    
    // Create intersection observer with options
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 0px 0px', // Trigger when element enters viewport
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animations
                entry.target.classList.add('visible');
                
                // Optionally unobserve after animation triggers (better performance)
                // Comment out if you want animations to re-trigger on scroll up
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements
    allElements.forEach(element => observer.observe(element));
}



// Video intro handler
function initVideoIntro() {
    const videoIntro = document.getElementById('video-intro');
    const introVideo = document.getElementById('intro-video');
    const heroSection = document.querySelector('.hero');
    
    if (!videoIntro || !introVideo || !heroSection) {
        // If no video intro, show hero immediately
        if (heroSection) {
            heroSection.classList.add('visible');
        }
        return;
    }
    
    // Get video fade duration from CSS custom property
    const fadeDuration = parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--video-fade-duration')) * 1000 || 800;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip video for users who prefer reduced motion
        videoIntro.classList.add('hidden');
        introVideo.pause();
        heroSection.classList.add('visible');
        return;
    }
    
    // Handle video end event
    introVideo.addEventListener('ended', function() {
        // Hide video intro section
        videoIntro.classList.add('hidden');
        
        // After video fades out, show hero section with fade-in
        setTimeout(function() {
            heroSection.classList.add('visible');
            
            // Scroll to hero section smoothly
            heroSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, fadeDuration); // Wait for video fade-out transition
    });
    
    // Handle video error - skip to hero section
    introVideo.addEventListener('error', function() {
        console.error('Video failed to load, skipping to hero section');
        videoIntro.classList.add('hidden');
        heroSection.classList.add('visible');
        heroSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video intro
    initVideoIntro();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active state to navigation based on current page
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        if(item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
