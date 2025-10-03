# Responsive Design Documentation

## Overview
This document outlines the responsive design implementation for maggieconboy.github.io, ensuring optimal user experience across all device sizes.

## Breakpoints

### Mobile Small (max-width: 480px)
**Target Devices:** iPhone SE, small Android phones

**Optimizations:**
- Hero title: 28px
- Section titles: 26px
- Container padding: 16px
- Single-column layouts for all grids
- Full-width buttons and CTAs
- Reduced spacing (48px section padding)
- Smaller stat numbers and metric displays

### Mobile/Tablet (481px - 768px)
**Target Devices:** iPhone 12/13/14, iPad Mini (portrait)

**Optimizations:**
- Hero title: 36px
- Section titles: 32px
- Container padding: 20px
- Single-column layouts with better spacing
- Full-width buttons
- Medium spacing (60px section padding)

### Desktop Small (769px - 1199px)
**Target Devices:** iPad (landscape), small laptops

**Optimizations:**
- Default desktop styles apply
- Navigation remains inline
- Multi-column grids where appropriate

### Desktop Medium (1200px - 1439px)
**Target Devices:** Standard desktop monitors, laptops

**Optimizations:**
- Container max-width: 1280px
- Hero title: 56px
- 3-column grid layouts
- Enhanced spacing (100px section padding)

### Desktop Large (1440px+)
**Target Devices:** Large monitors, high-resolution displays

**Optimizations:**
- Container max-width: 1400px
- Hero title: 64px
- Hero description: 24px
- 3-column grid layouts
- Maximum spacing and comfort

## Grid Layout System

All grid layouts use the responsive pattern:
```css
grid-template-columns: repeat(auto-fit, minmax(min(Xpx, 100%), 1fr));
```

This prevents horizontal overflow on small screens while maintaining optimal column counts on larger screens.

## Touch Targets

All interactive elements (buttons, links, form inputs) have a minimum height of 44px to meet accessibility guidelines and provide comfortable touch targets on mobile devices.

## Mobile Navigation

The mobile menu:
- Appears at 768px and below
- Uses a hamburger icon that animates to an X
- Slides down smoothly with CSS transitions
- Closes when clicking outside or selecting a link
- Has full-width touch-friendly menu items

## Accessibility Features

### Reduced Motion
Respects the `prefers-reduced-motion` user preference:
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

### Smooth Scrolling
Enabled for users who don't prefer reduced motion:
```css
@media (prefers-reduced-motion: no-preference) {
    html {
        scroll-behavior: smooth;
    }
}
```

## Performance Considerations

1. **Responsive Images**: All images, videos, and iframes use `max-width: 100%` to scale appropriately
2. **Overflow Prevention**: `overflow-x: hidden` on body prevents horizontal scrolling
3. **CSS-only animations**: No JavaScript required for responsive behavior
4. **Progressive Enhancement**: Core content accessible at all screen sizes

## Testing Recommendations

Test on these viewport sizes:
- 375px (iPhone SE, small phones)
- 414px (iPhone 12/13 Pro Max)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1280px (Standard laptop)
- 1440px (Large desktop)
- 1920px (Full HD monitors)

## Browser Support

All responsive features work in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Graceful Degradation
- Older browsers receive default desktop styles
- CSS Grid falls back to block layout
- All content remains accessible

## Future Enhancements

Potential improvements:
- Add container queries when browser support improves
- Implement dark mode with `prefers-color-scheme`
- Add print stylesheet for optimal printing
- Consider adding more granular breakpoints for specific content needs
