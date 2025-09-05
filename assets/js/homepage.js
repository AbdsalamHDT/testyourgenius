/**
 * Homepage JavaScript - Main functionality for Test Your Genius homepage
 * Includes parallax effects, animations, navigation, and interaction handlers
 */

class TestYourGeniusHomepage {
    constructor() {
        this.init();
    }

    init() {
        console.log('Initializing Test Your Genius Homepage...');
        
        // Initialize all features
        this.initNavbar();
        this.initParallax();
        this.initScrollReveal();
        this.initMagneticButtons();
        this.initSmoothScrolling();
        this.initMobileCTA();
        this.initAuthSystem();
        this.preloadImages();
        
        // Add reveal effect to hero with delay
        setTimeout(() => {
            const heroContent = document.querySelector('.hero__content');
            if (heroContent) {
                heroContent.classList.add('revealed');
            }
        }, 300);

        // Setup resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.initMobileCTA();
        }, 250));

        // Global cleanup - ensure scroll is never permanently disabled
        this.setupGlobalCleanup();

        console.log('Homepage initialized successfully');
    }

    /* ===== Global Cleanup Functions ===== */
    setupGlobalCleanup() {
        // Ensure scroll is restored on page interactions
        document.addEventListener('click', (e) => {
            // Small delay to allow other handlers to complete
            setTimeout(() => {
                // Only restore scroll if no modal is currently active
                const activeModal = document.querySelector('.auth-modal.active');
                if (!activeModal) {
                    document.body.style.overflow = '';
                }
            }, 100);
        });

        // Restore scroll on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.body.style.overflow = '';
            }
        });
    }

    /* ===== Navbar Functionality ===== */
    initNavbar() {
        const navbar = document.getElementById('navbar');
        const navbarToggle = document.getElementById('navbar-toggle');
        const navbarMenu = document.getElementById('navbar-menu');
        const navbarLinks = document.querySelectorAll('.navbar__menu-link:not(.navbar__cta)');
        
        if (!navbar) return;

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', () => {
                navbarMenu.classList.toggle('active');
                navbarToggle.textContent = navbarMenu.classList.contains('active') ? '✕' : '☰';
            });

            // Close mobile menu on link click
            navbarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbarMenu.classList.remove('active');
                    navbarToggle.textContent = '☰';
                });
            });

            // Close mobile menu on outside click
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.textContent = '☰';
                }
            });
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const linkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = document.querySelector(`.navbar__menu-link[href="#${id}"]`);
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    navbarLinks.forEach(l => l.classList.remove('active'));
                    if (link) link.classList.add('active');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-100px 0px -50% 0px'
        });

        sections.forEach(section => {
            linkObserver.observe(section);
        });
    }

    /* ===== Parallax Effect ===== */
    initParallax() {
        const characters = document.querySelectorAll('.character');
        const hero = document.querySelector('.hero');
        
        if (!hero || characters.length === 0) return;
        
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;
            
            characters.forEach((char) => {
                const speed = parseFloat(char.dataset.speed) || 0.3;
                const translateX = deltaX * 20 * speed;
                const translateY = deltaY * 20 * speed;
                
                char.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
        
        hero.addEventListener('mouseleave', () => {
            characters.forEach((char) => {
                char.style.transform = 'translate(0, 0)';
            });
        });
    }

    /* ===== Scroll Reveal Animation ===== */
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach((el) => {
            revealObserver.observe(el);
        });
    }

    /* ===== Magnetic Button Effect ===== */
    initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic-btn, .btn');
        
        magneticButtons.forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                btn.addEventListener('mousemove', this.magneticMove);
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.removeEventListener('mousemove', this.magneticMove);
                btn.style.transform = btn.style.transform.replace(/translate\([^)]*\)/, '');
            });
        });
    }

    magneticMove(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        
        // Preserve any existing transforms and add magnetic effect
        const currentTransform = this.style.transform || '';
        const newTransform = currentTransform.replace(/translate\([^)]*\)/, '') + ` translate(${deltaX}px, ${deltaY}px)`;
        this.style.transform = newTransform;
    }

    /* ===== Smooth Scrolling ===== */
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /* ===== Mobile CTA Visibility ===== */
    initMobileCTA() {
        const mobileCTA = document.querySelector('.mobile-cta');
        const hero = document.querySelector('.hero');
        
        if (!mobileCTA || !hero) return;
        
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (window.innerWidth <= 768) {
                    mobileCTA.style.display = entry.isIntersecting ? 'none' : 'block';
                } else {
                    mobileCTA.style.display = 'none';
                }
            });
        }, {
            threshold: 0.5
        });
        
        ctaObserver.observe(hero);
    }

    /* ===== Authentication System Integration ===== */
    initAuthSystem() {
        // Initialize authentication system
        if (typeof updateAuthState === 'function') {
            updateAuthState();
        }
        
        // Check for auth requirements
        if (typeof checkAuthRequired === 'function') {
            checkAuthRequired();
        }
        
        // Setup auto-fill
        if (typeof setupAutoFill === 'function') {
            setupAutoFill();
        }

        // Handle welcome parameter for new users
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('welcome') === 'new') {
            const user = window.TYGAuth?.getCurrentUser();
            if (user && typeof showWelcomeMessage === 'function') {
                setTimeout(() => {
                    showWelcomeMessage(user, true);
                }, 1000);
            }
            // Clean up URL
            window.history.replaceState({}, '', window.location.pathname);
        }

        // Setup CTA button handlers
        this.setupCTAHandlers();
    }

    /* ===== CTA Button Handlers ===== */
    setupCTAHandlers() {
        // Start IQ Test buttons
        const startTestButtons = document.querySelectorAll('[data-action="start-test"], .cta-start-test');
        startTestButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleStartTest();
            });
        });

        // Academy buttons
        const academyButtons = document.querySelectorAll('[data-action="academy"], .cta-academy');
        academyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleAcademyAccess();
            });
        });

        // Learn more buttons
        const learnMoreButtons = document.querySelectorAll('[data-action="learn-more"]');
        learnMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('#how-it-works');
            });
        });
    }

    /* ===== Action Handlers ===== */
    handleStartTest() {
        // Ensure scroll is enabled
        document.body.style.overflow = '';
        
        // Navigate directly to IQ test (authentication can be handled there)
        window.location.href = 'iq-test.html';
    }

    handleAcademyAccess() {
        // Ensure scroll is enabled
        document.body.style.overflow = '';
        
        // Check if user is authenticated for academy access
        const user = this.getCurrentUser();
        
        if (user) {
            // User is logged in, go to academy
            window.location.href = 'academy-homepage.html';
        } else {
            // Show authentication modal for academy access
            this.showAuthModal();
        }
    }

    showAuthModal() {
        const modal = document.getElementById('auth-modal-container');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeAuthModal() {
        const modal = document.getElementById('auth-modal-container');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    getCurrentUser() {
        try {
            const userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.warn('Error getting user data:', error);
            return null;
        }
    }

    // Debug function to restore scroll (can be called from console)
    restoreScroll() {
        document.body.style.overflow = '';
        console.log('Scroll manually restored');
    }

    scrollToSection(selector) {
        const section = document.querySelector(selector);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /* ===== Image Preloading ===== */
    preloadImages() {
        const imagePaths = [
            'assets/images/characters/Einstein.png',
            'assets/images/characters/Steve.png',
            'assets/images/characters/DaVinci.png'
        ];
        
        imagePaths.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onerror = () => {
                // Image not found, keep placeholder
                console.log(`Character image ${path} not found, using placeholder`);
            };
            img.onload = () => {
                // Replace placeholder with actual image
                const characterElement = document.querySelector(`[data-character="${path}"]`);
                if (characterElement) {
                    characterElement.style.backgroundImage = `url(${path})`;
                    characterElement.style.backgroundSize = 'cover';
                    characterElement.style.backgroundPosition = 'center';
                    characterElement.textContent = '';
                }
            };
        });
    }

    /* ===== Utility Functions ===== */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /* ===== Analytics & Tracking ===== */
    trackUserInteraction(action, element) {
        // Track user interactions for analytics
        console.log(`User interaction: ${action}`, element);
        
        // Here you could integrate with analytics services
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'homepage_interaction',
                event_label: element.className || element.tagName
            });
        }
    }

    /* ===== Performance Monitoring ===== */
    measurePerformance() {
        // Measure and log performance metrics
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // Track Core Web Vitals
            if ('web-vital' in window) {
                import('https://unpkg.com/web-vitals').then(({ getFID, getFCP, getLCP, getCLS, getTTFB }) => {
                    getFID(console.log);
                    getFCP(console.log);
                    getLCP(console.log);
                    getCLS(console.log);
                    getTTFB(console.log);
                });
            }
        });
    }
}

// Initialize homepage when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tygHomepage = new TestYourGeniusHomepage();
    
    // Global debug function for scroll issues
    window.restoreScroll = () => {
        document.body.style.overflow = '';
        console.log('Scroll manually restored via global function');
    };
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestYourGeniusHomepage;
}
