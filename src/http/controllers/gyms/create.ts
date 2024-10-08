import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "../../../use-cases/factories/make-create-gym-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists";

export async function create(request:FastifyRequest, reply:FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const {title, description, phone, latitude, longitude} = createGymBodySchema.parse(request.body)

    try {
        const createGymUseCase = makeCreateGymUseCase()

        await createGymUseCase.execute({
            title,
            description,
            phone,
            latitude,
            longitude
        })
    } 
    catch (err) {
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({
                message: err.message
            })
        }
    }
}