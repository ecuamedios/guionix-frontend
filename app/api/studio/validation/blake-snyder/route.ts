// app/api/studio/validation/blake-snyder/route.ts (SUPER AVANZADO)
// filepath: app/api/studio/validation/blake-snyder/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateBlakeSnyderStructure, blakeSnyderBeats } from "@/lib/validation/blakeSnyderValidation";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await req.json();
  if (!projectId) return NextResponse.json({ error: "projectId requerido" }, { status: 400 });

  // Obtén los beats del proyecto desde la base de datos
  const capas = await prisma.capa.findMany({
    where: { projectId },
    include: { beats: true },
    orderBy: { orden: "asc" },
  });

  const allBeats = capas.flatMap(c => c.beats.map(b => b.titulo));
  const validation = validateBlakeSnyderStructure(allBeats);

  return NextResponse.json({
    valid: validation.valid,
    missing: validation.missing,
    totalBeats: allBeats.length,
    expectedBeats: blakeSnyderBeats,
  });
}