import { defineStore } from 'pinia';
import type { Place } from '@/interfaces/PlacesInterfaces';

/**
 * Pinia store for managing place dialog state and editing operations.
 * Handles both creation/editing dialog and information display dialog.
 */
export const usePlaceStore = defineStore('placeStore', {
  state: () => ({
    placeToEdit: null as Place | null,
    isDialogVisible: false,
    isInfoVisible: false,
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
    /**
     * Shows the place information dialog.
     * @param {Place} place - The place to show information for.
     */
    showPlaceInfo(place: Place) {
      this.placeToEdit = place;
      this.isInfoVisible = true;
    },
    /**
     * Hides the place information dialog.
     */
    hidePlaceInfo() {
      this.isInfoVisible = false;
      this.placeToEdit = null;
    },
  },
});
