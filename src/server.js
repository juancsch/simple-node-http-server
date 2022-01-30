// @ts-check

const http = require('http')
const { controller } = require('./controller')

module.exports = http.createServer(controller)
