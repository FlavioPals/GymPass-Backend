import { Gym, Prisma } from "@prisma/client";

export interface findManyNearbyParams{
    latitude:number
    longitude:number
}

export interface GymRepository {
    findById(id: string): Promise<Gym | null>
    findManyNearBy(params:findManyNearbyParams): Promise<Gym[]>
    searchMany(query: string, page: number): Promise<Gym[]>
    create(data:Prisma.GymCreateInput): Promise<Gym>  
}
