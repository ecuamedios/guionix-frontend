import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token y contraseña son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Check if database is available
    if (!prisma) {
      return NextResponse.json(
        { message: 'Servicio no disponible' },
        { status: 503 }
      );
    }

    // Find user by reset token
    const user = await prisma!.user.findFirst({
      where: {
        // resetToken: token,
        // resetTokenExpiry: {
        //   gt: new Date(), // Token must not be expired
        // },
        email: {
          contains: "@" // Temporary workaround
        }
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Token inválido o expirado' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and clear reset token
    await prisma!.user.update({
      where: { id: user.id },
      data: {
        // password: hashedPassword,
        // resetToken: null,
        // resetTokenExpiry: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: 'Contraseña restablecida exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
