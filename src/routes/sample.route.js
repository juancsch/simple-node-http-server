import { IncomingMessage, ServerResponse } from 'http'

/**
 * @type {import('./index.js').Route}
 */
export default {
	method: 'POST',
	pathname: '/sample',
	handler
}

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
function handler (request, response) {

	let requestData = ''
	request
		.on('data', function (chunk) {
			requestData += chunk
		})
		.on('end', function () {
			const requestBody = JSON.parse(requestData)
			const responseBody = {
				text: 'Post Request Value is [' + requestBody.value + ']'
			}
			response
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(JSON.stringify(responseBody))
		})
}
