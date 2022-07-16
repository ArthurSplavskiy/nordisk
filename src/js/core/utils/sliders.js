/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
//import Swiper, { Navigation, Pagination, Lazy } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../../scss/libs/_swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	if (document.querySelector('.s-slider__slider')) {
		document.querySelectorAll('.s-slider__slider').forEach((slider, index) => {
			if(slider) {
				new Swiper(`[data-slider-id="${index}"]`, {
					lazy: {
						checkInView: true,
						preloadImages: false,
						loadPrevNext: true,
						loadPrevNextAmount: 5
					},
					observer: true,
					observeParents: true,
					slidesPerView: 'auto',
					spaceBetween: 36,
					resizeObserver: true,
					autoHeight: true,
					speed: 800,
					grabCursor: true,
					navigation: {
						prevEl: `[data-slider-prev="${index}"]`,
						nextEl: `[data-slider-next="${index}"]`,
						disabledClass: '_disabled'
					},
					pagination: {
						el: `[data-slider-pagination="${index}"]`,
						type: 'bullets',
						clickable: true
					},
					breakpoints: {
						0: {
							spaceBetween: 12,
							lazy: {
								loadPrevNextAmount: 3
							},
						},
						560: {
							lazy: {
								loadPrevNextAmount: 5
							},
						},
						992: {
							spaceBetween: 35
						}
					}
				})
				new Swiper('[data-slider-id="-1"]', {
					lazy: {
						checkInView: true,
						preloadImages: false,
						loadPrevNext: true,
						loadPrevNextAmount: 3
					},
					observer: true,
					observeParents: true,
					slidesPerView: 'auto',
					spaceBetween: 15,
					resizeObserver: true,
					autoHeight: true,
					speed: 800,
					grabCursor: true,
					navigation: {
						prevEl: '[data-slider-prev="-1"]',
						nextEl: '[data-slider-next="-1"]',
						disabledClass: '_disabled'
					},
					pagination: {
						el: '[data-slider-pagination="-1"]',
						type: 'bullets',
						clickable: true
					},
					breakpoints: {
						0: {
							spaceBetween: 9,
						},
						992: {
							spaceBetween: 15
						}
					}
				})
			}
		})
	}

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders()
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});