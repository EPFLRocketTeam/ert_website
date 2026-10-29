document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper:not(.photo-lightbox__swiper)", {
    direction: "horizontal",
    loop: true,
    pagination: { el: ".swiper-pagination" },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: { el: ".swiper-scrollbar" },
  });
});
