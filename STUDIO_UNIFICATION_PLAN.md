# 📋 PLAN DE UNIFICACIÓN DEL STUDIO GUIONIX

## 🎯 **OBJETIVO**
Unificar completamente el sistema de studio eliminando la carpeta `studio/new` e integrando todas las fases de creación en el studio principal (`/studio`).

## 📊 **ANÁLISIS ACTUAL**

### **Sistema Actual Fragmentado:**
- 📁 `/studio` - Sistema principal (StudioUnified con 4 modos)
- 📁 `/studio?mode=new` - Wizard de 4 fases separado
- 📁 `/studio?mode=new&phase=1` - Generación de Ideas (X.AI/Grok)
- 📁 `/studio?mode=new&phase=2` - Desarrollo de Estructura (ChatGPT-4)
- 📁 `/studio?mode=new&phase=3` - Escritura Profesional (Claude)
- 📁 `/studio?mode=new&phase=4` - Control de Calidad (Sistema Híbrido)

### **Problemas Identificados:**
1. **Duplicación**: Dos sistemas diferentes para crear guiones
2. **Navegación confusa**: URLs inconsistentes
3. **Mantenimiento complejo**: Código duplicado
4. **Experiencia fragmentada**: Los usuarios se pierden entre sistemas

---

## 🏗️ **ESTRATEGIA DE UNIFICACIÓN**

### **Fase 1: Análisis y Preparación**
- [x] Analizar estructura actual de studio y studio/new
- [x] Identificar todas las referencias a `/studio?mode=new`
- [x] Mapear funcionalidades de cada fase
- [ ] Crear backup de archivos importantes

### **Fase 2: Integración de Componentes**
- [ ] Crear nuevos componentes para las 4 fases dentro del studio principal
- [ ] Integrar el wizard de fases como un modo del StudioUnified
- [ ] Actualizar el hook useStudioMode para incluir las fases
- [ ] Mantener toda la lógica de IA de cada fase

### **Fase 3: Migración de Rutas**
- [ ] Actualizar todas las rutas de `/studio?mode=new` a `/studio`
- [ ] Implementar sistema de fases dentro de `/studio`
- [ ] Actualizar navegación y enlaces

### **Fase 4: Limpieza y Testing**
- [ ] Eliminar carpeta `/studio?mode=new`
- [ ] Actualizar todos los enlaces en el proyecto
- [ ] Probar toda la funcionalidad
- [ ] Deploy y verificación

---

## 🔧 **IMPLEMENTACIÓN DETALLADA**

### **1. Nuevo Estructura del Studio Unificado**

```
/studio
├── page.tsx (StudioUnified con modos ampliados)
├── components/
│   ├── wizard/
│   │   ├── WizardLayout.tsx
│   │   ├── Phase1Ideas.tsx (desde studio/new/phase/1)
│   │   ├── Phase2Structure.tsx (desde studio/new/phase/2)
│   │   ├── Phase3Writing.tsx (desde studio/new/phase/3)
│   │   └── Phase4Quality.tsx (desde studio/new/phase/4)
│   └── modes/
│       ├── NewUserMode.tsx (modo wizard con fases)
│       ├── ExpertMode.tsx
│       ├── ImportMode.tsx
│       └── CollabMode.tsx
```

### **2. URLs Nuevas Unificadas**

```
ANTES:                           DESPUÉS:
/studio                     →    /studio (selector de modos)
/studio?mode=new                 →    /studio?mode=new
/studio?mode=new&phase=1         →    /studio?mode=new&phase=1
/studio?mode=new&phase=2         →    /studio?mode=new&phase=2
/studio?mode=new&phase=3         →    /studio?mode=new&phase=3
/studio?mode=new&phase=4         →    /studio?mode=new&phase=4
```

### **3. Componentes a Crear**

#### **A. WizardLayout.tsx**
Componente wrapper para las 4 fases con:
- Navegación entre fases
- Progress indicator
- Breadcrumbs
- Header unificado

#### **B. Phase Components**
Migrar el contenido de cada fase:
- `Phase1Ideas.tsx` - Generación con X.AI/Grok
- `Phase2Structure.tsx` - Estructura con ChatGPT-4
- `Phase3Writing.tsx` - Escritura con Claude
- `Phase4Quality.tsx` - Control de calidad híbrido

### **4. Hook useStudioMode Ampliado**

```typescript
type StudioMode = 'selector' | 'new' | 'expert' | 'import' | 'collab';
type WizardPhase = 1 | 2 | 3 | 4;

interface StudioState {
  mode: StudioMode;
  phase?: WizardPhase;
  projectData?: any;
}
```

---

## 📝 **CHECKLIST DE MIGRACIÓN**

### **Preparación**
- [ ] Backup de `/studio?mode=new` completo
- [ ] Lista completa de archivos a migrar
- [ ] Identificación de dependencias

### **Componentes Nuevos**
- [ ] `components/studio/wizard/WizardLayout.tsx`
- [ ] `components/studio/wizard/Phase1Ideas.tsx`
- [ ] `components/studio/wizard/Phase2Structure.tsx`
- [ ] `components/studio/wizard/Phase3Writing.tsx`
- [ ] `components/studio/wizard/Phase4Quality.tsx`

### **Hooks Actualizados**
- [ ] `hooks/useStudioMode.ts` - Soporte para fases
- [ ] `hooks/useWizard.ts` - Nuevo hook para wizard

### **Rutas Actualizadas**
- [ ] `app/(dashboard)/studio/page.tsx` - StudioUnified ampliado
- [ ] URL parameters para modos y fases

### **Enlaces Actualizados**
- [ ] `components/dashboard/ProfessionalDashboard.tsx`
- [ ] `components/dashboard/EmbeddedStudio.tsx`
- [ ] `components/studio/modes/NewUserMode.tsx`
- [ ] Todos los archivos en `app/(dashboard)/page-*.tsx`

### **Documentación**
- [ ] Scripts de verificación actualizados
- [ ] Archivos .md con URLs actualizadas

---

## 🚀 **RUTAS DE NAVEGACIÓN UNIFICADAS**

### **Navegación Principal**
```
Dashboard → Studio → Modo → Fase (si aplica)
     ↓         ↓       ↓
/dashboard → /studio → ?mode=new → &phase=1
```

### **Flujo del Wizard**
```
1. /studio?mode=new → Página del wizard con overview
2. /studio?mode=new&phase=1 → Generación de ideas (X.AI)
3. /studio?mode=new&phase=2 → Estructura (ChatGPT-4)
4. /studio?mode=new&phase=3 → Escritura (Claude)
5. /studio?mode=new&phase=4 → Control de calidad
6. /studio?mode=expert → Modo experto para edición
```

---

## 🔄 **PROCESO DE IMPLEMENTACIÓN**

### **Paso 1: Crear Componentes Base**
```bash
# Crear estructura de wizard
mkdir -p components/studio/wizard
```

### **Paso 2: Migrar Funcionalidad**
- Copiar lógica de cada fase
- Adaptar a nueva estructura
- Mantener toda la funcionalidad de IA

### **Paso 3: Actualizar StudioUnified**
- Agregar soporte para wizard mode
- Implementar navegación por fases
- Integrar nuevos componentes

### **Paso 4: Actualizar Enlaces**
- Buscar y reemplazar todas las referencias
- Actualizar componentes que usan `/studio?mode=new`
- Verificar navegación

### **Paso 5: Limpiar y Probar**
- Eliminar `/studio?mode=new`
- Testing completo
- Deploy y verificación

---

## 📋 **ARCHIVOS A ELIMINAR**

```
app/(dashboard)/studio?mode=new/
├── page.tsx
└── phase/
    ├── 1/page.tsx
    ├── 2/page.tsx
    ├── 3/page.tsx (+ page-modern.tsx)
    └── 4/page.tsx (+ page-modern.tsx)
```

## 📋 **ARCHIVOS A ACTUALIZAR**

### **Referencias Directas:**
- `components/dashboard/ProfessionalDashboard.tsx` (línea 207)
- `components/dashboard/EmbeddedStudio.tsx` (línea 55, 281)
- `components/studio/modes/NewUserMode.tsx` (línea 82)

### **Archivos de Dashboard:**
- `app/(dashboard)/page-*.tsx` (múltiples archivos)
- `app/dashboard/page.tsx`

### **Scripts y Documentación:**
- Todos los archivos `.md` con referencias
- Scripts de verificación
- Archivos de configuración

---

## ✅ **BENEFICIOS DE LA UNIFICACIÓN**

### **Para Usuarios:**
- ✅ **Navegación simplificada** - Una sola URL `/studio`
- ✅ **Experiencia consistente** - Mismo diseño y UX
- ✅ **Flujo natural** - Transición fluida entre modos
- ✅ **URLs limpias** - Parámetros claros y legibles

### **Para Desarrolladores:**
- ✅ **Código centralizado** - Un solo sistema de studio
- ✅ **Mantenimiento simple** - Sin duplicación
- ✅ **Testing unificado** - Menos complejidad
- ✅ **Deploy simplificado** - Menos rutas que verificar

### **Para el Sistema:**
- ✅ **Performance mejorado** - Menos archivos que cargar
- ✅ **SEO optimizado** - URLs más limpias
- ✅ **Escalabilidad** - Más fácil agregar nuevas funciones

---

**🎬 El Studio unificado será el corazón de GUIONIX, ofreciendo una experiencia completa y profesional para la creación de guiones con IA.**

*Plan de unificación - Enero 2025* ✨ 