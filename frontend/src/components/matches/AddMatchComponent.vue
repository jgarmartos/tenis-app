<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import { useInitialData } from '@/services/requests/useInitialData';
import { useCreateMatchStore } from "@/stores/createMatchStore";
import { useDataStore } from '@/stores/useDataStore';
import { computed } from 'vue';
import MatchTabView from './MatchTabView.vue';

const { matchesQuery } = useInitialData();


const handleSaveMatch = async () => {
    await useCreateMatchStore().saveMatch(); // Guardar el partido
    await matchesQuery.refetch(); // Esperar a que la refetch complete
};

const surfaces = [
    "Tierra batida",
    "Hierba",
    "Pista dura",
]

/**
 * Competitions
 */
const { competitionsQuery } = useInitialData();

const competitions = computed(() => useDataStore().competitions);

/**
 * Places
 */
const { placesQuery } = useInitialData();

const places = computed(() => useDataStore().places);

const players = computed(() => useDataStore().players);


</script>

<template>
    <header>
        <MenuBar />
    </header>

    <body>
        <div class="panels-container">
            <Panel class="panel">
                <template #header>
                    <div class="title">
                        <!-- <i class="pi pi-user" /> -->
                        <span style="font-weight: bold;">Añadir partido</span>
                    </div>
                </template>
                <div class="dialog-content">
                    <div class="center-div" name="competition">
                        <div>
                            <Dropdown v-model="useCreateMatchStore().selectedCompetition" :options="competitions" filter
                                optionLabel="name" placeholder="Competición: " class="right-side">
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <div>
                            <Dropdown v-model="useCreateMatchStore().selectedPlace" :options="places" filter
                                optionLabel="name" placeholder="Lugar: " class="right-side">
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <div>
                            <Dropdown v-model="useCreateMatchStore().selectedSurface" :options="surfaces"
                                placeholder="Superficie: " class="right-side">
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <div>
                            <Calendar id="calendar-timeonly" v-model="useCreateMatchStore().startTime" showTime
                                dateFormat="dd/mm/yy" hourFormat="24" />
                        </div>
                    </div>

                    <div class="center-div">
                        <div>
                            <Dropdown v-model="useCreateMatchStore().selectedPlayer1" :options="players" filter
                                optionLabel="name" placeholder="Jugador 1">
                            </Dropdown>
                        </div>
                        <div>
                            <Dropdown v-model="useCreateMatchStore().selectedPlayer2" :options="players" filter
                                optionLabel="name" placeholder="Jugador 2">
                            </Dropdown>
                        </div>
                    </div>

                    <MatchTabView />
                </div>
                <template #footer>
                    <!-- <Button label="Cancelar" text severity="secondary" @click="setVisible(false)" autofocus /> -->
                     <div class="center-div">
                        <Button label="Guardar" @click="handleSaveMatch" autofocus />
                     </div>
                </template>
            </Panel>
        </div>
    </body>
</template>

<!-- <style scoped>
header {
    line-height: 2;
    max-height: 20vh;
}

.panel {
    border-radius: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #d9d9d9;
    width: 100%;
}

.panels-container {
    padding-top: 1%;
    display: flex !important;
    width: 100%;
    height: 100%;
}

.dialog-content {
    padding: 1rem;
    width: 100%;
}

.center-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    width: 100%;
}

.p-calendar {
    width: 100%;
    margin-left: auto;
}
</style> -->

<style scoped>
header {
    line-height: 2;
    max-height: 20vh;
}

.panel {
    border-radius: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #d9d9d9;
    width: 100%;
    padding: 0.5rem; /* Reduce padding en móviles */
}

.panels-container {
    padding-top: 1%;
    display: flex;
    flex-direction: column; /* Colocar los elementos en columna en móviles */
    width: 100%;
    height: 100%;
}

.dialog-content {
    padding: 0.5rem; /* Reduce padding para móviles */
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.center-div {
    display: flex;
    align-items: flex-start; /* Alinea los elementos al inicio */
    justify-content: center;
    gap: 10px;
    padding: 10px;
    width: 100%;
}

.p-calendar {
    width: 100%;
    margin-left: auto;
}

/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
    .panel {
        padding: 1rem;
        margin: 0.5rem;
        box-shadow: none; /* Eliminar sombras en móviles */
    }

    .dialog-content {
        padding: 0.5rem;
    }

    .center-div {
        flex-direction: column;
        align-items: stretch; /* Asegura que los elementos ocupen todo el ancho */
    }

    .p-calendar {
        width: 100%;
        margin: 0;
    }
}
</style>
