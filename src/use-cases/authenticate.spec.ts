import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory-respository/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-crendetials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
   inMemoryUsersRepository = new InMemoryUsersRepository()
       authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)
    })

    it('should be able to authenticate', async()=>{
        await inMemoryUsersRepository.create({
            name: 'John Doe',
            email: 'I7wEe@example.com',
            password_hash: await hash('123456', 1)
        })

        const {user} = await authenticateUseCase.execute({
            email: 'I7wEe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        expect(()=> 
            authenticateUseCase.execute({
                email: 'I7wEe@example.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)

        await inMemoryUsersRepository.create({
            name:'John Doe',
            email: 'I7wEe@example.com',
            password_hash: '123456'
        })
        expect(()=> 
            authenticateUseCase.execute({
                email: 'I7wEe@example.com',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})