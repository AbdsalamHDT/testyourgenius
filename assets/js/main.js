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
  }
});
