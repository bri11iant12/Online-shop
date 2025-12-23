export function showModal({ title, message, isError = false, onClose }) {
	const overlay = document.createElement('div')
	overlay.className = 'modal-overlay'

	const modal = document.createElement('div')
	modal.className = `modal ${isError ? 'modal--error' : 'modal--success'}`

	modal.innerHTML = `
    <div class="modal__header">
      <h3 class="modal__title">${title}</h3>
      <button class="modal__close" type="button">×</button>
    </div>
    <p class="modal__message">${message}</p>
  `

	document.body.append(overlay, modal)

	const close = () => {
		modal.remove()
		overlay.remove()
		onClose?.()
	}

	modal.querySelector('.modal__close').addEventListener('click', close)
	overlay.addEventListener('click', close)
}
