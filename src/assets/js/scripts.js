import Swiper from "swiper/swiper-bundle";

document.addEventListener("DOMContentLoaded", function () {
    /* init product sliders */
    initProductsSlider();

});

/* init product sliders */
function initProductsSlider() {
  const productSlider = new Swiper(".products__slider", {

    // Optional parameters
    direction: "horizontal",
    loop: true,
    speed: 450,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
    },

    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3.5,
          spaceBetween: 64
        },
        // when window width is >= 768px
        1120: {
            slidesPerView: 4,
            spaceBetween: 64
        }
    }

  });
  

}
