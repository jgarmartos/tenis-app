# ⚡ Referencia Rápida: Servicios Actuales

> **Para desarrolladores**: Cómo usar los servicios ya implementados

## 🎯 Servicios Disponibles

### **🧑‍🤝‍🧑 Players Service** ✅ *Completamente implementado*

```typescript
// Consultas
import { usePlayers, usePlayer } from '@/services/players';

const { data: players, isLoading } = usePlayers();
const { data: player } = usePlayer(playerId);

// Mutaciones
import { useCreatePlayer, useUpdatePlayer, useDeletePlayer } from '@/services/players';

const { mutate: createPlayer } = useCreatePlayer();
const { mutate: updatePlayer } = useUpdatePlayer();
const { mutate: deletePlayer } = useDeletePlayer();
```

### **🎾 Matches Service** ✅ *Parcialmente implementado*

```typescript
// Consultas
import { useMatches, useMatch } from '@/services/matches';

const { data: matches } = useMatches();
const { data: match } = useMatch(matchId);

// Mutaciones
import { useCreateMatch, useUpdateMatchPlace } from '@/services/matches';

const { mutate: createMatch } = useCreateMatch();
const { mutate: updatePlace } = useUpdateMatchPlace();
```

### **🎯 App Data (Punto de entrada principal)** ✅ *Implementado*

```typescript
import { useAppData } from '@/services/core/useAppData';

// Todo en uno
const { 
  players, 
  matches, 
  places, 
  competitions, 
  isLoading,
  error 
} = useAppData();
```

## 🔧 Casos de Uso Comunes

### **📋 Lista de Datos**
```vue
<script setup lang="ts">
import { useAppData } from '@/services/core/useAppData';

const { players, isLoading } = useAppData();
</script>

<template>
  <DataTable :value="players" :loading="isLoading">
    <!-- columns -->
  </DataTable>
</template>
```

### **📝 Formulario de Creación**
```vue
<script setup lang="ts">
import { useCreatePlayer } from '@/services/players';

const { mutate: createPlayer, isPending } = useCreatePlayer();

const handleSubmit = (formData) => {
  createPlayer(formData, {
    onSuccess: () => alert('¡Creado!'),
    onError: (error) => alert(error.message)
  });
};
</script>
```

### **✏️ Formulario de Edición**
```vue
<script setup lang="ts">
import { useUpdatePlayer } from '@/services/players';

const { mutate: updatePlayer } = useUpdatePlayer();

const handleUpdate = (id, formData) => {
  updatePlayer({ id, data: formData });
};
</script>
```

## 🚨 TODOs Pendientes

### **📍 Places Service** ⏳ *Pendiente*
```typescript
// TODO: Implementar
import { useCreatePlace, useUpdatePlace, useDeletePlace } from '@/services/places';
```

### **🏆 Competitions Service** ⏳ *Pendiente*
```typescript
// TODO: Implementar
import { useCreateCompetition, useUpdateCompetition } from '@/services/competitions';
```

### **📊 Statistics Service** ⏳ *Pendiente*
```typescript
// TODO: Migrar desde getData.ts
import { useMatchStatistics, usePlayerStatistics } from '@/services/statistics';
```

---

**📖 Para guía completa, ver:** `ARQUITECTURA_PETICIONES_GUIA_COMPLETA.md`
