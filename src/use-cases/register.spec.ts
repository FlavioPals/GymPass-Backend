import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory-respository/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
         inMemoryUsersRepository = new InMemoryUsersRepository()
         registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
    })

    it('should be able to register', async()=>{
        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'I7wEe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'I7wEe@example.com',
            password: '123456'
        })
        const is_password_correctly_hashed = await compare(
            '123456',
            user.password_hash
        )
        expect(is_password_correctly_hashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'I7wEe@example.com'

         await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })
     await expect(()=> 
        registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })
      ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})