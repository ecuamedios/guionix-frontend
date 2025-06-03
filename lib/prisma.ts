import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only initialize Prisma if DATABASE_URL is available
let prismaInstance: PrismaClient | null = null;

try {
  if (process.env.DATABASE_URL) {
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
  }
} catch (error) {
  console.warn("Database connection not available:", error);
}

export const prisma = prismaInstance
