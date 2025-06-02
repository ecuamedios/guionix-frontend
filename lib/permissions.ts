// --- Permission Enum ---
export enum Permission {
  SCRIPT_CREATE = "SCRIPT_CREATE",
  SCRIPT_EDIT = "SCRIPT_EDIT",
  AI_GENERATE = "AI_GENERATE",
  USER_MANAGE = "USER_MANAGE",
  BUDGET_CONTROL = "BUDGET_CONTROL",
  EXPORT = "EXPORT",
  ADMIN_PANEL = "ADMIN_PANEL",
  PROJECT_MANAGE = "PROJECT_MANAGE",
  APPROVAL = "APPROVAL",
}

// --- Role Hierarchy ---
export type UserRole = "SUPER_ADMIN" | "DIRECTOR" | "SUPERVISOR" | "EDITOR" | "VIEWER";

export const roleHierarchy: UserRole[] = [
  "SUPER_ADMIN",
  "DIRECTOR",
  "SUPERVISOR",
  "EDITOR",
  "VIEWER",
];

// --- Permission Matrix ---
export const permissionMatrix: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    Permission.SCRIPT_CREATE,
    Permission.SCRIPT_EDIT,
    Permission.AI_GENERATE,
    Permission.USER_MANAGE,
    Permission.BUDGET_CONTROL,
    Permission.EXPORT,
    Permission.ADMIN_PANEL,
    Permission.PROJECT_MANAGE,
    Permission.APPROVAL,
  ],
  DIRECTOR: [
    Permission.SCRIPT_CREATE,
    Permission.SCRIPT_EDIT,
    Permission.AI_GENERATE,
    Permission.BUDGET_CONTROL,
    Permission.EXPORT,
    Permission.ADMIN_PANEL,
    Permission.PROJECT_MANAGE,
    Permission.APPROVAL,
  ],
  SUPERVISOR: [
    Permission.SCRIPT_CREATE,
    Permission.SCRIPT_EDIT,
    Permission.AI_GENERATE,
    Permission.PROJECT_MANAGE,
    Permission.APPROVAL,
  ],
  EDITOR: [
    Permission.SCRIPT_CREATE,
    Permission.SCRIPT_EDIT,
    Permission.AI_GENERATE,
  ],
  VIEWER: [],
};

// --- User Permissions Object ---
export type UserPermissions = {
  role: UserRole;
  permissions: Permission[];
  aiBudgetLimit: number;
  aiUsageMonth: number;
  canExport: boolean;
};

// --- Utility Functions ---
export function getRoleHierarchy(): UserRole[] {
  return roleHierarchy;
}

export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const allowed = permissionMatrix[userRole] || [];
  return allowed.includes(permission);
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  // Example route checks
  if (route.startsWith("/admin")) {
    return hasPermission(userRole, Permission.ADMIN_PANEL);
  }
  if (route.startsWith("/dashboard")) {
    return roleHierarchy.indexOf(userRole) <= roleHierarchy.indexOf("VIEWER");
  }
  if (route.startsWith("/studio")) {
    return roleHierarchy.indexOf(userRole) <= roleHierarchy.indexOf("EDITOR");
  }
  return true;
}

export function validateBudgetLimit(user: { aiBudgetLimit: number; aiUsageMonth: number }, requestedAmount: number): boolean {
  return user.aiUsageMonth + requestedAmount <= user.aiBudgetLimit;
}

// --- Role-specific limits and quotas ---
export const roleLimits: Record<UserRole, { aiBudgetLimit: number; canExport: boolean }> = {
  SUPER_ADMIN: { aiBudgetLimit: Infinity, canExport: true },
  DIRECTOR: { aiBudgetLimit: 1000, canExport: true },
  SUPERVISOR: { aiBudgetLimit: 500, canExport: false },
  EDITOR: { aiBudgetLimit: 100, canExport: false },
  VIEWER: { aiBudgetLimit: 0, canExport: false },
};