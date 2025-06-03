import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestUser() {
  console.log('🔐 Creando usuario de prueba para guionix.com...')
  
  const email = 'admin@guionix.com'
  const password = 'Guionix2025!'
  const hashedPassword = await bcrypt.hash(password, 12)
  
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      console.log('⚠️  Usuario ya existe, actualizando contraseña...')
      
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          status: 'ACTIVE',
          updatedAt: new Date()
        }
      })
      
      console.log('✅ Usuario actualizado:', {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        status: updatedUser.status
      })
    } else {
      console.log('➕ Creando nuevo usuario...')
      
      const newUser = await prisma.user.create({
        data: {
          email,
          name: 'Admin Guionix',
          password: hashedPassword,
          role: 'DIRECTOR',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
      
      console.log('✅ Usuario creado:', {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        status: newUser.status
      })
    }
    
    console.log('\n🚀 Credenciales de prueba:')
    console.log('=====================================')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('🌐 Login URL: https://guionix.com/login')
    console.log('📊 Dashboard: https://guionix.com/projects')
    console.log('=====================================\n')
    
  } catch (error) {
    console.error('❌ Error creando usuario:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  createTestUser()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { createTestUser }
