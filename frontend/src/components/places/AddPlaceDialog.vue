<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PlaceSubmit } from '@/interfaces/PlacesInterfaces';
import { usePlaceStore } from '@/stores/usePlaceStore';
import { useAppData } from '@/services/core/useAppData';

const store = usePlaceStore();
const { placesQuery } = useAppData();

const place = ref<PlaceSubmit>({
  name: '',
  address: '',
  city: '',
});

/**
 * Watch for changes in the place to edit from the store.
 * If editing, initialize form fields with place data; otherwise, reset fields.
 */
watch(
  () => store.placeToEdit,
  placeToEdit => {
    if (placeToEdit) {
      place.value = {
        name: placeToEdit.name,
        address: placeToEdit.address,
        city: placeToEdit.city,
      };
    } else {
      place.value = { name: '', address: '', city: '' };
    }
  },
  { immediate: true }
);

/**
 * Save the place (create or update).
 * TODO: Implement place mutations when needed
 * @returns {void}
 */
const savePlace = (): void => {
  try {
    // TODO: Implement place creation/update mutations
    console.log('Save place:', place.value);
    store.closeDialog();
    // Trigger refetch of places data
    placesQuery.refetch();
  } catch (error) {
    // Handle error appropriately (e.g., show notification)
    console.error('Error saving place:', error);
  }
};
</script>

<template>
  <Dialog v-model:visible="store.isDialogVisible" modal :header="store.placeToEdit ? 'Actualizar lugar' : 'Crear lugar'"
    :style="{ width: '25rem' }">
    <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
    <div v-if="store.placeToEdit" class="add-player-line">
      <label for="username" class="font-semibold w-6rem">ID</label>
      <InputText :value="store.placeToEdit?.id !== undefined
          ? String(store.placeToEdit.id)
          : ''
        " id="username" class="flex-auto w-1rem" autocomplete="off" disabled />
    </div>
    <div class="add-player-line">
      <label for="username" class="font-semibold w-6rem">Nombre</label>
      <InputText v-model="place.name" id="username" class="flex-auto w-1rem" autocomplete="off" />
    </div>
    <div class="add-player-line">
      <label for="username" class="font-semibold w-6rem">Dirección</label>
      <InputText v-model="place.address" id="address" class="flex-auto w-1rem" autocomplete="off" />
    </div>
    <div class="add-player-line">
      <label for="username" class="font-semibold w-6rem">Ciudad</label>
      <InputText v-model="place.city" id="city" class="flex-auto w-1rem" autocomplete="off" />
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="store.closeDialog()" autofocus />
      <Button label="Save" outlined severity="secondary" @click="savePlace" autofocus />
    </template>
  </Dialog>
</template>

<style scoped>
.add-player-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.right-side {
  margin-left: auto;
}
</style>
