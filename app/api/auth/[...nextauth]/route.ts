import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import type { NextRequest } from "next/server";
import type { NextApiResponse } from "next";

// Next.js 14+ App Router compatible API route for NextAuth

const handler = NextAuth(authOptions);

// Export GET and POST handlers for App Router
export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    // @ts-expect-error NextAuth expects (req, res)
    return handler(req, res);
  } catch (error) {
    return new Response("Authentication error", { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  try {
    // @ts-expect-error NextAuth expects (req, res)
    return handler(req, res);
  } catch (error) {
    return new Response("Authentication error", { status: 500 });
  }
};