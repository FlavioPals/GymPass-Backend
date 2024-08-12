import { Prisma, User } from "@prisma/client";
import { primsa } from "../../lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
   async findByEmail(email: string): Promise<User | null> {
    const user = await primsa.user.findUnique({
        where:{
            email,
        },
    })
    return user}

    async create(data: Prisma.UserCreateInput) {
        const user = await primsa.user.create({
                data
            })
            return user
    }
}