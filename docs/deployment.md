# Deployment Guide

## 🚀 Deployment Overview

Test Your Genius is a static website that can be deployed to any web hosting service. This guide covers multiple deployment options from simple to advanced.

---

## 📋 Pre-Deployment Checklist

### ✅ Content Validation
- [ ] All text content is finalized and error-free
- [ ] All images have proper alt attributes
- [ ] Links are working and pointing to correct destinations
- [ ] Contact information is accurate
- [ ] Legal pages (Privacy Policy, Terms) are complete

### ✅ Technical Validation
- [ ] HTML validates (use W3C Validator)
- [ ] CSS is error-free and optimized
- [ ] JavaScript functions work across browsers
- [ ] All assets load correctly
- [ ] No console errors in browser DevTools

### ✅ Performance Optimization
- [ ] Images are optimized (WebP format preferred)
- [ ] CSS and JS are minified (if applicable)
- [ ] Unused code is removed
- [ ] Page load times are acceptable (<3s)

### ✅ SEO & Analytics
- [ ] Meta titles and descriptions are set
- [ ] Open Graph tags for social sharing
- [ ] Google Analytics code added (if applicable)
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended for Beginners)

**Benefits**: Free tier, automatic deployments, CDN, SSL certificates

**Steps**:
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your entire TYG-Preview folder to Netlify
3. Your site will be live with a random URL
4. Configure custom domain (optional)

**Advanced**: Connect to GitHub for automatic deployments

### Option 2: Vercel

**Benefits**: Excellent performance, free tier, easy custom domains

**Steps**:
1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. In project root: `vercel --prod`
4. Follow prompts to deploy

### Option 3: GitHub Pages

**Benefits**: Free, integrated with GitHub, custom domains supported

**Requirements**: Code must be in GitHub repository

**Steps**:
1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Site will be available at `username.github.io/repository-name`

### Option 4: Traditional Web Hosting

**Benefits**: Full control, can use existing hosting

**Steps**:
1. Purchase web hosting (Hostinger, SiteGround, etc.)
2. Upload files via FTP/SFTP or hosting control panel
3. Ensure directory structure is maintained
4. Point domain to hosting server

---

## 🏗️ File Structure for Deployment

### Required Files
```
TYG-Preview/
├── index.html                 # Must be in root directory
├── pages/
│   ├── academy/
│   │   └── week1-lesson.html
│   ├── iq-test.html          # Future
│   ├── about.html            # Future
│   └── privacy.html          # Future
└── assets/
    ├── images/
    ├── videos/
    └── downloads/
```

### Environment-Specific Configurations

**Production Settings**:
```html
<!-- Add to <head> for production -->
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://testyourgenius.com/">

<!-- Analytics (replace with actual tracking ID) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

---

## 🔧 Advanced Deployment Configuration

### Custom Domain Setup

**DNS Configuration**:
```
Type    Name    Value
A       @       [Your hosting IP]
CNAME   www     testyourgenius.com
```

**SSL Certificate**:
- Most modern hosting providers offer free SSL via Let's Encrypt
- Ensure HTTPS redirect is enabled
- Update all internal links to use HTTPS

### Performance Optimization

**Server-Side Optimizations**:
```apache
# .htaccess file for Apache servers
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Enable browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

### Security Headers
```apache
# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

---

## 📊 Post-Deployment Monitoring

### Essential Checks
1. **Functionality Test**: Navigate through all pages and features
2. **Performance Test**: Use Google PageSpeed Insights
3. **Mobile Test**: Check responsive design on actual devices
4. **SEO Test**: Verify meta tags and structured data

### Monitoring Tools
- **Google Search Console**: Track search performance
- **Google Analytics**: Monitor traffic and user behavior
- **Uptime Monitoring**: Services like UptimeRobot
- **Performance Monitoring**: Lighthouse CI for ongoing checks

### Regular Maintenance
- **Weekly**: Check for broken links and images
- **Monthly**: Review performance metrics
- **Quarterly**: Security and dependency updates
- **Annually**: Content audit and refresh

---

## 🔄 Continuous Deployment Workflow

### Git-based Workflow
```bash
# Development workflow
git add .
git commit -m "Add new feature"
git push origin main

# Automatic deployment triggers
# (if connected to Netlify/Vercel/GitHub Pages)
```

### Manual Deployment Checklist
1. [ ] Pull latest changes from repository
2. [ ] Run local tests
3. [ ] Build production version (if applicable)
4. [ ] Upload to hosting server
5. [ ] Test live site
6. [ ] Update DNS if domain changes
7. [ ] Monitor for issues

---

## 🛠️ Troubleshooting Common Issues

### Assets Not Loading
- **Issue**: Images/CSS/JS files return 404 errors
- **Solution**: Check file paths are correct and case-sensitive
- **Prevention**: Use relative paths, maintain directory structure

### Mobile Display Issues
- **Issue**: Site doesn't display correctly on mobile
- **Solution**: Check viewport meta tag, test responsive CSS
- **Prevention**: Always test on multiple devices during development

### Performance Problems
- **Issue**: Site loads slowly
- **Solution**: Optimize images, enable compression, use CDN
- **Prevention**: Regular performance audits during development

### SEO Issues
- **Issue**: Site not appearing in search results
- **Solution**: Submit sitemap to Google Search Console
- **Prevention**: Include proper meta tags and structured data

---

## 📱 Platform-Specific Instructions

### Netlify Deployment
```bash
# Using Netlify CLI
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

### Vercel Deployment
```bash
# Using Vercel CLI
npm install -g vercel
vercel --prod
```

### AWS S3 + CloudFront
```bash
# Upload to S3
aws s3 sync . s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

---

## 🎯 Going Live Checklist

### Final Steps Before Launch
- [ ] Test all functionality one final time
- [ ] Check all forms are working
- [ ] Verify payment integration (when implemented)
- [ ] Test customer support contact methods
- [ ] Ensure legal compliance (GDPR, privacy policy)
- [ ] Set up monitoring and analytics
- [ ] Prepare launch announcement content
- [ ] Have support team ready for launch day

---

*Your Test Your Genius platform is now ready to inspire minds worldwide! 🚀*
