import { showModal } from './modal.js'

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

	const showError = (el, msg) => {
		el.classList.add('is-invalid')

		const error = document.createElement('div')
		error.className = 'is-error'
		error.textContent = msg

		el.after(error)
	}

	const clearError = el => {
		el.classList.remove('is-invalid')

		const error = el.nextElementSibling
		if (error && error.classList.contains('is-error')) {
			error.remove()
		}
	}

	const validate = () => {
		let valid = true

		const name = form.querySelector('#name')
		const email = form.querySelector('#email')
		const agree = form.querySelector('#agree')
		const agreeWrapper = form.querySelector('.custom-checkbox__label')


		form.querySelectorAll('.is-error').forEach(el => el.remove())
		form
			.querySelectorAll('.is-invalid')
			.forEach(el => el.classList.remove('is-invalid'))

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
			showError(agreeWrapper, 'Согласитесь с политикой')
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

			showModal({
				title: response.ok ? 'Спасибо!' : 'Ошибка',
				message: response.ok
					? 'Ваша заявка успешно отправлена.'
					: 'Не удалось отправить форму.',
				isError: !response.ok,
				onClose: () => {
					unlockButton()
					if (response.ok) form.reset()
				},
			})
		} catch {
			showModal({
				title: 'Ошибка',
				message: 'Ошибка подключения.',
				isError: true,
				onClose: unlockButton,
			})
		}
	})

	form.addEventListener('input', e => {
		const field = e.target

		if (field.type === 'checkbox') {
			const wrapper = field.closest('.custom-checkbox__label')
			if (wrapper) clearError(wrapper)
		} else {
			clearError(field)
		}
	})
}
