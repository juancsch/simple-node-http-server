// @ts-check

const { IncomingMessage, ServerResponse, Server, createServer } = require('http')
const { handlerFor } = require('./routes')

/**
 * @param {object} options
 * @returns {Server}
 */
exports.Server = function (options) {
	return createServer(options, controller)
}

// @type import('http').RequestListener
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
 function controller (req, res) {
	try {
		const handler = handlerFor(req)
		if (handler) {
			console.log(`Request type ${req.method}, endpoint ${req.url}`)
			handler(req, res)
		} else {
			console.error(`Request type ${req.method}, invalid endpoint ${req.url}`)
			notFound(res)
		}
	} catch (err) {
		console.error('Internal server error due to', err)
		serverError(err, res)
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
}
