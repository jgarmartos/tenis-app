/** * PlayerMatchesTableComponent.vue * * Displays a table of matches for a
given player, including player names, place, competition, and set results. *
Allows row selection to navigate to match details. * * @module
components/players/PlayerMatchesTableComponent */

<script setup lang="ts">
import type { Match } from '@/interfaces/MatchesInterfaces';
import router from '@/router';
import { emptyMatch } from '@/services/emptyObjects';
import { useInitialData } from '@/services/requests/useInitialData';
import { useMatchInfoStore } from '@/stores/createMatchStore';
import { useDataStore } from '@/stores/useDataStore';
import { computed, ref } from 'vue';
import { getSetsResultForMatch } from '@/services/matchServices';

// Initialize data from the backend
useInitialData();

/**
 * Computed property for all matches from the store.
 */
const matches = computed(() => useDataStore().matches);

/**
 * Props for the player ID whose matches are displayed.
 */
const props = defineProps({
  playerId: {
    type: String,
    required: true,
  },
});

/**
 * Numeric player ID for filtering matches.
 */
const playerNumber = parseInt(props.playerId);

/**
 * Computed property for matches involving the given player.
 */
const playerMatches = computed(() => {
  return matches.value.filter(match => {
    return (
      match.player1.id === playerNumber || match.player2.id === playerNumber
    );
  });
});

/**
 * Property to access for player/competition/place names.
 */
const propertyToAccess = 'name';

/**
 * Columns definition for the matches table.
 */
const columns = [
  {
    field: {
      header: 'Jugador 1',
      value: 'player1',
    },
  },
  {
    field: {
      header: 'Jugador 2',
      value: 'player2',
    },
  },
  {
    field: {
      header: 'Pista',
      value: 'place',
    },
  },
  {
    field: {
      header: 'Competición',
      value: 'competition',
    },
  },
  {
    field: {
      header: 'Resultado',
      value: 'sets',
    },
  },
];

/**
 * Reactive reference for the selected match info.
 */
const matchInfo = ref<Match>(emptyMatch());

/**
 * Handles row selection event and navigates to match details page.
 * @param {any} event - Row select event
 */
const onRowSelect = (event: any) => {
  matchInfo.value = event.data;
  useMatchInfoStore().matchInfo = event.data;
  router.push({
    name: 'matchInfo',
    query: {
      visible: 'true',
      matchInfo: JSON.stringify(matchInfo.value),
    },
  });
};
</script>

<template>
  <!--
      DataTable displaying matches for the given player.
      Allows row selection to view match details.
    -->
  <DataTable
    :value="playerMatches"
    size="small"
    @rowSelect="onRowSelect"
    selectionMode="single"
  >
    <Column v-for="col in columns" sortable>
      <template #header>
        <span>{{ col.field.header }}</span>
      </template>
      <template #body="matchesResponse">
        <span v-if="col.field.value !== 'sets'">
          {{ matchesResponse.data[col.field.value][propertyToAccess] }}
        </span>
        <span v-else>
          <!-- Render set scores for the match -->
          {{ getSetsResultForMatch(matchesResponse.data.id) }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
/* Add custom styles for the player matches table here if needed */
</style>
