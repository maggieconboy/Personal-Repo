// Revenue counter animation
function animateCounter() {
    const counter = document.querySelector('.revenue-counter');
    if (!counter) return;
    
    const target = parseFloat(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const update = () => {
        current += step;
        if (current < target) {
            counter.textContent = current.toFixed(1);
            requestAnimationFrame(update);
        } else {
            counter.textContent = target.toFixed(1);
        }
    };
    
    // Start animation when in viewport
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            update();
            observer.disconnect();
        }
    });
    
    observer.observe(counter);
}

// Skill bars animation
function animateSkills() {
    const skills = document.querySelectorAll('.skill-fill');
    if (skills.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.width = `${level}%`;
            }
        });
    });
    
    skills.forEach(skill => observer.observe(skill));
}

// Demo player functionality
function playDemo(projectId) {
    const demoUrls = {
        'recommender': 'https://your-demo-url.com/recommender-demo.mp4',
        'pmo-space': 'https://your-demo-url.com/pmo-demo.mp4',
        'workflow': 'https://your-demo-url.com/workflow-demo.mp4',
        'dashboard': 'https://your-demo-url.com/dashboard-demo.mp4'
    };
    
    // Create modal with video player
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <video controls autoplay>
                <source src="${demoUrls[projectId]}" type="video/mp4">
            </video>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener for close button after modal is in DOM
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', closeDemo);
}

function closeDemo() {
    const modal = document.querySelector('.demo-modal');
    if (modal) {
        modal.remove();
    }
}

// Analytics tracking
function trackProjectView(projectName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_project', {
            'project_name': projectName,
            'page_location': window.location.href
        });
    }
}

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
    const animatedGrids = document.querySelectorAll('.metrics-grid, .initiatives-grid, .story-content, .brands-grid, .timeline-visual, .value-props');
    
    // Combine all elements and remove duplicates using Set
    const allElementsSet = new Set([
        ...fadeElements,
        ...staggerContainers,
        ...sectionTitles,
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

// Add subtle parallax effect to sections
function initParallaxEffect() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    if (parallaxSections.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxSections.forEach(section => {
                    const scrolled = window.pageYOffset;
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + scrolled;
                    const sectionHeight = rect.height;
                    
                    // Only apply parallax when section is in viewport
                    if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                        const offset = (scrolled - sectionTop) * 0.1; // Adjust multiplier for effect strength
                        section.style.transform = `translateY(${offset}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    animateCounter();
    animateSkills();
    
    // Initialize new scroll animations
    initScrollAnimations();
    initParallaxEffect();
    
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
