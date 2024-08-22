<script setup lang="ts">
import { computed, ref } from "vue";
import type { Player, PlayerSubmit } from "@/interfaces/PlayerInterfaces";
import saveData from "@/services/saveData";
import AddPlayerDialog from "./AddPlayerDialog.vue";
import api from "@/api/api";
import { useQuery } from "@tanstack/vue-query";
import { useInitialData } from "@/services/useInitialData";
import { useDataStore } from "@/stores/useDataStore";

const { playersQuery } = useInitialData();

const players = computed(() => useDataStore().players);

const lastFivePlayers = computed(() => {
  return players.value?.slice(-5).reverse() || [];
});

const columns = [
  { field: "name", sortable: true },
  { field: "forehand", sortable: true },
];

const visible = ref(false);

const setVisible = (value: boolean) => {
  visible.value = value;
};
</script>

<template>
  <Panel class="panel">
    <template #header>
      <div class="title">
        <i class="pi pi-user" />
        <span class="font-bold">Últimos jugadores</span>
        <div class="right-side">
          <Button @click="visible = true">
            <i class="pi pi-user-plus" />
          </Button>
        </div>
      </div>
    </template>
    <AddPlayerDialog v-bind:visible="visible" :setVisible="setVisible" :retry="playersQuery.refetch" />
    <!-- <div v-if="isPending" class="p-text-center">
      <ProgressSpinner />
    </div>
    <div v-if="isError" class="p-text-center">
      <span>Error: {{ error?.message }}</span>
      <Button @click="retry">Retry</Button>
    </div>
    <div v-else-if="isFetching" class="p-text-center">
      <ProgressSpinner />
    </div> -->
    <DataTable :value="lastFivePlayers" size="small" :loading="playersQuery.isFetching.value">
      <Column>
        <template #body="playersResponse">
          <Avatar :label="playersResponse.data.name.charAt(0).toUpperCase()" class="mr-2" size="normal" />
        </template>
      </Column>
      <Column v-for="col in columns" :field="col.field" sortable />
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
  width: 25%;
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
</style>
