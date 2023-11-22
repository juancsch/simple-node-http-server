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
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function handler (req, res) {
	let body = ''

	req.on('data', function (chunk) {
		body += chunk
	})

	req.on('end', function () {

		const postBody = JSON.parse(body)

		const response = {
			text: 'Post Request Value is [' + postBody.value + ']'
		}

		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(response))
	})
}
