/* ===== SCROLL REVEAL — Intersection Observer Engine ===== */
/* Lightweight vanilla JS. Fires once per element. Respects prefers-reduced-motion. */

(function () {
  'use strict';

  // Bail out entirely if user prefers reduced motion
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    // Make everything visible immediately
    document.addEventListener('DOMContentLoaded', function () {
      var els = document.querySelectorAll('.reveal, .reveal-up, .reveal-fade, .reveal-scale, .reveal-stagger');
      for (var i = 0; i < els.length; i++) {
        els[i].classList.add('revealed');
      }
    });
    return;
  }

  // Configuration
  var THRESHOLD = 0.12;        // 12% visible triggers reveal
  var ROOT_MARGIN = '0px 0px -40px 0px'; // Slight bottom offset for natural feel

  function initReveal() {
    var revealElements = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-fade, .reveal-scale, .reveal-stagger'
    );

    if (!revealElements.length) return;

    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('revealed');
            observer.unobserve(entries[i].target); // Fire once only
          }
        }
      }, {
        threshold: THRESHOLD,
        rootMargin: ROOT_MARGIN
      });

      for (var i = 0; i < revealElements.length; i++) {
        observer.observe(revealElements[i]);
      }
    } else {
      // Fallback: reveal everything immediately
      for (var i = 0; i < revealElements.length; i++) {
        revealElements[i].classList.add('revealed');
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
