import { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
      permissions: string[]
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    permissions: string[]
  }
}

// Role system types
export type UserRole = "SUPER_ADMIN" | "DIRECTOR" | "SUPERVISOR" | "EDITOR" | "VIEWER"

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    "system:manage",
    "organizations:create",
    "organizations:delete",
    "users:manage",
    "billing:manage",
    "projects:create",
    "projects:delete",
    "projects:edit",
    "projects:view",
    "scripts:create",
    "scripts:delete",
    "scripts:edit",
    "scripts:view",
    "export:all",
    "analytics:view"
  ],
  DIRECTOR: [
    "organizations:manage",
    "users:invite",
    "users:remove",
    "projects:create",
    "projects:delete",
    "projects:edit",
    "projects:view",
    "scripts:create",
    "scripts:delete",
    "scripts:edit",
    "scripts:view",
    "export:all",
    "analytics:view",
    "billing:view"
  ],
  SUPERVISOR: [
    "projects:create",
    "projects:edit",
    "projects:view",
    "scripts:create",
    "scripts:edit",
    "scripts:view",
    "export:pdf",
    "export:docx",
    "users:view",
    "analytics:basic"
  ],
  EDITOR: [
    "projects:view",
    "scripts:create",
    "scripts:edit",
    "scripts:view",
    "export:pdf",
    "export:docx"
  ],
  VIEWER: [
    "projects:view",
    "scripts:view",
    "export:pdf"
  ]
}

// Helper function to get permissions for a role
export function getRolePermissions(role: UserRole): string[] {
  return ROLE_PERMISSIONS[role] || []
}

// Helper function to check if user has permission
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes("system:manage")
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  // Don't use adapter for credentials provider - it conflicts with JWT strategy
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "tu@email.com" 
        },
        password: { 
          label: "Contraseña", 
          type: "password" 
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // For demo purposes, allow login with demo credentials
          if (credentials.email === "demo@guionix.com" && credentials.password === "demo123") {
            return {
              id: "demo-user-id",
              email: "demo@guionix.com",
              name: "Usuario Demo",
              role: "DIRECTOR" as UserRole
            };
          }

          // Try database lookup if available
          if (process.env.DATABASE_URL && prisma) {
            const user = await prisma!.user.findFirst({
              where: { 
                email: credentials.email.toLowerCase(),
                status: "ACTIVE"  // Only allow active users to login
              }
            }) as any;

            if (user && user.password) {
              const isValidPassword = await verifyPassword(credentials.password, user.password);
              
              if (isValidPassword) {
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name || user.email,
                  role: user.role
                };
              }
            }
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          // Return demo user as fallback for demo purposes
          if (credentials.email === "demo@guionix.com") {
            return {
              id: "demo-user-id",
              email: "demo@guionix.com",
              name: "Usuario Demo",
              role: "DIRECTOR" as UserRole
            };
          }
          return null;
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id
        token.role = user.role
        token.permissions = getRolePermissions(user.role)
      }

      // Return previous token if the access token has not expired yet
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.permissions = token.permissions
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      // Default redirect to dashboard page after successful login
      return `${baseUrl}/`
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login"
  },

  events: {
    async signIn({ user, account, profile }) {
      console.log(`User ${user.email} signed in successfully`);
    },
    async signOut({ session }) {
      console.log(`User signed out: ${session?.user?.email}`);
    }
  },

  debug: process.env.NODE_ENV === 'development',
  
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-key-for-development',
}

// Helper functions for role-based access control
export async function getCurrentUser(session: Session | null) {
  if (!session?.user?.id) return null
  
  try {
    if (!prisma) return null
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })
    
    return user
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}

export function canAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    VIEWER: 1,
    EDITOR: 2,
    SUPERVISOR: 3,
    DIRECTOR: 4,
    SUPER_ADMIN: 5
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function requireAuth(requiredRole?: UserRole) {
  return async function authGuard(session: Session | null) {
    if (!session?.user) {
      throw new Error("Authentication required")
    }
    
    if (requiredRole && !canAccess(session.user.role, requiredRole)) {
      throw new Error("Insufficient permissions")
    }
    
    return session.user
  }
}

// Hash password utility
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

// Verify password utility
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
