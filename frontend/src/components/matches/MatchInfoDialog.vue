<script setup lang="ts">
import type { Match } from '@/interfaces/MatchesInterfaces';
import { useCreateMatchStore } from '@/stores/createMatchStore';
import { getSetsForMatch, getSetsForMatchByPlayer } from '@/services/matchServices';
import { ref } from 'vue';


const props = defineProps<{
    visible: boolean;
    setVisible: (value: boolean) => void;
    matchInfo: Match;
}>();

const tableContent = [
    { player: props.matchInfo.player1.name, place: props.matchInfo.place, sets: getSetsForMatch(props.matchInfo.id) },
    { player: props.matchInfo.player2.name, place: props.matchInfo.place, sets: getSetsForMatch(props.matchInfo.id) },
];

/**
 * @description Setting the name of the columns
 */
const columns = [
    {
        field: {
            header: "Jugadores",
            value: 'player'
        }
    },
    {
        field: {
            header: "Resultado",
            value: "sets"
        }
    }
]

console.log("tt");

const totalPuntuationP1 = ref(0);
const totalPuntuationP2 = ref(0);

</script>

<template>
    <Dialog :visible="visible" class="dialog" :closable="false">
        <div class="dialog">
            <div class="flex-container" id="player1">
                <div class="flex-container">
                    <Avatar :label="matchInfo.player1.name.charAt(0).toUpperCase()" class="mr-2" size="normal" />
                    <span> {{ matchInfo.player1.name }} </span>
                    <div class="right-side">
                        <span v-for="setScore in getSetsForMatchByPlayer(matchInfo.id, matchInfo.player1.id)"
                            :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{ setScore?.score }}</span>
                    </div>
                </div>

            </div>
            <div class="flex-container" id="player2">
                <div class="flex-container">
                    <Avatar :label="matchInfo.player2.name.charAt(0).toUpperCase()" class="mr-2" size="normal" />
                    <span> {{ matchInfo.player2.name }} </span>
                    <div class="right-side">
                        <span v-for="setScore in getSetsForMatchByPlayer(matchInfo.id, matchInfo.player2.id)"
                            :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{ setScore?.score }}</span>
                    </div>
                </div>
            </div>
            <div class="flex-container" style="justify-content: center; margin-top: 1rem;">
                <span style="justify-content: center; font-weight: bold;">Línea de partido</span>
            </div>
            <div class="flex-container" style="justify-content: center; margin-top: 1rem;">
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

.flex-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px;
  width: 100%;
  /* flex-direction: column; */
}
</style>