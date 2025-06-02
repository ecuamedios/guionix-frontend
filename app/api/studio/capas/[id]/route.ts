import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/studio/capas/[id] - Get capa by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const capa = await prisma.capa.findUnique({
      where: { id },
      include: {
        minutos: {
          include: {
            beats: true,
          },
        },
        pelicula: true,
      },
    });

    if (!capa) {
      return NextResponse.json({ error: "Capa not found" }, { status: 404 });
    }

    return NextResponse.json(capa);
  } catch (error) {
    console.error("Error fetching capa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/studio/capas/[id] - Update capa
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const capa = await prisma.capa.update({
      where: { id },
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
    console.error("Error updating capa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/studio/capas/[id] - Delete capa
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.capa.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting capa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}