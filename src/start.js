import { WebServer } from './server.js'

const port = process.env.PORT_SERVER || '3000'

process.on('SIGINT', () => {
	webServer.close(() => {	console.log('Server closed') })
})

const webServer = WebServer({})
	.on('error', handleServerError)
	.on('listening', handleServerListening)
	.listen(Number(port), 'localhost')

/**
 *
 */
function handleServerListening () {
	console.log(`Server running at http://localhost:${port}/`)
}

/**
 *
 * @param {Error} error
 */
function handleServerError (error) {
	console.error('Cath error during initalization server:', error)
}
