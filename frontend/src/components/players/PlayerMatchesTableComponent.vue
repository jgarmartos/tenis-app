<script setup lang="ts">
import type { Match } from '@/interfaces/MatchesInterfaces';
import router from '@/router';
import { emptyMatch } from '@/services/emptyObjects';
import { useInitialData } from '@/services/requests/useInitialData';
import { useMatchInfoStore } from '@/stores/createMatchStore';
import { useDataStore } from '@/stores/useDataStore';
import { computed, ref } from 'vue';
import { getSetsResultForMatch } from '@/services/matchServices';


useInitialData();

const matches = computed(() => useDataStore().matches);

const props = defineProps({
    playerId: {
        type: String,
        required: true
    }
})

const playerNumber = parseInt(props.playerId);

const playerMatches = computed(() => {
    return matches.value.filter((match) => {
        return match.player1.id === playerNumber || match.player2.id === playerNumber;
    })
})

const propertyToAccess = "name"


/**
 * @description Setting the name of the columns
 */
 const columns = [
    {
        field: {
            header: "Jugador 1",
            value: 'player1'
        }
    },
    {
        field: {
            header: "Jugador 2",
            value: "player2"
        }
    },
    {
        field: {
            header: "Pista",
            value: "place"
        }
    },
    {
        field: {
            header: "Resultado",
            value: "sets"
        }
    }
]

const matchInfo = ref<Match>(emptyMatch());

/**
 * @description Handle the row select event
 * @param event {Event} Event
 */
 const onRowSelect = (event: any) => {
    matchInfo.value = event.data;
    useMatchInfoStore().matchInfo = event.data;
    router.push({
        name: 'matchInfo',
        query: {
            visible: 'true', // Example static value
            matchInfo: JSON.stringify(matchInfo.value) // Convert the matchInfo object to a JSON string
        }
    });
};
</script>

<template>
    <DataTable :value="playerMatches" size="small" @rowSelect="onRowSelect" selectionMode="single">
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
                            {{ getSetsResultForMatch(matchesResponse.data.id) }}
                        </span>
                    </template>
                </Column>
            </DataTable>

</template>

<style scoped>

</style>