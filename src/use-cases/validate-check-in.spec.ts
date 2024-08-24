import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "../repositories/in-memory-respository/in-memory-check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let checkInsRepository:CheckInsRepository
let sut:ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)
        vi.useFakeTimers()
    })

    afterEach(async () => {
        vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id:'gym-01',
            user_id:'user-01',
        })

     const {checkIn} = await sut.execute({
            checkInId: createdCheckIn.id,
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
    
    it('should not be able to validate an inexistent check-in', async () => {
       await expect(() => 
        sut.execute({
                checkInId: 'inexistent-check-in-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) //utc

        const createdCheckIn = await checkInsRepository.create({
            gym_id:'gym-01',
            user_id:'user-01',
        })
        const twentyOneMinutesInMs = 1000 * 60 * 21
        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() => sut.execute({
            checkInId:createdCheckIn.id,
        })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })
})