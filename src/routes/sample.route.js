// @ts-check

const { IncomingMessage, ServerResponse } = require('http')

module.exports = {
	method: 'GET',
	pathname: '/sample',
	handler
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function handler (req, res) {
	const urlParsed = new URL(req.url, `http://${req.headers.host}`)

	const name = urlParsed.searchParams.get('name') || 'World!!'

	const response = {
		text: 'Hello ' + name
	}

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify(response))
}
