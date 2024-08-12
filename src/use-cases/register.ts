import { hash } from "bcryptjs"
import { primsa } from "../lib/prisma"

interface RegisterUseCaseRequest{
    name:string
    email:string
    password:string
}

export  async function registerUseCase({
    name, email, password
}:RegisterUseCaseRequest){
    const password_hash = await hash(password, 1)

    const userWithSameEmail = await primsa.user.findUnique({
        where:{
            email,
        },
    })
    if(userWithSameEmail){
        throw new Error('User already exists')
    }

    await primsa.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })
}