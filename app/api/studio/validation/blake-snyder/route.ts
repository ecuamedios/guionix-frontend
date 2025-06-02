// app/api/studio/validation/blake-snyder/route.ts (SUPER AVANZADO)
// filepath: app/api/studio/validation/blake-snyder/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateBlakeSnyderStructure, blakeSnyderBeats } from "@/lib/validation/blakeSnyderValidation";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { peliculaId } = await req.json();
  if (!peliculaId) return NextResponse.json({ error: "peliculaId requerido" }, { status: 400 });

  // Obtén las capas del proyecto desde la base de datos
  const capas = await prisma.capa.findMany({
    where: { peliculaId },
    include: { minutos: true },
    orderBy: { numero: "asc" },
  });

  const allBeats = capas.map(c => c.blakeSnyderBeat);
  const validation = validateBlakeSnyderStructure(allBeats);

  return NextResponse.json({
    valid: validation.valid,
    missing: validation.missing,
    totalBeats: allBeats.length,
    expectedBeats: blakeSnyderBeats,
  });
}