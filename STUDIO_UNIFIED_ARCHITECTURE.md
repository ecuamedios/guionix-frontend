# 🎬 DIAGRAMA ARQUITECTÓNICO UNIFICADO - GUIONIX STUDIO

## 🏗️ ARQUITECTURA FINAL UNIFICADA EN `/studio`

```
┌─────────────────────────────────────────────────────────────────────┐
│                    🎬 GUIONIX STUDIO UNIFICADO                      │
│                         /studio (RUTA ÚNICA)                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SELECTOR DE MODO                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  📚 NUEVO   │  │  💼 EXPERTO │  │  🔄 IMPORT  │  │  👥 COLLAB  │ │
│  │             │  │             │  │             │  │             │ │
│  │ Workflow    │  │ Editor      │  │ Proyecto    │  │ En Tiempo   │ │
│  │ Guiado      │  │ Avanzado    │  │ Existente   │  │ Real        │ │
│  │ 4 Fases     │  │ Completo    │  │             │  │             │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
        │                    │                    │                │
        ▼                    ▼                    ▼                ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐
│  MODO NUEVO  │  │  MODO EXPERTO    │  │ MODO IMPORT  │  │ MODO COLLAB  │
└──────────────┘  └──────────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎯 FLUJO ARQUITECTÓNICO DETALLADO

### **1. PUNTO DE ENTRADA ÚNICO**
```typescript
// /app/(dashboard)/studio/page.tsx - UNIFICADO
/studio → StudioUnified Component
```

### **2. SELECTOR DE MODO INTELIGENTE**
```
┌─────────────────────────────────────────────────────────────────────┐
│                     STUDIO MODE SELECTOR                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  🔍 Detección Automática del Usuario:                               │
│  ├─ Primer ingreso → MODO NUEVO (Workflow Guiado)                  │
│  ├─ Usuario con proyectos → MODO EXPERTO (Editor Avanzado)         │
│  ├─ Importar archivo → MODO IMPORT (Procesamiento)                 │
│  └─ Invitación → MODO COLLAB (Colaboración)                        │
│                                                                     │
│  ⚙️ Selección Manual Disponible                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 COMPONENTES UNIFICADOS EN STUDIO

### **LAYOUT PRINCIPAL**
```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER: Navigation + Mode Switcher + User Actions                  │
├─────────────────────────────────────────────────────────────────────┤
│  SIDEBAR (Adaptativo)          │  MAIN CONTENT AREA                │
│  ├─ Project Explorer           │  ┌─────────────────────────────┐   │
│  ├─ Tools & Panels            │  │                             │   │
│  ├─ AI Assistants             │  │    DYNAMIC CONTENT          │   │
│  ├─ Export Options            │  │    Based on Selected Mode   │   │
│  ├─ Collaboration            │  │                             │   │
│  └─ Settings                 │  └─────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│  FOOTER: Status + Progress + Quick Actions                          │
└─────────────────────────────────────────────────────────────────────┘
```

### **COMPONENTES CORE MIGRADOS**
```
📁 components/studio/unified/
├─ 🎯 Core Components (Del sistema actual)
│  ├─ BeatEditor.tsx (320 líneas) → Mejorado
│  ├─ CapaStructure.tsx (437 líneas) → Ampliado
│  ├─ AIGenerationPanel.tsx → Multi-AI
│  ├─ CollaborationPanel.tsx → Real-time
│  ├─ ExportPanel.tsx → Unificado
│  └─ ValidationStatus.tsx → Centralizado
│
├─ 🚀 Workflow Components (Del sistema 4-fases)
│  ├─ PhaseTracker.tsx → Progress
│  ├─ AIIntegrationManager.tsx → Multi-AI
│  ├─ QualityController.tsx → Validation
│  └─ ModernUI.tsx → Glassmorphism
│
└─ 🔄 Unified Components (Nuevos)
   ├─ ModeSelector.tsx
   ├─ AdaptiveLayout.tsx
   ├─ UnifiedProgress.tsx
   └─ SmartRouter.tsx
```

---

## 🔄 FLUJOS DE TRABAJO UNIFICADOS

### **FLUJO 1: USUARIO NUEVO (Workflow Guiado)**
```
/studio → Auto-detect new user → Mode Selector → Guided Workflow

┌─ Fase 1: Idea Generation (X.AI/Grok)
├─ Fase 2: Structure + BeatEditor integrado
├─ Fase 3: Writing + CapaStructure avanzado  
└─ Fase 4: Quality + Export unificado
     ↓
   Transición automática a MODO EXPERTO
```

### **FLUJO 2: USUARIO EXPERTO (Editor Avanzado)**
```
/studio → Detect experienced user → Direct to Advanced Editor

┌─ Project Dashboard con CapaStructure
├─ BeatEditor avanzado con todas las funciones
├─ AI Generation distribuido en contexto
├─ Collaboration en tiempo real
└─ Export engine completo
```

### **FLUJO 3: IMPORTAR PROYECTO**
```
/studio → File import → Processing → Mode selection

┌─ Auto-detect format (Final Draft, Fountain, etc.)
├─ Parse to unified structure
├─ Map to CapaStructure + Beats
└─ Load in appropriate mode
```

### **FLUJO 4: COLABORACIÓN**
```
/studio?invite=token → Collaboration mode → Shared workspace

┌─ Real-time editing with CollaborationPanel
├─ Role-based permissions
├─ Change tracking
└─ Unified export for all collaborators
```

---

## 🛠️ IMPLEMENTACIÓN TÉCNICA

### **ESTRUCTURA DE ARCHIVOS FINAL**
```
app/(dashboard)/studio/
├─ page.tsx                 → PUNTO ÚNICO DE ENTRADA
├─ layout.tsx              → Layout unificado adaptativo
├─ components/
│  ├─ ModeSelector.tsx     → Selector inicial inteligente
│  ├─ UnifiedHeader.tsx    → Header que se adapta al modo
│  ├─ AdaptiveSidebar.tsx  → Sidebar contextual
│  └─ modes/
│     ├─ NewUserMode.tsx   → Workflow guiado (4-fases mejorado)
│     ├─ ExpertMode.tsx    → Editor avanzado (actual mejorado)
│     ├─ ImportMode.tsx    → Procesamiento de archivos
│     └─ CollabMode.tsx    → Colaboración tiempo real
├─ hooks/
│  ├─ useStudioMode.ts     → Gestión de modos
│  ├─ useUnifiedProgress.ts → Progress tracking
│  └─ useAdaptiveLayout.ts → Layout responsivo
└─ utils/
   ├─ modeDetection.ts     → Detección automática de modo
   ├─ dataUnification.ts   → Unificación de datos
   └─ migrationHelpers.ts  → Helpers de migración
```

### **SMART ROUTING INTERNO**
```typescript
// /studio/page.tsx
const StudioUnified = () => {
  const mode = useStudioMode(); // Auto-detect + manual override
  
  return (
    <UnifiedLayout>
      <AdaptiveHeader mode={mode} />
      <AdaptiveSidebar mode={mode} />
      <MainContent>
        {mode === 'new' && <NewUserWorkflow />}
        {mode === 'expert' && <ExpertEditor />}
        {mode === 'import' && <ImportProcessor />}
        {mode === 'collab' && <CollaborationSpace />}
      </MainContent>
      <UnifiedFooter mode={mode} />
    </UnifiedLayout>
  );
};
```

---

## 🎨 DISEÑO VISUAL UNIFICADO

### **SELECTOR DE MODO (Primera pantalla)**
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              🎬 BIENVENIDO A GUIONIX STUDIO                        │
│                                                                     │
│              ¿Cómo quieres trabajar hoy?                           │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │ 📚 EMPEZAR      │  │ 💼 CONTINUAR    │  │ 📁 IMPORTAR     │     │
│  │                 │  │                 │  │                 │     │
│  │ Nuevo proyecto  │  │ Modo experto    │  │ Proyecto        │     │
│  │ Workflow guiado │  │ Editor completo │  │ existente       │     │
│  │ 4 fases con IA  │  │ Todas las       │  │ Final Draft,    │     │
│  │                 │  │ herramientas    │  │ Fountain, etc.  │     │
│  │ [RECOMENDADO]   │  │                 │  │                 │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
│                                                                     │
│              👥 ¿Alguien te invitó a colaborar?                    │
│              [Tengo un enlace de invitación]                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### **HEADER UNIFICADO ADAPTATIVO**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🎬 Studio │ [Proyecto] │ [Modo Badge] │     │ 🔄 │ 👥 │ ⚙️ │ 👤 │
│           │           │              │     │    │    │    │    │
│           │           │              │     │ AI │ Co │ Se │ Us │
│           │           │              │     │    │ ll │ tt │ er │
│           │           │              │     │    │ ab │ in │    │
│           │           │              │     │    │    │ gs │    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 MÉTRICAS Y VALIDACIÓN

### **OBJETIVOS TÉCNICOS**
- ✅ **Unificación completa** en `/studio` como punto único
- ✅ **Zero breaking changes** para usuarios actuales
- ✅ **Migración transparente** de funcionalidades
- ✅ **Performance optimizada** < 2s carga inicial
- ✅ **Bundle size reducido** mediante code splitting

### **OBJETIVOS UX**
- ✅ **Onboarding intuitivo** para nuevos usuarios
- ✅ **Acceso experto** sin fricciones para avanzados  
- ✅ **Transiciones fluidas** entre modos
- ✅ **Consistencia visual** en toda la experiencia
- ✅ **Funcionalidad completa** en todos los modos

---

## 🚀 PLAN DE EJECUCIÓN

### **FASE 1: SETUP ARQUITECTÓNICO (Semana 1)**
```bash
# Crear estructura unificada
mkdir -p app/(dashboard)/studio/components/modes
mkdir -p app/(dashboard)/studio/hooks  
mkdir -p app/(dashboard)/studio/utils

# Migrar componentes core
cp components/studio/* app/(dashboard)/studio/components/
# Preparar modo selector y routing
```

### **FASE 2: MIGRACIÓN DE COMPONENTES (Semana 2)**
```bash
# Unificar BeatEditor + CapaStructure
# Integrar AI Generation Panel multi-modal
# Migrar Export Engine unificado
# Setup Collaboration real-time
```

### **FASE 3: UX Y ROUTING (Semana 3)**
```bash
# Implementar ModeSelector inteligente
# Setup adaptive layout system
# Testing de transiciones entre modos
# Optimización de performance
```

### **FASE 4: TESTING Y DEPLOY (Semana 4)**
```bash
# Testing completo de todos los flujos
# Migración gradual con feature flags
# Documentación y training
# Deploy production
```

---

## ✅ RESULTADO FINAL

**Un único `/studio` que:**
- 🎯 **Atiende a todos los usuarios** (novatos → expertos)
- 🔄 **Unifica ambos sistemas** sin perder funcionalidad  
- 🚀 **Mejora la experiencia** con detección inteligente
- 🛠️ **Simplifica el mantenimiento** con código unificado
- 📈 **Escala el negocio** con mejor retención y conversión

---

**¿APRUEBAS ESTA ARQUITECTURA UNIFICADA?**

Una vez aprobada, procederé con la implementación paso a paso, comenzando por la creación del ModeSelector y la estructura unificada en `/studio`.
