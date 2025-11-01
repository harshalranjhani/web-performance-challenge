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
    // Prevent CLS during initialization
    observer: true,
    observeParents: true,
    watchOverflow: true,
    // Mobile-specific optimizations
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  });
})();