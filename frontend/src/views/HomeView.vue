<script setup lang="ts">
import HeaderComponent from "@/components/Header.vue";
import PlayersPanel from "@/components/players/PlayersPanel.vue";
import MatchesPanel from "@/components/matches/MatchesPanel.vue";
import CompetitionsPanel from "@/components/competitions/CompetitionsPanel.vue";
import PlacesPanel from "@/components/places/PlacesPanel.vue";

</script>

<template>
  <header>
    <HeaderComponent />
  </header>

  <body>
    <div class="panels-container">
      <PlayersPanel class="panel"/>
      <MatchesPanel />
      <div class="flex-container">
        <CompetitionsPanel />
        <PlacesPanel />
      </div>
    </div>
    <!-- <div class="panels-container">
      <PlayersPanel />
      <MatchesPanel />
      <CompetitionsPanel />
    </div> -->
  </body>

</template>

<style scoped>
header {
  line-height: 2;
  max-height: 20vh;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/*  */

.panels-container {
  padding-top: 2%;
  display: flex !important;
  /* margin: 0 auto; */
  justify-content: space-between;
  
  flex-direction: row;
  /* Arrange items in a column */
  gap: 16px;
  /* Add spacing between panels */
  max-width: 80%;
  width: 100%;
  /* overflow-x: auto; */
}

.flex-container {
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Espacio entre los componentes, ajusta según sea necesario */
  width: 25%;
  height: 100%;
}
</style>
