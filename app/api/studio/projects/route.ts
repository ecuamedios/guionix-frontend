// app/api/studio/projects/route.ts (AVANZADO)
// filepath: app/api/studio/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getToken } from "next-auth/jwt";

const projectSchema = z.object({
  titulo: z.string().min(3),
  descripcion: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { ownerId: token.id },
    include: { capas: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let data;
  try {
    data = projectSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json({ error: err.errors?.[0]?.message || "Datos inválidos" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      ...data,
      ownerId: token.id,
      status: "ACTIVE",
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}