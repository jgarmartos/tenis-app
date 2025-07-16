# � Guía Rápida de Migración

> **¿Tienes código antiguo que usar `useInitialData` o stores para server data?** Esta guía te ayuda a migrar al nuevo sistema.

## 🎯 Migración en 3 Pasos

### **Paso 1: Identifica el Tipo de Código**

```typescript
// ❌ ANTES - Patrón antiguo
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';

const { playersQuery } = useInitialData();
const store = useDataStore();
const players = computed(() => store.players);
```

```typescript
// ✅ DESPUÉS - Patrón nuevo
import { useAppData } from '@/services/core/useAppData';

const { players, isLoading, error } = useAppData();
```

### **Paso 2: Actualiza las Importaciones**

| Antes | Después |
|-------|---------|
| `useInitialData()` | `useAppData()` |
| `useDataStore().players` | `useAppData().players` |
| `usePlayerMutations()` | `useCreatePlayer()`, `useUpdatePlayer()` |
| `usePlaceMutations()` | *TODO: Implementar place service* |

### **Paso 3: Simplifica tu Componente**

```vue
<!-- ❌ ANTES -->
<script setup lang="ts">
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';
import { computed, watch } from 'vue';

const { playersQuery } = useInitialData();
const store = useDataStore();

// Sincronización manual
watch(playersQuery.data, (newPlayers) => {
  if (newPlayers) store.setPlayers(newPlayers);
});

const players = computed(() => store.players);
const isLoading = computed(() => playersQuery.isLoading.value);
</script>
```

```vue
<!-- ✅ DESPUÉS -->
<script setup lang="ts">
import { useAppData } from '@/services/core/useAppData';

const { players, isLoading } = useAppData();
// ¡Ya está! Todo automático 🎉
</script>
```

## 🏪 ¿Qué Hacer con los Stores de Pinia?

### **✅ MANTENER para UI State**
```typescript
// stores/usePlayerStore.ts
export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    // ✅ Perfecto para UI state
    playerToEdit: null as Player | null,
    isDialogVisible: false,
    selectedFilters: { category: 'all' },
  }),
  actions: {
    openEditDialog(player: Player) {
      this.playerToEdit = player;
      this.isDialogVisible = true;
    }
  }
});
```

### **❌ ELIMINAR para Server Data**
```typescript
// ❌ Eliminar esto del store
state: () => ({
  players: [] as Player[],        // ❌ Server data
  matches: [] as Match[],         // ❌ Server data
  isLoading: false,              // ❌ Loading state
}),
actions: {
  setPlayers(players) { ... },   // ❌ Manual sync
  fetchPlayers() { ... },        // ❌ Manual fetch
}
```

## 🚨 Casos Especiales

### **Si usas datos específicos (no globales)**
```typescript
// Para datos específicos que no están en useAppData()
import { usePlayer } from '@/services/players';

const { data: player, isLoading } = usePlayer(playerId);
```

### **Si necesitas mutaciones específicas**
```typescript
import { useCreatePlayer, useUpdatePlayer } from '@/services/players';

const { mutate: createPlayer } = useCreatePlayer();
const { mutate: updatePlayer } = useUpdatePlayer();
```

---

## ✅ Checklist de Migración

- [ ] Reemplazar `useInitialData()` con `useAppData()`
- [ ] Eliminar `useDataStore()` para server data
- [ ] Mantener stores solo para UI state
- [ ] Actualizar importaciones de mutaciones
- [ ] Probar que todo funciona
- [ ] Eliminar código antiguo no usado

---

**🎯 Resultado: Código más simple, automático y performante**

### **Estrategia 2: Patrón Híbrido (Tu Caso)**

Combina el nuevo `useAppData` con tus stores existentes:

```typescript
// En tu componente principal (App.vue o similar)
import { useAppData } from '@/services/core/useAppData';

export default {
  setup() {
    // Carga inicial una sola vez
    const appData = useAppData();
    
    return {
      // Exponer globalmente si necesitas
      appData
    };
  }
}
```

```typescript
// En componentes específicos
import { useAppData } from '@/services/core/useAppData';
import { usePlayerStore } from '@/stores/usePlayerStore';

export default {
  setup() {
    // Server state desde nueva arquitectura
    const { players, isLoading } = useAppData();
    
    // UI state desde store existente
    const playerStore = usePlayerStore();
    
    return {
      players,        // ✅ Datos del servidor
      isLoading,      // ✅ Loading del servidor
      playerStore     // ✅ Estado de UI
    };
  }
}
```

## 📝 **Plan de Migración por Fases**

### **Fase 1: Preparación (YA HECHO ✅)**
- [x] Nueva estructura de services
- [x] `useAppData` centralizado
- [x] Coexistencia con sistema actual

### **Fase 2: Migración Gradual**

#### **Paso 1: Componente Hoja (Recomendado empezar aquí)**
```typescript
// ANTES: En PlayersList.vue
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';

const { playersQuery } = useInitialData();
const store = useDataStore();
const players = computed(() => store.players);

// DESPUÉS: 
import { useAppData } from '@/services/core/useAppData';

const { players, isLoading, hasError } = useAppData();
```

#### **Paso 2: Mutations**
```typescript
// ANTES:
import { usePlayerMutations } from '@/services/requests/usePlayerMutations';
const { createPlayer } = usePlayerMutations(() => {
  playersQuery.refetch(); // Manual refetch
});

// DESPUÉS:
import { useCreatePlayer } from '@/services/players';
const createPlayer = useCreatePlayer(); // Auto-refetch incluido
```

#### **Paso 3: Limpiar Store**
```typescript
// stores/useDataStore.ts
export const useDataStore = defineStore('dataStore', {
  state: () => ({
    // ❌ Eliminar server state (gradualmente)
    // players: [] as Player[],
    // matches: [] as Match[],
    
    // ✅ Mantener solo client state si necesitas
    selectedTab: 'players',
    sidebarOpen: false,
  }),
});
```

### **Fase 3: Optimización Final**
- Eliminar `useInitialData` antiguo
- Limpiar stores de server state
- Mantener solo UI state en stores

## 🛠️ **Patrones de Uso Específicos**

### **1. Componente que solo muestra datos**
```typescript
// Simple data display
const { players, isLoading } = useAppData();
```

### **2. Componente que modifica datos**
```typescript
// Data display + mutations
const { players } = useAppData();
const createPlayer = useCreatePlayer();
const updatePlayer = useUpdatePlayer();
```

### **3. Componente complejo con UI state**
```typescript
// Data + UI state
const { players, matches } = useAppData();
const playerStore = usePlayerStore(); // Para diálogos, formularios, etc.
```

### **4. Componente que necesita datos específicos**
```typescript
// Solo datos específicos sin cargar todo
const { data: players } = usePlayers(); // En lugar de useAppData()
```

## 🔄 **Migración Específica de tu `useInitialData`**

### **Componente Actual:**
```typescript
// PlayerPanel.vue (actual)
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';

const { playersQuery } = useInitialData();
const store = useDataStore();
const players = computed(() => store.players);
```

### **Migración Paso a Paso:**

#### **Opción A: Migración directa**
```typescript
// PlayerPanel.vue (migrado)
import { useAppData } from '@/services/core/useAppData';

const { players, isLoading, hasError } = useAppData();
```

#### **Opción B: Migración gradual**
```typescript
// PlayerPanel.vue (híbrido temporal)
import { useInitialData } from '@/services/requests/useInitialData';
import { useAppData } from '@/services/core/useAppData';

// Usar nueva arquitectura pero mantener compatibilidad
const { players: newPlayers } = useAppData();
const players = newPlayers; // Gradually replace usage

// TODO: Remove old useInitialData when confident
// const { playersQuery } = useInitialData();
```

## ⚡ **Ventajas Inmediatas**

1. **🎯 Menos código**: Una línea vs 5 líneas
2. **🔄 Auto-sync**: No más sync manual store ↔ queries
3. **⚡ Performance**: React Query optimiza automáticamente
4. **🎮 Loading states**: Estados centralizados
5. **🛠️ Debugging**: Mejor DevTools experience
6. **📱 Background refetch**: Datos siempre frescos
7. **🔍 Error handling**: Gestión centralizada de errores

## 🎯 **Próximo Paso Recomendado**

1. **Prueba en un componente simple** (ej: PlayersList)
2. **Compara el resultado** con el método actual
3. **Migra gradualmente** otros componentes
4. **Mantén ambos sistemas** hasta estar 100% seguro

¿Quieres que empecemos con la migración de un componente específico?
