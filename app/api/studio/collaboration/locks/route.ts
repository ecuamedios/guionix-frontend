// app/api/studio/collaboration/locks/route.ts (SUPER AVANZADO, COLABORACIÓN EN VIVO)
// filepath: app/api/studio/collaboration/locks/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { z } from "zod";

const lockSchema = z.object({
  resourceId: z.string(),
  type: z.enum(["BEAT", "CAPA", "PROJECT"]),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resourceId = searchParams.get("resourceId");
  if (!resourceId) return NextResponse.json({ error: "resourceId requerido" }, { status: 400 });

  const locks = await prisma.collaborationLock.findMany({
    where: { resourceId },
    orderBy: { acquiredAt: "desc" },
  });

  return NextResponse.json({ locks });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let data;
  try {
    data = lockSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json({ error: err.errors?.[0]?.message || "Datos inválidos" }, { status: 400 });
  }

  // Solo un lock por usuario y recurso
  const existing = await prisma.collaborationLock.findFirst({
    where: { resourceId: data.resourceId, userId: token.id },
  });
  if (existing) {
    return NextResponse.json({ lock: existing, message: "Ya tienes un lock activo" });
  }

  const lock = await prisma.collaborationLock.create({
    data: {
      ...data,
      userId: token.id,
      acquiredAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutos
    },
  });

  return NextResponse.json({ lock });
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resourceId } = await req.json();
  if (!resourceId) return NextResponse.json({ error: "resourceId requerido" }, { status: 400 });

  await prisma.collaborationLock.deleteMany({
    where: { resourceId, userId: token.id },
  });

  return NextResponse.json({ message: "Lock liberado" });
}