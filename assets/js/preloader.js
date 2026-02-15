/* Preloader — Homepage only */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  let hidden = false;

  function hide() {
    if (hidden) return;
    hidden = true;
    preloader.classList.add('preloader--hide');
    preloader.addEventListener('transitionend', () => {
      preloader.style.display = 'none';
    }, { once: true });
  }

  const heroVideo = document.querySelector('.hero-video');

  if (heroVideo) {
    heroVideo.addEventListener('canplaythrough', hide, { once: true });
    heroVideo.addEventListener('loadeddata', hide, { once: true });
  }

  window.addEventListener('load', hide);

  // Hard fallback
  setTimeout(hide, 6000);
})();
