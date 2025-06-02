import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/studio/export/fountain - Export script to Fountain format
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

    // Basic Fountain export (placeholder implementation)
    let fountainContent = `Title: ${project.titulo}\n`;
    fountainContent += `Author: ${project.owner?.name || 'Unknown'}\n\n`;
    
    project.capas.forEach((capa, capaIndex) => {
      fountainContent += `\n# CAPA ${capaIndex + 1}: ${capa.titulo}\n\n`;
      
      capa.minutos.forEach((minuto) => {
        fountainContent += `## ${minuto.titulo}\n\n`;
        
        minuto.beats.forEach((beat) => {
          fountainContent += `### ${beat.titulo}\n\n`;
          fountainContent += `${beat.contenido || 'No content'}\n\n`;
        });
      });
    });

    return NextResponse.json({
      content: fountainContent,
      filename: `${project.titulo?.replace(/\s+/g, '_') || 'script'}.fountain`,
    });
  } catch (error) {
    console.error("Error exporting to Fountain:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}