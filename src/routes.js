const { sampleRequest } = require('./handlers/sampleRequest')
const { testRequest } = require('./handlers/testRequest')

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

exports.routeFor = function (request) {
	return routes.find(byPathnameAndMethodIn(request))
}

function byPathnameAndMethodIn (request) {
	const url = new URL(request.url, `http://${request.headers.host}`)
	return route => url.pathname === route.pathname && request.method === route.method
}
