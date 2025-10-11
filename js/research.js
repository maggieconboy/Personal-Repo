// Research & Deliverables Page Functionality

// Artifact data structure with auto-discovery metadata
const artifactsData = {
    'Revenue Systems Work': [
        {
            name: 'Revenue.Systems.User.Personas.v1.Final.pdf',
            title: 'User Personas',
            description: 'Six user personas developed from 30+ seller interviews at GitHub',
            type: 'persona',
            featured: true,
            githubPath: 'Revenue%20Systems%20Work/Revenue.Systems.User.Personas.v1.Final.pdf'
        },
        {
            name: 'Seller Journey Mapping (1).pdf',
            title: 'Seller Journey Mapping',
            description: 'Daily workflows, friction points, and opportunity areas for sales teams',
            type: 'journey',
            featured: true,
            githubPath: 'Revenue%20Systems%20Work/Seller%20Journey%20Mapping%20(1).pdf'
        },
        {
            name: 'Revenue Systems - Make It Make Sense (1).pdf',
            title: 'Workflow Exploration',
            description: 'Core revenue systems workflows documenting cross-team inefficiencies',
            type: 'workflow',
            featured: true,
            githubPath: 'Revenue%20Systems%20Work/Revenue%20Systems%20-%20Make%20It%20Make%20Sense%20(1).pdf'
        }
    ],
    'Customer Comms Tooling': [
        {
            name: 'Goldcast Tool Map.pdf',
            title: 'Goldcast Tool Map',
            description: 'Event marketing platform integration and workflow mapping',
            type: 'tool-map',
            featured: false,
            githubPath: 'Customer%20Comms%20Tooling/Goldcast%20Tool%20Map.pdf'
        },
        {
            name: 'Rainfocus Tool Map.pdf',
            title: 'Rainfocus Tool Map',
            description: 'Event management and registration platform analysis',
            type: 'tool-map',
            featured: false,
            githubPath: 'Customer%20Comms%20Tooling/Rainfocus%20Tool%20Map.pdf'
        },
        {
            name: 'Total Emails Sent Per Month By Platform.pdf',
            title: 'Email Volume Analysis',
            description: 'Comprehensive email platform usage metrics and trends',
            type: 'tool-map',
            featured: false,
            githubPath: 'Customer%20Comms%20Tooling/Total%20Emails%20Sent%20Per%20Month%20By%20Platform.pdf'
        },
        {
            name: 'Total Emails Sent Per Month By Platform2.pdf',
            title: 'Email Volume Analysis (Extended)',
            description: 'Extended email platform metrics across customer communication tools',
            type: 'tool-map',
            featured: false,
            githubPath: 'Customer%20Comms%20Tooling/Total%20Emails%20Sent%20Per%20Month%20By%20Platform2.pdf'
        },
        {
            name: 'Total Emails Sent Per Month.pdf',
            title: 'Monthly Email Metrics',
            description: 'Aggregate email send volume across all platforms',
            type: 'tool-map',
            featured: false,
            githubPath: 'Customer%20Comms%20Tooling/Total%20Emails%20Sent%20Per%20Month.pdf'
        },
        {
            name: 'Outreach Tool Map.pdf',
            title: 'Outreach Tool Map',
            description: 'Sales engagement platform workflow and integration mapping',
            type: 'tool-map',
            featured: false,
            githubPath: 'Customer%20Comms%20Tooling/Outreach%20Tool%20Map.pdf'
        },
        {
            name: 'Swoogo Tool Map.pdf',
            title: 'Swoogo Tool Map',
            description: 'Event management platform integration analysis',
            type: 'tool-map',
            featured: false,
            githubPath: 'Customer%20Comms%20Tooling/Swoogo%20Tool%20Map.pdf'
        }
    ],
    'Zendesk Personas': [
        {
            name: 'Intro.pdf',
            title: 'Zendesk Personas Introduction',
            description: 'Overview and methodology for support persona development',
            type: 'persona',
            featured: false,
            githubPath: 'Zendesk%20Personas/Intro.pdf'
        },
        {
            name: 'Support Engineer.pdf',
            title: 'Support Engineer Persona',
            description: 'Frontline support engineer persona with pain points and workflows',
            type: 'persona',
            featured: true,
            githubPath: 'Zendesk%20Personas/Support%20Engineer.pdf'
        },
        {
            name: 'Support Manager.pdf',
            title: 'Support Manager Persona',
            description: 'Support management persona focused on team coordination and metrics',
            type: 'persona',
            featured: false,
            githubPath: 'Zendesk%20Personas/Support%20Manager.pdf'
        },
        {
            name: 'Customer Success Engineer.pdf',
            title: 'Customer Success Engineer Persona',
            description: 'Customer success role balancing technical support and relationship management',
            type: 'persona',
            featured: false,
            githubPath: 'Zendesk%20Personas/Customer%20Success%20Engineer.pdf'
        },
        {
            name: 'Customer Reliability Engineer.pdf',
            title: 'Customer Reliability Engineer Persona',
            description: 'Technical reliability focus with proactive incident prevention',
            type: 'persona',
            featured: false,
            githubPath: 'Zendesk%20Personas/Customer%20Reliability%20Engineer.pdf'
        },
        {
            name: 'Security Analyst.pdf',
            title: 'Security Analyst Persona',
            description: 'Security-focused support persona handling sensitive customer issues',
            type: 'persona',
            featured: false,
            githubPath: 'Zendesk%20Personas/Security%20Analyst.pdf'
        },
        {
            name: 'Specialty Support.pdf',
            title: 'Specialty Support Persona',
            description: 'Advanced technical support for specialized product areas',
            type: 'persona',
            featured: false,
            githubPath: 'Zendesk%20Personas/Specialty%20Support.pdf'
        },
        {
            name: 'Trust and Safety Counsel.pdf',
            title: 'Trust and Safety Counsel Persona',
            description: 'Legal and policy-focused support for trust and safety issues',
            type: 'persona',
            featured: false,
            githubPath: 'Zendesk%20Personas/Trust%20and%20Safety%20Counsel.pdf'
        }
    ]
};

// Flatten all artifacts for easy access
let allArtifacts = [];
Object.keys(artifactsData).forEach(folder => {
    artifactsData[folder].forEach(artifact => {
        allArtifacts.push({
            ...artifact,
            folder: folder,
            collectionId: folder === 'Revenue Systems Work' ? 'revenue-systems' : 
                         folder === 'Customer Comms Tooling' ? 'customer-comms' : 'zendesk'
        });
    });
});

// Current filter state
let currentFilters = {
    folder: 'all',
    type: 'all',
    keyword: ''
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedArtifacts();
    renderCollections();
    initializeFilters();
    initializeCollectionToggles();
    initializeModal();
});

// Render featured artifacts
function renderFeaturedArtifacts() {
    const featuredGrid = document.getElementById('featured-grid');
    if (!featuredGrid) return;
    
    const featured = allArtifacts.filter(a => a.featured);
    
    featuredGrid.innerHTML = featured.map(artifact => createArtifactCard(artifact, true)).join('');
}

// Render collection grids
function renderCollections() {
    Object.keys(artifactsData).forEach(folder => {
        const grid = document.querySelector(`.collection-grid[data-folder="${folder}"]`);
        if (!grid) return;
        
        const artifacts = artifactsData[folder];
        grid.innerHTML = artifacts.map(artifact => {
            const fullArtifact = {
                ...artifact,
                folder: folder,
                collectionId: folder === 'Revenue Systems Work' ? 'revenue-systems' : 
                             folder === 'Customer Comms Tooling' ? 'customer-comms' : 'zendesk'
            };
            return createArtifactCard(fullArtifact, false);
        }).join('');
    });
}

// Create artifact card HTML
function createArtifactCard(artifact, isFeatured) {
    const githubViewUrl = `https://github.com/maggieconboy/Personal-Repo/blob/main/${artifact.githubPath}`;
    const githubRawUrl = `https://github.com/maggieconboy/Personal-Repo/raw/main/${artifact.githubPath}`;
    
    const typeClass = `type-${artifact.type}`;
    const cardClass = isFeatured ? 'artifact-card featured' : 'artifact-card';
    
    // Use Mozilla PDF.js viewer with GitHub raw URL to show PDF preview
    const pdfViewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(githubRawUrl)}`;
    
    return `
        <div class="${cardClass}" data-type="${artifact.type}" data-collection="${artifact.collectionId}">
            <div class="artifact-preview">
                <div class="artifact-pdf-preview" data-pdf="${githubRawUrl}">
                    <iframe src="${pdfViewerUrl}" class="pdf-preview-embed" loading="lazy"></iframe>
                </div>
                <div class="artifact-type-badge">${formatType(artifact.type)}</div>
            </div>
            <div class="artifact-content">
                <h3 class="artifact-title">${artifact.title}</h3>
                <p class="artifact-description">${artifact.description}</p>
                <div class="artifact-meta">
                    <span class="artifact-collection">${artifact.folder}</span>
                </div>
                <div class="artifact-actions">
                    <button class="btn btn-primary btn-small" onclick="openArtifactModal('${artifact.githubPath}', '${artifact.title}', '${artifact.type}')">
                        View Details
                    </button>
                    <a href="${githubViewUrl}" target="_blank" class="btn btn-secondary btn-small">
                        Open in GitHub
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Get icon SVG based on artifact type
function getTypeIcon(type) {
    const icons = {
        'persona': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>`,
        'journey': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>`,
        'workflow': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>`,
        'tool-map': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>`
    };
    return icons[type] || icons['workflow'];
}

// Format type for display
function formatType(type) {
    const typeMap = {
        'persona': 'Persona',
        'journey': 'Journey Map',
        'workflow': 'Workflow',
        'tool-map': 'Tool Map'
    };
    return typeMap[type] || type;
}

// Initialize filter controls
function initializeFilters() {
    const folderFilter = document.getElementById('folder-filter');
    const typeFilter = document.getElementById('type-filter');
    const keywordSearch = document.getElementById('keyword-search');
    
    if (folderFilter) {
        folderFilter.addEventListener('change', function() {
            currentFilters.folder = this.value;
            applyFilters();
        });
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            currentFilters.type = this.value;
            applyFilters();
        });
    }
    
    if (keywordSearch) {
        keywordSearch.addEventListener('input', function() {
            currentFilters.keyword = this.value.toLowerCase();
            applyFilters();
        });
    }
}

// Apply filters to artifacts
function applyFilters() {
    const allCards = document.querySelectorAll('.artifact-card');
    
    allCards.forEach(card => {
        const type = card.getAttribute('data-type');
        const collection = card.getAttribute('data-collection');
        const text = card.textContent.toLowerCase();
        
        let show = true;
        
        // Filter by folder/collection
        if (currentFilters.folder !== 'all' && collection !== currentFilters.folder) {
            show = false;
        }
        
        // Filter by type
        if (currentFilters.type !== 'all' && type !== currentFilters.type) {
            show = false;
        }
        
        // Filter by keyword
        if (currentFilters.keyword && !text.includes(currentFilters.keyword)) {
            show = false;
        }
        
        card.style.display = show ? 'flex' : 'none';
    });
}

// Initialize collection toggles
function initializeCollectionToggles() {
    const toggles = document.querySelectorAll('.collection-toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const section = this.closest('.collection-section');
            const grid = section.querySelector('.collection-grid');
            
            section.classList.toggle('collapsed');
            
            if (section.classList.contains('collapsed')) {
                grid.style.display = 'none';
            } else {
                grid.style.display = 'grid';
            }
        });
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('artifact-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    // Close modal handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            closeModal();
        }
    });
}

// Open modal with artifact details
function openArtifactModal(githubPath, title, type) {
    const modal = document.getElementById('artifact-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalDownload = document.getElementById('modal-download');
    const modalView = document.getElementById('modal-view');
    
    const githubViewUrl = `https://github.com/maggieconboy/Personal-Repo/blob/main/${githubPath}`;
    const githubRawUrl = `https://github.com/maggieconboy/Personal-Repo/raw/main/${githubPath}`;
    
    // Set modal content
    modalTitle.textContent = title;
    modalDownload.href = githubRawUrl;
    modalView.href = githubViewUrl;
    
    // Create preview content
    const isPDF = githubPath.toLowerCase().endsWith('.pdf');
    
    if (isPDF) {
        modalContent.innerHTML = `
            <div class="pdf-preview">
                <iframe src="${githubViewUrl}" width="100%" height="600px" style="border: none; border-radius: 8px;"></iframe>
                <p class="preview-note">
                    <strong>Note:</strong> GitHub's PDF viewer is embedded above. For best experience, use the "View in GitHub" or "Download" buttons.
                </p>
            </div>
        `;
    } else {
        modalContent.innerHTML = `
            <div class="artifact-details">
                <div class="artifact-icon-large ${type}">
                    ${getTypeIcon(type)}
                </div>
                <p>Preview not available. Use the buttons above to view or download this artifact.</p>
            </div>
        `;
    }
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Track view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_artifact', {
            'artifact_name': title,
            'artifact_type': type
        });
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('artifact-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}
