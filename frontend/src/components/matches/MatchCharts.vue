<script setup lang="ts">
import type { Match } from '@/interfaces/MatchesInterfaces';
import type { MatchStatistics } from '@/interfaces/StatisticsInterface';
import { useMatchStatistics } from '@/services/statistics/index';
import { computed, ref, watch } from 'vue';
import ProgressBar from '@/components/ProgressBar.vue';

const pointsWonTitle = ref<string>('Puntos ganados');

const gamesWonTitle = ref<string>('Juegos ganados');

const brokenServicesTitle = ref<string>('Servicios rotos');

const servicesWonTitle = ref<string>('Servicios ganados');

const servicePointsWonTitle = ref<string>('Puntos al servicio');

const returnWonTitle = ref<string>('Puntos al resto');

const gamesWonTo0Title = ref<string>('Juegos ganados a 0');

const gamesWonTo15Title = ref<string>('Juegos ganados a 15');

const gamesWonTo30Title = ref<string>('Juegos ganados a 30');

const gamesWonToDeuceTitle = ref<string>('Juegos ganados en AD');

const props = defineProps<{
  matchInfo: Match;
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
    <ProgressBar :value1="statsJ1?.statistics.pointsWon ?? 0" :value2="statsJ2?.statistics.pointsWon ?? 0"
      :title="pointsWonTitle" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.gamesWon ?? 0" :value2="statsJ2?.statistics.gamesWon ?? 0"
      :title="gamesWonTitle" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.gamesWonAsReceiver ?? 0"
      :value2="statsJ2?.statistics.gamesWonAsReceiver ?? 0" :title="brokenServicesTitle" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.gamesWonAsServer ?? 0" :value2="statsJ2?.statistics.gamesWonAsServer ?? 0"
      :title="servicesWonTitle" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.pointsWonAsServer ?? 0"
      :value2="statsJ2?.statistics.pointsWonAsServer ?? 0" :title="servicePointsWonTitle" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.pointsWonAsReceiver ?? 0"
      :value2="statsJ2?.statistics.pointsWonAsReceiver ?? 0" :title="returnWonTitle" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.gamesWonTo0 ?? 0" :value2="statsJ2?.statistics.gamesWonTo0 ?? 0"
      :title="gamesWonTo0Title" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.gamesWonTo15 ?? 0" :value2="statsJ2?.statistics.gamesWonTo15 ?? 0"
      :title="gamesWonTo15Title" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.gamesWonTo30 ?? 0" :value2="statsJ2?.statistics.gamesWonTo30 ?? 0"
      :title="gamesWonTo30Title" class="progress-bar" />
    <ProgressBar :value1="statsJ1?.statistics.gamesWonTo40 ?? 0" :value2="statsJ2?.statistics.gamesWonTo40 ?? 0"
      :title="gamesWonToDeuceTitle" class="progress-bar" />
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
