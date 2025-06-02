# scripts/deploy.sh (BÁSICO)
// filepath: scripts/deploy.sh
#!/bin/bash
set -e

echo "🚀 Desplegando GUIONIX..."

npm install
npm run build
npm run prisma:migrate
npm run seed:prod

echo "✅ Despliegue completo."