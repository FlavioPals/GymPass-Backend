import { beforeEach, describe, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory-respository/in-memory-gym-repository";
import { CreateGymUseCase } from "./create-gym";



let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('create gym use case', () => {
    beforeEach(()=> {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(inMemoryGymsRepository)
    })

    it('should be able to create gym', async () => {
        const {gym} = await sut.execute({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })
    })
})