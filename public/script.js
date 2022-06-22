// const form = document.querySelector('#form')
// const mail = document.querySelector('#mail')
// const name = document.querySelector('#name')
// const password = document.querySelector('#pass')
// const passwordConfirm = document.querySelector('#pass-confirm')
// const experience = document.querySelector('#experience')
// const specialty = document.querySelector('#specialty')
// const photo = document.querySelector('#photo')

// form.addEventListener('submit', async (e) => {
// 	e.preventDefault()
//    if(password.value !== passwordConfirm.value) {
//       alert('Las contraseñas no coinciden')
//       return
//    }
// 	const skater = {
// 		email: mail.value,
// 		nombre: name.value,
// 		password: password.value,
// 		anos_experiencia: experience.value,
// 		especialidad: specialty.value,
// 		foto: photo.value,
//       estado: false
// 	}
// 	try {
// 		const data = await axios.post('http://localhost:3000/api/v1/skaters', skater)
//       window.location = '/'
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

// const getDeathsChile = async () => {
// 	const jwt = localStorage.getItem('token')
// 	try {
// 		await fetch('http://localhost:3000/auth', {
// 			method: 'GET',
// 			headers: {
// 				Authorization: `Bearer ${jwt}`,
// 			},
// 		})
// 	} catch (err) {
// 		console.error(`Error: ${err}`)
// 	}
// }

const email = document.querySelector('#email')
const pass = document.querySelector('#pass')
const form = document.querySelector('#form')
const btn = document.getElementById('btn')

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const { data } = await axios.post('http://localhost:3000/auth', {
		email: email.value,
		password: pass.value,
	})
	// console.log(data.accessToken)
	localStorage.setItem('token', data.accessToken)
	await nose()
})

const nose = async () => {
	const token = localStorage.getItem('token')
	console.log(token)
	if (token) {
		const data = await axios.get('http://localhost:3000/datos', {
			headers: { Authorization: `Bearer ${token}` },
		})
		console.log(data.data)
		window.location.href = 'http://localhost:3000/datos'
	}
}
// btn.addEventListener('click', async (e) => {
//    e.preventDefault()
// 	await nose()
// 	window.location.href = 'http://localhost:3000/datos'
// })

// await fetch('http://localhost:3000/datos', {
// 			method: 'GET',
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 		})
