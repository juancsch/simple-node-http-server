const { routeFor } = require('./routes')

module.exports = function Controller (req, res) {
	try {
		const route = routeFor(req)
		if (route) {
			console.log(`Request type ${req.method}, endpoint ${req.url}`)
			return route.handler(req, res)
		}

		console.log(`Request type ${req.method}, invalid endpoint ${req.url}`)
		invalidRequest(req, res)
	} catch (err) {
		console.log('Error: ', err)
		serverError(err, res)
	}
}

function invalidRequest (req, res) {
	res.statusCode = 404
	res.setHeader('Content-Type', 'text/plain')
	res.end('Invalid Request')
}

function serverError (err, res) {
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain')
	res.end(`Server error "${err.message}"`)
}
