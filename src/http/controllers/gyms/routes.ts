import { FastifyInstance } from "fastify";
import { search } from "./search";
import { nearbyGyms } from "./nearby";
import { create } from "./create";




export async function gymsRoutes(app:FastifyInstance){
    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearbyGyms)
    app.post('/gyms', create)
} 



