# 🚀 Zendesk Personas Gallery - Quick Start Guide

> **Gallery URL**: Update this with your GitHub Pages URL after deployment:  
> `https://[username].github.io/[repo-name]/zendesk-personas.html`

## What Was Built

An interactive, professional carousel/slideshow for Zendesk Support Personas on GitHub Pages.

## Quick Links

- 📄 [View Gallery Page](../zendesk-personas.html)
- 📚 [Full Documentation](ZENDESK_GALLERY_DOCS.md)
- 🔗 [Link from Current Impact Page](../current-impact.html) - Features user research and persona work

## Files Created

```
zendesk-personas.html          # Main gallery page
css/zendesk-carousel.css       # Gallery styles
js/zendesk-carousel.js         # Carousel functionality
docs/ZENDESK_GALLERY_DOCS.md   # Full documentation
```

## How to Add a New Persona (2 Steps)

### Step 1: Upload PDF
Upload your PDF file to the `Zendesk Personas/` folder in GitHub.

### Step 2: Update JavaScript
Edit `js/zendesk-carousel.js` and add to the `zendeskPersonas` array:

```javascript
{
    name: 'Your Persona.pdf',
    title: 'Your Persona Title',
    description: 'A clear description of this persona...',
    githubPath: 'Zendesk%20Personas/Your%20Persona.pdf'
}
```

**Note**: Replace spaces with `%20` in `githubPath`!

That's it! The carousel will automatically show your new persona.

## Features

✅ **9 Personas Displayed**: All PDFs from `/Zendesk Personas` folder  
✅ **Multiple Navigation**: Keyboard, mouse wheel, touch/swipe, thumbnails  
✅ **Responsive Design**: Works on desktop, tablet, and mobile  
✅ **Accessible**: Keyboard navigation, ARIA labels, screen reader friendly  
✅ **Professional**: Matches site brand with deep purple accent  
✅ **No Build Required**: Pure HTML/CSS/JS for GitHub Pages  

## Navigation Methods

- **Keyboard**: ← → arrow keys
- **Mouse**: Scroll wheel or click arrows
- **Touch**: Swipe left/right on mobile
- **Thumbnails**: Click any thumbnail card
- **Buttons**: Click < > navigation arrows

## Common Tasks

### View a Specific Persona
Click the thumbnail card or navigate to the slide

### Download a PDF
Click "Download PDF" button below the carousel

### View in GitHub
Click "View in GitHub" button to see the PDF in GitHub's viewer

### Share the Gallery
Share your GitHub Pages URL for the gallery

## Technologies Used

- **Swiper.js v11**: Professional carousel library
- **Pure HTML/CSS/JS**: No build tools needed
- **GitHub Pages**: Hosted for free
- **Inter Font**: Clean, professional typography

## Need Help?

- Read the [Full Documentation](ZENDESK_GALLERY_DOCS.md)
- Check the troubleshooting section
- Contact your repository maintainer or open an issue

## Future Enhancements

Consider using GitHub Copilot Agents to:
- Auto-detect new PDFs
- Extract metadata from PDFs
- Update carousel automatically
- Send notifications on changes

See [Full Documentation](ZENDESK_GALLERY_DOCS.md) for automation ideas!
