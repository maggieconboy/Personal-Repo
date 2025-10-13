# 🎨 Zendesk Personas Interactive Gallery Documentation

## Overview

The Zendesk Personas Gallery is an interactive, carousel-based slideshow built on GitHub Pages that showcases support persona research. It provides a professional, user-friendly way to browse through persona PDFs with smooth navigation and responsive design.

**Live Gallery**: [View Interactive Gallery](https://maggieconboy.github.io/Personal-Repo/zendesk-personas.html)

## Features

### ✨ Core Functionality
- **Interactive Carousel**: Full-screen slideshow powered by Swiper.js
- **Multiple Navigation Methods**: 
  - Keyboard arrow keys
  - Mouse wheel scrolling
  - Touch/swipe gestures (mobile)
  - Navigation arrows
  - Thumbnail grid
- **PDF Preview**: Direct GitHub iframe embedding of PDFs
- **Progress Tracking**: Visual progress bar and slide counter
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML

### 🎯 User Experience
- Smooth slide transitions with CSS animations
- Active state indicators on thumbnails
- Detailed persona descriptions below carousel
- Quick access buttons (View in GitHub, Download PDF)
- Professional styling matching site brand (deep purple accent)

## File Structure

```
Personal-Repo/
├── zendesk-personas.html          # Main gallery page
├── css/
│   └── zendesk-carousel.css       # Gallery-specific styles
├── js/
│   └── zendesk-carousel.js        # Carousel functionality & data
└── Zendesk Personas/              # Source PDF files
    ├── Intro.pdf
    ├── Support Engineer.pdf
    ├── Support Manager.pdf
    ├── Customer Success Engineer.pdf
    ├── Customer Reliability Engineer.pdf
    ├── Security Analyst.pdf
    ├── Specialty Support.pdf
    ├── Trust and Safety Counsel.pdf
    └── Zendesk user insights at GitHub.pdf
```

## How It Works

### Data Structure

The gallery automatically populates from a data array in `js/zendesk-carousel.js`:

```javascript
const zendeskPersonas = [
    {
        name: 'Intro.pdf',
        title: 'Zendesk Personas Introduction',
        description: 'Overview and methodology...',
        githubPath: 'Zendesk%20Personas/Intro.pdf'
    },
    // ... more personas
];
```

### Carousel Initialization

Swiper.js powers the carousel with these configurations:
- Single slide view with centered slides
- Loop disabled (linear navigation)
- Keyboard, mouse wheel, and touch support
- Custom navigation arrows and progress bar
- Event listeners for slide changes

### Dynamic Content

1. **Slide Population**: Each persona becomes a carousel slide with an embedded GitHub PDF viewer
2. **Thumbnail Grid**: All personas displayed as clickable thumbnail cards
3. **Details Section**: Updates dynamically as slides change
4. **Active States**: Thumbnails highlight the current slide

## 📝 How to Update Personas

### Option 1: Add New Personas (Simple)

1. **Upload PDF to GitHub**
   - Navigate to the `Zendesk Personas/` folder in GitHub
   - Click "Add file" → "Upload files"
   - Upload your new persona PDF
   - Commit the changes

2. **Update JavaScript Data**
   - Open `js/zendesk-carousel.js`
   - Add a new object to the `zendeskPersonas` array:
   
   ```javascript
   {
       name: 'New Persona.pdf',
       title: 'New Persona Title',
       description: 'Detailed description of this persona...',
       githubPath: 'Zendesk%20Personas/New%20Persona.pdf'
   }
   ```
   
   - **Important**: URL-encode spaces in `githubPath` as `%20`
   - Commit the changes

3. **Verify**
   - Visit the gallery page
   - New persona should appear in carousel and thumbnails
   - Counter should update automatically

### Option 2: Edit Existing Personas

1. **Replace PDF File**
   - Upload new version with same filename to `Zendesk Personas/` folder
   - OR update the `githubPath` in `zendesk-carousel.js` if filename changed

2. **Update Metadata** (optional)
   - Edit title and description in `js/zendesk-carousel.js`
   - Commit changes

3. **Refresh** the gallery page to see updates

### Option 3: Remove Personas

1. **Delete from Data Array**
   - Remove the persona object from `zendeskPersonas` array in `js/zendesk-carousel.js`

2. **Optional: Delete PDF File**
   - Delete from `Zendesk Personas/` folder in GitHub

3. Gallery updates automatically

## 🎨 Customization Guide

### Styling Changes

**Colors and Branding** (`css/zendesk-carousel.css`):
```css
/* Change accent color */
--accent: #6d28d9;  /* Deep purple */

/* Update hero gradient */
.zendesk-hero {
    background: linear-gradient(135deg, var(--bg-dark) 0%, #27272a 100%);
}
```

**Carousel Height** (`css/zendesk-carousel.css`):
```css
.slide-content {
    height: 700px;  /* Desktop height */
}

@media (max-width: 768px) {
    .slide-content {
        height: 500px;  /* Tablet height */
    }
}
```

### Swiper Configuration

**Modify Carousel Behavior** (`js/zendesk-carousel.js`):
```javascript
swiperInstance = new Swiper('.zendesk-carousel', {
    slidesPerView: 1,        // Number of slides visible
    spaceBetween: 30,        // Gap between slides
    loop: false,             // Enable/disable looping
    speed: 600,              // Transition speed (ms)
    // Add autoplay if desired:
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: true
    // }
});
```

### Adding Features

**Example: Add Tags/Categories**

1. Add `category` field to persona data:
```javascript
{
    name: 'Support Engineer.pdf',
    title: 'Support Engineer Persona',
    category: 'Frontline Support',
    // ...
}
```

2. Display in slide overlay:
```javascript
<span class="slide-category">${persona.category}</span>
```

3. Style the tag in CSS

## 🤖 Future Automation Opportunities

### Copilot Agent Integration

**Potential automated workflows using GitHub Copilot Agents:**

1. **Auto-Discovery**
   - Detect new PDFs added to `Zendesk Personas/` folder
   - Automatically extract metadata from PDF (title, author, date)
   - Generate description from PDF content
   - Update `zendesk-carousel.js` without manual editing

2. **Content Validation**
   - Check for broken links or missing files
   - Validate PDF file sizes and formats
   - Ensure all personas have complete metadata

3. **Change Notifications**
   - Alert stakeholders when new personas are added
   - Post updates to Slack/Teams channels
   - Create changelog entries automatically

4. **Analytics**
   - Track which personas are viewed most
   - Generate usage reports
   - Suggest similar personas based on viewing patterns

### Implementation Ideas

**GitHub Actions Workflow Example:**
```yaml
name: Auto-Update Persona Gallery
on:
  push:
    paths:
      - 'Zendesk Personas/*.pdf'
jobs:
  update-gallery:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Detect new PDFs
        run: |
          # Script to find new PDFs
          # Generate metadata
          # Update zendesk-carousel.js
      - name: Commit changes
        run: |
          git add js/zendesk-carousel.js
          git commit -m "Auto-update gallery with new personas"
          git push
```

## 📊 Technical Details

### Dependencies

**External Libraries (CDN):**
- [Swiper.js v11](https://swiperjs.com/) - Carousel/slider functionality
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter) - Typography

**Browser Compatibility:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

### Performance Considerations

- **Lazy Loading**: PDF iframes load only when visible
- **CDN Delivery**: Swiper.js served from fast CDN
- **Optimized Images**: Thumbnails use SVG icons (scalable, small)
- **CSS Animations**: Hardware-accelerated transitions

### Accessibility Features

- ✅ Semantic HTML5 structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Color contrast meets WCAG standards
- ✅ Focus indicators on interactive elements

## 🔧 Troubleshooting

### Issue: PDFs Not Loading

**Symptoms:** Gray boxes instead of PDF previews

**Solutions:**
1. Check that PDF files exist in `Zendesk Personas/` folder
2. Verify `githubPath` URLs are correct (check for typos)
3. Ensure spaces in filenames are URL-encoded as `%20`
4. Verify GitHub repository is public or viewer has access

### Issue: Carousel Not Sliding

**Symptoms:** Arrows don't work, slides stuck

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify Swiper.js CDN is loading (check Network tab)
3. Ensure `zendesk-carousel.js` is included in HTML
4. Clear browser cache and reload

### Issue: Thumbnails Not Clickable

**Symptoms:** Clicking thumbnails doesn't change slides

**Solutions:**
1. Check that `goToSlide()` function is defined
2. Verify Swiper instance initialized (`swiperInstance` is not null)
3. Check browser console for errors

### Issue: Mobile Layout Broken

**Symptoms:** Content overflows or doesn't fit screen

**Solutions:**
1. Check viewport meta tag is present in HTML
2. Test responsive CSS media queries
3. Verify touch events are enabled in Swiper config

## 📈 Analytics & Tracking

### Adding Google Analytics

Add to `zendesk-personas.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Track Persona Views

The code already includes event tracking:

```javascript
if (typeof gtag !== 'undefined') {
    gtag('event', 'view_artifact', {
        'artifact_name': persona.title,
        'artifact_type': 'persona'
    });
}
```

## 🚀 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select source: `main` branch
   - Save

2. **Access Gallery**
   - URL: `https://[username].github.io/[repo-name]/zendesk-personas.html`
   - Example: `https://maggieconboy.github.io/Personal-Repo/zendesk-personas.html`

3. **Custom Domain** (optional)
   - Add CNAME file to repository root
   - Configure DNS records
   - Update `_config.yml` with domain

### Updates and Versioning

- Changes pushed to `main` branch automatically deploy to GitHub Pages
- Typical deployment time: 1-2 minutes
- No build process required (static HTML/CSS/JS)

## 📚 Additional Resources

- [Swiper.js Documentation](https://swiperjs.com/swiper-api)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)

## 🤝 Contributing

### Reporting Issues

If you encounter problems:
1. Check this documentation first
2. Review troubleshooting section
3. Open an issue on GitHub with:
   - Description of problem
   - Steps to reproduce
   - Browser and device information
   - Screenshots if applicable

### Suggesting Improvements

Ideas welcome! Consider:
- Enhanced navigation features
- Additional automation
- Performance optimizations
- Accessibility improvements

## 📄 License

This gallery is part of Maggie Conboy's Personal Repository and follows the repository's license.

---

**Last Updated**: January 2025  
**Maintainer**: Maggie Conboy  
**Questions?** [mconboy@github.com](mailto:mconboy@github.com)
