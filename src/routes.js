const {
	sampleRequest,
	testRequest,
	invalidRequest,
	serverError
} = require('./handlers')

const routes = [{
		method: 'GET',
		pathname: '/sample',
		handler: sampleRequest
	}, {
		method: 'POST',
		pathname: '/test',
		handler: testRequest
	}
]

module.exports = function Routes (req, res) {
	try {
		const route = routes.find(byPathnameAndMethodIn(req))
		if (route) {
			console.log(`Request type ${req.method}, endpoint ${req.url}`)
			return route.handler(req, res)
		}

		console.log(`Request type ${req.method}, invalid endpoint ${req.url}`)
		invalidRequest(req, res)
	} catch (err) {
		console.log('Error: ', err)
		serverError(err, res)
	}
}

function byPathnameAndMethodIn (request) {
	const url = new URL(request.url, `http://${request.headers.host}`)
	return route => url.pathname === route.pathname && request.method === route.method
}
