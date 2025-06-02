// prisma/seed.ts (FIXED FOR OAUTH)
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Usuarios demo
  const admin = await prisma.user.upsert({
    where: { email: "admin@guionix.com" },
    update: {},
    create: {
      email: "admin@guionix.com",
      name: "Admin GUIONIX",
      firstName: "Admin",
      lastName: "GUIONIX",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@guionix.com" },
    update: {},
    create: {
      email: "editor@guionix.com",
      name: "Editor Demo",
      firstName: "Editor",
      lastName: "Demo",
      role: "EDITOR",
      status: "ACTIVE",
    },
  });

  // Proyecto demo
  const pelicula = await prisma.pelicula.create({
    data: {
      titulo: "Demo Hollywood Script",
      subtitulo: "Una historia épica",
      genero: "Drama",
      sinopsis: "Proyecto de ejemplo para GUIONIX",
      logline: "Un ejemplo de cómo usar GUIONIX para crear guiones profesionales",
      ownerId: admin.id,
      status: "BORRADOR",
      capas: {
        create: [
          {
            numero: 1,
            titulo: "Acto 1",
            descripcion: "Setup y presentación de personajes",
            tipo: "SETUP",
            blakeSnyderBeat: "Setup",
            paginaInicio: 1,
            paginaFin: 25,
            minutoInicio: 1,
            minutoFin: 25,
            minutos: {
              create: [
                {
                  numero: 1,
                  titulo: "Opening Image",
                  descripcion: "La primera imagen de la película",
                  beats: {
                    create: [
                      {
                        numero: 1,
                        titulo: "Opening Image",
                        contenido: "La primera imagen que establece el tono de la película.",
                        tipo: "DESCRIPCION"
                      }
                    ]
                  }
                },
                {
                  numero: 2,
                  titulo: "Theme Stated",
                  descripcion: "El tema es presentado",
                  beats: {
                    create: [
                      {
                        numero: 1,
                        titulo: "Theme Stated",
                        contenido: "El tema de la historia es presentado sutilmente.",
                        tipo: "DIALOGO"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            numero: 2,
            titulo: "Acto 2",
            descripcion: "Desarrollo y confrontación",
            tipo: "MIDPOINT",
            blakeSnyderBeat: "Midpoint",
            paginaInicio: 26,
            paginaFin: 90,
            minutoInicio: 26,
            minutoFin: 90,
            minutos: {
              create: [
                {
                  numero: 1,
                  titulo: "Midpoint",
                  descripcion: "El punto medio de la historia",
                  beats: {
                    create: [
                      {
                        numero: 1,
                        titulo: "Midpoint",
                        contenido: "El punto medio donde todo cambia.",
                        tipo: "ACCION"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    include: { 
      capas: { 
        include: { 
          minutos: { 
            include: { beats: true } 
          } 
        } 
      } 
    }
  });

  console.log("Seeded admin user:", admin.email);
  console.log("Seeded editor user:", editor.email);
  console.log("Seeded project:", pelicula.titulo);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });