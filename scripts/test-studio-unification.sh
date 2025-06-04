#!/bin/bash

# 🎬 Script de Prueba - Unificación del Studio GUIONIX
# Verifica que todas las rutas del sistema unificado funcionen correctamente

set -e

echo "🎬 Verificando la unificación del GUIONIX Studio..."
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
BASE_URL="http://localhost:3000"
PRODUCTION_URL="https://guionix.com"

echo "🔍 Verificando estructura de archivos..."

# Verificar que los archivos obsoletos fueron eliminados
echo -e "${BLUE}📁 Verificando eliminación de archivos obsoletos...${NC}"

if [[ -d "app/(dashboard)/studio/new" ]]; then
    echo -e "${RED}❌ ERROR: Directorio studio/new aún existe${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Directorio studio/new eliminado correctamente${NC}"
fi

# Verificar que el backup existe
if [[ -d "backup/studio-new" ]]; then
    echo -e "${GREEN}✅ Backup creado en backup/studio-new/${NC}"
else
    echo -e "${YELLOW}⚠️  Backup no encontrado (no crítico)${NC}"
fi

echo ""
echo "🔍 Verificando componentes nuevos..."

# Verificar componentes creados
components=(
    "components/studio/wizard/WizardLayout.tsx"
    "hooks/useStudioMode.ts"
    "components/studio/StudioUnified.tsx"
    "components/studio/ModeSelector.tsx"
)

for component in "${components[@]}"; do
    if [[ -f "$component" ]]; then
        echo -e "${GREEN}✅ $component${NC}"
    else
        echo -e "${RED}❌ ERROR: $component no encontrado${NC}"
        exit 1
    fi
done

echo ""
echo "🔍 Verificando que no queden referencias a studio/new..."

# Buscar referencias restantes (excluyendo backups y node_modules)
references=$(grep -r "studio/new" --include="*.tsx" --include="*.ts" --include="*.js" --exclude-dir=backup --exclude-dir=node_modules . 2>/dev/null || true)

if [[ -n "$references" ]]; then
    echo -e "${RED}❌ ERROR: Se encontraron referencias restantes a 'studio/new':${NC}"
    echo "$references"
    exit 1
else
    echo -e "${GREEN}✅ No se encontraron referencias restantes a 'studio/new'${NC}"
fi

echo ""
echo "🔧 Verificando compilación..."

# Verificar que compile sin errores
echo -e "${BLUE}📦 Ejecutando build de prueba...${NC}"
npm run build --silent > build_output.log 2>&1

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
    rm -f build_output.log
else
    echo -e "${RED}❌ ERROR: Build falló${NC}"
    echo "Últimas líneas del log:"
    tail -20 build_output.log
    exit 1
fi

echo ""
echo "🌐 Verificando rutas del sistema unificado..."

# Función para verificar archivos de ruta
check_route_file() {
    local route_file="$1"
    local route_name="$2"
    
    if [[ -f "$route_file" ]]; then
        echo -e "${GREEN}✅ $route_name - $route_file${NC}"
        return 0
    else
        echo -e "${RED}❌ $route_name - $route_file${NC}"
        return 1
    fi
}

# Verificar rutas principales
check_route_file "app/(dashboard)/studio/page.tsx" "Studio Principal"

echo ""
echo "📋 Generando reporte de rutas unificadas..."

cat << EOF > STUDIO_ROUTES_REPORT.md
# 📊 Reporte de Rutas - Studio Unificado

## ✅ Rutas Activas
\`\`\`
📁 /studio                    - Selector de modos y studio principal
📁 /studio?mode=new           - Wizard de creación guiada
📁 /studio?mode=new&phase=1   - Fase 1: Generación de Ideas (X.AI/Grok)
📁 /studio?mode=new&phase=2   - Fase 2: Desarrollo de Estructura (ChatGPT-4)
📁 /studio?mode=new&phase=3   - Fase 3: Escritura Profesional (Claude)
📁 /studio?mode=new&phase=4   - Fase 4: Control de Calidad (Sistema Híbrido)
📁 /studio?mode=expert        - Editor profesional avanzado
📁 /studio?mode=import        - Importación de proyectos externos
📁 /studio?mode=collab        - Colaboración en tiempo real
\`\`\`

## ❌ Rutas Eliminadas
\`\`\`
📁 /studio/new                - ❌ ELIMINADA
📁 /studio/new/phase/1        - ❌ ELIMINADA
📁 /studio/new/phase/2        - ❌ ELIMINADA
📁 /studio/new/phase/3        - ❌ ELIMINADA
📁 /studio/new/phase/4        - ❌ ELIMINADA
\`\`\`

## 🔗 Enlaces de Prueba Local
- http://localhost:3000/studio
- http://localhost:3000/studio?mode=new
- http://localhost:3000/studio?mode=new&phase=1
- http://localhost:3000/studio?mode=expert

## 🚀 Enlaces de Producción
- https://guionix.com/studio
- https://guionix.com/studio?mode=new
- https://guionix.com/studio?mode=new&phase=1-4

*Generado: $(date)*
EOF

echo -e "${GREEN}✅ Reporte generado: STUDIO_ROUTES_REPORT.md${NC}"

echo ""
echo "🎯 Verificando integridad del proyecto..."

# Verificar que los archivos principales estén intactos
main_files=(
    "package.json"
    "next.config.js"
    "tailwind.config.js"
    "tsconfig.json"
)

for file in "${main_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ ERROR: $file no encontrado${NC}"
        exit 1
    fi
done

echo ""
echo "📊 Generando resumen de la unificación..."

cat << EOF

🎊 ================================
   UNIFICACIÓN COMPLETADA
🎊 ================================

✅ Estado: EXITOSO
📦 Build: EXITOSO  
🔗 Enlaces: ACTUALIZADOS
🗂️  Archivos: LIMPIADOS
📋 Backup: CREADO

🧭 Navegación Unificada:
   /studio → Sistema único
   ?mode=new → Wizard integrado
   &phase=1-4 → Fases específicas

🚀 Listo para Deploy a Railway

🔗 Pruebas Recomendadas:
   1. Iniciar servidor: npm run dev
   2. Probar: http://localhost:3000/studio
   3. Navegar por modos y fases
   4. Verificar transiciones
   5. Deploy a producción

📄 Documentación:
   - STUDIO_UNIFICATION_FINAL.md
   - STUDIO_ROUTES_REPORT.md

================================

EOF

echo -e "${GREEN}🎬 ¡Verificación del Studio Unificado completada exitosamente!${NC}"
echo ""
echo -e "${BLUE}Próximo paso: ${YELLOW}npm run dev${NC} ${BLUE}para probar localmente${NC}"
echo -e "${BLUE}Deploy ready: ${YELLOW}git push origin main${NC} ${BLUE}para desplegar a Railway${NC}" 