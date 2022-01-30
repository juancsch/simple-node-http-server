// @ts-check

const { IncomingMessage, ServerResponse } = require('http')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
exports.sampleRequest = function (req, res) {
	const urlParsed = new URL(req.url, `http://${req.headers.host}`)

	const name = urlParsed.searchParams.get('name') || 'World'

	const response = {
		text: 'Hello ' + name
	}

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify(response))
}
