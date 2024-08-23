import { Gym, Prisma } from "@prisma/client";
import { findManyNearbyParams, GymRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates";






export class InMemoryGymsRepository implements GymRepository {
    public items: Gym[] = []
    
    
   async create(data: Prisma.GymCreateInput){
       const gym = {
        id: data.id ?? randomUUID(),
        title:data.title,
        description: data.description ?? null,
        latitude: new Prisma.Decimal(data.latitude.toString()),
        longitude:new Prisma.Decimal(data.longitude.toString()),
        phone: data.phone ?? null,  
        created_at: new Date()      
       }
       this.items.push(gym)
       return gym
    }

    async findById(id: string){
        const gym = this.items.find((item) => item.id === id)
        if(!gym){
            return null
        }
        return gym
    }
    
   async searchMany(query: string, page: number){
        return this.items
        .filter(item => item.title.includes(query))
        .slice((page - 1) * 20, page * 20)
    }
   async findManyNearBy(params: findManyNearbyParams){
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates(
                {latitude: params.latitude, longitude: params.longitude},
                {latitude:item.latitude.toNumber(), longitude:item.latitude.toNumber()}
            )
            console.log(distance)
            return distance < 10
        })
    }
}
