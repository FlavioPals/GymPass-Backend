import { beforeEach, describe, expect, it } from "vitest";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "../repositories/in-memory-respository/in-memory-check-ins-repository";
import exp from "constants";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository:CheckInsRepository
let sut:ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)
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
})