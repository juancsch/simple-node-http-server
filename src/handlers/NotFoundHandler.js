import { IncomingMessage, ServerResponse } from 'http'

/**
 * @param {{ info, error, warn }} log
 * @returns {(request: IncomingMessage, response: ServerResponse) => void}
 */
export function NotFoundHandler (log) {
	return (request, response) => {
		log.warn(`Not found [${request.method} - ${request.url}]`)
		response
			.writeHead(404, { 'Content-Type': 'text/plain' })
			.end(`Not found [${request.method} - ${request.url}]`)
	}
}
