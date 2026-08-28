# 🎾 Tenis App Frontend

> **Aplicación moderna de gestión de tenis** desarrollada con Vue 3, TypeScript y arquitectura de servicios optimizada.

## 🚀 Características Principales

- ✅ **Gestión de Jugadores** - CRUD completo con estadísticas
- ✅ **Gestión de Partidos** - Seguimiento detallado de marcadores  
- ✅ **Gestión de Lugares** - Administración de pistas y ubicaciones
- ✅ **Gestión de Competiciones** - Sistema de torneos
- ⚡ **Cache Inteligente** - React Query para performance óptima
- 🎯 **TypeScript** - Type safety completo
- 🔄 **Arquitectura Moderna** - Separación de Server State vs Client State

## 🏗️ Stack Tecnológico

### **Frontend Core**
- **Vue 3** - Framework principal con Composition API
- **TypeScript** - Tipado estático completo
- **Vite** - Build tool y dev server
- **Vue Router** - Enrutamiento SPA
- **Pinia** - State management para UI state

### **Data Management**
- **TanStack Query (React Query)** - Server state management
- **Axios** - Cliente HTTP con interceptores
- **Arquitectura de Servicios** - Separación clara de responsabilidades

### **UI/UX**
- **PrimeVue** - Librería de componentes UI
- **Vue I18n** - Internacionalización (ES/EN)
- **CSS Moderno** - Responsive design

## 📁 Estructura del Proyecto

```
frontend/
├── 🛠️ src/
│   ├── 🎯 services/              # ⭐ Arquitectura de peticiones
│   │   ├── core/
│   │   │   └── useAppData.ts     # Punto de entrada principal
│   │   ├── base/
│   │   │   ├── BaseService.ts    # CRUD base reutilizable
│   │   │   ├── apiClient.ts      # Configuración Axios
│   │   │   └── queryKeys.ts      # Gestión de cache keys
│   │   ├── players/              # ✅ Servicio completo
│   │   ├── matches/              # 🔄 Parcialmente implementado
│   │   └── index.ts              # Exportaciones centralizadas
│   ├── 🖥️ components/            # Componentes Vue
│   │   ├── players/              # Gestión de jugadores
│   │   ├── matches/              # Gestión de partidos
│   │   ├── places/               # Gestión de lugares
│   │   └── competitions/         # Gestión de competiciones
│   ├── 🏪 stores/                # Pinia stores (UI state)
│   ├── 🌐 api/                   # Configuración API
│   ├── 🔗 router/                # Vue Router
│   ├── 🌍 i18n/                  # Internacionalización
│   └── 📝 interfaces/            # Tipos TypeScript
└── 📚 docs/                      # Documentación técnica
```

## 🎯 Quick Start

### **Instalación**

```bash
# Clonar el repositorio
git clone [repo-url]
cd tenis-app/frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tu configuración
```

### **Desarrollo**

```bash
# Servidor de desarrollo con hot-reload
npm run dev

# Abrir en: http://localhost:5173
```

### **Otros Comandos**

```bash
# Type checking + build para producción
npm run build

# Tests unitarios
npm run test:unit

# Linting
npm run lint

# Preview del build
npm run preview
```

## 🔧 Configuración de IDE

### **Recomendado: VSCode**
- **[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)** - Soporte Vue 3 + TypeScript
- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** - Linting
- **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** - Formateo
- **[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)** - Utilidad

> ⚠️ **Importante**: Deshabilita la extensión **Vetur** si la tienes instalada (conflicto con Volar)

## 🎓 Desarrollo - Guías Rápidas

### **Usar datos en un componente**
```vue
<script setup lang="ts">
import { useAppData } from '@/services/core/useAppData';

// ⭐ Una sola línea para acceder a todos los datos
const { players, matches, places, isLoading } = useAppData();
</script>

<template>
  <div v-if="isLoading">Cargando...</div>
  <PlayerList v-else :players="players" />
</template>
```

### **Crear una nueva entidad**
```vue
<script setup lang="ts">
import { useCreatePlayer } from '@/services/players';

const { mutate: createPlayer, isPending } = useCreatePlayer();

const handleSubmit = (formData) => {
  createPlayer(formData, {
    onSuccess: () => alert('¡Jugador creado!'),
    onError: (error) => alert(error.message)
  });
};
</script>
```

### **Actualizar entidad existente**
```vue
<script setup lang="ts">
import { useUpdatePlayer } from '@/services/players';

const { mutate: updatePlayer } = useUpdatePlayer();

const handleUpdate = (id, data) => {
  updatePlayer({ id, data });
  // ✨ Los datos se actualizan automáticamente
};
</script>
```

## 📖 Documentación Técnica

### **Para Desarrolladores**
- 📖 **[Guía Completa de Arquitectura](./ARQUITECTURA_PETICIONES_GUIA_COMPLETA.md)** - Conceptos y implementación
- ⚡ **[Servicios Actuales](./REFERENCIA_SERVICIOS_ACTUALES.md)** - APIs disponibles
- 🔄 **[Guía de Migración](./MIGRATION_GUIDE.md)** - Migrar código legacy

### **Para Product/Project Managers**
- 🚀 **[Roadmap Futuro](./ROADMAP_SERVICIOS_FUTUROS.md)** - Funcionalidades planeadas
- ✅ **[Estado del Proyecto](./MIGRATION_COMPLETE.md)** - Lo que está completado

### **Índice Completo**
- 📚 **[Índice de Documentación](./README_DOCUMENTACION.md)** - Navegación completa

## 🌍 Variables de Entorno

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=Tenis App
VITE_APP_DESCRIPTION=Aplicación de gestión de tenis
```

## 🧪 Testing

```bash
# Tests unitarios con Vitest
npm run test:unit

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

## 📦 Build y Deploy

```bash
# Build para producción
npm run build

# Preview del build
npm run preview

# Analizar bundle
npm run build -- --analyze
```

Los archivos generados estarán en `/dist`

## 🤝 Contribución

### **Workflow de Desarrollo**
1. Crear feature branch: `git checkout -b feature/nueva-funcionalidad`
2. Desarrollar siguiendo los patterns establecidos
3. Ejecutar tests: `npm run test:unit`
4. Commit con mensajes descriptivos
5. Pull Request con descripción detallada

### **Convenciones de Código**
- **Componentes**: PascalCase (`PlayerCard.vue`)
- **Composables**: camelCase con prefijo `use` (`usePlayerData`)
- **Servicios**: camelCase con sufijo `Service` (`playerService`)
- **Types**: PascalCase (`Player`, `PlayerSubmit`)

## 📞 Soporte

- 📧 **Issues**: [GitHub Issues]
- 📖 **Documentación**: Ver carpeta `/docs`
- 🤝 **Contribuciones**: Pull Requests bienvenidos

---

**🎾 Una aplicación moderna para la gestión profesional de tenis**

_Stack: Vue 3 + TypeScript + TanStack Query + Pinia + PrimeVue_
