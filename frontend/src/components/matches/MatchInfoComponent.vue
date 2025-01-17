<script setup lang="ts">
import type { Match, MatchSubmit } from '@/interfaces/MatchesInterfaces';
import { getSetsForMatch, getSetsForMatchByPlayer } from '@/services/matchServices';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { getGamesBySet } from '@/services/gameService';
import MenuBar from '../MenuBar.vue';
import MatchCharts from './MatchCharts.vue';
import router from '@/router';

const title = ref<string>('Información del partido');

const matchLineTitle = ref<string>('Línea de partido');

const statsTitle = ref<string>('Estadísticas');

const closeButtonText = ref<string>('Cerrar');

/**
 * Properties of the component
 * @param visible - Dialog visibility
 * @param setVisible - Function to set the dialog visibility
 * @param matchInfo - Match information
 */
const props = defineProps<{
    matchInfo: Match;
}>();

const matchInfoLocal = ref(props.matchInfo);

const setPuntationP1 = ref<number>(0);
const setPuntationP2 = ref<number>(0);

const calculateSetsPuntuations = () => {
    setPuntationP1.value = 0;
    setPuntationP2.value = 0;

    getSetsForMatch(matchInfoLocal.value.id).forEach((set) => {
        if (set.winner?.id === matchInfoLocal.value.player1.id) {
            setPuntationP1.value++;
        } else if (set.winner?.id === matchInfoLocal.value.player2.id) {
            setPuntationP2.value++;
        }
    });
};

const gamesPuntuationsPerSetP1 = ref<{ [setId: number]: number[] }>({});
const gamesPuntuationsPerSetP2 = ref<{ [setId: number]: number[] }>({});

const gamesBySet = ref<{ [setId: number]: any[] }>({});

const calculatePuntuations = async () => {
    gamesPuntuationsPerSetP1.value = {};
    gamesPuntuationsPerSetP2.value = {};
    gamesBySet.value = {};

    const sets = await getSetsForMatch(matchInfoLocal.value.id);
    for (const set of sets) {
        let player1GamesWon = 0;
        let player2GamesWon = 0;

        gamesPuntuationsPerSetP1.value[set.id] = [];
        gamesPuntuationsPerSetP2.value[set.id] = [];
        gamesBySet.value[set.id] = await getGamesBySet(set.id);

        for (const game of gamesBySet.value[set.id]) {
            if (game.winner?.id === matchInfoLocal.value.player1.id) {
                player1GamesWon++;
                gamesPuntuationsPerSetP1.value[set.id].push(player1GamesWon);
                gamesPuntuationsPerSetP2.value[set.id].push(player2GamesWon);
            } else if (game.winner?.id === matchInfoLocal.value.player2.id) {
                player2GamesWon++;
                gamesPuntuationsPerSetP1.value[set.id].push(player1GamesWon);
                gamesPuntuationsPerSetP2.value[set.id].push(player2GamesWon);
            }
        }
    }
};

const getSetsForMatchLocal = (matchId: number) => {
    return getSetsForMatch(matchId);
};

const getGamesBySetLocal = (setId: number) => {
    return getGamesBySet(setId);
};

// Recalculate when matchInfo updates
watch(() => matchInfoLocal.value, calculatePuntuations);
watch(() => matchInfoLocal.value, calculateSetsPuntuations);

// Run the calculation when the component is mounted
onMounted(async () => {
    await calculatePuntuations();
    calculateSetsPuntuations();
});

console.log('matchInfoLocalWinner', matchInfoLocal.value.winner);

console.log('player1', matchInfoLocal.value.player1);

console.log('player2', matchInfoLocal.value.player2);


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
                        <span style="font-weight: bold;">{{ title }}</span>
                    </div>
                </template>
                <div class="dialog-content">
                    <Panel class="panel">
                        <div class="flex-container" id="player1">
                            <div class="flex-container">
                                <Avatar :label="matchInfoLocal.player1.name.charAt(0).toUpperCase()" class="mr-2"
                                    size="normal" />
                                <span class="playerName" style="color: aliceblue"> {{ matchInfoLocal.player1.name }}
                                </span>
                                <div class="right-side">
                                    <div class="flex-container-result"
                                        v-for="setScore in getSetsForMatchByPlayer(matchInfoLocal.id, matchInfoLocal.player1.id)"
                                        :style="setScore?.isWinner ? 'background-color: gold' : ''">
                                        <span class="set-puntuation" :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{ setScore?.score}}</span>
                                    </div>
                                    <Divider layout="vertical" />
                                    <div class="flex-container-result" :style="matchInfoLocal.winner == matchInfoLocal.player1.id  ? 'background-color: gold' : ''">
                                        <span class="set-puntuation"> {{ setPuntationP1 }} </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="flex-container" id="player2">
                            <div class="flex-container">
                                <Avatar :label="matchInfoLocal.player2.name.charAt(0).toUpperCase()" class="mr-2"
                                    size="normal" />
                                <span class="playerName" style="color: aliceblue"> {{ matchInfoLocal.player2.name }}
                                </span>
                                <div class="right-side">
                                    <div class="flex-container-result"
                                        v-for="setScore in getSetsForMatchByPlayer(matchInfoLocal.id, matchInfoLocal.player2.id)"
                                        :style="setScore?.isWinner ? 'background-color: gold' : ''">
                                        <span class="set-puntuation" :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{ setScore?.score
                                            }}</span>
                                    </div>
                                    <Divider layout="vertical" />
                                    <div class="flex-container-result" :style="matchInfoLocal.winner === matchInfoLocal.player2.id  ? 'background-color: gold' : ''">
                                        <span class="set-puntuation" > {{ setPuntationP2 }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel>
                    <!-- LÍNEA DE PARTIDO -->
                    <div class="flex-container-vertical" style="justify-content: center; margin-top: 1rem;">
                        <span style="justify-content: center; font-weight: bold;">{{ matchLineTitle }}</span>
                        <div style="width: 100%;">
                            <Accordion :activeIndex="0">
                                <AccordionTab v-for="set in getSetsForMatchLocal(matchInfoLocal.id)"
                                    :header="'Set ' + set.numberSet">
                                    <div id="games-results" v-for="(game, index) in getGamesBySetLocal(set.id)"
                                        class="flex-container" style="max-width: 100%;">
                                        <div :class="game.winner?.id == matchInfoLocal.player1.id ? 'games-result-winner' : 'games-result-loser'">
                                            <span
                                                v-if="gamesPuntuationsPerSetP1[set.id]"
                                                :style="game.winner?.id == matchInfoLocal.player1.id ? 'font-weight:bold' : ''">
                                                {{ gamesPuntuationsPerSetP1[set.id][index] }}
                                            </span>
                                        </div>
                                        <div class="games-result">
                                            <span v-if="game.server.id == matchInfoLocal.player1.id">
                                                <v-icon name="gi-tennis-ball" fill="green" />
                                                <v-icon v-if="game.server.id != game.winner?.id"
                                                    name="bi-x-octagon-fill" fill="red"></v-icon>
                                            </span>
                                        </div>
                                        <div class="games-result" style="width: 50%;">
                                            <span :style="game.winner?.id == matchInfoLocal.player1.id ? 'font-weight: bold' : ''">
                                                {{
                                                    game.player1Score }}</span>
                                            <span> - </span>
                                            <span
                                                :style="game.winner?.id == matchInfoLocal.player2.id ? 'font-weight: bold' : ''">
                                                {{
                                                    game.player2Score }}</span>
                                        </div>
                                        <div class="games-result">
                                            <span v-if="game.server.id == matchInfoLocal.player2.id">
                                                <v-icon name="gi-tennis-ball" fill="green" />
                                                <v-icon v-if="game.server.id != game.winner?.id"
                                                    name="bi-x-octagon-fill" fill="red"></v-icon>
                                            </span>
                                        </div>
                                        <div :class="game.winner?.id == matchInfoLocal.player2.id ? 'games-result-winner' : 'games-result-loser'">
                                        <!-- <div class="games-result-score" :style="game.winner?.id == matchInfoLocal.player2.id ? '' : 'background-color: black'"> -->
                                            <span
                                                v-if="gamesPuntuationsPerSetP2[set.id]"
                                                :style="game.winner?.id == matchInfoLocal.player2.id ? 'font-weight:bold' : ''">
                                                {{ gamesPuntuationsPerSetP2[set.id][index] }}
                                            </span>
                                        </div>

                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </div>
                    <!-- ESTADÍSTICAS -->
                    <div class="flex-container-vertical" style="justify-content: center; margin-top: 1rem;">
                        <span style="justify-content: center; font-weight: bold;"> {{ statsTitle }}</span>
                        <MatchCharts :matchInfo="matchInfoLocal" />
                    </div>
                </div>
                <template #footer>
                    <!-- <Button label="Cancelar" text severity="secondary" @click="setVisible(false)" autofocus /> -->
                    <div class="center-div">
                        <Button :label=" closeButtonText " autofocus @click="router.push('/')" />
                    </div>
                </template>
            </Panel>
        </div>
    </body>
</template>

<style scoped>
header {
    line-height: 2;
    max-height: 20vh;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
}

.panel {
    border-bottom-style: solid;
    border-color: #d9d9d9;
    width: 100%;
}

.p-toggeable-content {
    justify-content: center;
}

.panels-container {
    padding-top: 1%;
    display: flex;
    flex-direction: column;
    /* Colocar los elementos en columna en móviles */
    width: 100%;
    height: 100%;
}

.set-puntuation {
    font-weight: bold;
    color: black;
}

.dialog-content {
    padding: 0.5rem;
    /* Reduce padding para móviles */
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.center-div {
    display: flex;
    align-items: flex-start;
    /* Alinea los elementos al inicio */
    justify-content: center;
    gap: 10px;
    padding: 10px;
    width: 100%;
}

.playersResult {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--blue-color);
    ;
    border-radius: 5px;
}

.dialog {
    width: 50rem;
}

.right-side {
    margin-left: auto;
    display: flex;
    gap: 10px;
}

.playerName {
    font-size: 1rem;
    font-weight: bold;
}

.flex-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 10px;
    width: 100%;
    /* flex-direction: column; */
}

.flex-container-vertical {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 10px;
    width: 100%;
    flex-direction: column;
}

.flex-container-result {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 10px;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    /* flex-direction: column; */
}

.games-result {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    padding: 10px;
    width: 100%;
    border-radius: 20%;
    
    /* flex-direction: column; */
}

.games-result-winner, .games-result-loser {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    padding: 10px;
    width: 10%;
    border-radius: 20%;
    border: 2px solid white; /* Corrected border property */
}

/* .games-result-loser {
    background-color: gray;
} */

.games-result-winner {
    background-color: gray;
}

.playersResult {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(100, 189, 100);
    border-radius: 5px;
}

.left-result {
    justify-content: flex-start;
}

.right-result {
    justify-content: flex-end;
}

/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
    .panel {
        padding: 1rem;
        margin: 0.5rem;
        box-shadow: none;
        /* Eliminar sombras en móviles */
    }

    .dialog-content {
        padding: 0rem;
    }

    .center-div {
        flex-direction: column;
        align-items: stretch;
        /* Asegura que los elementos ocupen todo el ancho */
    }

    .left-result {
        justify-content: flex-start;
    }

    .right-result {
        justify-content: flex-end;
    }

    .p-calendar {
        width: 100%;
        margin: 0;
    }

    .flex-container{
        display: flex;
        align-items: center;
        gap: 0rem;
        padding: 0rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        /* size: 0.5rem; */
    }

    .games-result {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0rem;
        /* gap: 5rem;
        padding: 10px;
        width: 100%;
        border-radius: 20%; */
        
        /* flex-direction: column; */
    }
}
</style>
