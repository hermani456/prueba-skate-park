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
	dato,
	putCheck,
	dato2,
} = require('./functions')
const { skatersGet } = require('./queries')

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

// api skaters
app.get('/api/v1/skaters', getSkaters)
app.post('/api/v1/skaters', postSkater)
app.put('/api/v1/skaters/:id', putSkater)
app.delete('/api/v1/skaters/:id', deleteSkater)

// handlebars setup
app.set('view engine', 'hbs')
app.engine(
	'hbs',
	engine({
		layoutsDir: __dirname + '/views',
		partialsDir: __dirname + '/views/components/',
		extname: 'hbs',
	})
)

// public folders
app.use(express.static(__dirname + '/public'))
app.use('/img', express.static(__dirname + '/img'))

// routes
app.get('/', async (req, res) => {
	const data = await skatersGet()
	res.render('Participantes', {
		data: data,
	})
})

app.get('/registro', (req, res) => {
	res.render('Registro')
})

app.get('/datos', dato)

app.get('/admin', dato2)

app.get('/login', (req, res) => {
	res.render('Login')
})

app.post('/auth', authLogin)

app.put('/check', putCheck)

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
)
