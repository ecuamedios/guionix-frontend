// Test authentication directly
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    console.log('🧪 Testing authentication flow...');
    
    // 1. Find user
    const user = await prisma.user.findUnique({
      where: { email: 'test@guionix.com' }
    });
    
    console.log('👤 User found:', !!user);
    if (!user) {
      console.log('❌ No user found');
      return;
    }
    
    console.log('📧 Email:', user.email);
    console.log('📊 Status:', user.status);
    console.log('🔐 Has password:', !!user.password);
    
    // 2. Test password comparison
    if (user.password) {
      const testPassword = 'password123';
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log('🔍 Password test result:', isValid);
      
      if (isValid) {
        console.log('✅ Authentication would succeed');
      } else {
        console.log('❌ Authentication would fail');
      }
    }
    
  } catch (error) {
    console.error('💥 Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
