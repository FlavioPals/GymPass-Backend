import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { GymRepository } from "../repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn:CheckIn
}

export class CheckInUseCase{
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository:GymRepository
    ){}

    async execute({
        userId, gymId
    }: CheckInUseCaseRequest):Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if(!gym){
            throw new ResourceNotFoundError()
        }

        //calculate distance between user and gym
        

        if(checkInOnSameDate){
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        })
        return({checkIn})
    }
}