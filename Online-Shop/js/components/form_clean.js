function showModal(title, message, isError = false) {
	const overlay = document.createElement('div')
	overlay.className = 'modal-overlay'

	const modal = document.createElement('div')
	modal.className = `modal ${isError ? 'modal--error' : 'modal--success'}`

	modal.innerHTML = `
    <div class="modal__header">
      <div>
        <h3 class="modal__title">${title}</h3>
        <p class="modal__message">${message}</p>
      </div>
      <button class="modal__close" type="button">×</button>
    </div>
  `

	document.body.append(overlay, modal)

	const close = () => {
		modal.remove()
		overlay.remove()
	}

	modal.querySelector('.modal__close').addEventListener('click', close)
	overlay.addEventListener('click', close)
}

export function setupFormValidation() {
	const form = document.querySelector('.questions__form')
	if (!form) return

	const submitBtn = form.querySelector('[type="submit"]')
	let isSubmitting = false

	const lockButton = () => {
		isSubmitting = true
		submitBtn.disabled = true
		submitBtn.classList.add('is-disabled')
	}

	const unlockButton = () => {
		isSubmitting = false
		submitBtn.disabled = false
		submitBtn.classList.remove('is-disabled')
	}

	const clearErrors = () => {
		form.querySelectorAll('.is-error').forEach(el => el.remove())
		form
			.querySelectorAll('.is-invalid')
			.forEach(el => el.classList.remove('is-invalid'))
	}

	const showError = (el, message) => {
		el.classList.add('is-invalid')

		const error = document.createElement('div')
		error.className = 'is-error'
		error.textContent = message

		el.after(error)
	}

	const validate = () => {
		let valid = true
		clearErrors()

		const name = form.querySelector('#name')
		const email = form.querySelector('#email')
		const agree = form.querySelector('#agree')
		const agreeLabel = agree.closest('.custom-checkbox__label')

		if (!name.value.trim()) {
			showError(name, 'Введите имя')
			valid = false
		} else if (name.value.length < 3) {
			showError(name, 'Минимум 3 символа')
			valid = false
		}

		if (!email.value.trim()) {
			showError(email, 'Введите email')
			valid = false
		} else if (!email.validity.valid) {
			showError(email, 'Некорректный email')
			valid = false
		}

		if (!agree.checked) {
			showError(agreeLabel, 'Согласитесь с политикой')
			valid = false
		}

		return valid
	}

	form.addEventListener('submit', async e => {
		e.preventDefault()
		if (isSubmitting) return
		if (!validate()) return

		lockButton()

		try {
			const response = await fetch('https://httpbin.org/post', {
				method: 'POST',
				body: new FormData(form),
			})

			showModal(
				response.ok ? 'Спасибо!' : 'Ошибка',
				response.ok
					? 'Ваша заявка успешно отправлена.'
					: 'Не удалось отправить форму.',
				!response.ok
			)

			if (response.ok) form.reset()
		} catch {
			showModal('Ошибка', 'Ошибка подключения.', true)
		} finally {
			unlockButton()
		}
	})
}
