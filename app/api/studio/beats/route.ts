// app/api/studio/beats/route.ts (AVANZADO)
// filepath: app/api/studio/beats/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getToken } from "next-auth/jwt";

const beatSchema = z.object({
  titulo: z.string().min(2),
  contenido: z.string().min(1),
  capaId: z.string(),
  orden: z.number().optional(),
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let data;
  try {
    data = beatSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json({ error: err.errors?.[0]?.message || "Datos inválidos" }, { status: 400 });
  }

  const beat = await prisma.beat.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({ beat }, { status: 201 });
}