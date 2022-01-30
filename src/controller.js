// @ts-check

const { IncomingMessage, ServerResponse } = require('http')
const { routeFor } = require('./routes')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @returns {void}
 */
exports.controller = function (req, res) {
	try {
		const route = routeFor(req)
		if (route) {
			console.log(`Request type ${req.method}, endpoint ${req.url}`)
			route.handler(req, res)
			return
		}
		console.error(`Request type ${req.method}, invalid endpoint ${req.url}`)
		notFound(res)
	} catch (err) {
		console.error('Internal server error due to', err)
		serverError(err, res)
	}
}

/**
 * @param {ServerResponse} res
 */
function notFound (res) {
	res.statusCode = 404
	res.setHeader('Content-Type', 'text/plain')
	res.end('Invalid Request')
}

/**
 * @param {Error} err
 * @param {ServerResponse} res
 */
function serverError (err, res) {
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain')
	res.end(`Server error "${err.message}"`)
}
