// Debug endpoint to test authentication
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Auth test endpoint is working', timestamp: new Date().toISOString() });
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    console.log('🔍 DEBUG AUTH: Testing credentials for:', email);
    
    // Look up user
    const user = await prisma.user.findFirst({
      where: { 
        email: email.toLowerCase(),
        status: "ACTIVE"
      }
    });
    
    console.log('👤 DEBUG AUTH: User found:', user ? { id: user.id, email: user.email, role: user.role, status: user.status } : 'NO USER');
    
    if (!user || !user.password) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found or no password',
        details: { userExists: !!user, hasPassword: !!user?.password }
      });
    }
    
    // Test password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('🔑 DEBUG AUTH: Password valid:', isValidPassword);
    
    return NextResponse.json({ 
      success: isValidPassword,
      user: isValidPassword ? {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status
      } : null,
      error: isValidPassword ? null : 'Invalid password'
    });
    
  } catch (error) {
    console.error('❌ DEBUG AUTH ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
