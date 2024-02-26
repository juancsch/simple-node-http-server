import assert from 'node:assert/strict'
import { after, before, describe, test } from 'node:test'

import { WebServer } from '../src/server.js'

describe('GET /api', () => {

	const server = WebServer({ port: 3000 })

	before(async () => {
		await server.start()
	})

	after(async () => {
		await server.stop()
	})

	test.skip('should return 500', async () => {
		// When
		const response = await fetch('http://localhost:3000/')

		// Then
		assert.strictEqual(response.status, 500)
	})

	test('should return 204', async () => {
		// When
		const response = await fetch('http://localhost:3000/', {
			method: 'OPTIONS',
			headers: {
				'Access-Control-Request-Method': 'GET',
				Origin: 'localhost'
			}
		})

		// Then
		assert.strictEqual(response.status, 204)
		assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), 'localhost')
		assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), 'GET')
		assert.strictEqual(response.headers.get('Access-Control-Allow-Headers'), 'Content-Type,Content-Length')
	})

	test('should return 404', async () => {
		// When
		const response = await fetch('http://localhost:3000/no_exist')

		// Then
		assert.strictEqual(response.status, 404)
		assert.strictEqual(await response.text(), 'Not found [GET - /no_exist]')
	})

	test('should return 200 and test', async () => {
		// When
		const response = await fetch('http://localhost:3000/sample', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ value: 'john' })
		})

		// Then
		assert.strictEqual(response.status, 200)
		assert.deepStrictEqual(await response.json(), { text: 'Post Request Value is [john]' })
	})

	test('should return 200 and greetings', async () => {
		// When
		const response = await fetch('http://localhost:3000/greetings?name=juanc')

		// Then
		assert.strictEqual(response.status, 200)
		assert.deepStrictEqual(await response.json(), { text: 'Hello juanc!!' })
	})
})
