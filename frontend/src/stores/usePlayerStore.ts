// src/stores/playerStore.ts
import { defineStore } from 'pinia';
import type { Player } from '@/interfaces/PlayerInterfaces';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    playerToEdit: null as Player | null,
    isDialogVisible: false,
  }),
  actions: {
    openDialog(player: Player | null = null) {
      this.playerToEdit = player;
      this.isDialogVisible = true;
    },
    closeDialog() {
      this.playerToEdit = null;
      this.isDialogVisible = false;
    },
  },
});
