let cart = []
let products = []

export function setProducts(productsData) {
	products = productsData
}

export function addToCart(productId) {
	const product = products.find(p => p.id === productId)
	if (!product) return

	const item = cart.find(i => i.id === productId)

	if (item) {
		item.quantity++
	} else {
		cart.push({ id: productId, quantity: 1 })
	}

	updateCartUI()
}

export function removeFromCart(productId) {
	cart = cart.filter(item => item.id !== productId)
	updateCartUI()
}

export function getCart() {
	return cart
}

function getCartItemTemplate(item, product) {
	return `
    <li class="basket__item" data-product-id="${product.id}">
      <div class="basket__img">
        <img src="${product.image}" alt="${
		product.name
	}" width="60" height="60">
      </div>

      <span class="basket__name">${product.name}</span>

      <span class="basket__price">
        ${(product.price.new * item.quantity).toLocaleString('ru-RU')} руб
      </span>

      <button
        class="basket__item-close remove-from-cart-btn"
        type="button"
        data-id="${product.id}"
        aria-label="Удалить товар"
      >
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    </li>
  `
}

export function updateCartUI() {
	const countElement = document.querySelector('.header__user-count')
	const basketList = document.querySelector('.basket__list')
	const emptyBlock = document.querySelector('.basket__empty-block')

	if (!basketList) return

	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
	if (countElement) {
		countElement.textContent = totalItems
	}

	basketList.innerHTML = ''

	if (cart.length === 0) {
		emptyBlock?.classList.remove('basket__empty-block--hidden')
		return
	}

	emptyBlock?.classList.add('basket__empty-block--hidden')

	cart.forEach(item => {
		const product = products.find(p => p.id === item.id)
		if (!product) return

		basketList.insertAdjacentHTML(
			'beforeend',
			getCartItemTemplate(item, product)
		)
	})
}

export function setupCartEventListeners() {
	document.addEventListener('click', e => {
		const addBtn = e.target.closest('.add-to-cart-btn')
		if (addBtn) {
			addToCart(Number(addBtn.dataset.id))
			return
		}

		const removeBtn = e.target.closest('.remove-from-cart-btn')
		if (removeBtn) {
			removeFromCart(Number(removeBtn.dataset.id))
		}
	})

	const basketBtn = document.querySelector(
		'.header__user-item:has(.header__basket)'
	)
	if (!basketBtn) return

	const userBtn = basketBtn.querySelector('.header__user-btn')
	const basket = basketBtn.querySelector('.basket')

	userBtn?.addEventListener('click', () => {
		basket.classList.toggle('basket--active')
	})
}
