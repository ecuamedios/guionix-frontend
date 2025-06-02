import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/studio/export/finaldraft - Export script to Final Draft format
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

    // Basic Final Draft XML export (placeholder implementation)
    let fdxContent = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n`;
    fdxContent += `<FinalDraft DocumentType="Script" Template="No" Version="1">\n`;
    fdxContent += `  <Content>\n`;
    fdxContent += `    <Paragraph Type="Title">\n`;
    fdxContent += `      <Text>${project.titulo || 'Untitled'}</Text>\n`;
    fdxContent += `    </Paragraph>\n`;
    
    project.capas.forEach((capa) => {
      fdxContent += `    <Paragraph Type="Scene Heading">\n`;
      fdxContent += `      <Text>${capa.titulo}</Text>\n`;
      fdxContent += `    </Paragraph>\n`;
      
      capa.minutos.forEach((minuto) => {
        minuto.beats.forEach((beat) => {
          fdxContent += `    <Paragraph Type="Action">\n`;
          fdxContent += `      <Text>${beat.contenido || 'No content'}</Text>\n`;
          fdxContent += `    </Paragraph>\n`;
        });
      });
    });
    
    fdxContent += `  </Content>\n`;
    fdxContent += `</FinalDraft>\n`;

    return NextResponse.json({
      content: fdxContent,
      filename: `${project.titulo?.replace(/\s+/g, '_') || 'script'}.fdx`,
    });
  } catch (error) {
    console.error("Error exporting to Final Draft:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}