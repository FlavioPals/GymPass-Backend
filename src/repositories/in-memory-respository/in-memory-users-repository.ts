import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository{
    public items: User[] = [];

    async findById(userId: string){
       const user = this.items.find(user => user.id === userId)
       if(!user){
        return null
       }
       return user
    };
   async findByEmail(email: string){
       const user = this.items.find(user => user.email === email)
       if(!user){
        return null
       }
       return user
    }
    async create(data: Prisma.UserCreateInput){
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            created_at: new Date(),
            password_hash: data.password_hash
        }
        this.items.push(user)
        return user
    }
    
}