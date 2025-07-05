/**
 * PlayerProfile.vue
 *
 * Displays a detailed profile for a player, including statistics and recent matches.
 * Integrates charts for visualizing match, set, and game data.
 *
 * @module components/players/PlayerProfile
 */

<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import { usePlayerQuery } from '@/services/requests/usePlayer';
import { ref, watchEffect } from 'vue';
import Chart from 'primevue/chart';
import PlayerMatchesTableComponent from './PlayerMatchesTableComponent.vue';
import { useRoute } from 'vue-router';

/**
 * Get the player ID from the route parameters.
 */
const route = useRoute();
const playerId = route.params.id;

/**
 * Fetch player data using a composable.
 */
const { data: player, isLoading, isError } = usePlayerQuery(playerId);

/**
 * Chart data for matches played (won/lost).
 */
const matchesPlayedData = ref({
    labels: ['Ganados', 'Perdidos'],
    datasets: [{ data: [0, 0], backgroundColor: ['#42f59b', '#FF6384'] }],
});

/**
 * Chart data for sets played (won/lost).
 */
const setsPlayedData = ref({
    labels: ['Ganados', 'Perdidos'],
    datasets: [{ data: [0, 0], backgroundColor: ['#42f59b', '#FF6384'] }],
});

/**
 * Chart data for games played (won/lost).
 */
const gamesPlayedData = ref({
    labels: ['Ganados', 'Perdidos'],
    datasets: [{ data: [0, 0], backgroundColor: ['#42f59b', '#FF6384'] }],
});

/**
 * Chart data for games won by score.
 */
const gamesWonToX = ref({
    labels: ['40-0', '40-15', '40-30', 'AD-40'],
    datasets: [
        { data: [0, 0, 0, 0], backgroundColor: ['#42f59b', '#FF6384', '#FFCE56', '#E7E9ED'] },
    ],
});

/**
 * Chart data for games lost by score.
 */
const gamesLostToX = ref({
    labels: ['40-0', '40-15', '40-30', 'AD-40'],
    datasets: [
        { data: [0, 0, 0, 0], backgroundColor: ['#42f59b', '#FF6384', '#FFCE56', '#E7E9ED'] },
    ],
});

/**
 * Chart options for all charts.
 */
const chartOptions = ref({
    plugins: {
        legend: { position: 'top' },
    },
});

/**
 * Watch for player data changes and update chart data accordingly.
 */
watchEffect(async () => {
    updateChartData(player.value);
});

/**
 * Updates all chart data based on the player's statistics.
 * @param {any} playerData - Player data object
 */
function updateChartData(playerData: any) {
    matchesPlayedData.value.datasets[0].data = [
        playerData.playerStatistics.matchesWon,
        playerData.playerStatistics.matchesLost,
    ];
    setsPlayedData.value.datasets[0].data = [
        playerData.playerStatistics.setsWon,
        playerData.playerStatistics.setsLost,
    ];
    gamesPlayedData.value.datasets[0].data = [
        playerData.playerStatistics.gamesWon,
        playerData.playerStatistics.gamesLost,
    ];
    gamesWonToX.value.datasets[0].data = [
        playerData.playerStatistics.gamesWonTo0,
        playerData.playerStatistics.gamesWonTo15,
        playerData.playerStatistics.gamesWonTo30,
        playerData.playerStatistics.gamesWonTo40,
    ];
    gamesLostToX.value.datasets[0].data = [
        playerData.playerStatistics.gamesLostTo0,
        playerData.playerStatistics.gamesLostTo15,
        playerData.playerStatistics.gamesLostTo30,
        playerData.playerStatistics.gamesLostTo40,
    ];
}
</script>

<template>
    <!--
      Player profile page with statistics, charts, and recent matches.
      Displays loading and error states as needed.
    -->
    <header>
        <MenuBar />
    </header>

    <main>
        <div class="panels-container">
            <Panel>
                <div class="flex-center">
                    <div v-if="isLoading">Cargando jugador...</div>
                    <div v-else-if="isError">Error al cargar los datos del jugador.</div>
                    <div v-else>
                        <header>
                            <h1>{{ player.name }}</h1>
                        </header>
                        <Fieldset legend="Estadísticas" :toggleable="true" class="category-box">
                            <div class="flex-horizontal">
                                <p class="flex-vertical">
                                    <Chart type="doughnut" :data="matchesPlayedData" :options="chartOptions" />
                                <h3>Partidos jugados: {{ player.playerStatistics.matchesPlayed }}</h3>
                                </p>
                                <p class="flex-vertical">
                                    <Chart type="doughnut" :data="setsPlayedData" :options="chartOptions" />
                                <h3>Sets jugados: {{ player.playerStatistics.setsPlayed }}</h3>
                                </p>
                                <p class="flex-vertical">
                                    <Chart type="doughnut" :data="gamesPlayedData" :options="chartOptions" />
                                <h3>Juegos jugados: {{ player.playerStatistics.gamesPlayed }}</h3>
                                </p>
                            </div>
                            <!--
                              Additional charts for games won/lost by score can be enabled here.
                            -->
                            <div class="grid-container-three">
                                <div class="grid-element"> 
                                    <p> Partidos jugados </p>
                                    <div class="grid-statistic">
                                        {{ player.playerStatistics.matchesPlayed }}
                                    </div>
                                </div>
                                <div class="grid-element"> 
                                    <p> Partidos ganados </p>
                                    <div class="grid-statistic-won">
                                        {{ player.playerStatistics.matchesWon }}
                                    </div>
                                </div>
                                <div class="grid-element"> 
                                    <p> Partidos perdidos </p>
                                    <div class="grid-statistic-lost">
                                        {{ player.playerStatistics.matchesLost }}
                                    </div>
                                </div>
                                <div class="grid-element"> 
                                    <p> Sets jugados </p>
                                    <div class="grid-statistic">
                                        {{ player.playerStatistics.setsPlayed }}
                                    </div>
                                </div>
                                <div class="grid-element"> 
                                    <p> Sets ganados </p>
                                    <div class="grid-statistic-won">
                                        {{ player.playerStatistics.setsWon }}
                                    </div>
                                    </div>
                                <div class="grid-element">
                                    <p> Sets perdidos </p>
                                    <div class="grid-statistic-lost">
                                        {{ player.playerStatistics.setsLost }}
                                    </div>
                                    </div>
                                <div class="grid-element">
                                    <p> Juegos jugados </p>
                                    <div class="grid-statistic">
                                        {{ player.playerStatistics.gamesPlayed }}
                                    </div>
                                    </div>
                                <div class="grid-element">
                                    <p> Juegos ganados </p>
                                    <div class="grid-statistic-won">
                                        {{ player.playerStatistics.gamesWon }}
                                    </div>
                                    </div>
                                <div class="grid-element">
                                    <p> Juegos perdidos </p>
                                    <div class="grid-statistic-lost">
                                        {{ player.playerStatistics.gamesLost }}
                                    </div>
                                    </div>

                            </div>
                            <div class="grid-container-three">
                                <div class="grid-element">
                                    <p> Partidos ganados </p>
                                    <div class="grid-statistic-knob">
                                        <Knob v-model="player.playerStatistics.winPercentage" :valueTemplate="val => `${val}%`" />
                                    </div>
                                </div>
                                <div class="grid-element">
                                    <p> Sets ganados </p>
                                    <div class="grid-statistic-knob">
                                        <Knob v-model="player.playerStatistics.setsWinPercentage" :valueTemplate="val => `${val}%`" />
                                    </div>
                                </div>
                                <div class="grid-element">
                                    <p> Juegos ganados </p>
                                    <div class="grid-statistic-knob">
                                        <Knob v-model="player.playerStatistics.gamesWinPercentage" :valueTemplate="val => `${val}%`" />
                                    </div>
                                </div>
                                <div class="grid-element">
                                    <p> Puntos ganados </p>
                                    <div class="grid-statistic-knob">
                                        <Knob v-model="player.playerStatistics.pointsWinPercentage" :valueTemplate="val => `${val}%`" />
                                    </div>
                                </div>
                                <div class="grid-element">
                                    <p> Servicios ganados </p>
                                    <div class="grid-statistic-knob">
                                        <Knob v-model="player.playerStatistics.gamesWinPercentageAsServer" :valueTemplate="val => `${val}%`" />
                                    </div>
                                </div>
                                <div class="grid-element">
                                    <p> Restos ganados </p>
                                    <div class="grid-statistic-knob">
                                        <Knob v-model="player.playerStatistics.gamesWinPercentageAsReceiver" :valueTemplate="val => `${val}%`" />
                                    </div>
                                </div>
                            </div>
                        </Fieldset>
                        <Fieldset legend="Últimos partidos" :toggleable="true" class="category-box">
                            <PlayerMatchesTableComponent :playerId="playerId.toString()" />
                        </Fieldset>
                    </div>
                </div>
            </Panel>
        </div>
    </main>
</template>

<style scoped>
/*
  Styles for the player profile page, including layout, charts, and statistics grids.
*/
.panels-container {
    padding-top: 1%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.flex-center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-inline: 1rem;
}

.category-box {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    gap: 2rem;
}

.flex-horizontal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap; /* For responsive layout */
}

.flex-vertical {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.grid-container-three {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
}

.grid-element {
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
}

.grid-statistic,
.grid-statistic-won,
.grid-statistic-lost {
    font-size: 1rem;
    font-weight: bold;
    padding: 0.3rem;
    border-radius: 0.5rem;
    color: white;
    width: 80%;
    margin: 0 auto;
    border: 3px solid white;
}

.grid-statistic-won {
    background-color: #42f59b;
    border: 2px solid white;
}

.grid-statistic-lost {
    background-color: #FF6384;
    border: 2px solid white;
}

.p-chart {
    width: 100%;
    height: 100%;
    max-width: 200px; /* Responsive max size */
    max-height: 200px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .category-box {
        padding: 0.5rem;
        gap: 1rem;
    }

    .flex-horizontal {
        flex-direction: column;
        gap: 1.5rem;
    }

    .grid-container-three {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }

    .grid-statistic,
    .grid-statistic-won,
    .grid-statistic-lost {
        font-size: 0.9rem;
        width: 100%;
    }

    .p-chart {
        max-width: 150px;
        max-height: 150px;
    }
}
</style>

