const checkbox = document.querySelectorAll('.check')

checkbox.forEach((check) => {
	check.addEventListener('click', async (e) => {
		const id = e.target.dataset.id
		const estado = e.target.checked
		const data = {
			id,
			estado,
		}
		await fetch('http://localhost:3000/check', {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	})
})

const email = document.getElementById('email')
const nombre = document.getElementById('nombre')
const password = document.getElementById('pass')
const passwordConfirm = document.getElementById('pass2')
const anos = document.getElementById('anos')
const esp = document.getElementById('esp')
const id = document.getElementById('id')

const form = document.getElementById('form')
const deleteBtn = document.getElementById('delete')

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const data = {
		email: email.value,
		nombre: nombre.value,
		password: password.value,
		anos_experiencia: anos.value,
		especialidad: esp.value,
		id: id.value,
	}
	const dato = await axios.put(
		`http://localhost:3000/api/v1/skaters/${data.id}`,
		data
	)
	window.location.href = '/'
})

deleteBtn.addEventListener('click', async (e) => {
	e.preventDefault()
	const data = {
		id: id.value,
	}
	const dato = await axios.delete(
		`http://localhost:3000/api/v1/skaters/${data.id}`
	)
	window.location.href = '/'
})
