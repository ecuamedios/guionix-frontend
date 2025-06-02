// prisma/seed-production.ts (SIMPLIFIED)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Create initial SUPER_ADMIN user (OAuth-based, no password)
  const adminEmail = process.env.ADMIN_EMAIL || "admin@guionix.com";

  const superAdmin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin GUIONIX",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  console.log(`Created super admin user: ${superAdmin.email}`);

  // 2. Create system configuration entries
  const configs = [
    { key: "default_language", value: "es-MX" },
    { key: "max_ai_budget_per_project", value: "500.0" },
    { key: "default_script_duration", value: "110" },
    { key: "max_collaborators_per_project", value: "10" },
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }

  console.log("Created system configuration entries");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });