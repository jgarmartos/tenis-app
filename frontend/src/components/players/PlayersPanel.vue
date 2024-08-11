<template>
  <Panel toggleable class="panel">
    <template #header>
      <div class="title">
        <i class="pi pi-user" />
        <span class="font-bold">Últimos jugadores</span>
      </div>
    </template>
    
    <div v-for="player in playersResponse" class="player-field">
        <p>{{ player.name }}</p>
        <p style="align-content: flex-end;">{{ player.forehand }}</p>
    </div>
  </Panel>
</template>

<style scoped>
.panel {
  border-radius: 10px;
  /* overflow: hidden; */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  max-width: 33%;
  min-width: 375px;
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
  padding: 14px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import getInitialData from "../../services/getInitialData.ts";
import { Player } from "../../interfaces/playerInterfaces.ts";

const playersResponse = ref<Player[]>([
    {
        id: 1,
        name: "Empty",
        forehand: "Empty",
    },
]);

getInitialData.getPlayersData().then((response) => {
  playersResponse.value = response;
});
</script>
