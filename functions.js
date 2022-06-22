require('dotenv').config()
const { skatersGet, skaterPost, skaterPut, skaterDelete } = require('./queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getSkaters = async (req, res) => {
	try {
		const data = await skatersGet()
		res.json(data)
	} catch (error) {
		console.log(error)
	}
}

const postSkater = async (req, res) => {
	const skater = req.body
	const { password } = skater
	const { foto } = req.files
	const { name } = foto
	foto.mv(`${__dirname}/img/${name}`)
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		const data = await skaterPost(skater, name, hashedPassword)
		// res.json(data)
		res.redirect('/')
	} catch (error) {
		console.log(error)
	}
}

const putSkater = async (req, res) => {
	const skater = req.body
	const { id } = req.params
	try {
		const data = await skaterPut(skater, id)
		res.json(data)
	} catch (error) {
		console.log(error)
	}
}

const deleteSkater = async (req, res) => {
	const { id } = req.params
	try {
		const data = await skaterDelete(id)
		res.json(data)
	} catch (error) {
		console.log(error)
	}
}

const authLogin = async (req, res) => {
	console.log(req.body)
	const { email, password } = req.body
	const users = await skatersGet()
	const user = users.find((user) => user.email === email)
	if (user == null) {
		return res.status(400).send('cannot find user')
	}
	try {
		if (await bcrypt.compare(password, user.password)) {
			const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '10m',
			})
			res.send(`
<a href="/datos?token=${accessToken}"> <p> Ir al Dashboard </p> </a>
Bienvenido, ${email}.
<script>
localStorage.setItem('token', JSON.stringify("${accessToken}"))
</script>
`)
		} else {
			res.send('not allowed')
		}
	} catch (error) {
		console.log(error)
	}
}

const authToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.sendStatus(401)
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403)
		req.user = user
		next()
	})
}

const dato = (req, res) => {
	let { token } = req.query
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		err
			? res.status(401).send({
					error: '401 Unauthorized',
					message: err.message,
			  })
			: res.render('Datos', {
				user: user,
			})
	})
}

module.exports = {
	getSkaters,
	postSkater,
	putSkater,
	deleteSkater,
	authLogin,
	authToken,
	dato,
}
