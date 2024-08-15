import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
    const primsaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(primsaUsersRepository)
    return registerUseCase
}