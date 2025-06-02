import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";
import { Permission, UserRole, permissionMatrix } from "@/lib/permissions";

// --- Zod Schemas ---
const createUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["SUPER_ADMIN", "DIRECTOR", "SUPERVISOR", "EDITOR", "VIEWER"]),
});

// --- Utils ---
function isAdmin(role: UserRole) {
  return ["SUPER_ADMIN", "DIRECTOR"].includes(role);
}

// --- GET: List Users ---
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isAdmin(token.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 20);
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") as UserRole | undefined;
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const where: any = {
    AND: [
      search
        ? {
            OR: [
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      role ? { role } : {},
    ],
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sort]: order },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        lastLoginAt: true,
        aiUsageMonth: true,
        aiBudgetLimit: true,
        _count: {
          select: { ownedProjects: true, assignedProjects: true },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  // User statistics
  const usersWithStats = users.map((u) => ({
    ...u,
    projects: u._count.ownedProjects + u._count.assignedProjects,
    aiUsage: u.aiUsageMonth,
    aiBudget: u.aiBudgetLimit,
  }));

  return NextResponse.json({
    users: usersWithStats,
    total,
    page,
    pageSize,
  });
}

// --- POST: Create User ---
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isAdmin(token.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let data;
  try {
    data = createUserSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json({ error: err.errors?.[0]?.message || "Invalid input" }, { status: 400 });
  }

  // Check email uniqueness
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json({ error: "El email ya está registrado." }, { status: 409 });
  }

  // Validate role assignment
  if (!permissionMatrix[token.role].includes(Permission.USER_MANAGE) && data.role !== "VIEWER") {
    return NextResponse.json({ error: "No tienes permisos para asignar este rol." }, { status: 403 });
  }

  // Hash password
  const hashedPassword = await hash(data.password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      status: "ACTIVE",
      createdBy: token.id,
    },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      action: "create",
      entity: "user",
      entityId: user.id,
      newValues: user,
      userId: token.id,
      ipAddress: req.headers.get("x-forwarded-for") || "",
      userAgent: req.headers.get("user-agent") || "",
    },
  });

  // TODO: Send welcome email (implement your email logic here)

  return NextResponse.json({ message: "Usuario creado exitosamente", user: { id: user.id, email: user.email } }, { status: 201 });
}