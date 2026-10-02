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
  var activeIndex = 0;
  var opener = null;
  var closeTimer = null;
  var lightboxIsOpen = false;
  var swiper = new Swiper(lightbox.querySelector(".photo-lightbox__swiper"), {
    loop: true,
    speed: 380,
    navigation: {
      nextEl: nextButton,
      prevEl: previousButton,
    },
  });

  function updateCounter(index) {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    counter.textContent = (activeIndex + 1) + " / " + galleryItems.length;
  }

  function showImage(index, speed) {
    var targetIndex = (index + galleryItems.length) % galleryItems.length;
    swiper.slideToLoop(targetIndex, speed);
    updateCounter(targetIndex);
  }

  swiper.on("slideChange", function () {
    updateCounter(swiper.realIndex);
  });

  function openLightbox(index) {
    window.clearTimeout(closeTimer);
    opener = galleryItems[index];
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("photo-lightbox-open");
    lightboxIsOpen = true;
    window.requestAnimationFrame(function () {
      swiper.update();
      showImage(index, 0);
      lightbox.classList.add("is-open");
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
      showImage(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      showImage(activeIndex + 1);
    }
  });
});