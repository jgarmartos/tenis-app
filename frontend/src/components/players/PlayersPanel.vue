/** * PlayersPanel.vue * * Displays a panel with the latest players, allowing
editing and deletion. * Integrates with AddPlayerDialog for player creation and
editing. * * @module components/players/PlayersPanel */

<script setup lang="ts">
import { computed } from 'vue';
import AddPlayerDialog from './AddPlayerDialog.vue';
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import type { Player } from '@/interfaces/PlayerInterfaces';
import { usePlayerMutations } from '@/services/requests/usePlayerMutations';

/**
 * Store instance for managing player dialog state and player to edit.
 */
const store = usePlayerStore();

/**
 * Query for fetching players from the backend.
 */
const { playersQuery } = useInitialData();

/**
 * Computed property for the list of players from the global store.
 */
const players = computed(() => useDataStore().players);

/**
 * Computed property for the last 10 players (most recent first).
 */
const lastFivePlayers = computed(() => players.value.slice(-10).reverse());

/**
 * Columns to display in the DataTable.
 */
const columns = [
  { field: 'name', sortable: true },
  { field: 'forehand', sortable: true },
];

/**
 * Opens the dialog to edit a player.
 * @param {Player} player - Player to edit
 */
const editPlayer = (player: Player) => {
  store.openDialog(player);
};

/**
 * Player mutation for deleting a player.
 */
const { deletePlayer } = usePlayerMutations();

/**
 * Handles player deletion with confirmation dialog.
 * @param {number} playerId - ID of the player to delete
 */
const handleDelete = (playerId: number) => {
  if (confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
    deletePlayer.mutate(playerId);
  }
};
</script>

<template>
  <!--
    Panel containing the latest players, with edit and delete actions.
    Includes AddPlayerDialog for player creation and editing.
  -->
  <Panel class="panel">
    <template #header>
      <div class="title">
        <i class="pi pi-user" />
        <span class="font-bold">Últimos jugadores</span>
        <div class="right-side">
          <Button @click="store.openDialog()">
            <i class="pi pi-user-plus" />
          </Button>
        </div>
      </div>
    </template>

    <AddPlayerDialog />

    <DataTable
      :value="lastFivePlayers"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      size="small"
      :loading="playersQuery.isFetching.value"
    >
      <Column>
        <template #body="playersResponse">
          <Avatar
            :label="playersResponse.data.name.charAt(0).toUpperCase()"
            class="mr-2"
            size="normal"
          />
        </template>
      </Column>
      <Column
        v-for="col in columns"
        :field="col.field"
        :key="col.field"
        sortable
      />
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
/*
  Styles for the panel, header, player fields, and action buttons.
*/
.panel {
  border-radius: 10px;
  /* overflow: hidden; */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  /* max-width: 50%; */
  /* min-width: 33%; */
  width: 60%;
}

.player-field {
  /* flex-direction: row; */
  display: flex;
  /* align-items: center; */
  gap: 20px;
  padding: 14px;
  font-size: small;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
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
