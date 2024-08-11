<script setup lang="ts">
import HeaderComponent from "@/components/Header.vue";
import PlayersPanel from "@/components/players/PlayersPanel.vue";
import MatchesPanel from "@/components/matches/MatchesPanel.vue";
import CompetitionsPanel from "@/components/competitions/CompetitionsPanel.vue";

</script>

<template>
  <HeaderComponent />
  <div class="players-container">
    <PlayersPanel />
    <MatchesPanel />
    <CompetitionsPanel />   
  </div>
</template>

<style scoped>
.players-container {
  padding-top: 2%;
  display: flex;
  flex-direction: row; /* Arrange items in a column */
  gap: 16px; /* Add spacing between panels */
  max-width: 100%;
  overflow-x: auto;
}
</style>
