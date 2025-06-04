#!/bin/bash

# 🎬 GUIONIX - Script de Configuración de Entorno Local
echo "🔧 Configurando entorno de desarrollo local para GUIONIX..."

# Crear archivo .env.local
cat > .env.local << 'EOF'
# 🎬 GUIONIX - Variables de Entorno Local
# Configuración para desarrollo local

# 🔐 Autenticación
NEXTAUTH_SECRET=guionix-development-secret-key-2024-super-secure
NEXTAUTH_URL=http://localhost:3000

# 🗄️ Base de Datos (Opcional para desarrollo)
# DATABASE_URL="postgresql://username:password@localhost:5432/guionix"

# 🧠 GUIONIX BRAIN SERVICE - Gestión de Usuarios y Admin (Mock para desarrollo)
GUIONIX_BRAIN_URL=http://localhost:3000/api/mock/brain
GUIONIX_BRAIN_API_KEY=dev-brain-key

# 🤖 GUIONIX AI ORCHESTRATOR - Triple AI + Smart Routing (Mock para desarrollo) 
GUIONIX_AI_ORCHESTRATOR_URL=http://localhost:3000/api/mock/ai-orchestrator
GUIONIX_AI_ORCHESTRATOR_API_KEY=dev-ai-orchestrator-key

# 📝 GUIONIX SCRIPT ENGINE - Blake Snyder + Generation (Mock para desarrollo)
GUIONIX_SCRIPT_ENGINE_URL=http://localhost:3000/api/mock/script-engine
GUIONIX_SCRIPT_ENGINE_API_KEY=dev-script-engine-key

# 📁 GUIONIX EXPORT ENGINE - Multi-format Export (Mock para desarrollo)
GUIONIX_EXPORT_ENGINE_URL=http://localhost:3000/api/mock/export-engine
GUIONIX_EXPORT_ENGINE_API_KEY=dev-export-engine-key

# 🤖 Proveedores de IA (Mock para desarrollo)
XAI_API_KEY=dev-xai-key
OPENAI_API_KEY=dev-openai-key
ANTHROPIC_API_KEY=dev-anthropic-key

# 🎯 Configuración de Entorno
NODE_ENV=development
SKIP_ENV_VALIDATION=true
EOF

echo "✅ Archivo .env.local creado exitosamente!"
echo ""
echo "🔑 CREDENCIALES DE PRUEBA PARA DESARROLLO:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📧 Email: demo@guionix.com"
echo "🔒 Contraseña: demo123"
echo "👤 Rol: DIRECTOR (Acceso completo al Dashboard)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 PASOS PARA PROBAR EL DASHBOARD UNIFICADO:"
echo "1. Ejecuta: npm run dev"
echo "2. Abre: http://localhost:3000"
echo "3. Ve a: /login"
echo "4. Inicia sesión con las credenciales demo"
echo "5. Serás redirigido al Dashboard Unificado GUIONIX"
echo ""
echo "🎯 URL DIRECTA DEL DASHBOARD: http://localhost:3000/dashboard"
echo "" 