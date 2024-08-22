<script setup lang="ts">
import { useCreateMatchStore } from '@/stores/createMatchStore';
import { useDataStore } from '@/stores/useDataStore';
import { computed, ref, watch } from 'vue'

const players = computed(() => useDataStore().players);

const setTypes = ['Set', 'Super Tie Break'];

const selectedSetType = ref(setTypes[0]);

useCreateMatchStore().sets.forEach((set) => {
  watch(
    () => set.games.map(game => [game.selectedPuntuation1, game.selectedPuntuation2]),
    () => {
      let score1 = 0;
      let score2 = 0;

      set.games.forEach((game, index) => {
        if (index === 12) {
          if (game.selectedPuntuation1 >= 7 && game.selectedPuntuation1 > game.selectedPuntuation2 && game.selectedPuntuation1 - game.selectedPuntuation2 >= 2) {
            score1++;
          } else if (game.selectedPuntuation2 >= 7 && game.selectedPuntuation2 > game.selectedPuntuation1 && game.selectedPuntuation2 - game.selectedPuntuation1 >= 2) {
            score2++;
          }
        } else {
          if (game.selectedPuntuation1 == 40 && ["0", "15", "30"].includes(game.selectedPuntuation2.toString())) {
            score1++;
          } else if (game.selectedPuntuation2 == 40 && ["0", "15", "30"].includes(game.selectedPuntuation1.toString())) {
            score2++;
          } else if (game.selectedPuntuation1 == 50 && game.selectedPuntuation2 != 50) {
            score1++;
          } else if (game.selectedPuntuation2 == 50 && game.selectedPuntuation1 != 50) {
            score2++;
          }
        }

      });

      set.score1 = score1;
      set.score2 = score2;
    },
    { deep: true }
  );
});

</script>

<template>
  <div class="add-player-line" name="setResults">
    <TabView>
      <TabPanel v-for="set in useCreateMatchStore().sets" :key="set.name" :header="set.name">

        <!-- RADIOBUTTONS TO SET THE SET TYPE -->

        <div class="flex-options">
          <RadioButton v-model="set.type" :name="setTypes[0]" :value="setTypes[0]" />
          <label for="set">Set</label>
          <RadioButton v-model="set.type" :name="setTypes[1]" :value="setTypes[1]" />
          <label for="superTieBreak">Super Tie Break</label>
        </div>

        <!-- PANEL WITH THE PLAYERS DROPDOWN AND PUNTUATIONS -->

        <div class="flex-container">

          <!-- PLAYERS DROPDOWN -->

          <div class="flex-container-players">
            <div>
              <Dropdown v-model="useCreateMatchStore().selectedPlayer1" :options="players" filter optionLabel="name"
                placeholder="Jugador 1">
              </Dropdown>
            </div>
            <div>
              <Dropdown v-model="useCreateMatchStore().selectedPlayer2" :options="players" filter optionLabel="name"
                placeholder="Jugador 2">
              </Dropdown>
            </div>
          </div>

          <!-- PUNTUATIONS -->

          <div id='Set'  v-if="selectedSetType == 'Set'" class="flex-container-points">
            <Stepper>
              <StepperPanel v-for="(game, index) in set.games" :header="game.name">
                <template v-if="index == 0" #content="{ nextCallback }">
                  <div>
                    <div class="flex-container">
                      <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                        <RadioButton v-model="game.selectedPuntuation1" :inputId="'puntuation' + option"
                          :name="option.toString()" :value="option" />
                        <label v-if="option === 50" :for="'puntuation' + option" class="ml-2">AD</label>
                        <label v-else :for="'puntuation' + option" class="ml-2">{{ option }}</label>
                      </div>
                      <div class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                          v-model="set.score1" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="flex-container">
                      <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                        <RadioButton v-model="game.selectedPuntuation2" :inputId="'puntuation' + option"
                          :name="option.toString()" :value="option" />
                        <label v-if="option === 50" :for="'puntuation' + option" class="ml-2">AD</label>
                        <label v-else :for="'puntuation' + option" class="ml-2">{{ option }}</label>
                      </div>
                      <div class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                          v-model="set.score2" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-container-buttons">
                    <!-- <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" /> -->
                    <Button :label="'Game ' + (index + 2)" icon="pi pi-arrow-right" :iconPos="'right'" @click="nextCallback" />
                  </div>
                </template>
                <template v-else-if="index < 12" #content="{ prevCallback, nextCallback }">
                  <div>
                    <div class="flex-container">
                      <div v-if="index === 12" class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '100px' }"
                          v-model="game.selectedPuntuation1" />
                      </div>
                      <div v-else v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                        <RadioButton v-model="game.selectedPuntuation1" :inputId="'puntuation' + option"
                          :name="option.toString()" :value="option" />
                        <label v-if="option === 50" :for="'puntuation' + option" class="ml-2">AD</label>
                        <label v-else :for="'puntuation' + option" class="ml-2">{{ option }}</label>
                      </div>
                      <div class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                          v-model="set.score1" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="flex-container">
                      <div v-if="index === 12" class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '100px' }"
                          v-model="game.selectedPuntuation2" />
                      </div>
                      <div v-else v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                        <RadioButton v-model="game.selectedPuntuation2" :inputId="'puntuation' + option"
                          :name="option.toString()" :value="option" />
                        <label v-if="option === 50" :for="'puntuation' + option" class="ml-2">AD</label>
                        <label v-else :for="'puntuation' + option" class="ml-2">{{ option }}</label>
                      </div>
                      <div class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                          v-model="set.score2" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-container-buttons">
                    <Button :label="'Game ' + (index)" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    <Button :label="'Game ' + (index + 2)" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                  </div>
                </template>
                <template v-else #content="{ prevCallback }">
                  <div>
                    <div class="flex-container">
                      <div v-if="index === 12" class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '100px' }"
                          v-model="game.selectedPuntuation1" />
                      </div>
                      <div class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                          v-model="set.score1" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="flex-container">
                      <div v-if="index === 12" class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '100px' }"
                          v-model="game.selectedPuntuation2" />
                      </div>
                      <div class="flex-container" style="justify-content: right;">
                        <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                          v-model="set.score2" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-container-buttons">
                    <Button :label="'Game ' + (index)" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                  </div>
                </template>
              </StepperPanel>
            </Stepper>
          </div>
          <div id="Super-Tie-Break" v-else class="flex-container-points">
            <div class="flex-container" style="margin-top: 2rem;">
              <div class="flex-container" style="justify-content: left;">
                <FloatLabel>
                  <InputNumber id="score1" inputId="integeronly" class="score" :inputStyle="{ width: '150px' }"
                    v-model="set.score1" />
                  <label for="score1" style="min-width: 5rem;">{{ useCreateMatchStore().selectedPlayer1.name }}</label>
                </FloatLabel>
              </div>
              <div class="flex-container" style="justify-content: left;">
                <FloatLabel>
                  <InputNumber id="score1" inputId="integeronly" class="score" :inputStyle="{ width: '150px' }"
                    v-model="set.score2" />
                  <label for="score2" style="min-width: 10rem;">{{ useCreateMatchStore().selectedPlayer2.name }}</label>
                </FloatLabel>
              </div>
            </div>
          </div>
        </div>

      </TabPanel>
    </TabView>
  </div>
</template>

<style scoped>
.score {
  width: 50px;
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
  margin-top: 1rem;
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

.flex-container-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 5px;
  width: 100%;
}

.flex-options {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px;
  width: 100%;
}

.p-tabview.p-component {
  width: 100%;
}
</style>