import { WebServer } from './server.js'

const port = process.env.PORT_SERVER || '3000'

const webServer = WebServer({ port: Number(port) })
await webServer.start().catch(handleServerError)

process.on('SIGINT', () => {
	webServer.stop().catch(handleServerError)
})

/**
 * @param {Error} error
 */
function handleServerError (error) {
	console.error('Cath error during start/stop server:', error)
}
