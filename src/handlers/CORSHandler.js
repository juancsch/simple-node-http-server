import { IncomingMessage, ServerResponse } from 'http'

/**
 * @param {IncomingMessage} request
 * @returns {boolean}
 */
export function isPreflight (request) {
	const origin = request.headers.origin
	const accessControlRequestMethod = request.headers['access-control-request-method']
	return request.method === 'OPTIONS' && !!origin && !!accessControlRequestMethod
}

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
export function sendPreflightCORS (request, response) {
	enableCORS(request, response)
	response.writeHead(204, {
		'Content-Length': '0'
	}).end()
}

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @returns {void}
 */
export function enableCORS (request, response) {
	response.setHeader('Access-Control-Allow-Origin', request.headers.origin ?? '*')
	response.setHeader('Access-Control-Allow-Methods', request.headers['access-control-request-method'] ?? 'GET,HEAD,PUT,PATCH,POST,DELETE')
	response.setHeader('Access-Control-Allow-Headers', request.headers['access-control-allow-headers'] ?? 'Content-Type,Content-Length')
}
