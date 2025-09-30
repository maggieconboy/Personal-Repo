// Revenue counter animation
function animateCounter() {
    const counter = document.querySelector('.revenue-counter');
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

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateCounter();
    animateSkills();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
