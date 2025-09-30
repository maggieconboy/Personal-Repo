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

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Analytics tracking
function trackProjectView(projectName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_project', {
            'project_name': projectName,
            'page_location': window.location.href
        });
    }
}
