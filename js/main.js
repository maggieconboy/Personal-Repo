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



// Video intro onboarding sequence handler
function initVideoIntroOnboarding() {
    const onboardingContainer = document.getElementById('video-intro-onboarding');
    const videoPhase = document.getElementById('video-phase');
    const textPhase = document.getElementById('text-phase');
    const introVideo = document.getElementById('intro-video');
    const heroSection = document.querySelector('.hero');
    
    // Check if elements exist
    if (!onboardingContainer || !videoPhase || !textPhase || !introVideo || !heroSection) {
        // If no onboarding elements, show hero immediately
        if (heroSection) {
            heroSection.classList.add('visible');
        }
        return;
    }
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log('[Accessibility] User prefers reduced motion - skipping onboarding');
        onboardingContainer.style.display = 'none';
        heroSection.classList.add('visible');
        return;
    }
    
    // Timing constants (in milliseconds)
    const VIDEO_DURATION = 4000;           // 4 seconds
    const FADE_TO_BLACK_DURATION = 500;    // 0.5 seconds
    const TEXT_LINE_DELAYS = [
        4500,  // Line 1: "What's Up" at 4.5s
        5000,  // Line 2: "I'm Maggie Conboy" at 5.0s
        5800,  // Line 3: "A Product Manager" at 5.8s
        6600   // Line 4: "Based in Buffalo New York" at 6.6s
    ];
    const TOTAL_DURATION = 8000;           // 8 seconds total
    const TYPEWRITER_SPEED = 50;           // 50ms per character
    
    // Text content for typewriter
    const textLines = [
        "What's Up",
        "I'm Maggie Conboy",
        "A Product Manager",
        "Based in Buffalo New York"
    ];
    
    // Start timestamp
    const startTime = Date.now();
    
    // Log function with timestamp
    function logMilestone(message) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`[${elapsed}s] ${message}`);
    }
    
    // Typewriter effect function
    function typewriterEffect(element, text, speed) {
        return new Promise((resolve) => {
            element.textContent = '';
            element.classList.add('visible');
            
            let charIndex = 0;
            const intervalId = setInterval(() => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(intervalId);
                    resolve();
                }
            }, speed);
        });
    }
    
    // Sequence manager
    let sequenceCompleted = false;
    
    function completeSequence() {
        if (sequenceCompleted) return;
        sequenceCompleted = true;
        
        logMilestone('Transitioning to homepage');
        
        // Fade out onboarding container
        onboardingContainer.classList.add('fade-out');
        
        // Show hero section after fade
        setTimeout(() => {
            onboardingContainer.style.display = 'none';
            heroSection.classList.add('visible');
        }, 1000);
    }
    
    // Start sequence
    logMilestone('Video intro started');
    
    // Handle video end
    introVideo.addEventListener('ended', () => {
        logMilestone('Video ended, fading to black');
        
        // Fade out video phase
        videoPhase.classList.remove('active');
        videoPhase.classList.add('fade-out');
        
        // Activate text phase
        setTimeout(() => {
            textPhase.classList.add('active');
        }, FADE_TO_BLACK_DURATION);
    });
    
    // Handle video error
    introVideo.addEventListener('error', (e) => {
        console.error('Video failed to load:', e);
        completeSequence();
    });
    
    // Schedule typewriter animations
    textLines.forEach((text, index) => {
        const delay = TEXT_LINE_DELAYS[index] - (Date.now() - startTime);
        const lineElement = document.getElementById(`typewriter-line-${index + 1}`);
        
        setTimeout(async () => {
            await typewriterEffect(lineElement, text, TYPEWRITER_SPEED);
            logMilestone(`Line ${index + 1} complete: "${text}"`);
            
            // If this is the last line, schedule completion
            if (index === textLines.length - 1) {
                const remainingTime = TOTAL_DURATION - (Date.now() - startTime);
                setTimeout(completeSequence, Math.max(0, remainingTime));
            }
        }, Math.max(0, delay));
    });
    
    // Fallback timeout to ensure sequence completes
    setTimeout(() => {
        if (!sequenceCompleted) {
            console.warn('Sequence timeout - forcing completion');
            completeSequence();
        }
    }, TOTAL_DURATION + 2000); // 2 seconds buffer
    
    // Allow users to skip by clicking or pressing any key
    let skipHandled = false;
    
    function skipSequence() {
        if (skipHandled || sequenceCompleted) return;
        skipHandled = true;
        
        console.log('User skipped onboarding sequence');
        completeSequence();
    }
    
    onboardingContainer.addEventListener('click', skipSequence);
    document.addEventListener('keydown', function handleKeydown(e) {
        skipSequence();
        document.removeEventListener('keydown', handleKeydown);
    });
    
    // Attempt to play video
    const playPromise = introVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn('Video autoplay prevented:', error);
            completeSequence();
        });
    }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video intro onboarding
    initVideoIntroOnboarding();
    
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
