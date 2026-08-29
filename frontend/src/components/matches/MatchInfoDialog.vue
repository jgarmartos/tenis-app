<script setup lang="ts">
import type { Match } from '@/interfaces/MatchesInterfaces';
import { useAppData } from '@/services/core/useAppData';
import {
  getSetsForMatch,
  getSetsForMatchByPlayer,
} from '@/services/matches/matchSetsHelpers';
import { onMounted, ref, watch } from 'vue';
import { getGamesBySet } from '@/services/games/gameHelpers';
import { useI18n } from 'vue-i18n';
import MatchCharts from './MatchCharts.vue';

const { sets, games, isLoading } = useAppData();

/**
 * i18n composable for accessing translation functions.
 */
const { t } = useI18n();

/**
 * Properties of the component
 * @param visible - Dialog visibility
 * @param setVisible - Function to set the dialog visibility
 * @param matchInfo - Match information
 */
const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  matchInfo: Match;
}>();

const setPuntationP1 = ref<number>(0);
const setPuntationP2 = ref<number>(0);

const calculateSetsPuntuations = () => {
  setPuntationP1.value = 0;
  setPuntationP2.value = 0;

  getSetsForMatch(sets.value, props.matchInfo.id).forEach(set => {
    if (set.winner?.id === props.matchInfo.player1.id) {
      setPuntationP1.value++;
    } else if (set.winner?.id === props.matchInfo.player2.id) {
      setPuntationP2.value++;
    }
  });
};

const gamesPuntuationsPerSetP1 = ref<{ [setId: number]: number[] }>({});
const gamesPuntuationsPerSetP2 = ref<{ [setId: number]: number[] }>({});

const calculatePuntuations = () => {
  gamesPuntuationsPerSetP1.value = {};
  gamesPuntuationsPerSetP2.value = {};

  getSetsForMatch(sets.value, props.matchInfo.id).forEach(set => {
    let player1GamesWon = 0;
    let player2GamesWon = 0;

    gamesPuntuationsPerSetP1.value[set.id] = [];
    gamesPuntuationsPerSetP2.value[set.id] = [];

    getGamesBySet(games.value, set.id).forEach(game => {
      if (game.winner?.id === props.matchInfo.player1.id) {
        player1GamesWon++;
        gamesPuntuationsPerSetP1.value[set.id].push(player1GamesWon);
        gamesPuntuationsPerSetP2.value[set.id].push(player2GamesWon);
      } else if (game.winner?.id === props.matchInfo.player2.id) {
        player2GamesWon++;
        gamesPuntuationsPerSetP1.value[set.id].push(player1GamesWon);
        gamesPuntuationsPerSetP2.value[set.id].push(player2GamesWon);
      }
    });
  });
};

// Recalculate when matchInfo updates
watch(() => props.matchInfo, calculatePuntuations);

watch(() => props.matchInfo, calculateSetsPuntuations);

// Run the calculation when the component is mounted
onMounted(() => {
  calculatePuntuations();
});
</script>

<template>
  <Dialog :visible="visible" class="dialog" :header="t('matches.infoDialog.title')" :closable="false">
    <!-- Loading state while sets/games are being fetched -->
    <div v-if="isLoading" class="loading-state">
      <ProgressSpinner />
      <span class="loading-text">{{ t('common.loading') }}</span>
    </div>
    <div v-else class="dialog">
      <div class="playersResult">
        <div class="flex-container" id="player1">
          <div class="flex-container">
            <Avatar
              :label="matchInfo.player1.name.charAt(0).toUpperCase()"
              class="mr-2"
              size="normal"
            />
            <span class="playerName" style="color: aliceblue">
              {{ matchInfo.player1.name }}
            </span>
            <div class="right-side">
              <div
                class="flex-container-result"
                v-for="setScore in getSetsForMatchByPlayer(
                  sets,
                  matchInfo.id,
                  matchInfo.player1.id
                )"
                :style="setScore?.isWinner ? 'background-color: gold' : ''"
              >
                <span :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{
                  setScore?.score
                }}</span>
              </div>
              <Divider layout="vertical" />
              <div class="flex-container-result">
                <span> {{ setPuntationP1 }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-container" id="player2">
          <div class="flex-container">
            <Avatar
              :label="matchInfo.player2.name.charAt(0).toUpperCase()"
              class="mr-2"
              size="normal"
            />
            <span class="playerName" style="color: aliceblue">
              {{ matchInfo.player2.name }}
            </span>
            <div class="right-side">
              <div
                class="flex-container-result"
                v-for="setScore in getSetsForMatchByPlayer(
                  sets,
                  matchInfo.id,
                  matchInfo.player2.id
                )"
                :style="setScore?.isWinner ? 'background-color: gold' : ''"
              >
                <span :style="setScore?.isWinner ? 'font-weight: bold' : ''">{{
                  setScore?.score
                }}</span>
              </div>
              <Divider layout="vertical" />
              <div class="flex-container-result">
                <span> {{ setPuntationP2 }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-container-vertical"
        style="justify-content: center; margin-top: 1rem"
      >
        <span style="justify-content: center; font-weight: bold">{{
          t('matches.infoDialog.matchLine')
        }}</span>
        <div style="width: 100%">
          <Accordion :activeIndex="0">
            <AccordionTab
              v-for="set in getSetsForMatch(sets, matchInfo.id)"
              :header="'Set ' + set.numberSet"
            >
              <div
                id="games-results"
                v-for="(game, index) in getGamesBySet(games, set.id)"
                class="flex-container"
              >
                <div
                  class="games-result"
                  style="border-radius: 20%; background-color: gold; width: 50%"
                >
                  <span
                    :style="
                      game.winner?.id == matchInfo.player1.id
                        ? 'font-weight:bold'
                        : ''
                    "
                  >
                    {{ gamesPuntuationsPerSetP1[set.id][index] }}
                  </span>
                </div>
                <div class="games-result">
                  <span v-if="game.server.id == matchInfo.player1.id">
                    <v-icon name="gi-tennis-ball" fill="green" />
                    <v-icon
                      v-if="game.server.id != game.winner?.id"
                      name="bi-x-octagon-fill"
                      fill="red"
                    ></v-icon>
                  </span>
                </div>
                <div class="games-result" style="width: 50%">
                  <span
                    class="left-result"
                    :style="
                      game.winner?.id == matchInfo.player1.id
                        ? 'font-weight: bold'
                        : ''
                    "
                  >
                    {{ game.player1Score }}</span
                  >
                  <span> - </span>
                  <span
                    class="right-result"
                    :style="
                      game.winner?.id == matchInfo.player2.id
                        ? 'font-weight: bold'
                        : ''
                    "
                  >
                    {{ game.player2Score }}</span
                  >
                </div>
                <div class="games-result">
                  <span v-if="game.server.id == matchInfo.player2.id">
                    <v-icon name="gi-tennis-ball" fill="green" />
                    <v-icon
                      v-if="game.server.id != game.winner?.id"
                      name="bi-x-octagon-fill"
                      fill="red"
                    ></v-icon>
                  </span>
                </div>
                <div
                  class="games-result"
                  style="border-radius: 20%; background-color: gold; width: 50%"
                >
                  <span
                    :style="
                      game.winner?.id == matchInfo.player2.id
                        ? 'font-weight:bold'
                        : ''
                    "
                  >
                    {{ gamesPuntuationsPerSetP2[set.id][index] }}
                  </span>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
      <div
        class="flex-container-vertical"
        style="justify-content: center; margin-top: 1rem"
      >
        <span style="justify-content: center; font-weight: bold">{{
          t('matches.infoDialog.statistics')
        }}</span>
        <MatchCharts :matchInfo="matchInfo" />
      </div>
    </div>
    <template #footer>
      <Button
        :label="t('matches.infoDialog.close')"
        text
        severity="secondary"
        @click="setVisible(false)"
        autofocus
      />
    </template>
  </Dialog>
</template>

<style scoped>
.dialog {
  width: 50rem;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  justify-content: center;
}

.loading-text {
  font-size: 0.9rem;
  color: #666;
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
  /* flex-direction: column; */
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
</style>
