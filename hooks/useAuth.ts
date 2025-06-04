import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback } from "react";
import { Permission, UserRole, hasPermission, canAccessRoute } from "@/lib/permissions";
import { useRouter } from "next/navigation";

// --- Types ---
export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role: UserRole;
  permissions: Permission[];
}

export function useAuth() {
  const { data, status, update } = useSession();
  const user = data?.user as AuthUser | undefined;
  const loading = status === "loading";
  const isAuthenticated = !!user;

  const login = useCallback(
    (provider: "credentials" | "google", options?: any) => signIn(provider, options),
    []
  );
  
  const logout = useCallback(async () => {
    await signOut({ callbackUrl: '/login' });
  }, []);

  const refreshSession = useCallback(() => update(), [update]);

  const hasRole = useCallback(
    (role: UserRole) => user && user.role === role,
    [user]
  );
  
  const hasPerm = useCallback(
    (perm: Permission) => user && user.permissions && user.permissions.includes(perm),
    [user]
  );

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshSession,
    hasRole,
    hasPermission: hasPerm,
  };
}

export function usePermissions() {
  const { user } = useAuth();

  const can = useCallback(
    (permission: Permission) => !!user && hasPermission(user.role, permission),
    [user]
  );

  const canAccess = useCallback(
    (route: string) => !!user && canAccessRoute(user.role, route),
    [user]
  );

  const renderIf = useCallback(
    (permission: Permission, children: React.ReactNode) =>
      can(permission) ? children : null,
    [can]
  );

  return {
    can,
    canAccess,
    renderIf,
  };
}

// --- Admin Users Management Hook ---
import { useState, useEffect } from "react";

export interface UserListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: string;
  createdAt: string;
  lastLoginAt?: string;
  aiUsageMonth?: number;
  aiBudgetLimit?: number;
  projects?: number;
}

export function useUsers() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        search,
        role,
        sort,
        order,
      });
      const res = await fetch(`/api/users?${params.toString()}`);
      if (!res.ok) throw new Error((await res.json()).error || "Error al cargar usuarios");
      const data = await res.json();
      setUsers(data.users);
      setTotal(data.total);
    } catch (e: any) {
      setError(e.message || "Error desconocido");
    }
    setLoading(false);
  }, [page, pageSize, search, role, sort, order]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // CRUD operations
  const createUser = async (user: Partial<UserListItem> & { password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error al crear usuario");
      await fetchUsers();
      return true;
    } catch (e: any) {
      setError(e.message || "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updates: Partial<UserListItem>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error al actualizar usuario");
      await fetchUsers();
      return true;
    } catch (e: any) {
      setError(e.message || "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error || "Error al eliminar usuario");
      await fetchUsers();
      return true;
    } catch (e: any) {
      setError(e.message || "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    total,
    loading,
    error,
    page,
    pageSize,
    setPage,
    setPageSize,
    search,
    setSearch,
    role,
    setRole,
    sort,
    setSort,
    order,
    setOrder,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}