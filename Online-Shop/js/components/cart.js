
let cart = [];
let products = [];

export function setProducts(productsData) {
  products = productsData;
}

export function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }
  
  updateCartUI();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

export function getCart() {
  return cart;
}

export function updateCartUI() {
  const countElement = document.querySelector('.header__user-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countElement) {
    countElement.textContent = totalItems;
  }
  
  const basketList = document.querySelector('.basket__list');
  const emptyBlock = document.querySelector('.basket__empty-block');
  
  if (!basketList) return;
  
  basketList.innerHTML = '';
  
  if (cart.length === 0) {
    if (emptyBlock) emptyBlock.style.display = '';
  } else {
    if (emptyBlock) emptyBlock.style.display = 'none';
    
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;
      
      const li = document.createElement('li');
      li.className = 'basket__item';
      li.innerHTML = `
        <div class="basket__img">
          <img src="${product.image}" alt="${product.name}" height="60" width="60">
        </div>
        <span class="basket__name">${product.name}</span>
        <span class="basket__price">${(product.price.new * item.quantity).toLocaleString('ru-RU')} руб</span>
        <button class="basket__close remove-from-cart-btn" type="button" data-id="${product.id}">
          <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      `;
      basketList.appendChild(li);
    });
  }
}

export function setupCartEventListeners() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      const productId = Number(btn.dataset.id);
      addToCart(productId);
    }
  });
  
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.remove-from-cart-btn');
    if (btn) {
      const productId = Number(btn.dataset.id);
      removeFromCart(productId);
    }
  });
  
  const basketBtn = document.querySelector('.header__user-item:has(.header__basket)');
  if (basketBtn) {
    const userBtn = basketBtn.querySelector('.header__user-btn');
    const basket = basketBtn.querySelector('.basket');
    
    if (userBtn && basket) {
      userBtn.addEventListener('click', () => {
        basket.classList.toggle('basket--active');
      });
    }
  }
}
