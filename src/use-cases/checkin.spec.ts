
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { InMemoryCheckInsRepository } from "../repositories/in-memory-respository/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "../repositories/in-memory-respository/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import exp from "constants";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";


let checkInsRepository: CheckInsRepository
let sut: CheckInUseCase
let gymsRepository:InMemoryGymsRepository

describe('Check In Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)
        await gymsRepository.create({
            id: 'gym-01',
            title: 'Typescript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        }
        )

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check-in', async () => {
        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        console.log(checkIn)

        expect(checkIn.id).toEqual(expect.any(String))
    })
    it('should not be able to check-in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() => 
            sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check-in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

       const {checkIn} = await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01',
           userLatitude: 0,
           userLongitude: 0,
       })
       expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Typescript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-27.0747279),
            longitude: new Decimal(-49.4889672),
        })
        
        await expect(() => 
            sut.execute({
            gymId:'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
