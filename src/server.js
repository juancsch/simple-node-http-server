import { IncomingMessage, ServerResponse, Server, createServer } from 'http'
import { handlerFor } from './routes/index.js'

/**
 * @param {{ config?, log? }} options
 * @returns {Server}
 */
export function WebServer (options = {}) {
	return createServer(options.config, controller)
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
 function controller (req, res) {
	try {
		if (isPreflight(req)) {
			appendCORSheaders(req, res)
			noContent(res)
		}
		const handler = handlerFor(req)
		if (handler !== undefined) {
			console.log(`Request type ${req.method}, endpoint ${req.url}`)
			appendCORSheaders(req, res)
			handler(req, res)
		} else {
			console.error(`Request type ${req.method}, invalid endpoint ${req.url}`)
			notFound(res)
		}
	} catch (err) {
		console.error('Internal server error during request:', req, 'due to:', err)
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

/**
 * @param {ServerResponse} res
 */
function noContent (res) {
	res.statusCode = 204
	res.end()
}

/**
 * @param {IncomingMessage} req
 * @returns {boolean}
 */
function isPreflight (req) {
	const origin = req.headers.origin
	const accessControlRequestMethod = req.headers['access-control-allow-methods']
	return req.method === 'OPTIONS' && !!origin && !!accessControlRequestMethod
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @returns {void}
 */
function appendCORSheaders (req, res) {
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin ?? '*')
	res.setHeader('Access-Control-Allow-Methods', req.headers['access-control-request-method'] ?? req.method)
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length')
}
