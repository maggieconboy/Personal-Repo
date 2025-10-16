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
    let fadeDuration = 1000; // Default fallback (matches --video-fade-duration: 1s)
    try {
        const cssValue = getComputedStyle(document.documentElement)
            .getPropertyValue('--video-fade-duration');
        if (cssValue) {
            fadeDuration = parseFloat(cssValue) * 1000;
        }
    } catch (e) {
        console.warn('Could not read --video-fade-duration from CSS, using default 1000ms');
    }
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip video for users who prefer reduced motion
        videoIntro.classList.add('hidden');
        introVideo.pause();
        heroSection.classList.add('visible');
        return;
    }
    
    // Track whether video has been skipped/completed
    let videoCompleted = false;
    
    // Shared function to skip video and show hero section
    function skipToHeroSection() {
        if (videoCompleted) return; // Prevent multiple calls
        videoCompleted = true;
        
        // Pause video if playing
        if (!introVideo.paused) {
            introVideo.pause();
        }
        
        // Remove skip event listeners to prevent duplicate calls
        document.removeEventListener('keydown', handleSkipKey);
        videoIntro.removeEventListener('click', handleSkipClick);
        
        videoIntro.classList.add('hidden');
        
        // Show hero section after fade transition
        setTimeout(function() {
            heroSection.classList.add('visible');
            heroSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, fadeDuration);
    }
    
    // Function to fade out video and show hero
    function fadeOutAndShowHero() {
        if (videoCompleted) return; // Prevent multiple calls
        videoCompleted = true;
        
        console.log('Video ended, fading out and showing hero section');
        
        // Remove skip event listeners
        document.removeEventListener('keydown', handleSkipKey);
        videoIntro.removeEventListener('click', handleSkipClick);
        
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
    }
    
    // Skip handlers
    function handleSkipKey(e) {
        // Skip on any key press
        skipToHeroSection();
    }
    
    function handleSkipClick(e) {
        // Skip on click
        skipToHeroSection();
    }
    
    // Handle video end event
    introVideo.addEventListener('ended', fadeOutAndShowHero);
    
    // Handle video error - skip to hero section
    introVideo.addEventListener('error', function(e) {
        console.error('Video failed to load, skipping to hero section', e);
        skipToHeroSection();
    });
    
    // Wait for video metadata to load before attempting to play
    introVideo.addEventListener('loadedmetadata', function() {
        console.log('Video metadata loaded. Duration:', introVideo.duration, 'seconds');
        
        // Attempt to play the video
        const playPromise = introVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video is playing successfully
                console.log('Video intro is now playing');
                
                // Add skip event listeners after video starts playing
                document.addEventListener('keydown', handleSkipKey);
                videoIntro.addEventListener('click', handleSkipClick);
            }).catch(error => {
                // Autoplay was prevented - this is common in modern browsers
                console.warn('Video playback prevented:', error);
                skipToHeroSection();
            });
        }
    });
    
    // Fallback timeout: if video doesn't load or play within 3 seconds, skip to hero
    const fallbackTimeout = setTimeout(function() {
        if (!videoCompleted && (introVideo.readyState < 2 || introVideo.paused)) {
            console.warn('Video failed to load or play within timeout, skipping to hero section');
            skipToHeroSection();
        }
    }, 3000);
    
    // Clear fallback timeout when video starts playing
    introVideo.addEventListener('playing', function() {
        clearTimeout(fallbackTimeout);
    }, { once: true });
    
    // Trigger metadata load
    introVideo.load();
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
