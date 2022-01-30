// @ts-check

const { IncomingMessage, ServerResponse } = require('http')

const testRoute = require('./test.route')
const sampleRoute = require('./sample.route')

/**
 * @typedef {object} Route
 * @property {string} method
 * @property {string} pathname
 * @property {function(IncomingMessage, ServerResponse): void} handler
 */

/**
 * @type {Array<Route>}
 */
const routes = [testRoute, sampleRoute]

/**
 * @param {IncomingMessage} request
 * @returns {function(IncomingMessage, ServerResponse): void}
 */
 exports.handlerFor = function (request) {
	const route = routes.find(byPathnameAndMethodIn(request))
	if (route) {
		return route.handler
	}
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
