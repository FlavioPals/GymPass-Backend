import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";




export async function usersRoutes(app:FastifyInstance){
    app.post('/users', register)
    app.post('/sessions', authenticate)

    /** Must be Authenticated routes */
    app.get('/me', profile)
} 



