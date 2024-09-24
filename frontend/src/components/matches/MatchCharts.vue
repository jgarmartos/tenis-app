<script setup lang="ts">
import type { Match } from '@/interfaces/MatchesInterfaces';
import type { MatchStatistics } from '@/interfaces/StatisticsInterface';
import { getStats, useMatchStatistics } from '@/services/requests/getData';
import { computed, ref, watch } from 'vue';
import ProgressBar from '@/components/ProgressBar.vue';


const props = defineProps<{
    matchInfo: Match
}>();

const statsQuery = useMatchStatistics(props.matchInfo.id);

const statsJ1 = computed(() => statsQuery.data.value?.player1Statistics);
const statsJ2 = computed(() => statsQuery.data.value?.player2Statistics);

</script>

<template>
    <!-- <div v-for="stat in value" class="flex-container">
        <MeterGroup :value="stat.player1" :max="100" />
        <MeterGroup :value="stat.player2" :max="100"  />
    </div>   -->
    <div class="flex-container">
        <ProgressBar :value1="statsJ1?.statistics.pointsWon ?? 0" :value2="statsJ2?.statistics.pointsWon ?? 0" title="Puntos ganados" class="progress-bar" />
        <ProgressBar :value1="statsJ1?.statistics.gamesWon ?? 0" :value2="statsJ2?.statistics.gamesWon ?? 0" title="Juegos ganados" class="progress-bar" />
        <ProgressBar :value1="statsJ1?.statistics.gamesWonAsReceiver ?? 0" :value2="statsJ2?.statistics.gamesWonAsReceiver ?? 0" title="Servicios rotos" class="progress-bar" />
        <ProgressBar :value1="statsJ1?.statistics.gamesWonAsServer ?? 0" :value2="statsJ2?.statistics.gamesWonAsServer ?? 0" title="Servicios ganados" class="progress-bar"/>
        <ProgressBar :value1="statsJ1?.statistics.pointsWonAsServer ?? 0" :value2="statsJ2?.statistics.pointsWonAsServer ?? 0" title="Puntos al servicio" class="progress-bar"/>
        <ProgressBar :value1="statsJ1?.statistics.pointsWonAsReceiver ?? 0" :value2="statsJ2?.statistics.pointsWonAsReceiver ?? 0" title="Puntos al resto" class="progress-bar"/>
        <ProgressBar :value1="statsJ1?.statistics.gamesWonTo0 ?? 0" :value2="statsJ2?.statistics.gamesWonTo0 ?? 0" title="Juegos ganados a 0" class="progress-bar"/>
        <ProgressBar :value1="statsJ1?.statistics.gamesWonTo15 ?? 0" :value2="statsJ2?.statistics.gamesWonTo15 ?? 0" title="Juegos ganados a 15" class="progress-bar"/>
        <ProgressBar :value1="statsJ1?.statistics.gamesWonTo30 ?? 0" :value2="statsJ2?.statistics.gamesWonTo30 ?? 0" title="Juegos ganados a 30" class="progress-bar"/>
        <ProgressBar :value1="statsJ1?.statistics.gamesWonTo40 ?? 0" :value2="statsJ2?.statistics.gamesWonTo40 ?? 0" title="Juegos ganados en AD" class="progress-bar"/>
    </div>


</template>

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-between;
    margin: 0 0 1rem 0;
    flex-direction: column;
}

.progress-bar {
    /* width: 100%; */
    color: white;
    height: 100%;
    width: 30%;
    /* background-color: aliceblue; */
    padding: 2rem;
}

@media (max-width: 768px) {
    .flex-container {
        flex-direction: column;
    }
    .progress-bar {
        width: 100%;
    }
}
</style>