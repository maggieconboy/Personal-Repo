// Zendesk Personas Carousel Functionality

// Zendesk Personas data
const zendeskPersonas = [
    {
        name: 'Intro.pdf',
        title: 'Zendesk Personas Introduction',
        description: 'Overview and methodology for support persona development. This document introduces the research approach, key insights, and how these personas inform product strategy at Zendesk.',
        githubPath: 'Zendesk%20Personas/Intro.pdf'
    },
    {
        name: 'Support Engineer.pdf',
        title: 'Support Engineer Persona',
        description: 'Frontline support engineer persona with pain points and workflows. Represents the core technical support role handling day-to-day customer issues and product questions.',
        githubPath: 'Zendesk%20Personas/Support%20Engineer.pdf'
    },
    {
        name: 'Support Manager.pdf',
        title: 'Support Manager Persona',
        description: 'Support management persona focused on team coordination and metrics. Balances team leadership, operational efficiency, and strategic planning for support operations.',
        githubPath: 'Zendesk%20Personas/Support%20Manager.pdf'
    },
    {
        name: 'Customer Success Engineer.pdf',
        title: 'Customer Success Engineer Persona',
        description: 'Customer success role balancing technical support and relationship management. Bridges product expertise with proactive customer engagement and retention strategies.',
        githubPath: 'Zendesk%20Personas/Customer%20Success%20Engineer.pdf'
    },
    {
        name: 'Customer Reliability Engineer.pdf',
        title: 'Customer Reliability Engineer Persona',
        description: 'Technical reliability focus with proactive incident prevention. Specializes in system stability, monitoring, and preventing issues before they impact customers.',
        githubPath: 'Zendesk%20Personas/Customer%20Reliability%20Engineer.pdf'
    },
    {
        name: 'Security Analyst.pdf',
        title: 'Security Analyst Persona',
        description: 'Security-focused support persona handling sensitive customer issues. Manages security incidents, compliance questions, and threat response with specialized expertise.',
        githubPath: 'Zendesk%20Personas/Security%20Analyst.pdf'
    },
    {
        name: 'Specialty Support.pdf',
        title: 'Specialty Support Persona',
        description: 'Advanced technical support for specialized product areas. Deep expertise in specific Zendesk products or integrations, handling complex technical challenges.',
        githubPath: 'Zendesk%20Personas/Specialty%20Support.pdf'
    },
    {
        name: 'Trust and Safety Counsel.pdf',
        title: 'Trust and Safety Counsel Persona',
        description: 'Legal and policy-focused support for trust and safety issues. Handles sensitive content, policy violations, and legal compliance matters requiring specialized judgment.',
        githubPath: 'Zendesk%20Personas/Trust%20and%20Safety%20Counsel.pdf'
    },
    {
        name: 'Zendesk user insights at GitHub.pdf',
        title: 'Zendesk User Insights at GitHub',
        description: 'Additional insights and research findings from Zendesk implementation at GitHub. Real-world application of these personas in a large-scale support environment.',
        githubPath: 'Zendesk%20Personas/Zendesk%20user%20insights%20at%20GitHub.pdf'
    }
];

let swiperInstance = null;

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    populateCarousel();
    populateThumbnails();
    initializeSwiper();
    updatePersonaDetails(0);
});

// Populate carousel slides
function populateCarousel() {
    const carouselSlides = document.getElementById('carousel-slides');
    if (!carouselSlides) return;
    
    carouselSlides.innerHTML = zendeskPersonas.map((persona, index) => {
        const githubViewUrl = `https://github.com/maggieconboy/Personal-Repo/blob/main/${persona.githubPath}`;
        
        return `
            <div class="swiper-slide" data-index="${index}">
                <div class="slide-content">
                    <div class="slide-pdf-viewer">
                        <iframe 
                            src="${githubViewUrl}" 
                            class="pdf-embed"
                            loading="lazy"
                            title="${persona.title}">
                        </iframe>
                    </div>
                    <div class="slide-overlay">
                        <span class="slide-number">${index + 1} / ${zendeskPersonas.length}</span>
                        <h3 class="slide-title">${persona.title}</h3>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Populate thumbnail navigation
function populateThumbnails() {
    const thumbnailGrid = document.getElementById('thumbnail-grid');
    if (!thumbnailGrid) return;
    
    thumbnailGrid.innerHTML = zendeskPersonas.map((persona, index) => {
        return `
            <button 
                class="thumbnail-card ${index === 0 ? 'active' : ''}" 
                data-index="${index}"
                onclick="goToSlide(${index})"
                aria-label="Go to ${persona.title}">
                <div class="thumbnail-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                </div>
                <div class="thumbnail-info">
                    <span class="thumbnail-number">${index + 1}</span>
                    <span class="thumbnail-title">${persona.title}</span>
                </div>
            </button>
        `;
    }).join('');
}

// Initialize Swiper carousel
function initializeSwiper() {
    swiperInstance = new Swiper('.zendesk-carousel', {
        // Carousel settings
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        centeredSlides: true,
        
        // Keyboard navigation
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        
        // Mouse wheel
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1
        },
        
        // Touch settings
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Previous persona',
            nextSlideMessage: 'Next persona',
        },
        
        // Events
        on: {
            slideChange: function() {
                updatePersonaDetails(this.activeIndex);
                updateThumbnails(this.activeIndex);
                updateCounter(this.activeIndex);
            }
        }
    });
}

// Update persona details below carousel
function updatePersonaDetails(index) {
    const persona = zendeskPersonas[index];
    if (!persona) return;
    
    const personaDetails = document.getElementById('persona-details');
    if (!personaDetails) return;
    
    const personaName = personaDetails.querySelector('.persona-name');
    const personaDescription = personaDetails.querySelector('.persona-description');
    const viewGithub = document.getElementById('view-github');
    const downloadPdf = document.getElementById('download-pdf');
    
    if (personaName) personaName.textContent = persona.title;
    if (personaDescription) personaDescription.textContent = persona.description;
    
    const githubViewUrl = `https://github.com/maggieconboy/Personal-Repo/blob/main/${persona.githubPath}`;
    const githubRawUrl = `https://github.com/maggieconboy/Personal-Repo/raw/main/${persona.githubPath}`;
    
    if (viewGithub) viewGithub.href = githubViewUrl;
    if (downloadPdf) {
        downloadPdf.href = githubRawUrl;
        downloadPdf.download = persona.name;
    }
}

// Update thumbnail active state
function updateThumbnails(index) {
    const thumbnails = document.querySelectorAll('.thumbnail-card');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
    
    // Scroll active thumbnail into view
    const activeThumbnail = thumbnails[index];
    if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'center'
        });
    }
}

// Update counter display
function updateCounter(index) {
    const currentSlide = document.querySelector('.current-slide');
    if (currentSlide) {
        currentSlide.textContent = index + 1;
    }
}

// Navigate to specific slide
function goToSlide(index) {
    if (swiperInstance) {
        swiperInstance.slideTo(index);
    }
}

// Set total slides count
document.addEventListener('DOMContentLoaded', function() {
    const totalSlides = document.querySelector('.total-slides');
    if (totalSlides) {
        totalSlides.textContent = zendeskPersonas.length;
    }
});
