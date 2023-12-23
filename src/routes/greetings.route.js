import { IncomingMessage, ServerResponse } from 'http'

/**
 * @type {import('./index.js').Route}
 */
export default {
	method: 'GET',
	pathname: '/greetings',
	handler
}

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
function handler (request, response) {

	const urlParsed = new URL(request.url, `http://${request.headers.host}`)
	const name = urlParsed.searchParams.get('name') ?? 'World'

	const responseBody = {
		text: 'Hello ' + name + '!!'
	}
	response
		.writeHead(200, {
			'Content-Type': 'application/json'
		})
		.end(JSON.stringify(responseBody))
}
