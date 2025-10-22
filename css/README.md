# CSS Organization

This directory contains organized, modular CSS files for the Personal Repository website. The CSS has been restructured from a single monolithic file into separate, page-specific files for better maintainability and organization.

## File Structure

### Core Files (Required for all pages)
- **base.css** - Foundational styles shared across all pages
  - CSS Variables (colors, spacing, shadows)
  - Reset and base styles
  - Navigation
  - Footer
  - Button styles
  - Common components (badges, links, cards)

- **shared.css** - Reusable visual components
  - Image section dividers
  - Wave separators
  - Enhanced headers
  - Card elevation effects

### Page-Specific Files
- **homepage.css** - Index page (index.html)
  - Video intro onboarding
  - Hero section with animations
  - Homepage navigation buttons
  - Metrics grid
  - Initiatives section
  - Philosophy section
  - About Me section

- **portfolio.css** - AI Projects page (portfolio.html)
  - Portfolio header
  - Project cards
  - Impact metrics
  - Tech tags
  - Vision section

- **resume.css** - Experience page (resume.html)
  - Resume header with animations
  - Achievements bar
  - Experience timeline
  - Skills grid
  - Education section

- **research.css** - Research & Deliverables page (research.html)
  - Research hero
  - Metrics bar
  - Filter controls
  - Artifact cards
  - Collections
  - Modal styles

- **case-study.css** - Case Study page (txrh-case-study.html)
  - Case hero
  - Brand logos
  - TXRH hero section
  - Impact metrics
  - Financial impact charts
  - Revenue visualization
  - Platform grid
  - Journey cards

- **current-impact.css** - Current Impact page (current-impact.html)
  - Brand portfolio
  - Featured brands
  - Story section
  - Value section
  - Systems narrative
  - User research section
  - Personas visual

- **zendesk-carousel.css** - Zendesk Personas page (zendesk-personas.html)
  - Zendesk hero
  - Swiper carousel customization
  - Thumbnail navigation
  - Documentation section

## Usage in HTML Pages

Each HTML page should include CSS files in this order:

```html
<!-- Base styles (required) -->
<link rel="stylesheet" href="css/base.css">

<!-- Shared components (required) -->
<link rel="stylesheet" href="css/shared.css">

<!-- Page-specific styles (one per page) -->
<link rel="stylesheet" href="css/[page-name].css">
```

### Examples:

**Homepage (index.html):**
```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/shared.css">
<link rel="stylesheet" href="css/homepage.css">
```

**Portfolio (portfolio.html):**
```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/shared.css">
<link rel="stylesheet" href="css/portfolio.css">
```

**Case Study (txrh-case-study.html):**
```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/shared.css">
<link rel="stylesheet" href="css/case-study.css">
```

## Benefits of This Organization

1. **Better Maintainability** - Each page's styles are isolated and easy to find
2. **Reduced CSS Payload** - Pages only load the styles they need
3. **Easier Debugging** - Clear separation makes it easier to locate and fix issues
4. **Improved Collaboration** - Multiple developers can work on different pages without conflicts
5. **Logical Structure** - Related styles are grouped together by page/feature

## Responsive Design

All CSS files include responsive breakpoints for optimal display on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)
- Small Mobile (< 480px)

## Accessibility

All styles include considerations for:
- Reduced motion preferences
- Focus states for keyboard navigation
- Sufficient color contrast
- Touch-friendly target sizes (min 44px)

## Maintenance Notes

- When adding new pages, create a new page-specific CSS file
- Shared components should go in `shared.css`
- Global variables and base styles should go in `base.css`
- Keep the order: base.css → shared.css → page-specific.css
