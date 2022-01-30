const request = require('supertest')

const server = require('../src/server')

describe('GET /api', () => {

	it.skip('should return 500', async () => {

		await request(server)
			.get('/')
			.expect('Content-Type', 'text/plain')
			.expect(500, /Server error/) // eslint-disable-line
	})

	it('should return 404', async () => {

		await request(server)
			.get('/no_exist')
			.expect('Content-Type', 'text/plain')
			.expect(404, 'Invalid Request') // eslint-disable-line
	})

	it('should return 200 and test', async () => {

		await request(server)
			.post('/test')
			.send({ value: 'john' })
			.set('Accept', 'application/json')
			.expect('Content-Type', 'application/json')
			.expect(200, { text: 'Post Request Value is [john]' }) // eslint-disable-line
	})

	it('should return 200 and sample', async () => {

		await request(server)
			.get('/sample')
			.expect('Content-Type', 'application/json')
			.expect(200, { text: 'Hello World!!' }) // eslint-disable-line
	})
})
