<script setup lang="ts">
import type { Match } from '@/interfaces/MatchesInterfaces';
import { useCreateMatchStore } from '@/stores/createMatchStore';
import { getSetsForMatch, getSetsForMatchByPlayer } from '@/services/matchServices';
import { ref } from 'vue';
import { useGetData } from '@/services/requests/getData';
import { getGamesBySet } from '@/services/gameService';


const props = defineProps<{
    visible: boolean;
    setVisible: (value: boolean) => void;
    matchInfo: Match;
}>();

const { getGamesBySetQuery } = useGetData();

// const sets = ref(getSetsForMatch(props.matchInfo.id));

const totalPuntuationP1 = ref(0);
const totalPuntuationP2 = ref(0);


</script>

<template>
    <Dialog :visible="visible" class="dialog" :closable="false">
        <div class="dialog">
            <div class="playersResult">
                <div class="flex-container" id="player1">
                    <div class="flex-container">
                        <Avatar :label="matchInfo.player1.name.charAt(0).toUpperCase()" class="mr-2" size="normal" />
                        <span class="playerName"> {{ matchInfo.player1.name }} </span>
                        <div class="right-side">
                            <div class="flex-container-result"
                                v-for="setScore in getSetsForMatchByPlayer(matchInfo.id, matchInfo.player1.id)"
                                :style="setScore?.isWinner ? 'background-color: gold' : ''">
                                <span :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{ setScore?.score
                                    }}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="flex-container" id="player2">
                    <div class="flex-container">
                        <Avatar :label="matchInfo.player2.name.charAt(0).toUpperCase()" class="mr-2" size="normal" />
                        <span class="playerName"> {{ matchInfo.player2.name }} </span>
                        <div class="right-side">
                            <div class="flex-container-result"
                                v-for="setScore in getSetsForMatchByPlayer(matchInfo.id, matchInfo.player2.id)"
                                :style="setScore?.isWinner ? 'background-color: gold' : ''">
                                <span :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{ setScore?.score
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-container-vertical" style="justify-content: center; margin-top: 1rem;">
                <span style="justify-content: center; font-weight: bold;">Línea de partido</span>
                <div>
                    <Accordion :activeIndex="0">
                        <AccordionTab v-for="set in getSetsForMatch(matchInfo.id)" :header="'Set '+set.numberSet">
                            <div v-for="game in getGamesBySet(set.id)" class="flex-container">
                                <span> {{ game.player1Score + ' - ' + game.player2Score }}</span>
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
            <div class="flex-container-vertical" style="justify-content: center; margin-top: 1rem;">
                <span style="justify-content: center; font-weight: bold;">Estadísticas</span>
            </div>
        </div>
        <template #footer>
            <Button label="Cerrar" text severity="secondary" @click="setVisible(false)" autofocus />
        </template>
    </Dialog>

</template>

<style scoped>
.dialog {
    width: 25rem;
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

.playersResult {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(100, 189, 100);
    border-radius: 5px;
}
</style>