<script setup lang="ts">
import api from '@/api/api';
import { computed, ref } from 'vue';
import getData from '@/services/getInitialData';
import { get } from 'node_modules/axios/index.cjs';
import { useQuery } from '@tanstack/vue-query';
import AddMatchDialog from './AddMatchDialog.vue';
import getInitialData from '@/services/getInitialData';

/**
 * @function {function} initialData
 * @description Get the initial data from Matches
 */
const initialData = getData.initialMatchesData;

/**
 * @description useQuery hook to get the data  and manage the state
 */
const { isPending, isError, isFetching, data, error, refetch } = useQuery({
    queryKey: ['matches'],
    queryFn: initialData,
});

// const competitionsFn = getInitialData.initialCompetitionsData;

// const placesFn = getInitialData.initialPlacesData;

// const competitionsResponse = useQuery({
//     queryKey: ['competitions'],
//     queryFn: competitionsFn,
// });

// const placesResponse = useQuery({
//     queryKey: ['places'],
//     queryFn: placesFn,
// });

// const competitions = ref(competitionsResponse.data.value?.data || []);

// const places = ref(placesResponse.data.value?.data);

/**
 * @description Setting the name of the columns
 */
const columns = [
    { field: "player1"},
    { field: "player2"},
    { field: "competition" },
    { field: "result" }
]

/**
 * @description Get the last five matches
 * @returns {Array} Array of the last five matches
 */
const lastFiveMatches = computed(() => {
    return data.value?.data.slice(-5).reverse() || [];
});

/**
 * @initialValue {boolean} visible
 * @function {function} setVisible
 * @description Set the visibility of the dialog
 */
const visible = ref(false);


const setVisible = (value: boolean) => {
  visible.value = value;
};
</script>


<template>
    <Panel class="panel">
        <template #header>
            <div class="title">
                <v-icon name="gi-tennis-court" fill="black" scale="1." />
                <span class="font-bold">Últimos partidos</span>
                <div class="right-side">
                    <Button @click="visible = true">
                        <v-icon name="gi-tennis-court" fill="white" scale="1" />
                    </Button>
                </div>
            </div>
        </template>
        <AddMatchDialog v-bind:visible="visible" :setVisible="setVisible" :retry="refetch" />
        <div v-if="isPending" class="p-text-center">
            <ProgressSpinner />
        </div>
        <div v-if="isError" class="p-text-center">
            <span>Error: {{ error?.message }}</span>
            <Button @click="refetch()">Retry</Button>
        </div>
        <div v-else-if="isFetching" class="p-text-center">
            <ProgressSpinner />
        </div>
        <DataTable v-else :value="lastFiveMatches" size="small" :loading="isFetching">
            <Column>
                <template #body="matchesResponse">
                    <!-- <Avatar :label="matchesResponse.data.name.charAt(0).toUpperCase()" class="mr-2" size="normal" /> -->
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
  /* min-width: 33%;; */
  width: 33%;
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
