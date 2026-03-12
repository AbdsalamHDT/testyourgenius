/* ===== About Page Enhancements JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 3. Island Tab Switching ── */
  const tabs = document.querySelectorAll('.island-tab');
  const panels = document.querySelectorAll('.island-panel');

  if (tabs.length && panels.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const island = tab.getAttribute('data-island');

        // Update tabs
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Update panels with re-trigger of fade animation
        panels.forEach(p => {
          if (p.getAttribute('data-island') === island) {
            p.classList.add('active');
            // Re-trigger animation
            p.style.animation = 'none';
            p.offsetHeight; // force reflow
            p.style.animation = '';
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  }

  /* ── 5. FAQ Accordion ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── 6. Scroll Animations (Intersection Observer) ── */
  const animateEls = document.querySelectorAll('.about-diff-item, .about-flow-step');

  if (animateEls.length > 0 && 'IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animateEls.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.12}s`;
      scrollObserver.observe(el);
    });
  } else {
    // Fallback
    animateEls.forEach(el => el.classList.add('scroll-visible'));
  }

});
