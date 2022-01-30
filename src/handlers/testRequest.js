// @ts-check

const { IncomingMessage, ServerResponse } = require('http')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
exports.testRequest = function (req, res) {
	let body = ''

	req.on('data', function (chunk) {
		body += chunk
	})

	req.on('end', function () {
		console.log(body)
		const postBody = JSON.parse(body)

		const response = {
			text: 'Post Request Value is [' + postBody.value + ']'
		}

		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(response))
	})
}
