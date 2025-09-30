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
            <span class="close" onclick="closeDemo()">&times;</span>
            <video controls autoplay>
                <source src="${demoUrls[projectId]}" type="video/mp4">
            </video>
        </div>
    `;
    document.body.appendChild(modal);
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
