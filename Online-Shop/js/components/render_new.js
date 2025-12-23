function getTemplateCard() {
  const templateCard = document.querySelector('.catalog__item');
  if (!templateCard) return null;
  return templateCard.cloneNode(true);
}

export function populateCard(cardElement, product) {
  if (!cardElement) return;

  const img = cardElement.querySelector('.product-card__img');
  if (img) {
    img.src = product.image;
    img.alt = product.name;
  }

  const title = cardElement.querySelector('.product-card__title');
  if (title) {
    title.textContent = product.name;
  }

  const oldPrice = cardElement.querySelector('.product-card__old-number');
  if (oldPrice) {
    oldPrice.textContent = product.price.old.toLocaleString('ru-RU');
  }

  const newPrice = cardElement.querySelector('.product-card__price-number');
  if (newPrice) {
    newPrice.textContent = product.price.new.toLocaleString('ru-RU');
  }

  const addBtn = cardElement.querySelector('.product-card__link.btn--icon');
  if (addBtn) {
    addBtn.classList.add('add-to-cart-btn');
    addBtn.setAttribute('data-id', product.id);
    addBtn.setAttribute('type', 'button');
  }

  const availability = product.availability;
  
  const moscowCount = cardElement.querySelector('.tooltip__list .tooltip__item:nth-child(1) .tooltip__count');
  if (moscowCount) {
    moscowCount.textContent = availability.moscow;
  }

  const orenburgCount = cardElement.querySelector('.tooltip__list .tooltip__item:nth-child(2) .tooltip__count');
  if (orenburgCount) {
    orenburgCount.textContent = availability.orenburg;
  }

  const spbCount = cardElement.querySelector('.tooltip__list .tooltip__item:nth-child(3) .tooltip__count');
  if (spbCount) {
    spbCount.textContent = availability.saintPetersburg;
  }

  // Кнопка с «i» должна выступать триггером для Tippy.js
  const tooltipBtn = cardElement.querySelector('.tooltip__btn');
  if (tooltipBtn) {
    tooltipBtn.classList.add('tooltip-trigger');
  }

  return cardElement;
}

export function renderProductCard(product) {
  const { image, name, price, availability, id } = product;

  const oldPrice = price.old.toLocaleString('ru-RU');
  const newPrice = price.new.toLocaleString('ru-RU');

  const moscow = availability.moscow;
  const orenburg = availability.orenburg;
  const saintPetersburg = availability.saintPetersburg;

  return `
    <div class="product-card product-card--small">
      <div class="product-card__visual">
        <img class="product-card__img" src="${image}" height="344" width="290" alt="${name}">
        <div class="product-card__more">
          <button class="product-card__link btn btn--icon add-to-cart-btn" type="button" data-id="${id}">
            <span class="btn__text">В корзину</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-basket"></use>
            </svg>
          </button>
          <a href="#" class="product-card__link btn btn--secondary">
            <span class="btn__text">Подробнее</span>
          </a>
        </div>
      </div>
      <div class="product-card__info">
        <h2 class="product-card__title">${name}</h2>
        <span class="product-card__old">
          <span class="product-card__old-number">${oldPrice}</span>
          <span class="product-card__old-add">₽</span>
        </span>
        <span class="product-card__price">
          <span class="product-card__price-number">${newPrice}</span>
          <span class="product-card__price-add">₽</span>
        </span>
        <div class="product-card__tooltip tooltip">
          <button class="tooltip__btn tooltip-trigger" aria-label="Показать подсказку">
            <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-i"></use>
            </svg>
          </button>
          <div class="tooltip__content">
            <span class="tooltip__text">Наличие товара по городам:</span>
            <ul class="tooltip__list">
              <li class="tooltip__item">
                <span class="tooltip__text">Москва: <span class="tooltip__count">${moscow}</span></span>
              </li>
              <li class="tooltip__item">
                <span class="tooltip__text">Оренбург: <span class="tooltip__count">${orenburg}</span></span>
              </li>
              <li class="tooltip__item">
                <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${saintPetersburg}</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderProducts(products) {
  const container = document.querySelector('.catalog__list');
  if (!container) return;

  const items = container.querySelectorAll('.catalog__item');
  items.forEach((item, index) => {
    if (index > 0) {
      item.remove();
    }
  });

  if (products.length > 0) {
    const firstItem = container.querySelector('.catalog__item');
    populateCard(firstItem, products[0]);
  }

  for (let i = 1; i < products.length; i++) {
    const newCard = getTemplateCard();
    if (newCard) {
      populateCard(newCard, products[i]);
      container.appendChild(newCard);
    }
  }
}
