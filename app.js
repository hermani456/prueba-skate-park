require('dotenv').config()
const expressFileUpload = require('express-fileupload')
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const {
	getSkaters,
	postSkater,
	putSkater,
	deleteSkater,
	authLogin,
	authToken,
	dato,
	putCheck,
} = require('./functions')
const { skatersGet } = require('./queries')
const jwt = require('jsonwebtoken')

// file upload
app.use(
	expressFileUpload({
		limits: { fileSize: 5000000 },
		abortOnLimit: true,
		responseOnLimit:
			'El peso del archivo que intentas subir supera el limite permitido',
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000

app.get('/api/v1/skaters', getSkaters)

app.post('/api/v1/skaters', postSkater)

app.put('/api/v1/skaters/:id', putSkater)

app.delete('/api/v1/skaters/:id', deleteSkater)

app.set('view engine', 'hbs')

app.engine(
	'hbs',
	engine({
		layoutsDir: __dirname + '/views',
		partialsDir: __dirname + '/views/components/',
		extname: 'hbs',
	})
)

app.use(express.static(__dirname + '/public'))

app.use('/img', express.static(__dirname + '/img'))

app.get('/', async (req, res) => {
	const data = await skatersGet()
	res.render('Participantes', {
		data: data,
	})
	console.log(data)
})

app.get('/registro', (req, res) => {
	res.render('Registro')
})

// app.get('/datos', (req, res) => {
// 	res.render('Datos')
// 	// res.json({"hola":"mundo"})
// })
app.get('/datos', (req, res) => {
	let { token } = req.query
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		err
			? res.status(401).send({
					error: '401 Unauthorized',
					message: err.message,
			  })
			: res.render('Datos', {
				user: [user],
			})
			console.log(user)
	})
}
)

app.get('/admin', (req, res) => {
	let { token } = req.query
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		err
			? res.status(401).send({
					error: '401 Unauthorized',
					message: err.message,
			  })
			: res.render('Admin', {
				user: [user],
			})
			console.log(user)
	})
}
)

app.get('/login', (req, res) => {
	res.render('Login')
})

app.get('/', async (req, res) => {
	res.render('main', {
		layout: 'main',
		data: data,
	})
})

app.post('/auth', authLogin)

app.put('/check', putCheck)

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
)
