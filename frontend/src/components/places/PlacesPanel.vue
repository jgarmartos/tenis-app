<script setup lang="ts">
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';
import { computed } from 'vue';
import AddPlaceDialog from './AddPlaceDialog.vue';
import PlaceInfoDialog from './PlaceInfoDialog.vue';
import type { Place } from '@/interfaces/PlacesInterfaces';
import { usePlaceStore } from '@/stores/usePlaceStore';
import { usePlaceMutations } from '@/services/requests/usePlaceMutations';

/**
 * Store instance for managing place dialog state and place to edit.
 */
const store = usePlaceStore();

/**
 * Query for fetching places from the backend.
 */
const { placesQuery } = useInitialData();

/**
 * Computed property for accessing places from the global store.
 */
const places = computed(() => useDataStore().places);

/**
 * Computed property for getting the last 3 places in reverse order.
 */
const lastPlaces = computed(() => {
  return places.value?.reverse() || [];
});

/**
 * Column configuration for the places data table.
 */
const columns = [
  { field: 'name', sortable: true },
  { field: 'city', sortable: true },
];

/**
 * Opens the dialog to edit a place.
 * @param {Place} place - The place to edit
 */
const editPlayer = (place: Place) => {
  store.openDialog(place);
};

/**
 * Place mutation functions for CRUD operations.
 */
const { deletePlace } = usePlaceMutations();

/**
 * Handles place deletion with confirmation dialog.
 * @param {number} placeId - ID of the place to delete
 */
const handleDelete = (placeId: number) => {
  if (confirm('¿Estás seguro de que quieres eliminar este lugar?')) {
    deletePlace.mutate(placeId);
  }
};

/**
 * Handles place selection to show detailed information.
 * @param {any} event - The selection event containing place data
 */
const showPlaceInfo = (event: any) => {
  console.log('showPlaceInfo', event);
  const place = event.data as Place;
  store.showPlaceInfo(place);
};
</script>

<template>
  <Panel class="panel">
    <template #header>
      <div class="title">
        <i class="pi pi-user" />
        <span class="font-bold">Últimos lugares</span>
        <div class="right-side">
          <Button @click="store.openDialog()">
            <v-icon name="md-place-outlined" fill="white" scale="1" />
          </Button>
        </div>
      </div>
    </template>
    <AddPlaceDialog />
    <PlaceInfoDialog />
    <DataTable
      :value="lastPlaces"
      size="small"
      :loading="placesQuery.isFetching.value"
      @row-select="showPlaceInfo"
      selectionMode="single"
    >
      <Column v-for="col in columns" :field="col.field" />
      <Column>
        <template #body="slotProps">
          <div class="action-buttons">
            <Button
              icon="pi pi-pencil"
              class="ghost-button"
              @click="editPlayer(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="ghost-button danger"
              @click="handleDelete(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
</template>

<style scoped>
.panel {
  border-radius: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  min-width: 25%;
  min-height: 60%;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px;
  width: 100%;
}

.right-side {
  margin-left: auto;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.ghost-button {
  opacity: 0.4;
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  border: none;
  color: inherit;
  box-shadow: none;
}

.ghost-button:hover {
  opacity: 1;
  background-color: #4b80c5;
  border-radius: 4px;
}

.ghost-button.danger:hover {
  background-color: #f8d7da;
  color: #c82333;
}
</style>
