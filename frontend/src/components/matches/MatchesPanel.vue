<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import AddMatchDialog from './AddMatchDialog.vue';
import MatchInfoDialog from './MatchInfoDialog.vue';
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';
import { useMatchInfoStore } from '@/stores/createMatchStore';
import type { Match } from '@/interfaces/MatchesInterfaces';
import { emptyMatch } from '@/services/emptyObjects';
import { getSetsResultForMatch } from '@/services/matchServices';
import router from '@/router';

const { matchesQuery } = useInitialData();

const matches = computed(() => useDataStore().matches);

/**
 * Configuration for the data table columns.
 * Defines headers and field mappings for the matches table.
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
      header: 'Resultado',
      value: 'sets',
    },
  },
];

/**
 * Property name to access from player and place objects.
 */
const propertyToAccess = 'name';

/**
 * Computes the last five matches in reverse chronological order.
 * @returns {Array} Array of the last five matches
 */
const lastFiveMatches = computed(() => {
  return matches.value.slice(-5).reverse() || [];
});

/**
 * Controls the visibility of the add match dialog.
 */
const visibleAddMatchDialog = ref(false);

/**
 * Controls the visibility of the match info dialog.
 */
const visibleMatchInfoDialog = ref(false);

/**
 * Sets the visibility state of the add match dialog.
 * @param {boolean} value - The visibility state to set
 */
const setVisibleAddMatchDialog = (value: boolean) => {
  visibleAddMatchDialog.value = value;
};

/**
 * Sets the visibility state of the match info dialog.
 * @param {boolean} value - The visibility state to set
 */
const setVisibleMatchInfoDialog = (value: boolean) => {
  visibleMatchInfoDialog.value = value;
};

/**
 * Stores the currently selected match information.
 */
const matchInfo = ref<Match>(emptyMatch());

/**
 * Handles row selection in the matches table.
 * Navigates to the match info page with the selected match data.
 * @param {any} event - The row selection event containing match data
 */
const onRowSelect = (event: any) => {
  matchInfo.value = event.data;
  useMatchInfoStore().matchInfo = event.data;
  router.push({
    name: 'matchInfo',
    query: {
      visible: 'true', // Example static value
      matchInfo: JSON.stringify(matchInfo.value), // Convert the matchInfo object to a JSON string
    },
  });
};
</script>

<template>
  <Panel class="panel">
    <template #header>
      <div class="title">
        <v-icon name="gi-tennis-court" scale="1.2" />
        <span class="font-bold">Últimos partidos</span>
        <div class="right-side">
          <Button @click="router.push('/addMatch')">
            <v-icon name="gi-tennis-court" fill="white" scale="1" />
          </Button>
        </div>
      </div>
    </template>
    <AddMatchDialog
      v-bind:visible="visibleAddMatchDialog"
      :setVisible="setVisibleAddMatchDialog"
      :retry="matchesQuery.refetch"
    />
    <MatchInfoDialog
      v-bind:visible="visibleMatchInfoDialog"
      :setVisible="setVisibleMatchInfoDialog"
      v-bind:matchInfo="matchInfo"
    ></MatchInfoDialog>
    <div>
      <DataTable
        :value="lastFiveMatches"
        size="small"
        :loading="matchesQuery.isFetching.value"
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
              {{ getSetsResultForMatch(matchesResponse.data.id) }}
            </span>
          </template>
        </Column>
      </DataTable>
    </div>
  </Panel>
</template>

<style scoped>
.panel {
  border-radius: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  width: 50%;
}

.player-field {
  display: flex;
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
