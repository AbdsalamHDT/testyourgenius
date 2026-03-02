/* ===== Homepage Enhancements JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Social Proof Animated Counter ── */
  const counterEl = document.querySelector('.social-proof-number');
  if (counterEl) {
    const target = parseInt(counterEl.getAttribute('data-target'), 10);
    const duration = 2000; // ms
    const startTime = performance.now();

    function formatNumber(n) {
      return n.toLocaleString('en-US');
    }

    function animateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      counterEl.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    }

    // Slight delay so it starts after hero animations
    setTimeout(() => {
      requestAnimationFrame(animateCounter);
    }, 800);
  }

  /* ── 7. Scroll Animation on Process Steps (Intersection Observer) ── */
  const stepItems = document.querySelectorAll('.step-item');
  if (stepItems.length > 0 && 'IntersectionObserver' in window) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('step-visible');
          stepObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    stepItems.forEach((item, index) => {
      // Stagger the transition delay for each step
      item.style.transitionDelay = `${index * 0.15}s`;
      stepObserver.observe(item);
    });
  } else {
    // Fallback: show all steps immediately
    stepItems.forEach((item) => item.classList.add('step-visible'));
  }

});
