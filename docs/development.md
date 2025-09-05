# Development Guidelines

## 🛠️ Development Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Optional: Node.js for development server

### Quick Start
```bash
# Option 1: Direct file opening
open index.html

# Option 2: With development server (recommended)
npm install -g live-server
live-server --host=localhost --port=3000
```

---

## 📁 Project Architecture

### File Organization Philosophy
- **Self-contained pages**: Each HTML file includes all necessary CSS/JS
- **Asset centralization**: All media files in organized `/assets` structure
- **Component modularity**: Reusable components in `/components` for future extraction

### Current Structure Benefits
- ✅ **No build process**: Instant development and deployment
- ✅ **Zero dependencies**: Works in any environment
- ✅ **Easy deployment**: Simple file upload to any web server
- ✅ **Fast loading**: Optimized, single-request pages

---

## 💻 Coding Standards

### HTML Guidelines
```html
<!-- Use semantic HTML5 elements -->
<section class="hero" id="hero">
<nav class="navbar" role="navigation">
<main class="main-content">

<!-- Include ARIA labels for accessibility -->
<button aria-label="Start IQ Test" class="btn btn--primary">

<!-- Use consistent class naming (BEM-inspired) -->
<div class="card__content">
  <h3 class="card__title">
  <p class="card__description">
</div>
```

### CSS Guidelines
```css
/* Use CSS custom properties for consistency */
:root {
  --primary-color: #64D4FF;
  --spacing-base: 1rem;
}

/* Follow mobile-first responsive design */
.component {
  /* Mobile styles first */
}
@media (min-width: 768px) {
  .component {
    /* Tablet and up */
  }
}

/* Use logical properties when possible */
margin-inline: auto;
padding-block: var(--space-4);
```

### JavaScript Guidelines
```javascript
// Use modern ES6+ syntax
const initComponent = () => {
  const elements = document.querySelectorAll('.selector');
  
  elements.forEach(element => {
    element.addEventListener('click', handleClick);
  });
};

// Use async/await for promises
const loadData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};

// Use descriptive function names
function updateProgressBar() { /* ... */ }
function validateFormInput() { /* ... */ }
function initScrollAnimations() { /* ... */ }
```

---

## 🎨 Design Implementation

### CSS Architecture
```css
/* 1. CSS Variables (design tokens) */
:root { /* variables */ }

/* 2. Reset and base styles */
* { box-sizing: border-box; }

/* 3. Typography */
h1, h2, h3 { /* heading styles */ }

/* 4. Layout components */
.container { /* layout */ }

/* 5. UI components */
.btn { /* component styles */ }

/* 6. Page-specific styles */
.hero { /* page sections */ }

/* 7. Responsive adjustments */
@media { /* breakpoints */ }
```

### Component Development
```html
<!-- Component Template -->
<div class="component-name glass">
  <div class="component-name__header">
    <h3 class="component-name__title">Title</h3>
  </div>
  <div class="component-name__content">
    <p class="component-name__text">Content</p>
    <button class="component-name__action btn btn--primary">Action</button>
  </div>
</div>
```

---

## 🚀 Performance Best Practices

### CSS Performance
- Use `transform` and `opacity` for animations
- Minimize repaints and reflows
- Use `contain` property for isolated components
- Optimize selector specificity

### JavaScript Performance
- Use event delegation for dynamic content
- Debounce scroll and resize events
- Use IntersectionObserver for scroll-triggered animations
- Minimize DOM queries with caching

### Image Optimization
- Use WebP format for modern browsers
- Implement responsive images with `srcset`
- Add proper `alt` attributes
- Consider lazy loading for below-fold content

---

## 🧪 Testing Guidelines

### Browser Testing
- **Chrome**: Primary development browser
- **Firefox**: Secondary compatibility
- **Safari**: iOS compatibility
- **Edge**: Windows compatibility

### Device Testing
- **Mobile**: iPhone SE (375px) to iPhone Pro Max (428px)
- **Tablet**: iPad (768px) to iPad Pro (1024px)
- **Desktop**: 1200px to 1920px+

### Accessibility Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast validation
- Focus management

---

## 📦 Deployment

### Pre-deployment Checklist
- [ ] All links working correctly
- [ ] Images loading properly
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Accessibility validated
- [ ] SEO meta tags present

### Deployment Steps
1. **Validate HTML**: Check for syntax errors
2. **Test locally**: Full functionality review
3. **Optimize assets**: Compress images if needed
4. **Upload files**: Maintain directory structure
5. **Test live**: Verify all features work
6. **Monitor**: Check for any console errors

---

## 🔧 Common Development Tasks

### Adding New Pages
1. Create HTML file in appropriate `/pages` subdirectory
2. Copy base structure from existing page
3. Update navigation links
4. Test responsive behavior
5. Add to deployment checklist

### Adding New Components
1. Create in `/components` directory
2. Document usage in comments
3. Test across different contexts
4. Update style guide if needed

### Asset Management
```
assets/
├── images/
│   ├── characters/     # 3D character renders
│   ├── icons/         # UI icons (SVG preferred)
│   └── backgrounds/   # Background images
├── videos/            # Video content
└── downloads/         # PDF and other downloads
```

---

## 🐛 Debugging

### Common Issues
- **Layout breaks**: Check CSS Grid/Flexbox properties
- **JS errors**: Use browser DevTools Console
- **Performance**: Use Lighthouse audits
- **Responsiveness**: Test with DevTools device emulation

### Debug Tools
- Browser DevTools (F12)
- Accessibility Inspector
- Lighthouse Performance Audit
- HTML Validator (validator.w3.org)

---

## 📚 Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Design Resources
- [Glassmorphism CSS Generator](https://ui.glass/generator/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Fonts](https://fonts.google.com/)

---

*Follow these guidelines to maintain code quality and ensure consistent user experience across the Test Your Genius platform.*
