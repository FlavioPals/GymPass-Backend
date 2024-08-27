import { z } from "zod"
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-crendetials-error"
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case"
import { FastifyReply, FastifyRequest } from "fastify"


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password } = authenticateBodySchema.parse(request.body)

    try{
        const authenticateUseCase = makeAuthenticateUseCase()
      const {user} =   await authenticateUseCase.execute({
        email, password
        })
        const {id} = user
        const token = await reply.jwtSign({},{sign: {sub: user.id}})
        
    return reply.status(200).send({token, id})
    }
    catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(409).send({message: err.message})
        }
        throw err
    }
   
}