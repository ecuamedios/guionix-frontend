import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma client
let prismaInstance: PrismaClient;

try {
  if (process.env.DATABASE_URL) {
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
  } else {
    // Fallback for development/build time when DATABASE_URL is not available
    prismaInstance = new PrismaClient({
      datasources: {
        db: {
          url: "file:./dev.db"
        }
      }
    });
  }
} catch (error) {
  console.warn("Database connection not available:", error);
  // Create a minimal client for build time
  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: "file:./dev.db"
      }
    }
  });
}

export const prisma = prismaInstance
