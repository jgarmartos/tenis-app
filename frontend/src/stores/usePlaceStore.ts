// src/stores/playerStore.ts
import { defineStore } from 'pinia';
import type { Place } from '@/interfaces/PlacesInterfaces';

/**
 * Store for managing place dialog state and editing.
 */
export const usePlaceStore = defineStore('placeStore', {
  state: () => ({
    placeToEdit: null as Place | null,
    isDialogVisible: false,
  }),
  actions: {
    /**
     * Opens the dialog for editing or creating a place.
     * @param {Place | null} place - The place to edit, or null to create a new one.
     */
    openDialog(place: Place | null = null) {
      this.placeToEdit = place;
      this.isDialogVisible = true;
    },
    /**
     * Closes the dialog and resets the editing state.
     */
    closeDialog() {
      this.placeToEdit = null;
      this.isDialogVisible = false;
    },
  },
});
