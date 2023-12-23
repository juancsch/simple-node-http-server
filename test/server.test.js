import request from 'supertest'
import { WebServer } from '../src/server.js'

describe('GET /api', () => {

	test.skip('should return 500', async () => {

		await request(WebServer())
			.get('/')
			.expect('Content-Type', 'text/plain')
			.expect(500, /Internal server error/)
	})

	test('should return 204', async () => {

		await request(WebServer())
			.options('/')
			.set('Access-Control-Request-Method', 'GET')
			.set('Origin', 'localhost')
			.expect('Access-Control-Allow-Origin', 'localhost')
			.expect('Access-Control-Allow-Methods', 'GET')
			.expect('Access-Control-Allow-Headers', 'Content-Type,Content-Length')
			.expect(204)
	})

	test('should return 404', async () => {

		await request(WebServer())
			.get('/no_exist')
			.expect('Content-Type', 'text/plain')
			.expect(404, /Not found/)
	})

	test('should return 200 and test', async () => {

		await request(WebServer())
			.post('/sample')
			.send({ value: 'john' })
			.set('Accept', 'application/json')
			.expect('Content-Type', 'application/json')
			.expect(200, { text: 'Post Request Value is [john]' })
	})

	test('should return 200 and greetings', async () => {

		await request(WebServer())
			.get('/greetings?name=juanc')
			.expect('Content-Type', 'application/json')
			.expect(200, { text: 'Hello juanc!!' })
	})
})
