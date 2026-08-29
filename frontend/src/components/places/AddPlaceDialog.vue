<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { PlaceSubmit } from '@/interfaces/PlacesInterfaces';
import { usePlaceStore } from '@/stores/usePlaceStore';
import { useCreatePlace, useUpdatePlace } from '@/services/places/placeMutations';

const store = usePlaceStore();

/**
 * i18n composable for accessing translation functions.
 */
const { t } = useI18n();

/**
 * Feedback message shown when the create/update request fails.
 */
const errorMessage = ref('');

/**
 * Place mutation functions for creating and updating places.
 * Closes the dialog after mutation is complete.
 */
const { mutate: createPlace, isPending: isCreating } = useCreatePlace({
  onError: () => {
    errorMessage.value = t('places.form.error');
  },
});
const { mutate: updatePlace, isPending: isUpdating } = useUpdatePlace({
  onError: () => {
    errorMessage.value = t('places.form.error');
  },
});

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
    errorMessage.value = '';
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
 * Calls the appropriate mutation based on whether editing or creating.
 * @returns {void}
 */
const savePlace = (): void => {
  errorMessage.value = '';

  if (store.placeToEdit) {
    updatePlace({ id: store.placeToEdit.id, data: place.value }, {
      onSuccess: () => store.closeDialog()
    });
  } else {
    createPlace(place.value, {
      onSuccess: () => store.closeDialog()
    });
  }
};
</script>

<template>
  <Dialog v-model:visible="store.isDialogVisible" modal
    :header="store.placeToEdit ? t('places.form.editTitle') : t('places.form.createTitle')"
    :style="{ width: '25rem' }">
    <div v-if="store.placeToEdit" class="form-field">
      <label for="placeId" class="field-label">ID</label>
      <InputText :value="String(store.placeToEdit.id)" id="placeId" class="flex-auto" autocomplete="off" disabled />
    </div>
    <div class="form-field">
      <label for="placeName" class="field-label">{{ t('places.form.name') }}</label>
      <InputText v-model="place.name" id="placeName" class="flex-auto" autocomplete="off" />
    </div>
    <div class="form-field">
      <label for="placeAddress" class="field-label">{{ t('places.form.address') }}</label>
      <InputText v-model="place.address" id="placeAddress" class="flex-auto" autocomplete="off" />
    </div>
    <div class="form-field">
      <label for="placeCity" class="field-label">{{ t('places.form.city') }}</label>
      <InputText v-model="place.city" id="placeCity" class="flex-auto" autocomplete="off" />
    </div>

    <!-- Feedback after attempting to save -->
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>

    <template #footer>
      <Button :label="t('common.cancel')" text severity="secondary" @click="store.closeDialog()" />
      <Button :label="t('common.save')" outlined severity="secondary" :loading="isCreating || isUpdating"
        @click="savePlace" />
    </template>
  </Dialog>
</template>

<style scoped>
.form-field {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.field-label {
  font-weight: 600;
  width: 6rem;
  flex-shrink: 0;
}
</style>
