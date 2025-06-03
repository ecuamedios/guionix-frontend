import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

export function withPrisma<T>(
  callback: (prisma: PrismaClient) => Promise<T>
): Promise<T | NextResponse> {
  if (!prisma) {
    return Promise.resolve(
      NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      )
    );
  }
  return callback(prisma);
}

export { prisma };
