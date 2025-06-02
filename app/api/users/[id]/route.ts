import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { UserRole } from "@/lib/permissions";

// --- Utils ---
function isAdmin(role: UserRole) {
  return ["SUPER_ADMIN", "DIRECTOR"].includes(role);
}
async function isLastSuperAdmin(userId: string) {
  const count = await prisma.user.count({ where: { role: "SUPER_ADMIN", id: { not: userId }, status: "ACTIVE" } });
  return count === 0;
}

// --- Zod Schemas ---
const updateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["SUPER_ADMIN", "DIRECTOR", "SUPERVISOR", "EDITOR", "VIEWER"]).optional(),
  aiBudgetLimit: z.number().min(0).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
});

// --- GET: Fetch single user ---
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  // Only admins or the user themselves can view
  if (!isAdmin(token.role) && token.id !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      status: true,
      aiBudgetLimit: true,
      aiUsageMonth: true,
      createdAt: true,
      lastLoginAt: true,
      ownedProjects: { select: { id: true, titulo: true } },
      assignedProjects: { select: { peliculaId: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  return NextResponse.json({
    ...user,
    projects: user.ownedProjects.length + user.assignedProjects.length,
    aiUsage: user.aiUsageMonth,
    aiBudget: user.aiBudgetLimit,
  });
}

// --- PUT: Update user ---
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const isUserAdmin = isAdmin(token.role);

  let data;
  try {
    data = updateUserSchema.parse(await req.json());
  } catch (err: unknown) {
    const error = err as { errors?: Array<{ message?: string }> };
    return NextResponse.json({ error: error.errors?.[0]?.message || "Invalid input" }, { status: 400 });
  }

  // Only admins can change role, status, aiBudgetLimit, or email
  if (
    (data.role || data.status || data.aiBudgetLimit || data.email) &&
    !isUserAdmin
  ) {
    return NextResponse.json({ error: "No autorizado para modificar estos campos" }, { status: 403 });
  }

  // Prevent demoting last SUPER_ADMIN
  if (data.role && data.role !== "SUPER_ADMIN") {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user?.role === "SUPER_ADMIN" && (await isLastSuperAdmin(id))) {
      return NextResponse.json({ error: "Debe existir al menos un SUPER_ADMIN activo" }, { status: 400 });
    }
  }

  // Update user
  const updated = await prisma.user.update({
    where: { id },
    data,
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      action: "update",
      entity: "user",
      entityId: id,
      newValues: data,
      userId: token.id,
      ipAddress: req.headers.get("x-forwarded-for") || "",
      userAgent: req.headers.get("user-agent") || "",
    },
  });

  return NextResponse.json({ message: "Usuario actualizado", user: updated });
}

// --- DELETE: Soft delete user ---
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  // Only admins or the user themselves can delete
  const isSelf = token.id === id;
  const isUserAdmin = isAdmin(token.role);

  if (!isUserAdmin && !isSelf) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  // Prevent deleting last SUPER_ADMIN
  if (user.role === "SUPER_ADMIN" && (await isLastSuperAdmin(id))) {
    return NextResponse.json({ error: "Debe existir al menos un SUPER_ADMIN activo" }, { status: 400 });
  }

  // Transfer owned projects to another admin if needed (implement logic as needed)
  // For now, just soft delete
  await prisma.user.update({
    where: { id },
    data: { status: "INACTIVE" },
  });

  await prisma.auditLog.create({
    data: {
      action: "delete",
      entity: "user",
      entityId: id,
      oldValues: user,
      userId: token.id,
      ipAddress: req.headers.get("x-forwarded-for") || "",
      userAgent: req.headers.get("user-agent") || "",
    },
  });

  return NextResponse.json({ message: "Usuario eliminado (soft delete)" });
}