import request from 'supertest'
import {app} from '../../app'
import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import exp from 'constants'

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
        
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to Authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'p6b9v@example.com',
            password: '123456'
        })

        const response = await request(app.server).post('/sessions').send({
            email: 'p6b9v@example.com',
            password: '123456'
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            id:expect.any(String),
            token: expect.any(String),
        })
    })
})