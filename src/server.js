// @ts-check

const http = require('http')

const { controller } = require('./controller')

const hostname = '127.0.0.1'
const port = process.env.PORT_SERVER || '3000'

const server = http.createServer(controller)

server.listen(Number(port), hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})

server.on('error', err => {
	console.error(err)
})
