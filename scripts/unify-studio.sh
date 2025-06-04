#!/bin/bash

# 🎬 GUIONIX Studio Unification Script
# Este script unifica el studio eliminando /studio/new e integrando todo en /studio

set -e

echo "🎬 Iniciando unificación del GUIONIX Studio..."
echo ""

# Crear backup de los archivos importantes
echo "📋 Creando backup de archivos importantes..."
mkdir -p backup/studio-new
cp -r app/\(dashboard\)/studio/new/ backup/studio-new/ 2>/dev/null || echo "⚠️  Directorio studio/new no encontrado"

# Actualizar enlaces en archivos de dashboard
echo "🔗 Actualizando enlaces en archivos del dashboard..."

# Lista de archivos a actualizar
files_to_update=(
    "components/dashboard/EmbeddedStudio.tsx"
    "components/studio/modes/NewUserMode.tsx"
    "app/(dashboard)/page-old.tsx"
    "app/(dashboard)/page-new.tsx"
    "app/(dashboard)/page-modern.tsx"
    "app/(dashboard)/page-new-professional.tsx"
    "app/(dashboard)/page-improved.tsx"
    "app/dashboard/page.tsx"
)

# Función para actualizar enlaces
update_links() {
    local file="$1"
    if [[ -f "$file" ]]; then
        echo "  📝 Actualizando: $file"
        
        # Actualizar /studio/new → /studio?mode=new
        sed -i '' 's|/studio/new/phase/1|/studio?mode=new\&phase=1|g' "$file"
        sed -i '' 's|/studio/new/phase/2|/studio?mode=new\&phase=2|g' "$file"
        sed -i '' 's|/studio/new/phase/3|/studio?mode=new\&phase=3|g' "$file"
        sed -i '' 's|/studio/new/phase/4|/studio?mode=new\&phase=4|g' "$file"
        sed -i '' 's|/studio/new|/studio?mode=new|g' "$file"
        
        echo "    ✅ Enlaces actualizados en $file"
    else
        echo "    ⚠️  Archivo no encontrado: $file"
    fi
}

# Actualizar archivos
for file in "${files_to_update[@]}"; do
    update_links "$file"
done

echo ""
echo "📄 Actualizando archivos de documentación..."

# Actualizar archivos .md
find . -name "*.md" -type f | while read -r file; do
    if grep -q "studio/new" "$file"; then
        echo "  📝 Actualizando: $file"
        sed -i '' 's|/studio/new/phase/1|/studio?mode=new\&phase=1|g' "$file"
        sed -i '' 's|/studio/new/phase/2|/studio?mode=new\&phase=2|g' "$file"
        sed -i '' 's|/studio/new/phase/3|/studio?mode=new\&phase=3|g' "$file"
        sed -i '' 's|/studio/new/phase/4|/studio?mode=new\&phase=4|g' "$file"
        sed -i '' 's|/studio/new|/studio?mode=new|g' "$file"
    fi
done

echo ""
echo "🗂️ Actualizando scripts de verificación..."

# Actualizar scripts
find . -name "*.sh" -type f | while read -r file; do
    if grep -q "studio/new" "$file" && [[ "$file" != "./scripts/unify-studio.sh" ]]; then
        echo "  📝 Actualizando: $file"
        sed -i '' 's|/studio/new/phase/1|/studio?mode=new\&phase=1|g' "$file"
        sed -i '' 's|/studio/new/phase/2|/studio?mode=new\&phase=2|g' "$file"
        sed -i '' 's|/studio/new/phase/3|/studio?mode=new\&phase=3|g' "$file"
        sed -i '' 's|/studio/new/phase/4|/studio?mode=new\&phase=4|g' "$file"
        sed -i '' 's|/studio/new|/studio?mode=new|g' "$file"
    fi
done

echo ""
echo "🗑️ Preparando eliminación de archivos obsoletos..."

# Mostrar archivos que serán eliminados
echo "📋 Archivos que serán eliminados:"
if [[ -d "app/(dashboard)/studio/new" ]]; then
    find app/\(dashboard\)/studio/new -type f | sed 's/^/  ❌ /'
else
    echo "  ℹ️  Directorio studio/new ya no existe"
fi

echo ""
read -p "¿Deseas continuar con la eliminación? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Eliminando archivos obsoletos..."
    
    if [[ -d "app/(dashboard)/studio/new" ]]; then
        rm -rf app/\(dashboard\)/studio/new
        echo "  ✅ Directorio studio/new eliminado"
    else
        echo "  ℹ️  Directorio studio/new ya no existe"
    fi
else
    echo "  ⏸️  Eliminación cancelada. Los archivos se mantienen en backup/"
fi

echo ""
echo "🔍 Verificando resultados..."

# Verificar que no queden referencias a /studio/new
echo "📊 Buscando referencias restantes a '/studio/new':"
if grep -r "studio/new" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=backup --exclude-dir=node_modules . 2>/dev/null; then
    echo "⚠️  Se encontraron referencias restantes. Revisa manualmente."
else
    echo "  ✅ No se encontraron referencias restantes a '/studio/new'"
fi

echo ""
echo "📋 Resumen de la unificación:"
echo "  ✅ Backup creado en: backup/studio-new/"
echo "  ✅ Enlaces actualizados en archivos del dashboard"
echo "  ✅ Documentación actualizada"
echo "  ✅ Scripts de verificación actualizados"
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "  ✅ Archivos obsoletos eliminados"
fi

echo ""
echo "🎯 Próximos pasos:"
echo "  1. Probar la navegación: http://localhost:3000/studio"
echo "  2. Verificar wizard: http://localhost:3000/studio?mode=new"
echo "  3. Probar fases: http://localhost:3000/studio?mode=new&phase=1"
echo "  4. Ejecutar: npm run build para verificar compilación"
echo "  5. Deploy a Railway si todo funciona correctamente"

echo ""
echo "🎬 ¡Unificación del GUIONIX Studio completada!" 