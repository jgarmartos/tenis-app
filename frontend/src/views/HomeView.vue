<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import PlayersPanel from '@/components/players/PlayersPanel.vue';
import MatchesPanel from '@/components/matches/MatchesPanel.vue';
import CompetitionsPanel from '@/components/competitions/CompetitionsPanel.vue';
import PlacesPanel from '@/components/places/PlacesPanel.vue';
</script>

<template>
  <main>
    <header>
      <MenuBar />
    </header>
    <div class="panels-container">
      <PlayersPanel class="panel" />
      <MatchesPanel class="panel" />
      <div class="flex-container">
        <CompetitionsPanel />
        <PlacesPanel />
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 2;
  max-height: 20vh;
  width: 100%;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/*  */

.panels-container {
  padding-top: 1rem;
  display: flex !important;
  /* margin: 0 auto; */
  justify-content: space-between;

  flex-direction: column;
  /* Arrange items in a column */
  gap: 16px;
  /* Add spacing between panels */
  max-width: 100%;
  width: 100%;
  /* overflow-x: auto; */
}

.flex-container {
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Espacio entre los componentes, ajusta según sea necesario */
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  .panels-container {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .flex-container {
    width: 25%;
    flex-direction: column;
    gap: 2rem;
  }
}

.panel {
  width: 100%;
  /* height: 100%; */
  /* overflow: auto; */
}
</style>
