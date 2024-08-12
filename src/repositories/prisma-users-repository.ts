import { Prisma } from "@prisma/client";
import { primsa } from "../lib/prisma";

export class PrismaUsersRepository {

    async create(data: Prisma.UserCreateInput) {
        const user = await primsa.user.create({
                data
            })
            return user
    }
}