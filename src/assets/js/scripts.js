import Swiper from "swiper/swiper-bundle";
import noUiSlider from "nouislider";
import wNumb from "./wNumb";

const IS_ACTIVE = "_isActive";

document.addEventListener("DOMContentLoaded", function () {
  /* init products sliders */
  initProductsSlider();

  /* init product preview sliders */
  initProductPreviewSlider();

  /* init product sliders */
  initProductSlider();

  /* init reviews sliders */
  initReviewsSlider();

  /* init categories sliders */
  initCategoriesSlider();

  /* init sponsors sliders */
  initSponsorsSlider();

  /* navigation init */
  navigation();

  /* accordions init */
  accordions();

  /* tabs init */
  tabs();

  /* show form modal */
  formModal();

  /* priceSlider init */
  priceSlider();

  /* show all filters */
  filtersShow();
});

/* price range */
function priceSlider() {
  const priceSlider = document.getElementById("sliderPrice");
  const sliderValues = [
    document.getElementById("priceFrom"),
    document.getElementById("priceTo"),
  ];

  if (priceSlider) {
    noUiSlider.create(priceSlider, {
      start: [70, 35000],
      connect: true,
      range: {
        min: [70],
        max: [35000],
      },
      format: wNumb({
        decimals: 0,
        thousand: "",
        suffix: "₽",
      }),
    });

    priceSlider.noUiSlider.on("update", function (values, handle) {
      sliderValues[handle].value = values[handle];
    });

    sliderValues.forEach(function (input, handle) {
      input.addEventListener("change", function () {
        priceSlider.noUiSlider.setHandle(handle, this.value);
      });

      input.addEventListener("keydown", function (e) {
        var values = priceSlider.noUiSlider.get();
        var value = Number(values[handle]);

        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = priceSlider.noUiSlider.steps();

        // [down, up]
        var step = steps[handle];

        var position;

        // 13 is enter,
        // 38 is key up,
        // 40 is key down.
        switch (e.key) {
          case "Enter":
            priceSlider.noUiSlider.setHandle(handle, this.value);
            break;

          case "ArrowUp":
            // Get step to go increase slider value (up)
            position = step[1];

            // false = no step is set
            if (position === false) {
              position = 1;
            }

            // null = edge of slider
            if (position !== null) {
              priceSlider.noUiSlider.setHandle(handle, value + position);
            }

            break;

          case "ArrowDown":
            position = step[0];

            if (position === false) {
              position = 1;
            }

            if (position !== null) {
              priceSlider.noUiSlider.setHandle(handle, value - position);
            }

            break;
        }
      });
    });
  }
}

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

/* product sliders */
function initProductPreviewSlider() {
  const productPreviewSlider = new Swiper(".product__card-preview-slider", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    speed: 450,
    slidesPerView: 1,
    spaceBetween: 40,

    autoplay: {
      delay: 5000,
    },

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
  });
}

/* product sliders */
function initProductSlider() {
  const productPreview = document.querySelectorAll(".product__slide-img");
  const productPreviewMas = [];

  productPreview.forEach((img) => {
    productPreviewMas.push(img.src);
  });

  const productSlider = new Swiper(".product__slider", {
    // Optional parameters
    direction: "vertical",
    loop: true,
    speed: 450,
    slidesPerView: 3,
    spaceBetween: 40,
    slideToClickedSlide: true,

    autoplay: {
      delay: 5000,
    },

    zoom: {
      maxRatio: 2,
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  productSlider.on("slideChangeTransitionEnd", function () {
    const activeSlideImg = document.querySelector(
      ".swiper-slide-active > .swiper-zoom-container > .product__slide-img"
    );
    document.querySelector(".product__preview-img").src = activeSlideImg.src;
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

/* reviews sliders */
function initSponsorsSlider() {
  const sponsorsSlider = new Swiper(".sponsors__slider", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    speed: 450,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 28,
      },
      // when window width is >= 768px
      580: {
        slidesPerView: 3,
        spaceBetween: 48,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
        spaceBetween: 64,
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

/* tabs */
function tabs() {
  const tabsSwitch = document.querySelectorAll(".tab__switch");
  const tabsBody = document.querySelectorAll(".tab__body");

  tabsSwitch.forEach(itemSwitch => {
    itemSwitch.addEventListener("click", function() {
      let id = this.dataset.switch;
      
      // Удадение выбора у всех кнопок
      tabsSwitch.forEach((lastSwitch) => lastSwitch.classList.remove(IS_ACTIVE));
      // Удадение выбора у всех блоков контента
      tabsBody.forEach((lastBody) => lastBody.classList.remove(IS_ACTIVE));

      // Добавление выбора на кнопку
      this.classList.add(IS_ACTIVE);
      // Показ контента
      document.getElementById(id).classList.add(IS_ACTIVE);
    });
  });
}

/* call form */
function formModal() {
  const modal = document.querySelector("#contactsFormModal");
  const modalBtn = document.querySelector("#formModalBtn");
  const modalBtnClose = document.querySelector(".form-modal__close");

  modalBtn.addEventListener("click", () => {
    if (!modal.classList.contains(IS_ACTIVE)) {
      modal.classList.add(IS_ACTIVE);
    } else {
      modal.classList.remove(IS_ACTIVE);
    }
  });
  modalBtnClose.addEventListener("click", () => {
    modal.classList.remove(IS_ACTIVE);
  });
}

/* accordions */
function accordions() {
  const triggersWrap = document.querySelectorAll(".drop__wrap");
  const triggers = document.querySelectorAll(".drop__trigger");
  const triggerDrops = document.querySelectorAll(".dropdown");

  triggers.forEach((triger) => {
    triger.addEventListener("click", function () {
      // this drop list and wrap
      let thisWrap = this.parentElement;
      let thisDrop = this.nextElementSibling;

      if (!triger.classList.contains(IS_ACTIVE)) {
        // close all drops
        triggersWrap.forEach((lastWrap) =>
          lastWrap.classList.remove(IS_ACTIVE)
        );
        triggers.forEach((lastTrigger) =>
          lastTrigger.classList.remove(IS_ACTIVE)
        );
        triggerDrops.forEach((lastDrop) =>
          lastDrop.classList.remove(IS_ACTIVE)
        );

        thisWrap.classList.add(IS_ACTIVE);
        triger.classList.add(IS_ACTIVE);
        thisDrop.classList.add(IS_ACTIVE);
      } else {
        thisWrap.classList.remove(IS_ACTIVE);
        triger.classList.remove(IS_ACTIVE);
        thisDrop.classList.remove(IS_ACTIVE);
      }
    });
  });
}

/* filters */
function filtersShow() {
  const filters = document.querySelector(".filters");
  const allFilters = document.querySelector("#allFilters");
  const closeFilters = document.querySelector(".filters__close");

  if (allFilters) {

    allFilters.addEventListener("click", () => {
      if (!filters.classList.contains(IS_ACTIVE)) {
        filters.classList.add(IS_ACTIVE);
        document.documentElement.classList.add("_open");
        document.documentElement.classList.add("_scroll-ban");
      } else {
        filters.classList.remove(IS_ACTIVE);
        document.documentElement.classList.remove("_scroll-ban");
        document.documentElement.classList.remove("_open");
      }
    });
    closeFilters.addEventListener("click", () => {
      filters.classList.remove(IS_ACTIVE);
      document.documentElement.classList.remove("_scroll-ban");
      document.documentElement.classList.remove("_open");
    });
  }

}
