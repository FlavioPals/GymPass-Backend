import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import {Environment} from 'vitest/environments'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
    if(!process.env.Database_URL) {
        throw new Error('Please provide a Database_URL environment variable')
    }

    const url = new URL(process.env.Database_URL)
    url.searchParams.set('schema', schema)
    return url.toString()

}

export default <Environment> {
    name: 'prisma',
    transformMode:'ssr',
    async setup() {
        const schema = randomUUID()
        const dataBaseURL = generateDatabaseUrl(schema)

        process.env.DATABASE_URL = dataBaseURL

        execSync('npx prisma migrate deploy')



        return {
      async teardown() {
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
            await prisma.$disconnect()
        },
        }
    },
}

//postgresql://docker:docker@localhost:5432/apisolid?schema=public