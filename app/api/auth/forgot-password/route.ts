import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    // but only send email if user actually exists
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // Save reset token to database
      await prisma.user.update({
        where: { email },
        data: {
          // resetToken,
          // resetTokenExpiry,
          updatedAt: new Date(),
        },
      });

      // TODO: Implement email sending service
      // For now, we'll just log the reset token (remove in production)
      console.log(`Password reset token for ${email}: ${resetToken}`);
      console.log(`Reset URL: ${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`);
      
      // In production, send email with reset link:
      // await sendPasswordResetEmail(email, resetToken);
    }

    return NextResponse.json(
      { message: 'Si tu email está registrado, recibirás un enlace de recuperación' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
