export function setupAccordion() {
	const buttons = document.querySelectorAll('.accordion__btn')

	buttons.forEach(button => {
		const content = button.nextElementSibling
		if (!content) return

		button.addEventListener('click', () => {
			const isOpen = button.classList.contains('accordion__btn--active')

			buttons.forEach(btn => {
				btn.classList.remove('accordion__btn--active')
				const c = btn.nextElementSibling
				if (c) c.classList.remove('is-open')
			})

			if (!isOpen) {
				button.classList.add('accordion__btn--active')
				content.classList.add('is-open')
			}
		})
	})
}
