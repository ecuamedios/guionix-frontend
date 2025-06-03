const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  try {
    console.log('🔍 Testing login functionality...');
    
    // First, verify our test user exists
    const user = await prisma.user.findUnique({
      where: { email: 'test@guionix.com' }
    });
    
    if (!user) {
      console.log('❌ Test user not found!');
      return;
    }
    
    console.log('✅ Test user found:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status
    });
    
    // Test password verification
    const isValidPassword = await bcrypt.compare('password123', user.password);
    console.log('🔐 Password verification:', isValidPassword ? '✅ Valid' : '❌ Invalid');
    
    if (isValidPassword) {
      console.log('🎉 Login test successful! Credentials are correct.');
      console.log('\n📋 Test credentials:');
      console.log('   Email: test@guionix.com');
      console.log('   Password: password123');
      console.log('\n🌐 You can now test the login at: http://localhost:3002/login');
    }
    
  } catch (error) {
    console.error('❌ Error testing login:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
