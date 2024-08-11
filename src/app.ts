import fastify from "fastify";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
prisma.user.create({
    data: {
        name: 'John Doe',
        email: 'j@j.com',
        
    }
})

export const app = fastify();