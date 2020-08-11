const { URL } = require('url')

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

exports.testRequest = function (req, res) {
	let body = ''

	req.on('data', function (chunk) {
		body += chunk
	})

	req.on('end', function () {
		const postBody = JSON.parse(body)

		const response = {
			text: 'Post Request Value is  ' + postBody.value
		}

		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(response))
	})
}

exports.invalidRequest = function (req, res) {
	res.statusCode = 404
	res.setHeader('Content-Type', 'text/plain')
	res.end('Invalid Request')
}

exports.serverError = function (err, res) {
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain')
	res.end(`Server error "${err.message}"`)
}
