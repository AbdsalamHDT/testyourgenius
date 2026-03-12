/* ===== Homepage Enhancements JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Animation on Process Steps (Intersection Observer) ── */
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
