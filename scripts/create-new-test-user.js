#!/usr/bin/env node

const bcrypt = require('bcryptjs');

async function createTestUser() {
  console.log('🔐 Generando credenciales de prueba para GUIONIX...\n');
  
  // Generar datos de usuario
  const testUser = {
    email: 'admin@guionix.com',
    password: 'Guionix2025!',
    name: 'Admin Guionix',
    role: 'DIRECTOR'
  };
  
  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(testUser.password, 12);
  
  console.log('✅ Credenciales de prueba generadas:');
  console.log('=====================================');
  console.log(`📧 Email: ${testUser.email}`);
  console.log(`🔑 Password: ${testUser.password}`);
  console.log(`👤 Name: ${testUser.name}`);
  console.log(`🎭 Role: ${testUser.role}`);
  console.log('=====================================\n');
  
  console.log('📋 SQL para insertar en base de datos:');
  console.log('=====================================');
  console.log(`INSERT INTO "User" ("id", "email", "name", "password", "role", "status", "createdAt", "updatedAt") VALUES`);
  console.log(`('${generateId()}', '${testUser.email}', '${testUser.name}', '${hashedPassword}', '${testUser.role}', 'ACTIVE', datetime('now'), datetime('now'));`);
  console.log('=====================================\n');
  
  console.log('🚀 URLs de prueba:');
  console.log('=====================================');
  console.log('🏠 Home: https://guionix.com/');
  console.log('🔑 Login: https://guionix.com/login');
  console.log('📊 Dashboard: https://guionix.com/projects');
  console.log('🎬 Studio: https://guionix.com/studio?mode=new');
  console.log('🔧 Health: https://guionix.com/api/health');
  console.log('=====================================\n');
  
  return testUser;
}

function generateId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

if (require.main === module) {
  createTestUser().catch(console.error);
}

module.exports = { createTestUser };
