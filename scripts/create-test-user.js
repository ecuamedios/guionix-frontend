// scripts/create-test-user.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('test123', 12);
    
    // Create or update test user
    const user = await prisma.user.upsert({
      where: { email: 'test@guionix.com' },
      update: {
        password: hashedPassword,
        status: 'ACTIVE'
      },
      create: {
        email: 'test@guionix.com',
        name: 'Test User',
        firstName: 'Test',
        lastName: 'User',
        password: hashedPassword,
        role: 'EDITOR',
        status: 'ACTIVE',
      },
    });

    console.log('✅ Test user created/updated:');
    console.log('📧 Email: test@guionix.com');
    console.log('🔑 Password: test123');
    console.log('👤 User ID:', user.id);
    console.log('🎬 Role:', user.role);
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
