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

  return cardElement;
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
