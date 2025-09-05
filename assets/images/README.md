# Asset Placeholder Files

This directory contains organized subdirectories for all project assets.

## 📁 Directory Structure

### /characters/
3D character renders for mentor figures:
- `einstein-3d.webp` - Albert Einstein full-body render
- `jobs-3d.webp` - Steve Jobs full-body render  
- `davinci-3d.webp` - Leonardo da Vinci full-body render
- `curie-3d.webp` - Marie Curie full-body render
- `tesla-3d.webp` - Nikola Tesla full-body render
- `feynman-3d.webp` - Richard Feynman full-body render

### /icons/
UI icons and symbols:
- `logo.svg` - Test Your Genius brand logo
- `puzzle.svg` - Logic puzzle icon
- `brain.svg` - Intelligence/IQ icon
- `certificate.svg` - Certificate/achievement icon
- `download.svg` - Download button icon
- `play.svg` - Video play button icon

### /backgrounds/
Background images and patterns:
- `hero-bg.jpg` - Main hero section background
- `section-divider.svg` - Geometric section separators
- `pattern-overlay.png` - Subtle texture overlay

## 🎨 Image Specifications

### 3D Characters
- **Format**: WebP (with PNG fallback)
- **Dimensions**: 800x1200px minimum
- **Background**: Transparent
- **Style**: Futuristic, premium rendering
- **Pose**: Confident, inspiring stance

### Icons
- **Format**: SVG preferred (scalable)
- **Style**: Minimalist, modern
- **Colors**: Match brand palette
- **Size**: 24x24px base (scalable)

### Backgrounds  
- **Format**: JPG for photos, SVG for graphics
- **Quality**: High resolution (2x retina ready)
- **Optimization**: Compressed for web
- **Style**: Consistent with glassmorphism theme

## 🔧 Implementation

When assets are added, they will automatically replace placeholder elements in the HTML. The current code includes fallback placeholder graphics that will be hidden once real assets are loaded.

```html
<!-- Current placeholder structure -->
<div class="character__placeholder">
  3D Character Placeholder
</div>

<!-- Will become -->
<img src="assets/images/characters/einstein-3d.webp" 
     alt="Albert Einstein 3D character" 
     class="character__image">
```

---

*Add your assets to the appropriate subdirectories to enhance the Test Your Genius experience!*
