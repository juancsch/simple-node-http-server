const http = require('http')

const withRoutes = require('./routes')

const hostname = '127.0.0.1'
const port = process.env.PORT_SERVER || 3000

const server = http.createServer(withRoutes)

// server.on('clientError', (err, socket) => {
//     socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
// })

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})
