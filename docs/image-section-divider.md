# Image Section Divider Component

A reusable component for separating content sections with an image and optional text above/below.

## Basic Usage

```html
<div class="image-section-divider">
    <div class="divider-content">
        <p class="divider-copy-top">Optional copy above image</p>
        <div class="divider-image-container">
            <img src="assets/images/your-image.png" alt="Descriptive alt text">
        </div>
        <p class="divider-copy-bottom">Optional copy below image</p>
    </div>
</div>
```

## Variants

### Dark Background
Add the `.dark` class for a dark background:

```html
<div class="image-section-divider dark">
    ...
</div>
```

### Compact Spacing
Add the `.compact` class for tighter spacing:

```html
<div class="image-section-divider compact">
    ...
</div>
```

### Wide Image
Add the `.wide` class for full-bleed images on larger screens:

```html
<div class="image-section-divider wide">
    ...
</div>
```

## Optional Elements

### Image Only (No Text)
Simply omit the copy paragraphs:

```html
<div class="image-section-divider">
    <div class="divider-content">
        <div class="divider-image-container">
            <img src="assets/images/your-image.png" alt="Descriptive alt text">
        </div>
    </div>
</div>
```

### Copy Above Only
Omit the bottom paragraph:

```html
<div class="image-section-divider">
    <div class="divider-content">
        <p class="divider-copy-top">Your text here</p>
        <div class="divider-image-container">
            <img src="assets/images/your-image.png" alt="Descriptive alt text">
        </div>
    </div>
</div>
```

### Copy Below Only
Omit the top paragraph:

```html
<div class="image-section-divider">
    <div class="divider-content">
        <div class="divider-image-container">
            <img src="assets/images/your-image.png" alt="Descriptive alt text">
        </div>
        <p class="divider-copy-bottom">Your text here</p>
    </div>
</div>
```

## Responsive Behavior

- **Desktop (1280px+)**: Full padding (80px vertical), 18px text
- **Tablet (768px)**: Medium padding (60px vertical), 16px text
- **Mobile (480px and below)**: Compact padding (40px vertical), 16px text

## Accessibility

- Always include descriptive `alt` text for images
- Text maintains readable contrast ratios
- Component is fully keyboard navigable
- Responsive images scale appropriately

## Live Example

See the implementation on the homepage: [index.html](../index.html)

The divider is placed between the "P&L Ownership at Scale" section and the "Value Creation Methodology" section.
