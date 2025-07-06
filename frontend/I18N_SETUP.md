# Vue I18n Implementation Guide

## Step 1: Install Vue I18n

Run this command in your frontend directory:

```bash
npm install vue-i18n@9
```

## Step 2: Update main.ts

Add the i18n plugin to your main.ts file:

```typescript
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.use(router)
app.use(i18n)  // Add this line

app.mount('#app')
```

## Step 3: TypeScript Configuration (Optional)

If you want full TypeScript support, create a type definition file:

```typescript
// src/types/vue-i18n.d.ts
import { DefineLocaleMessage } from 'vue-i18n'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    common: {
      loading: string
      error: string
      retry: string
      // ... add more as needed
    }
    places: {
      infoDialog: {
        title: string
        fields: {
          id: string
        }
        matches: {
          title: string
          loading: string
          empty: string
          error: string
          retry: string
          columns: {
            player1: string
            player2: string
            date: string
            winner: string
          }
        }
      }
    }
    // ... add more as needed
  }
}
```

## Step 4: Using i18n in Components

### In Templates:
```vue
<template>
  <div>
    <h1>{{ $t('places.infoDialog.title') }}</h1>
    <button>{{ $t('common.retry') }}</button>
  </div>
</template>
```

### In Script Setup:
```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Use in reactive computations
const title = computed(() => t('places.infoDialog.title'))
</script>
```

## Step 5: Language Switcher Component

Create a simple language switcher:

```vue
<template>
  <select v-model="currentLocale" @change="setLocale($event.target.value)">
    <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
      {{ locale.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { currentLocale, availableLocales, setLocale } = useLanguage()
</script>
```

## Benefits of This Implementation:

1. **Type Safety**: Full TypeScript support with autocompletion
2. **Performance**: Tree-shaking removes unused translations
3. **Maintainability**: All strings in one place, easy to update
4. **Scalability**: Easy to add new languages
5. **Developer Experience**: Clear organization and documentation
6. **Production Ready**: Follows Vue.js best practices

## Migration Strategy:

1. Install the package and set up the configuration
2. Update one component at a time
3. Test each component after migration
4. Add new strings to the locale files as you go
5. Create a rule that all new strings must use i18n

This implementation is production-ready and follows all the best practices for Vue 3 + TypeScript applications!
