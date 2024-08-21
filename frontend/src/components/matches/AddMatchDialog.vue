<script setup lang="ts">
import { computed, onUpdated, ref, watch, type Ref } from "vue";
import saveData from "@/services/saveData";
import type { MatchSubmit } from "@/interfaces/MatchesInterfaces";
import getInitialData from "@/services/getInitialData";
import { useQuery } from "@tanstack/vue-query";
import type { SetSubmit } from "@/interfaces/SetsInterfaces";
import type { GameSubmit } from "@/interfaces/GamesInterfaces";

const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
}>();

const match = ref<MatchSubmit>({
  player1: 0,
  player2: 0,
  competition: 0,
  place: 0,
  date: new Date("2021-10-10T10:00:00"),
  startTime: new Date("2021-10-10T10:00:00"),
  endTime: new Date("2021-10-10T10:00:00"),
  winner: null,
});

const submitSet = ref<SetSubmit>({
    matchId: 0,
    numberSet: 0,
    winner: null,
    scorePlayer1: 0,
    scorePlayer2: 0,
});

const submitGame = ref<GameSubmit>({
    set: 0,
    winner: null,
    scorePlayer1: 0,
    scorePlayer2: 0,
    pointsPlayer1: 0,
    pointsPlayer2: 0,
    gameNumber: 0,
});

const saveMatch = () => {
  if (!selectedPlayer1.value || !selectedPlayer2.value || !selectedPlace.value) {
    return;
  }
  // createAndSaveSets()
  props.setVisible(false);
  match.value.player1 = selectedPlayer1.value.id;
  match.value.player2 = selectedPlayer2.value.id;
  match.value.competition = selectedCompetition.value?.id;
  match.value.place = selectedPlace.value.id;
  match.value.date = startTime.value;
  match.value.startTime = startTime.value;
  match.value.endTime = endTime.value;
  // if (sets.value[4].score1 > sets.value[4].score2) {
  //   match.value.winner = selectedPlayer1.value.id;
  // } else {
  //   match.value.winner = selectedPlayer2.value.id;
  // }
  saveData.saveMatch(match.value).then((response) => {
    props.retry();
    createAndSaveSets(response.id);
  });
};

function createAndSaveSets(id: number) {
  if (!sets.value) {
    return;
  }
  sets.value.forEach((set, index) => {
    submitSet.value.matchId = id;
    submitSet.value.numberSet = index + 1;
    submitSet.value.scorePlayer1 = set.score1;
    submitSet.value.scorePlayer2 = set.score2;
    saveData.saveSet(submitSet.value).then((response) => {
      props.retry();
      createAndSaveGames(response.id);
    });
  });
}

function createAndSaveGames(id: number) {
  if (!sets.value) {
    return;
  }
  sets.value.forEach((set, index) => {
    set.games.forEach((game, index) => {
      submitGame.value.set = id;
      submitGame.value.gameNumber = index + 1;
      submitGame.value.scorePlayer1 = game.selectedPuntuation1;
      submitGame.value.scorePlayer2 = game.selectedPuntuation2;
      saveData.saveGame(submitGame.value).then(() => {
        props.retry();
      });
    });
  });
}

const playersFn = useQuery({
  queryKey: ["players"],
  queryFn: getInitialData.initialPlayersData,
});

const competitionsFn = useQuery({
  queryKey: ["competitions"],
  queryFn: getInitialData.initialCompetitionsData,
});

const placesFn = useQuery({
  queryKey: ["places"],
  queryFn: getInitialData.initialPlacesData,
});

const players = computed(() => {
  return playersFn.data.value?.data;
});

const competitions = computed(() => {
  return competitionsFn.data.value?.data;
});

const places = computed(() => {
  return placesFn.data.value?.data;
});

const selectedPlayer1 = ref(players.value?.[0]);

const selectedPlayer2 = ref(players.value?.[0]);

const selectedCompetition = ref(competitions.value?.[0]);

const selectedPlace = ref(places.value?.[0]);

const startTime = ref();

const endTime = ref();

const sets = ref(
  Array.from({ length: 5 }, (_, i) => ({
    name: `Set ${i + 1}`,
    score1: ref(0),
    score2: ref(0),
    games: createGames(),
  }))
);

function createGames() {
  return Array.from({ length: 13 }, (_, i) => ({
    name: `Game ${i + 1}`,
    selectedPuntuation1: ref(0),
    selectedPuntuation2: ref(0),
  }));
}


  sets.value.forEach((set) => {
  watch(
    () => set.games.map(game => [game.selectedPuntuation1, game.selectedPuntuation2]),
    () => {
      let score1 = 0;
      let score2 = 0;

      set.games.forEach((game) => {
        if (
          game.selectedPuntuation1 == 40 &&
          ["0", "15", "30"].includes(game.selectedPuntuation2.toString())
        ) {
          score1++;
        } else if (
          game.selectedPuntuation2 == 40 &&
          ["0", "15", "30"].includes(game.selectedPuntuation1.toString())
        ) {
          score2++;
        } else if (game.selectedPuntuation1 == 50 && game.selectedPuntuation2 != 50) {
          score1++;
        } else if (game.selectedPuntuation2 == 50 && game.selectedPuntuation1 != 50) {
          score2++;
        }
      });

      set.score1 =+ score1;
      set.score2 =+ score2;
    },
    { deep: true }
  );
});


watch(
  () => players && players.value,
  () => {
    selectedPlayer1.value = players.value?.[0];
    selectedPlayer2.value = players.value?.[0];
  }
);

watch(
  () => competitions && competitions.value,
  () => {
    selectedCompetition.value = competitions.value?.[0];
  }
);


</script>

<template>
  <Dialog :visible="visible" modal header="Crear partido" class="dialog" :closable="false">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Crear partido</span>
      </div>
    </template>
    <div class="dialog-content">
      <div class="add-player-line" name="competition">
        <label for="competition" class="font-semibold w-6rem">Competición</label>
        <Dropdown v-model="selectedCompetition" :options="competitions" filter optionLabel="name"
          placeholder="Selecciona una competición: " class="right-side">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="add-player-line" name="place">
        <label for="place" class="font-semibold w-6rem">Lugar</label>
        <Dropdown v-model="selectedPlace" :options="places" filter optionLabel="name"
          placeholder="Selecciona un lugar: " class="right-side">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="add-player-line" name="startDate">
        <label for="date" class="font-semibold w-6rem">Fecha Inicio</label>
        <Calendar v-model="startTime" showIcon :showOnFocus="false" dateFormat="dd/mm/yy" />
      </div>
      <div class="add-player-line" name="endDate">
        <label for="date" class="font-semibold w-6rem">Fecha Final</label>
        <Calendar v-model="endTime" showIcon :showOnFocus="false" dateFormat="dd/mm/yy" />
      </div>
      <div class="add-player-line" name="resultTitle">
        <label for="date" class="font-semibold w-6rem">Resultado</label>
      </div>
      <div class="add-player-line" name="setResults">
        <TabView>
          <TabPanel v-for="set in sets" :key="set.name" :header="set.name">
            <div class="flex-container">
              <div class="flex-container-players">
                <div>
                  <Dropdown v-model="selectedPlayer1" :options="players" filter optionLabel="name"
                    placeholder="Jugador 1">
                  </Dropdown>
                </div>
                <div>
                  <Dropdown v-model="selectedPlayer2" :options="players" filter optionLabel="name"
                    placeholder="Jugador 2">
                  </Dropdown>
                </div>
              </div>
              <div class="flex-container-points">
                <Stepper>
                  <StepperPanel v-for="game in set.games" :header="game.name">
                    <template #content="{ nextCallback }">
                      <div>
                        <div class="flex-container">
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation1" inputId="puntuation1" name="0" value="0"
                              selected />
                            <label for="puntuation1" class="ml-2">0</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation1" inputId="puntuation2" name="15" value=15 />
                            <label for="puntuation2" class="ml-2">15</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation1" inputId="puntuation3" name="30" value=30 />
                            <label for="puntuation3" class="ml-2">30</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation1" inputId="puntuation4" name="40" value=40 />
                            <label for="puntuation4" class="ml-2">40</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation1" inputId="puntuation5" name="V" value="50" />
                            <label for="puntuation5" class="ml-2">V</label>
                          </div>
                          <div class="flex-container">
                            <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                              v-model="set.score1" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-container">
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation2" inputId="puntuation1" name="0" value="0" />
                            <label for="puntuation1" class="ml-2">0</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation2" inputId="puntuation2" name="15"
                              value="15" />
                            <label for="puntuation2" class="ml-2">15</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation2" inputId="puntuation3" name="30"
                              value="30" />
                            <label for="puntuation3" class="ml-2">30</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation2" inputId="puntuation4" name="40"
                              value="40" />
                            <label for="puntuation4" class="ml-2">40</label>
                          </div>
                          <div class="flex-container">
                            <RadioButton v-model="game.selectedPuntuation2" inputId="puntuation5" name="V" value="50" />
                            <label for="puntuation5" class="ml-2">V</label>
                          </div>
                          <div class="flex-container">
                            <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                              v-model="set.score2" />
                          </div>
                        </div>
                      </div>

                      <!-- <div>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                      </div> -->
                    </template>
                  </StepperPanel>
                </Stepper>
              </div>
            </div>

          </TabPanel>
        </TabView>
      </div>
    </div>
    <template #footer>
      <Button label="Cancelar" text severity="secondary" @click="setVisible(false)" autofocus />
      <Button label="Guardar" outlined severity="secondary" @click="saveMatch" autofocus />
    </template>
  </Dialog>
</template>

<style scoped>
.dialog-content {
  padding: 1rem;
  width: 60rem;
}

.score {
  width: 10px;
}

.add-player-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
}

.right-side {
  margin-left: auto;
  max-width: 14rem;
}

.right-side-games {
  margin-left: auto;
  max-width: 14rem;
}


.flex-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px;
  width: 100%;
  /* flex-direction: column; */
}

.flex-container-points-title {
  display: flex;
  align-items: right;
  gap: 1rem;
  padding: 5px;
  width: 100%;
  /* flex-direction: column; */
}

.flex-container-players {
  margin-top: 4rem;
  display: flex;
  align-items: left;
  gap: 1rem;
  padding: 5px;
  width: 50%;
  flex-direction: column;
}

.flex-container-points {
  display: flex;
  align-items: right;
  gap: 1rem;
  padding: 5px;
  width: 80%;
  flex-direction: column;
}

.p-tabview.p-component {
  width: 100%;
}

.p-calendar {
  width: 60%;
  margin-left: auto;
}
</style>
