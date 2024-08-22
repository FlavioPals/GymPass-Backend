import { beforeEach, describe, expect } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory-respository/in-memory-gym-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { it } from "vitest";

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })
        await gymsRepository.create({
            title: 'Typescript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        const {gyms} = await sut.execute({
            query: 'JavaScript',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title: 'JavaScript Gym'})])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for(let i = 1; i <= 22;i++) {
            await gymsRepository.create({
            title: `JavaScript gym ${i}`,
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
            })
        }
        const {gyms} =  await sut.execute({
            query: 'JavaScript',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'JavaScript gym 21'}),
            expect.objectContaining({title: 'JavaScript gym 22'}),
        ])
    })
})