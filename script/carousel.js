// Initialize Swiper only when the library is loaded
(function initCarousel() {
  if (typeof Swiper === 'undefined') {
    // Swiper not loaded yet, wait a bit
    setTimeout(initCarousel, 100);
    return;
  }

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    speed: 400,
  });
})();