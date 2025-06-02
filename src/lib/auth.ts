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
      organizationId?: string
      teamId?: string
      avatar?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: UserRole
    organizationId?: string
    teamId?: string
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    permissions: string[]
    organizationId?: string
    teamId?: string
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
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
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
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email y contraseña son requeridos")
          }

          // Find user in database (assuming password field will be added to User model)
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase()
            }
          })

          if (!user) {
            throw new Error("Credenciales inválidas")
          }

          // Check if user is active
          if (user.status !== "ACTIVE") {
            throw new Error("Cuenta desactivada. Contacta al administrador")
          }

          // For now, we'll need to add password field to User model
          // This is a temporary implementation - password should be stored in User model
          // Verify password (placeholder - need to add password field to User model)
          // const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          
          // Temporary: allow any password for demo
          const isValidPassword = credentials.password === "demo123"
          
          if (!isValidPassword) {
            throw new Error("Credenciales inválidas")
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
          })

          // Return user object
          return {
            id: user.id,
            email: user.email,
            name: user.name || user.firstName || "Usuario",
            role: user.role as UserRole,
            organizationId: undefined, // Will be added when organization support is implemented
            teamId: undefined, // Will be added when team support is implemented
            avatar: user.image || undefined
          }
        } catch (error) {
          console.error("Auth error:", error)
          throw error
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
        token.organizationId = user.organizationId
        token.teamId = user.teamId
      }

      // Return previous token if the access token has not expired yet
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.permissions = token.permissions
        session.user.organizationId = token.organizationId
        session.user.teamId = token.teamId
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error"
  },

  events: {
    async signIn({ user }) {
      console.log(`User ${user.email} signed in`)
    },
    async signOut() {
      console.log(`User signed out`)
    },
    async createUser({ user }) {
      console.log(`New user created: ${user.email}`)
    }
  },

  debug: process.env.NODE_ENV === "development",
  
  secret: process.env.NEXTAUTH_SECRET,
}

// Helper functions for role-based access control
export async function getCurrentUser(session: Session | null) {
  if (!session?.user?.id) return null
  
  try {
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
