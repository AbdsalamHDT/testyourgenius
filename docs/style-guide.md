# Test Your Genius - Style Guide

## 🎨 Design System

### Brand Identity
- **Mission**: Unlock human genius through IQ testing and legendary mentorship
- **Tone**: Premium, futuristic, inspiring, scientific
- **Personality**: Sophisticated, innovative, trustworthy, transformative

### Visual Language
- **Style**: Glassmorphism with cinematic depth
- **Mood**: Deep space exploration meets cutting-edge technology
- **Atmosphere**: Mysterious yet welcoming, complex yet accessible

---

## 🎯 Color Palette

### Primary Colors
```css
--bg-1: #070B1A;        /* Deep Space Primary */
--bg-2: #0E1A3A;        /* Deep Space Secondary */
--ink: #EAF2FF;         /* Primary Text */
--accent: #64D4FF;      /* Electric Cyan */
--gold: #F4D37E;        /* Soft Gold */
```

### Secondary Colors
```css
--accent-hover: #4FACFE;     /* Accent Hover State */
--gold-hover: #D4AF37;       /* Gold Hover State */
--success: #10B981;          /* Success Green */
--warning: #F59E0B;          /* Warning Amber */
--error: #EF4444;            /* Error Red */
```

### Semantic Usage
- **Backgrounds**: Use bg-1 for main, bg-2 for sections
- **Text**: Primary (ink), Secondary (ink @ 80% opacity)
- **Interactive**: Accent for CTAs, Gold for premium features
- **States**: Success/Warning/Error for user feedback

---

## 📝 Typography

### Font Stack
```css
font-family: ui-sans-serif, -apple-system, "Segoe UI", Roboto, Inter, Arial, sans-serif;
```

### Scale & Hierarchy
```css
/* Headings */
h1: clamp(2.5rem, 5vw, 4rem);     /* Hero titles */
h2: clamp(1.8rem, 4vw, 2.5rem);   /* Section titles */
h3: clamp(1.2rem, 3vw, 1.5rem);   /* Subsection titles */

/* Body Text */
p: clamp(1rem, 2vw, 1.125rem);    /* Body text */
small: 0.875rem;                   /* Small text */
```

### Text Styling
- **Weight**: 400 (normal), 600 (semi-bold), 700 (bold)
- **Letter Spacing**: -0.02em for headings, 0 for body
- **Line Height**: 1.2 for headings, 1.6 for body

---

## 📏 Spacing System

### Scale (8px base unit)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.5rem;   /* 24px */
--space-6: 2rem;     /* 32px */
--space-7: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
```

### Usage Guidelines
- **Micro spacing**: space-1, space-2 (buttons, form elements)
- **Component spacing**: space-3, space-4, space-5
- **Layout spacing**: space-6, space-7, space-8
- **Section spacing**: space-8+ (vertical rhythm)

---

## 🔘 Button System

### Primary Button
```css
.btn--primary {
    background: linear-gradient(135deg, var(--accent) 0%, #4facfe 100%);
    color: var(--bg-1);
    box-shadow: 0 8px 32px rgba(100, 212, 255, 0.3);
}
```

### Secondary Button
```css
.btn--secondary {
    background: rgba(234, 242, 255, 0.1);
    color: var(--ink);
    border: 2px solid rgba(234, 242, 255, 0.2);
}
```

### Special Buttons
- **Download**: Gold gradient for premium content
- **Glowing**: 3D perspective with enhanced shadows for major CTAs

---

## 🪟 Glassmorphism Components

### Glass Effect
```css
.glass {
    background: rgba(234, 242, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(234, 242, 255, 0.1);
    border-radius: 16px;
}
```

### Strong Glass
```css
.glass-strong {
    background: rgba(234, 242, 255, 0.08);
    backdrop-filter: blur(30px);
    border: 1px solid rgba(234, 242, 255, 0.15);
    border-radius: 20px;
}
```

---

## 🎬 Animation Guidelines

### Timing Functions
- **Ease**: `ease` for natural interactions
- **Ease-in-out**: `ease-in-out` for UI transitions
- **Custom**: `cubic-bezier(0.4, 0, 0.2, 1)` for material-like motion

### Duration Standards
- **Micro**: 150-200ms (hover states)
- **Standard**: 250-400ms (page transitions)
- **Complex**: 500-800ms (reveal animations)
- **Ambient**: 2-8s (background animations)

### Performance Rules
- Use `transform` and `opacity` for animations
- Avoid animating layout properties
- Use `will-change` sparingly and remove after animation

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 768px) {  /* Tablet */
@media (min-width: 1024px) { /* Desktop */
@media (min-width: 1440px) { /* Large Desktop */
```

### Grid System
- **Mobile**: Single column, full-width
- **Tablet**: 2-3 columns with gaps
- **Desktop**: Up to 4 columns, max-width containers

---

## ♿ Accessibility

### Contrast Requirements
- **Text**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **Interactive**: Minimum 3:1 for states

### Focus Management
```css
:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}
```

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for complex interactions
- Alt text for all meaningful images

---

## 🎯 Component Standards

### Cards
- Always use glass effects
- Consistent padding (space-5 to space-6)
- Subtle hover animations (translateY + scale)

### Forms
- Glass input backgrounds
- Clear focus states
- Inline validation messages

### Navigation
- Sticky positioning with backdrop blur
- Active state indicators
- Mobile hamburger menu

---

## 📐 Layout Principles

### Vertical Rhythm
- Consistent section padding (space-8)
- Balanced white space
- Clear content hierarchy

### Horizontal Alignment
- Center-aligned content blocks
- Max-width containers (1200px)
- Responsive side margins

### Visual Flow
- F-pattern for text-heavy sections
- Z-pattern for action-oriented layouts
- Clear visual pathways to CTAs

---

*This style guide ensures consistency across all Test Your Genius interfaces and maintains the premium, futuristic brand experience.*
