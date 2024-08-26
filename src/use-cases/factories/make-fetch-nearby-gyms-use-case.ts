import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import {FetchNearbyGymUseCase} from '../fetch-nearby-gyms'
export function makeFetchNearbyGymsUseCase() {
    const primsaCheckInsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymUseCase(primsaCheckInsRepository)
    return useCase
}