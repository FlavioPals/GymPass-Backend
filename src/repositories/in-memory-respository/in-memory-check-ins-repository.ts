import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";


export class InMemoryCheckInsRepository implements CheckInsRepository {



    public items: CheckIn[] = [];

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')
        const checkInOnSameDate = this.items.find((chekIn) => {
            const checkInDate = dayjs(chekIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
            return chekIn.user_id === userId && isOnSameDate
        })
        if (!checkInOnSameDate) {
            return null
        }
        return checkInOnSameDate
    }

    async findManyByUserId(userId: string, page: number) {
        return this.items
            .filter((item) => item.user_id === userId)
            .slice((page - 1) * 20, 40)
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: data.id ?? randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }
        this.items.push(checkIn)
        return checkIn
    }

    async countByUserId(userId: string) {
        return this.items.filter((item) => item.user_id === userId).length
    }

    async findById(id: string) {
        const checkin = this.items.find((item) => item.id === id)
        if (!checkin) {
            return null
        }
        return checkin
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
        if(checkInIndex >= 0){
            this.items[checkInIndex] = checkIn
        }
        return checkIn
    }
}