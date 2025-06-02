import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/studio/export/pdf - Export script to PDF format
export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();
    
    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const project = await prisma.pelicula.findUnique({
      where: { id: projectId },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
        capas: {
          include: {
            minutos: {
              include: {
                beats: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // PDF export placeholder - would need PDF library implementation
    // For now, return structured data that could be used by a PDF generator
    const pdfData = {
      title: project.titulo || 'Untitled',
      author: project.owner?.name || 'Unknown',
      capas: project.capas.map((capa) => ({
        name: capa.titulo,
        minutos: capa.minutos.map((minuto) => ({
          name: minuto.titulo,
          beats: minuto.beats.map((beat) => ({
            name: beat.titulo,
            content: beat.contenido || 'No content',
          })),
        })),
      })),
    };

    return NextResponse.json({
      message: "PDF generation not yet implemented",
      data: pdfData,
      filename: `${project.titulo?.replace(/\s+/g, '_') || 'script'}.pdf`,
    });
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}