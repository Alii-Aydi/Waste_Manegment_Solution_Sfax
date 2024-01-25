const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  grabCursor: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  observer: true,
  observeParents: true,
});
