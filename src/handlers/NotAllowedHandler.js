import { IncomingMessage, ServerResponse } from 'http'

/**
 * @param {{ info, error, warn }} log
 * @returns {(request: IncomingMessage, response: ServerResponse) => void}
 */
export function NotAllowHandler (log) {
	return (request, response) => {
		log.warn(`Method [${request.method}] for [${request.url}] not allowed`)
		response
			.writeHead(405, { 'Content-Type': 'text/plain' })
			.end(`Method not allowed ${request.method}`)
	}
}
