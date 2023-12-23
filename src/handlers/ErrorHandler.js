import { IncomingMessage, ServerResponse } from 'http'

/**
 * @param {{ info, error, warn }} log
 * @returns {(error: Error, request: IncomingMessage, response: ServerResponse) => void}
 */
export function ServerErrorHandler (log) {
	return (error, request, response) => {
		log.error(`Internal server error when request [${request.method} - ${request.url}] due to:`, error)
		response
			.writeHead(500, { 'Content-Type': 'text/plain' })
			.end(`Internal server error when request: [${request.method} - ${request.url}]`)
	}
}
