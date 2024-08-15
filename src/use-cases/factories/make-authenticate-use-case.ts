import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
    const primsaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(primsaUsersRepository)
    return authenticateUseCase
}