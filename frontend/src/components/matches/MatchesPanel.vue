<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import AddMatchDialog from './AddMatchDialog.vue';
import MatchInfoDialog from './MatchInfoDialog.vue';
import { useInitialData } from "@/services/requests/useInitialData";
import { useDataStore } from '@/stores/useDataStore';
import { useCreateMatchStore } from '@/stores/createMatchStore';
import type { Match } from '@/interfaces/MatchesInterfaces';
import { emptyMatch } from '@/services/emptyObjects';


const { matchesQuery, setsQuery } = useInitialData();

const matches = computed(() => useDataStore().matches);

const sets = computed(() => useDataStore().sets);

/**
 * @description Setting the name of the columns
 */
const columns = [
    { field: {
        header: "Jugador 1",
        value: 'player1'
    } },
    { field: {
        header: "Jugador 2",
        value: "player2"
    } },
    { field: {
        header: "Pista",
        value: "place"
    } },
    { field: {
        header: "Resultado",
        value: "sets"
    } }
]

const propertyToAccess = "name"

const sortedSets = ref();

/**
 * @description Mapear sets a los partidos usando el matchId
 * @param matchId {string} ID del partido
 * @returns {Array} Array de sets correspondientes
 */
const getSetsForMatch = (matchId: number) => {
    console.log('sets', sets.value);
    const filteredSets = sets.value.filter((set: any) => set.match.id == matchId);
    sortedSets.value = filteredSets.sort((a, b) => a.numberSet - b.numberSet);
    return sortedSets.value.map((set: any) => `${set.player1Score}-${set.player2Score}`).join(', ');
};

/**
 * @description Get the last five matches
 * @returns {Array} Array of the last five matches
 */
const lastFiveMatches = computed(() => {
    return matches.value.slice(-5).reverse() || [];
});

// const dialogs = {
//     visibleAddMatchDialog: ref(false),
//     visibleEditMatchDialog: ref(false),
// };

/**
 * @initialValue {boolean} visibleAddMatchDialog
 * @function {function} setVisible
 * @description Set the visibility of the dialog
 */
const visibleAddMatchDialog = ref(false);

/**
 * @initialValue {boolean} visibleMatchInfoDialog
 * @function {function} setVisible
 * @description Set the visibility of the dialog
 */
const visibleMatchInfoDialog = ref(false);


const setVisibleAddMatchDialog = (value: boolean, ) => {
    visibleAddMatchDialog.value = value;
};

const setVisibleMatchInfoDialog = (value: boolean) => {
    visibleMatchInfoDialog.value = value;
};

// const setVisible = (property: Ref<boolean>, value: boolean) => {
//     property.value = value;
// };

const matchInfo = ref<Match>(emptyMatch());

/**
 * @description Handle the row select event
 * @param event {Event} Event
 */
const onRowSelect = (event: any) => {
    console.log('event', event.data);
    matchInfo.value = event.data;
    console.log('matchInfo', matchInfo.value);
    setVisibleMatchInfoDialog(true);
};
</script>


<template>
    <Panel class="panel">
        <template #header>
            <div class="title">
                <v-icon name="gi-tennis-court" fill="black" scale="1." />
                <span class="font-bold">Últimos partidos</span>
                <div class="right-side">
                    <Button @click="visibleAddMatchDialog = true">
                        <v-icon name="gi-tennis-court" fill="white" scale="1" />
                    </Button>
                </div>
            </div>
        </template>
        <AddMatchDialog v-bind:visible="visibleAddMatchDialog" :setVisible="setVisibleAddMatchDialog" :retry="matchesQuery.refetch" :getSetsForMatch="getSetsForMatch" />
        <MatchInfoDialog v-bind:visible="visibleMatchInfoDialog" :setVisible="setVisibleMatchInfoDialog" v-bind:matchInfo="matchInfo"></MatchInfoDialog>
        <div>
            <DataTable :value="lastFiveMatches" size="small" :loading="matchesQuery.isFetching.value" @rowSelect="onRowSelect" selectionMode="single">
                <!-- <Column v-for="col in columns" :field="col.field.value" :header="col.field.header" sortable /> -->
                <Column v-for="col in columns" sortable>
                    <template #header>
                        <span>{{ col.field.header }}</span>
                    </template>
                    <template #body="matchesResponse">
                        <span v-if="col.field.value !== 'sets'">
                            {{ matchesResponse.data[col.field.value][propertyToAccess] }}
                        </span>
                        <span v-else>
                            <!-- Renderizamos las puntuaciones de los sets -->
                            {{ useCreateMatchStore().getSetsForMatch(matchesResponse.data.id) }}
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
    /* overflow: hidden; */
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #d9d9d9;
    /* max-width: 50%; */
    /* min-width: 33%;; */
    width: 50%;
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
