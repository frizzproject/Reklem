import Swiper from "swiper/swiper-bundle";

document.addEventListener("DOMContentLoaded", function () {
    /* init product sliders */
    initProductsSlider();

    /* init reviews sliders */
    initReviewsSlider() 

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
            spaceBetween: 64,
        }
    }

  });
  

}

/* init reviews sliders */
function initReviewsSlider() {
  const reviewsSlider = new Swiper(".reviews__slider", {

    // Optional parameters
    direction: "horizontal",
    loop: true,
    speed: 450,
    slidesPerView: 1,
    spaceBetween: 100,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });
  
}
