import { populateCard } from './render_new.js';

export function initDayProductsSlider(products) {
  const dayProducts = products.filter(p => p.goodsOfDay);
  
  const dayProductsList = document.querySelector('.day-products__list');
  if (!dayProductsList) return;

  const items = dayProductsList.querySelectorAll('.day-products__item');
  items.forEach((item, index) => {
    if (index > 0) {
      item.remove();
    }
  });
  
  if (dayProducts.length === 0) return;

  const firstItem = dayProductsList.querySelector('.day-products__item');
  if (firstItem && dayProducts.length > 0) {
    const liContent = firstItem.querySelector('.catalog__item');
    if (liContent) {
      populateCard(liContent, dayProducts[0]);
    }
  }
  
  for (let i = 1; i < dayProducts.length; i++) {
    const li = document.createElement('li');
    li.className = 'day-products__item swiper-slide';

    const template = dayProductsList.querySelector('.day-products__item');
    if (template) {
      const itemCard = template.cloneNode(true);
      const liInner = itemCard.querySelector('.catalog__item');
      if (liInner) {
        populateCard(liInner, dayProducts[i]);
      }
      li.appendChild(itemCard.firstChild);
    }
    
    dayProductsList.appendChild(li);
  }

  if (typeof Swiper !== 'undefined') {
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
