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
