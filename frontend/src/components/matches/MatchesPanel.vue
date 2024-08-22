<script setup lang="ts">
import { computed, ref } from 'vue';
import AddMatchDialog from './AddMatchDialog.vue';
import { useInitialData } from "@/services/useInitialData";
import { useDataStore } from '@/stores/useDataStore';


const { matchesQuery } = useInitialData();

const matches = computed(() => useDataStore().matches);

/**
 * @description Setting the name of the columns
 */
const columns = [
    { field: {
        header: "Jugador 1",
        value: "player1.name"
    } },
    { field: {
        header: "Jugador 2",
        value: "player2.name"
    } },
    { field: {
        header: "Pista",
        value: "place.name"
    } },
    // { field: {
    //     header: "Competición",
    //     value: "competition.name"
    // } },
    // { field: {
    //     header: "Fecha",
    //     value: "date"
    // } },
    // { field: {
    //     header: "Hora",
    //     value: "time"
    // } }
]

/**
 * @description Get the last five matches
 * @returns {Array} Array of the last five matches
 */
const lastFiveMatches = computed(() => {
    return matches.value.slice(-5).reverse() || [];
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
        <AddMatchDialog v-bind:visible="visible" :setVisible="setVisible" :retry="matchesQuery.refetch" />
        <!-- <div v-if="matchesQuery.isLoading" class="p-text-center">
            <ProgressSpinner />
        </div>
        <div v-if="matchesQuery.isError" class="p-text-center">
            <span>Error: {{ matchesQuery.error?.value?.message }}</span>
            <Button @click="matchesQuery.refetch()">Retry</Button>
        </div> -->
        <div>
            <DataTable :value="lastFiveMatches" size="small">
                <Column v-for="col in columns" :field="col.field.value" :header="col.field.header" sortable />
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
