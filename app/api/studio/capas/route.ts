import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/studio/capas - Get all capas
export async function GET() {
  try {
    const capas = await prisma.capa.findMany({
      include: {
        minutos: {
          include: {
            beats: true,
          },
        },
        pelicula: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(capas);
  } catch (error) {
    console.error("Error fetching capas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/studio/capas - Create new capa
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const capa = await prisma.capa.create({
      data: body,
      include: {
        minutos: {
          include: {
            beats: true,
          },
        },
        pelicula: true,
      },
    });

    return NextResponse.json(capa);
  } catch (error) {
    console.error("Error creating capa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}