const pool = require('./db')

const skatersGet = async () => {
	try {
		const query = 'SELECT * FROM skaters'
		const result = await pool.query(query)
		return result.rows
	} catch (error) {
		console.log(error)
	}
}

const skaterPost = async (skater, name, hashedPassword, estado = false) => {
	const { email, nombre, anos_experiencia, especialidad } = skater
	try {
		const query =
			'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
		const values = [
			email,
			nombre,
			hashedPassword,
			anos_experiencia,
			especialidad,
			name,
			estado,
		]
		const result = await pool.query(query, values)
		return result.rows
	} catch (error) {
		console.log(error)
	}
}

const skaterPut = async (skater, id) => {
	const { email, nombre, password, anos_experiencia, especialidad } = skater
	try {
		const query =
			'UPDATE skaters SET email = $1, nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 WHERE id = $6 RETURNING *'
		const values = [email, nombre, password, anos_experiencia, especialidad, id]
		const result = await pool.query(query, values)
		return result.rows
	} catch (error) {
		console.log(error)
	}
}

const checker = async (id, estado) => {
	try {
		const query = 'UPDATE skaters SET estado = $2 WHERE id = $1 RETURNING *'
		const values = [id, estado]
		const result = await pool.query(query, values)
		return result.rows
	} catch (error) {
		console.log(error)
	}
}

const skaterDelete = async (id) => {
	try {
		const query = 'DELETE FROM skaters WHERE id = $1 RETURNING *'
		const values = [id]
		const result = await pool.query(query, values)
		return result.rows
	} catch (error) {
		console.log(error)
	}
}

module.exports = { skatersGet, skaterPost, skaterPut, skaterDelete, checker }
