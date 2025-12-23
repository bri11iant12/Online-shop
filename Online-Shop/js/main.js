import { renderProducts } from './components/render_new.js'
import { fillFilterCounts, getFilteredAndSorted } from './components/filters.js'
import {
	setProducts,
	setupCartEventListeners,
	updateCartUI,
} from './components/cart.js'
import {
	getCurrentPage,
	renderPagination,
	getSlice,
	setCurrentPage,
} from './components/pagination.js'
import { setupAccordion } from './components/accordion.js'
import { initDayProductsSlider } from './components/slider.js'
import { initTooltips } from './components/tooltips.js'
import { setupFormValidation } from './components/form.js'
import { setupLocationToggle } from './components/location.js'
import { setupMenuToggle } from './components/menu.js'

function showFiltersModal() {
	const overlay = document.createElement('div')
	overlay.className = 'modal-overlay'

	const modal = document.createElement('div')
	modal.className = 'modal modal--filters'

	const catalogForm = document.querySelector('.catalog-form')
	if (catalogForm) {
		const formClone = catalogForm.cloneNode(true)
		formClone.classList.add('catalog-form--modal')
		modal.appendChild(formClone)
	}

	document.body.append(overlay, modal)

	const close = () => {
		modal.remove()
		overlay.remove()
	}

	const closeBtn = modal.querySelector('.catalog-form__reset')
	if (closeBtn) {
		closeBtn.addEventListener('click', close)
	}

	overlay.addEventListener('click', close)

	// Обработчики для фильтров в модальном окне
	const filters = modal.querySelectorAll(
		'.custom-checkbox__field, .custom-radio__field'
	)

	filters.forEach(filter => {
		filter.addEventListener('change', () => {
			// Копируем изменения обратно в оригинальную форму
			const originalFilter = document.querySelector(`#${filter.id}`)
			if (originalFilter) {
				originalFilter.checked = filter.checked
			}
			setCurrentPage(1)
			updatePage()
			close()
		})
	})
}

let allProducts = []

function updatePage() {
	const filtered = getFilteredAndSorted(allProducts)
	const page = getCurrentPage()
	const slice = getSlice(filtered)

	renderProducts(slice)
	renderPagination(filtered.length, () => {
		updatePage()
	})

	initTooltips()
}

async function init() {
	let response

	try {
		response = await fetch('./data/data.json')
	} catch {
		return
	}

	if (!response || !response.ok) return

	let data
	try {
		data = await response.json()
	} catch {
		return
	}

	allProducts = data

	setProducts(allProducts)
	fillFilterCounts(allProducts)
	updatePage()

	setupLocationToggle()
	setupMenuToggle()
	setupCartEventListeners()
	updateCartUI()
	setupAccordion()
	initDayProductsSlider(allProducts)
	initTooltips()
	setupFormValidation()

	const filtersBtn = document.querySelector('.catalog__filters-btn')
	if (filtersBtn) {
		filtersBtn.addEventListener('click', showFiltersModal)
	}

	const filters = document.querySelectorAll(
		'.custom-checkbox__field, .custom-radio__field, .catalog__sort-select'
	)

	filters.forEach(filter => {
		filter.addEventListener('change', () => {
			setCurrentPage(1)
			updatePage()
		})
	})

	const catalogForm = document.querySelector('.catalog-form')

	if (catalogForm) {
		catalogForm.addEventListener('reset', () => {
			setCurrentPage(1)

			requestAnimationFrame(() => {
				fillFilterCounts(allProducts)
				updatePage()
			})
		})
	}

}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init)
} else {
	init()
}
