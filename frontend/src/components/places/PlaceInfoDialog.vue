<script setup lang="ts">
import { usePlaceStore } from '@/stores/usePlaceStore';

/**
 * Place store instance for managing dialog state and place data.
 */
const store = usePlaceStore();
</script>

<template>
  <!-- Place information dialog modal -->
  <Dialog
    v-model:visible="store.isInfoVisible"
    modal
    :header="store.placeToEdit?.name"
    :style="{ width: '25rem' }">

    <!-- Place ID display field -->
    <div v-if="store.placeToEdit" class="flex-horizontal">
      <label for="username" class="font-semibold w-6rem">ID</label>
      <InputText
        :value="
          store.placeToEdit?.id !== undefined
            ? String(store.placeToEdit.id)
            : ''
        "
        id="username"
        class="flex-input"
        autocomplete="off"
        disabled
      />
    </div>

  </Dialog>
</template>

<style scoped>
/**
 * Horizontal flex layout for form fields.
 * Creates a space-between layout with centered alignment.
 */
.flex-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
}
</style>
