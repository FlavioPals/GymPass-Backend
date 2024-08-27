import '@fastify/jwt'

declare module '@fastify/jwt' {
    interface fastifyJwt{
      
        user:{
            sub:string
        }
    }
}