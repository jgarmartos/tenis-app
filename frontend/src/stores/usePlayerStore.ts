// src/stores/playerStore.ts
import { defineStore } from 'pinia';
import type { Player, PlayerResponse } from '@/interfaces/PlayerInterfaces';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    playerToEdit: null as Player | null,
    isDialogVisible: false,
    playerToShow: null as PlayerResponse | null,
    isInfoVisible: false,
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
    /**
     * Shows the player information dialog.
     * @param {PlayerResponse} player - The player to show information for.
     */
    showPlayerInfo(player: PlayerResponse) {
      this.playerToShow = player;
      this.isInfoVisible = true;
    },
    /**
     * Hides the player information dialog.
     */
    hidePlayerInfo() {
      this.isInfoVisible = false;
      this.playerToShow = null;
    },
  },
});
