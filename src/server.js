import { createServer, IncomingMessage, ServerResponse } from 'http'

import { enableCORS, isPreflight, sendPreflightCORS } from './handlers/CORSHandler.js'
import { ServerErrorHandler } from './handlers/ErrorHandler.js'
import { NotFoundHandler } from './handlers/NotFoundHandler.js'
import { handlerFor } from './routes/index.js'

/**
 * @param {{ port?: number }} config
 * @param {{ info, error, warn }} log
 * @returns {{ start: () => Promise<void>, stop: () => Promise<void> }}
 */
export function WebServer ({ port = 8080 } = {}, log = console) {

	const server = createServer()
		.on('request', frontController(log))
		.on('error', (error) => {
			log.error('Server error', error)
		})

	return {
		/**
		 *
		 */
		async start () {
			await new Promise((resolve) => {
				server.listen(port, () => {
					console.log(`Server listening on port ${port}`)
					resolve()
				})
			})
		},
		/**
		 *
		 */
		async stop () {
			await new Promise((resolve, reject) => {
				server.close((err) => {
					if (err !== undefined) reject(err)
					else resolve()
				})
			})
		}
	}

	/**
	 * @param {{ info, error, warn }} log
	 * @returns {(request: IncomingMessage, response: ServerResponse) => void}
	 */
	function frontController (log) {

		const serverErrorHandler = ServerErrorHandler(log)
		const notFoundHandler = NotFoundHandler(log)

		return (request, response) => {
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
}
