import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import {CheckInUseCase} from '../checkin'
export function makeCheckInUseCase() {
    const primsaCheckInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckInUseCase(primsaCheckInsRepository, gymsRepository)
    return useCase
}