document.addEventListener("DOMContentLoaded", function () {
  var lightbox = document.getElementById("photo-lightbox");

  if (!lightbox || typeof Swiper === "undefined") {
    return;
  }

  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".photo-gallery__item"));
  var counter = lightbox.querySelector(".photo-lightbox__counter");
  var closeButton = lightbox.querySelector(".photo-lightbox__close");
  var previousButton = lightbox.querySelector(".photo-lightbox__navigation--previous");
  var nextButton = lightbox.querySelector(".photo-lightbox__navigation--next");
  var swiperElement = lightbox.querySelector(".photo-lightbox__swiper");
  var activeIndex = 0;
  var touchStart = null;
  var opener = null;
  var closeTimer = null;
  var lightboxIsOpen = false;
  var swiper = null;

  function updateCounter(index) {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    counter.textContent = (activeIndex + 1) + " / " + galleryItems.length;
  }

  function showImage(index, speed) {
    var targetIndex = (index + galleryItems.length) % galleryItems.length;
    swiper.slideTo(targetIndex, speed);
    updateCounter(targetIndex);
  }

  function initializeSwiper() {
    if (swiper) {
      swiper.update();
      return;
    }

    if (swiperElement.swiper) {
      swiperElement.swiper.destroy(true, true);
    }

    swiper = new Swiper(swiperElement, {
      loop: false,
      rewind: true,
      speed: 380,
      allowTouchMove: false,
      simulateTouch: false,
      navigation: {
        nextEl: nextButton,
        prevEl: previousButton,
      },
      on: {
        activeIndexChange: function (instance) {
          updateCounter(instance.realIndex);
        },
        slideChange: function (instance) {
          updateCounter(instance.realIndex);
        },
      },
    });
  }

  swiperElement.addEventListener("touchstart", function (event) {
    var touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  document.addEventListener("touchend", function (event) {
    if (!touchStart) {
      return;
    }

    var touch = event.changedTouches[0];
    var deltaX = touch.clientX - touchStart.x;
    var deltaY = touch.clientY - touchStart.y;
    touchStart = null;

    if (lightboxIsOpen && Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      showImage(swiper.activeIndex + (deltaX < 0 ? 1 : -1));
    }
  }, { passive: true });

  document.addEventListener("touchcancel", function () {
    touchStart = null;
  }, { passive: true });

  function openLightbox(index) {
    window.clearTimeout(closeTimer);
    opener = galleryItems[index];
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("photo-lightbox-open");
    lightboxIsOpen = true;
    lightbox.classList.add("is-open");
    updateCounter(index);
    window.requestAnimationFrame(function () {
      initializeSwiper();
      showImage(index, 0);
    });
    closeButton.focus();
  }

  function closeLightbox() {
    if (!lightboxIsOpen) {
      return;
    }

    lightboxIsOpen = false;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("photo-lightbox-open");
    closeTimer = window.setTimeout(function () {
      lightbox.hidden = true;
    }, 240);

    if (opener) {
      opener.focus();
    }
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!lightboxIsOpen) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showImage(swiper.realIndex - 1);
    } else if (event.key === "ArrowRight") {
      showImage(swiper.realIndex + 1);
    }
  });
});