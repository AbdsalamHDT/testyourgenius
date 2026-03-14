// Main application JavaScript

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar Mobile Toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');

  if (toggle && menu) {
    function closeMenu() {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Navbar scroll state ── */
  const navbar = document.querySelector('.navbar');
  const hasHeroVideo = !!document.querySelector('.hero--video');
  if (navbar) {
    if (!hasHeroVideo) {
      // Non-homepage: always solid
      navbar.classList.add('nav--scrolled');
    } else {
      function updateNavScroll() {
        if (window.scrollY > 10) {
          navbar.classList.add('nav--scrolled');
        } else {
          navbar.classList.remove('nav--scrolled');
        }
      }
      window.addEventListener('scroll', updateNavScroll, { passive: true });
      updateNavScroll();
    }

    /* ── Hide navbar on scroll down, show on scroll up ── */
    let lastScrollY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 8;

    function updateNavVisibility() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      if (delta > SCROLL_THRESHOLD && currentY > 100) {
        // Scrolling down past 100px — hide
        navbar.classList.add('nav--hidden');
      } else if (delta < -SCROLL_THRESHOLD || currentY <= 10) {
        // Scrolling up or near top — show
        navbar.classList.remove('nav--hidden');
      }

      // Also update scrolled background
      if (!hasHeroVideo) {
        navbar.classList.add('nav--scrolled');
      } else {
        if (currentY > 10) navbar.classList.add('nav--scrolled');
        else navbar.classList.remove('nav--scrolled');
      }

      lastScrollY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateNavVisibility);
        ticking = true;
      }
    }, { passive: true });
  }
});
