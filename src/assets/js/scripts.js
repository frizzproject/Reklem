import Swiper from "swiper/swiper-bundle";

document.addEventListener("DOMContentLoaded", function () {
  /* init product sliders */
  initProductsSlider();

  /* init reviews sliders */
  initReviewsSlider();

  /* init categories sliders */
  initCategoriesSlider();

  /* navigation */
  navigation();
});

/* product sliders */
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
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3.5,
        spaceBetween: 64,
      },
      // when window width is >= 768px
      1120: {
        slidesPerView: 4,
        spaceBetween: 64,
      },
    },
  });
}

/* reviews sliders */
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
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

/* reviews sliders */
function initCategoriesSlider() {
  const categoriesSlider = new Swiper(".categories__slider", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    speed: 450,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
        spaceBetween: 48,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      // when window width is >= 1120px
      1120: {
        slidesPerView: 7,
        spaceBetween: 48,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
  });
}

/* navigation */
function navigation() {
  /* varibles */
  const IS_ACTIVE = "_isActive";

  const menuBtn = document.querySelector(".menu__nav-burger");
  const closeBtns = document.querySelectorAll(".nav__close");
  const searchBtn = document.querySelector(".menu__nav-search");

  const nav = document.querySelector(".menu__nav");
  const subMenu = document.querySelector("#submenuPopap");
  const subSearch = document.querySelector("#searchPopap");

  menuBtn.onclick = function () {
    let mobileInterface =
      document.documentElement.clientWidth <= 960 ? true : false;

    if (!subMenu.classList.contains(IS_ACTIVE)) {
      subMenu.classList.add(IS_ACTIVE);
      document.documentElement.classList.add("_open");
      // Для моильного интерфейса
      if (mobileInterface) {
        subSearch.classList.add(IS_ACTIVE);
        subSearch.childNodes[1].classList.add(IS_ACTIVE);
        nav.classList.add(IS_ACTIVE);

        document.documentElement.classList.add("_scroll-ban");
      }
    } else {
      subMenu.classList.remove(IS_ACTIVE);
      document.documentElement.classList.remove("_open");
      // Для моильного интерфейса
      if (mobileInterface) {
        subSearch.classList.remove(IS_ACTIVE);
        subSearch.childNodes[1].classList.remove(IS_ACTIVE);
        nav.classList.remove(IS_ACTIVE);

        document.documentElement.classList.remove("_scroll-ban");
      }
    }
  };

  searchBtn.onclick = function (e) {
    if (!subSearch.classList.contains(IS_ACTIVE)) {
      subSearch.classList.add(IS_ACTIVE);
      document.documentElement.classList.add("_open");
      subSearch.childNodes[1].classList.add(IS_ACTIVE);
      // Когда поиск выдает результат
      subSearch.childNodes[3].classList.add(IS_ACTIVE);
    }
  };

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // menu
      subMenu.classList.remove(IS_ACTIVE);
      // search
      subSearch.classList.remove(IS_ACTIVE);
      subSearch.childNodes[1].classList.remove(IS_ACTIVE);
      subSearch.childNodes[3].classList.remove(IS_ACTIVE);

      document.documentElement.classList.remove("_open");
    });
  });
}
