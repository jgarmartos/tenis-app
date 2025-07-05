<script setup lang="ts">
import { computed } from "vue";
import AddPlayerDialog from "./AddPlayerDialog.vue";
import { useInitialData } from "@/services/requests/useInitialData";
import { useDataStore } from "@/stores/useDataStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Player } from "@/interfaces/PlayerInterfaces";
import { usePlayerMutations } from "@/services/requests/usePlayerMutations";

const store = usePlayerStore();
const { playersQuery } = useInitialData();

const players = computed(() => useDataStore().players);
const lastFivePlayers = computed(() => players.value.slice(-10).reverse());

const columns = [
  { field: "name", sortable: true },
  { field: "forehand", sortable: true },
];

const editPlayer = (player: Player) => {
  store.openDialog(player);
};

const { deletePlayer } = usePlayerMutations();

const handleDelete = (playerId: number) => {
  if (confirm("¿Estás seguro de que quieres eliminar este jugador?")) {
    deletePlayer.mutate(playerId);
  }
};
</script>

<template>
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

    <DataTable :value="lastFivePlayers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" size="small" :loading="playersQuery.isFetching.value">
      <Column>
        <template #body="playersResponse">
          <Avatar :label="playersResponse.data.name.charAt(0).toUpperCase()" class="mr-2" size="normal" />
        </template>
      </Column>
      <Column v-for="col in columns" :field="col.field" :key="col.field" sortable />
      <Column>
        <template #body="slotProps">
          <div class="action-buttons">
            <Button icon="pi pi-pencil" class="ghost-button" @click="editPlayer(slotProps.data)" />
            <Button icon="pi pi-trash" class="ghost-button danger" @click="handleDelete(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
</template>

<style scoped>
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