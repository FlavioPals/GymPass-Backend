import { it, describe, expect } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory-respository/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import exp from 'constants'
import { InvalidCredentialsError } from './errors/invalid-crendetials-error'


describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async()=>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(inMemoryUsersRepository)

        await inMemoryUsersRepository.create({
            name: 'John Doe',
            email: 'I7wEe@example.com',
            password_hash: await hash('123456', 1)
        })

        const {user} = await sut.execute({
            email: 'I7wEe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(inMemoryUsersRepository)

        expect(()=> 
            sut.execute({
                email: 'I7wEe@example.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(inMemoryUsersRepository)

        await inMemoryUsersRepository.create({
            name:'John Doe',
            email: 'I7wEe@example.com',
            password_hash: '123456'
        })
        expect(()=> 
            sut.execute({
                email: 'I7wEe@example.com',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})