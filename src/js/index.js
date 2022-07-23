import "../scss/style.scss";
import './core/utils/inline-svg.js';
import './core/utils/sliders.js';
import './core/scroll/lazyload.js';
import './core/forms/select.js';
import './core/utils/map.js';
import { formFieldsInit, formSubmit } from './core/forms/forms.js';
import { isTarget, spollers, isWebp, _slideUp, bodyLockStatus, bodyLockToggle, tabs, bodyUnlock, bodyLock } from './core/utils/functions.js';
import { gotoBlock } from './core/scroll/gotoblock.js';

const $html = document.documentElement;
const $fixtips = document.querySelector('[data-fixtips]');
const $anchor = document.querySelector('[data-anchor]');
const $headerMenu = document.querySelector('[data-mobile-menu]');
const $pageBurgerEl = document.querySelector('[data-burger]');
const $filter = document.querySelector('[data-filter]');
const $card = document.querySelector('[data-card]');
const $popup = document.querySelector('.popup');
const $cookies = document.querySelector('[data-cookies]');

export const popup = {
	open (selector) {
		document.querySelector(selector).classList.add('_open');
		if (bodyLockStatus) {
			bodyLock(0);
		}
	},
	close (e, selector) {
		e.target.closest(selector).closest('.popup').classList.remove('_open');
		if (bodyLockStatus) {
			bodyUnlock(0);
		}
	}
};

const clickOnDocument = (e) => {
	const targetElement = e.target;

	const $pageBurger = isTarget(targetElement, '[data-burger]')
	const toggleMenu = () => {
		if (bodyLockStatus) {
			bodyLockToggle();
			$headerMenu.classList.toggle('js-open');
			$pageBurgerEl && $pageBurgerEl.classList.toggle('js-open');
			$headerMenu.querySelectorAll('[data-sublist]').forEach(sublist => {
				sublist.classList.remove('js-open');
			})
			$headerMenu && $headerMenu.querySelector('.page-menu__body').classList.remove('js-scroll-hide');
		}
	}

	if ($pageBurger && $headerMenu) {
		toggleMenu();
	}

	const $pageMenuClose = isTarget(targetElement, '[data-menu-close]');
	if ($pageMenuClose) {
		toggleMenu();
	}

	const $nextLevelMenu = isTarget(targetElement, '[data-next-lvl]');
	if ($nextLevelMenu) {
		const $sublist = $nextLevelMenu.nextElementSibling;
		if($sublist.hasAttribute('data-sublist')) {
			$sublist.classList.add('js-open');
			$headerMenu && $headerMenu.querySelector('.page-menu__body').classList.add('js-scroll-hide');
		}
	}

	const $prevLevelMenu = isTarget(targetElement, '[data-prev-lvl]');
	if ($prevLevelMenu) {
		$prevLevelMenu.closest('[data-sublist]').classList.remove('js-open');
		$headerMenu && $headerMenu.querySelector('.page-menu__body').classList.remove('js-scroll-hide');
	}

	if(targetElement.closest('.popup__close')) {
		popup.close(e, '.popup__close');
	}

	if(targetElement.closest('.popup') && !targetElement.closest('.popup__content')) {
		popup.close(e, '.popup');
	}
	
	if(targetElement.closest('[href="#"]')) {
		e.preventDefault();
	}

	const $fixtipBtn = isTarget(targetElement, '[data-fixtip-btn]');
	if ($fixtipBtn) {
		const $fixtip = $fixtipBtn.closest('[data-fixtip]');
		$fixtip && $fixtip.classList.toggle('_active');
	}

	const $anchor = isTarget(targetElement, '[data-anchor]');
	if ($anchor) {
		gotoBlock('.header');
	}

	const $filterBtn = isTarget(targetElement, '[data-filter-btn]');
	if ($filterBtn) {
		if (bodyLockStatus) {
			bodyLock();
		}
		$filter && $filter.classList.add('js-open');
	}

	const $filterClose = isTarget(targetElement, '[data-filter-close]');
	if ($filterClose) {
		if (bodyLockStatus) {
			bodyUnlock();
		}
		$filter && $filter.classList.remove('js-open');
	}

	const $overlay = isTarget(targetElement, '.page-overlay');
	if ($overlay) {
		if (bodyLockStatus) {
			bodyUnlock();
		}

		if($filter && $filter.classList.contains('js-open')) $filter.classList.remove('js-open');
		if($card && $card.classList.contains('js-open')) $card.classList.remove('js-open');
	}

	const $quantityPlus = isTarget(targetElement, '.quantity__button_plus')
	const $quantityMinus = isTarget(targetElement, '.quantity__button_minus')
	if ($quantityPlus) {
		const $quantity = $quantityPlus.closest('.quantity');
		const $quantityInput = $quantityPlus.closest('.quantity').querySelector('input');
		let value = parseInt($quantityInput.value);
		$quantityInput.value = ++value;
		if (value > 1) {
			$quantity.classList.remove('_disabled');
		} else {
			$quantity.classList.add('_disabled');
		}
	}
	if ($quantityMinus) {
		const $quantity = $quantityMinus.closest('.quantity');
		const $quantityInput = $quantityMinus.closest('.quantity').querySelector('input');
		let value = parseInt($quantityInput.value);
		value > 1 ? $quantityInput.value = --value : value;
		if (value > 1) {
			$quantityInput.value = --value;
			$quantity.classList.remove('_disabled');
		} else {
			$quantity.classList.add('_disabled');
		}
	}

	const $cardOpenTrigger = isTarget(targetElement, '[data-card-open]');
	if($cardOpenTrigger) {
		$card && $card.classList.add('js-open');
		if (bodyLockStatus) {
			bodyLock();
		}
	}

	const $cardCloseTrigger = isTarget(targetElement, '[data-card-close]');
	if($cardCloseTrigger) {
		$card && $card.classList.remove('js-open');
		if (bodyLockStatus) {
			bodyUnlock();
		}
	}

	const $popupTriggerOpen = isTarget(targetElement, '[data-popup-open]');
	if($popupTriggerOpen) {
		$popup && popup.open('.popup');
	}

	const $closeCookies = isTarget(targetElement, '[data-cookies-close]');
	if ($closeCookies) {
		if ($cookies) $cookies.style.display = 'none';
		localStorage.setItem('cookies-banner', 'off');
	}

	const $productHeading = isTarget(targetElement, '[data-product-anchor]');
	if ($productHeading) {
		gotoBlock('[data-product-descr]');
	}
};

const setCopyrightYear = (el) => {
	el ? el.innerHTML = `${new Date().getFullYear()}` : null;
};

const searchProducts = (form) => {
	const $formInput = form.querySelector('[data-search-input]');
	const $formClear = form.querySelector('[data-search-clear]');
	const $formDropbox = form.querySelector('[data-search-dropbox]');
	const $formResults = form.querySelectorAll('[data-search-result]');

	$formDropbox.style.display = 'none';

	if ($formClear) {
		$formClear.onclick = () => {
			$formInput.value = '';
			$formDropbox.style.display = 'none';
			form.classList.remove('_search');
			form.classList.remove('_br');
		};
	}

	const inputText = (e) => {
		const searchText = e.target.value.toLowerCase();
		form.classList.add('_search');

		$formResults.forEach(text => {
			const resultText = text.textContent.toLowerCase();
			text.closest('li').style.display = 'none';

			if (resultText.includes(searchText)) {
				$formDropbox.style.display = '';
				text.closest('li').style.display = '';
				form.classList.add('_br');
			}
		});

		if (!e.target.value) {
			$formDropbox.style.display = 'none';
			form.classList.remove('_search');
			form.classList.remove('_br');
		};
	};

	$formInput.addEventListener('input', inputText);
};

const setParallaxOnImage = (e) => {
	const $image = e.target.closest('[data-parallax]');
	const $parallaxImage = $image.querySelector('[data-parallax-image]');
	const $parallaxBorder = $image.querySelector('[data-parallax-border]');

	const x = (-window.innerWidth / e.pageX*5);
	const y = (window.innerHeight / e.pageY*5) * 10;

	const notFar = Math.abs(x) < 50;

	if ($parallaxImage && notFar) $parallaxImage.style.transform = `translate(${x}px, ${y}px)`;
	if ($parallaxBorder && notFar) $parallaxBorder.style.transform = `translate(${x*1.5}px, ${y*1.5}px)`;
};

const setWindowScroll = (e) => {
	if(window.scrollY > 300) {
		$fixtips && $fixtips.classList.add('_show');
	} else {
		$fixtips && $fixtips.classList.remove('_show');
	}

	if($anchor) $anchor.style.opacity = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
};

const resetTransform = (e) => {
	const $image = e.target.closest('[data-parallax]');
	const $parallaxImage = $image.querySelector('[data-parallax-image]');
	const $parallaxBorder = $image.querySelector('[data-parallax-border]');
	if ($parallaxImage) $parallaxImage.style.transform = '';
	if ($parallaxBorder) $parallaxBorder.style.transform = '';
};

const showCookiesBanner = (banner) => {
	const bannerStatus = localStorage.getItem('cookies-banner');
	if (bannerStatus === 'off') {
		banner.style.display = 'none';
	}
};

const replaceWebpBg = (backgrounds) => {
	backgrounds.forEach(bg => {
		
		if (bg.hasAttribute('data-fallback-bg')) {
			const intervalID = setInterval(checkWebp, 1000);

			setTimeout(() => {
				clearInterval(intervalID);
			}, 5000);

			function checkWebp () {
				if ($html.classList.contains('webp') || $html.classList.contains('no-webp')) {
					clearInterval(intervalID);
					
					if ($html.classList.contains('no-webp')) {
						bg.style.backgroundImage = `url(${bg.dataset.fallbackBg})`;
					}
				}
			}
		}
	});
};

const init = () => {
	const $html = document.documentElement;
	const $searchForm = document.querySelector('[data-search]');
	const $parallaxItems = document.querySelectorAll('[data-parallax]');
	const $quantities = document.querySelectorAll('.quantity');
	const $webpBgs = document.querySelectorAll('[data-bg$=".webp"]');

	$html.classList.add('loaded');
	
	isWebp();
	spollers();
	setCopyrightYear(document.querySelector('.js-copyright-year'));
	formFieldsInit();
	formSubmit(true);
	tabs();

	if ($searchForm) {
		searchProducts($searchForm);
	}
	if ($quantities) {
		$quantities.forEach(quantity => quantity.classList.add('_disabled'));
	}
	if ($webpBgs.length) {
		replaceWebpBg($webpBgs);
	}
	if ($cookies) {
		showCookiesBanner($cookies);
	}

	$parallaxItems.forEach(image => image.addEventListener('mousemove', setParallaxOnImage));
	$parallaxItems.forEach(image => image.addEventListener('mouseout', resetTransform));
	
	document.addEventListener('click', clickOnDocument);
	window.addEventListener('scroll', setWindowScroll);
};

window.addEventListener('load', init);