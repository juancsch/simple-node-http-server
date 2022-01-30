// @ts-check

const { IncomingMessage, ServerResponse } = require('http')

const { sampleRequest } = require('./handlers/sampleRequest')
const { testRequest } = require('./handlers/testRequest')

/**
 * @typedef {object} Route
 * @property {string} method
 * @property {string} pathname
 * @property {function(IncomingMessage, ServerResponse): void} handler
 */

/**
 * @type {Array<Route>}
 */
const router = [
	{
		method: 'GET',
		pathname: '/sample',
		handler: sampleRequest
	},
	{
		method: 'POST',
		pathname: '/test',
		handler: testRequest
	}
]

/**
 * @param {IncomingMessage} request
 * @returns {Route}
 */
exports.routeFor = function (request) {
	return router.find(byPathnameAndMethodIn(request))
}

/**
 *
 * @param {IncomingMessage} request
 * @returns {function(Route): boolean}
 */
function byPathnameAndMethodIn (request) {
	const url = new URL(request.url, `http://${request.headers.host}`)
	return route => url.pathname === route.pathname && request.method === route.method
}
