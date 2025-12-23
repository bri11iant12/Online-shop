import { renderProductCard } from './render_new.js';

export function initDayProductsSlider(products) {
  const dayProducts = products.filter(p => p.goodsOfDay);
  
  const dayProductsList = document.querySelector('.day-products__list');
  if (!dayProductsList) return;
  
  dayProductsList.innerHTML = '';
  
  dayProducts.forEach(product => {
    const li = document.createElement('li');
    li.className = 'day-products__item swiper-slide';
    li.innerHTML = renderProductCard(product);
    dayProductsList.appendChild(li);
  });

  if (dayProducts.length > 0 && typeof Swiper !== 'undefined') {
    new Swiper('.day-products__slider', {
      navigation: {
        nextEl: '.day-products__navigation-btn--next',
        prevEl: '.day-products__navigation-btn--prev',
      },
      spaceBetween: 20,
      slidesPerView: 4,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      },
    });
  }
}
