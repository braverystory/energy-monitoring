import "dotenv/config"
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from "@prisma/client"
import Database from "better-sqlite3"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create better-sqlite3 database connection
const connectionString = process.env.DATABASE_URL || "file:./prisma/dev.db"
const db = new Database(connectionString.replace("file:", ""))
const adapter = new PrismaBetterSQLite3(db)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
