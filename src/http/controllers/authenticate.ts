import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { RegisterUseCase } from "../../use-cases/register"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists"
import { AuthenticateUseCase } from "../../use-cases/authenticate"


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password } = authenticateBodySchema.parse(request.body)

    try{
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
        await authenticateUseCase.execute({
        email, password
        })
    }
    catch(err){
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }
        throw err
    }
   
    return reply.status(201).send()
}