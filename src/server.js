/* eslint-disable no-magic-numbers */
import { IncomingMessage, ServerResponse, createServer } from 'http'

import { handlerFor } from './routes/index.js'
import { isPreflight, sendPreflightCORS, enableCORS } from './handlers/CORSHandler.js'
import { ServerErrorHandler } from './handlers/ErrorHandler.js'
import { NotFoundHandler } from './handlers/NotFoundHandler.js'

/**
 * @param {object} config
 * @param {{ info, error, warn }} log
 * @returns {any}
 */
export function WebServer (config = {}, log = console) {

	const serverErrorHandler = ServerErrorHandler(log)
	const notFoundHandler = NotFoundHandler(log)

	return createServer(frontController)

	/**
	 * @param {IncomingMessage} request
	 * @param {ServerResponse} response
	 */
	function frontController (request, response) {
		try {
			log.info(`Request [${request.method} - ${request.url}]`)

			if (isPreflight(request)) {
				sendPreflightCORS(request, response)
				return
			}
			enableCORS(request, response)

			const requestHandler = handlerFor(request)
			if (requestHandler !== undefined) {
				requestHandler(request, response)
			} else {
				notFoundHandler(request, response)
			}
		} catch (error) {
			serverErrorHandler(error, request, response)
		}
	}
}
