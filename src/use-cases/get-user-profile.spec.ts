
import { InMemoryUsersRepository } from "../repositories/in-memory-respository/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { beforeEach, describe, expect, it } from "vitest";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(()=> {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'I7wEe@example.com',
            password_hash: '123456'
        })

        const {user} = await sut.execute({
            userId: createdUser.id
        })
        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
    })

    it('should not be able to get user profile with wrong id', async () => {
        expect(()=> 
            sut.execute({
                userId: 'non-existing-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})