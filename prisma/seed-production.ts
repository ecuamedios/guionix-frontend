// prisma/seed-production.ts (AVANZADO)
// filepath: prisma/seed-production.ts
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create initial SUPER_ADMIN user with secure credentials from env
  const adminEmail = process.env.ADMIN_EMAIL || "admin@guionix.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "guionixSuperSecret!";
  const adminHash = await bcrypt.hash(adminPassword, 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: adminHash,
      firstName: "Admin",
      lastName: "GUIONIX",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  // 2. Create sample Blake Snyder structure templates
  const blakeSnyderTemplate = await prisma.structureTemplate.upsert({
    where: { name: "Blake Snyder Beat Sheet" },
    update: {},
    create: {
      name: "Blake Snyder Beat Sheet",
      description: "Estructura clásica de guion en 15 beats.",
      beats: [
        "Opening Image",
        "Theme Stated",
        "Set-Up",
        "Catalyst",
        "Debate",
        "Break Into Two",
        "B Story",
        "Fun and Games",
        "Midpoint",
        "Bad Guys Close In",
        "All Is Lost",
        "Dark Night of the Soul",
        "Break Into Three",
        "Finale",
        "Final Image",
      ].map((titulo, idx) => ({ titulo, orden: idx + 1 })),
      isDefault: true,
    } as Prisma.StructureTemplateCreateInput,
  });

  // 3. Create default system configuration
  await prisma.systemConfig.upsert({
    where: { key: "default_language" },
    update: { value: "es-MX" },
    create: { key: "default_language", value: "es-MX" },
  });

  // 4. Create sample prompts for AI generation
  await prisma.aiPrompt.createMany({
    data: [
      {
        name: "Sinopsis creativa",
        prompt: "Genera una sinopsis atractiva para un guion ambientado en México.",
        category: "SYNOPSIS",
      },
      {
        name: "Diálogo natural",
        prompt: "Escribe un diálogo realista entre dos personajes adolescentes en CDMX.",
        category: "DIALOGUE",
      },
    ],
    skipDuplicates: true,
  });

  // 5. Create user role templates
  await prisma.role.createMany({
    data: [
      { name: "SUPER_ADMIN", description: "Acceso total al sistema" },
      { name: "ADMIN", description: "Administración de proyectos y usuarios" },
      { name: "USER", description: "Usuario estándar" },
      { name: "COLLABORATOR", description: "Colaborador de proyectos" },
    ],
    skipDuplicates: true,
  });

  // 6. Initialize system settings and permissions
  await prisma.permission.createMany({
    data: [
      { name: "project:create", description: "Crear proyectos" },
      { name: "project:edit", description: "Editar proyectos" },
      { name: "project:delete", description: "Eliminar proyectos" },
      { name: "beat:edit", description: "Editar beats" },
      { name: "ai:generate", description: "Usar generación IA" },
    ],
    skipDuplicates: true,
  });

  // 7. Create sample cultural context data (Mexico/LATAM)
  await prisma.culturalContext.createMany({
    data: [
      {
        name: "México",
        description: "Contexto cultural mexicano para IA y prompts.",
        language: "es-MX",
        region: "LATAM",
      },
      {
        name: "Argentina",
        description: "Contexto cultural argentino para IA y prompts.",
        language: "es-AR",
        region: "LATAM",
      },
    ],
    skipDuplicates: true,
  });

  // 8. Log results
  console.log("Seed de producción ejecutado correctamente.");
  console.log("SUPER_ADMIN:", superAdmin.email);
  console.log("Estructura Blake Snyder:", blakeSnyderTemplate.name);
}

main()
  .catch((e) => {
    console.error("Error en seed de producción:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });