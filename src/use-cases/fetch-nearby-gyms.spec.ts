import { GymRepository } from "../repositories/gyms-repository";
import { FetchNearbyGymUseCase } from "./fetch-nearby-gyms";
import {beforeEach, describe, expect, it} from 'vitest'
import {InMemoryGymsRepository} from '../repositories/in-memory-respository/in-memory-gym-repository'

let gymsRepository: GymRepository
let sut: FetchNearbyGymUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymUseCase(gymsRepository)
    })

    it('should be able to fetch nearby gyms',async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: 1,
            longitude: 1
        })

        await gymsRepository.create({
            title:'Far Gym',
            description: null,
            phone: null,
            latitude: 132321,
            longitude: 2231
        })
        const {gyms} = await sut.execute({
            userLatitude: 1,

            userLongitude: 1
        })        
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title: 'Near Gym'})])
    })
})