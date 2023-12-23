import { IncomingMessage, ServerResponse } from 'http'

import sampleRoute from './sample.route.js'
import greetingsRoute from './greetings.route.js'

/**
 * @typedef {object} Route
 * @property {string} method
 * @property {string} pathname
 * @property {function(IncomingMessage, ServerResponse): void} handler
 */

/**
 * @type {Array<Route>}
 */
const routes = [sampleRoute, greetingsRoute]

/**
 * @param {IncomingMessage} request
 * @returns {function(IncomingMessage, ServerResponse): void | undefined}
 */
export function handlerFor (request) {
	const route = routes.find(byPathnameAndMethodIn(request))
	return route?.handler ?? undefined
}

/**
 * @param {IncomingMessage} request
 * @returns {function(Route): boolean}
 */
function byPathnameAndMethodIn (request) {
	const { pathname } = new URL(request.url, `http://${request.headers.host}`)
	return route => pathname === route.pathname && request.method === route.method
}
