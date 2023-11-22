import { WebServer } from './server.js'

const hostname = '127.0.0.1'
const port = process.env.PORT_SERVER || '3000'

WebServer({})
	.listen(Number(port), hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`)
	})
	.on('error', err => {
		console.error('Cath error during initalization server:', err)
	})
