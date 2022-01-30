// @ts-check

const hostname = '127.0.0.1'
const port = process.env.PORT_SERVER || '3000'

require('./server')
	.listen(Number(port), hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`)
	})
	.on('error', err => {
		console.error(err)
	})
