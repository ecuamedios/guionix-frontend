#!/bin/bash
set -euo pipefail

echo "📦 Iniciando migración de base de datos GUIONIX..."

# 1. Backup de la base de datos (Railway PostgreSQL)
if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "❌ DATABASE_URL no está definida."
  exit 1
fi

BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
echo "🗄️  Realizando backup de la base de datos en $BACKUP_FILE ..."
pg_dump "$DATABASE_URL" > "$BACKUP_FILE" || { echo "❌ Error al hacer backup."; exit 1; }
echo "✅ Backup realizado."

# 2. Ejecutar migraciones Prisma
echo "📜 Ejecutando migraciones Prisma..."
npx prisma migrate deploy

# 3. Validar éxito de migración
if [[ $? -ne 0 ]]; then
  echo "❌ Error en migraciones Prisma. Restaurando backup..."
  psql "$DATABASE_URL" < "$BACKUP_FILE"
  exit 1
fi
echo "✅ Migraciones aplicadas correctamente."

# 4. Actualizar esquema de base de datos
echo "🔄 Actualizando esquema Prisma..."
npx prisma db pull

# 5. Regenerar Prisma Client
echo "🔧 Regenerando Prisma Client..."
npx prisma generate

# 6. Validar integridad de datos (ejemplo simple: contar usuarios)
USER_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"User\";" | grep -Eo '[0-9]+')
if [[ -z "$USER_COUNT" || "$USER_COUNT" -lt 0 ]]; then
  echo "❌ Integridad de datos fallida. Restaurando backup..."
  psql "$DATABASE_URL" < "$BACKUP_FILE"
  exit 1
fi
echo "✅ Integridad de datos validada. Usuarios en base: $USER_COUNT"

# 7. Log de estado final
echo "🎉 Migración de base de datos GUIONIX completada exitosamente."

exit 0