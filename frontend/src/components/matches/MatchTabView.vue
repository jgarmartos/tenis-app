<script setup lang="ts">
import { useCreateMatchStore } from '@/stores/createMatch';
import { watch } from 'vue'

defineProps<{
  players: any;
}>()

useCreateMatchStore().sets.forEach((set) => {
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

</script>

<template>
  <div class="add-player-line" name="setResults">
        <TabView>
          <TabPanel v-for="set in useCreateMatchStore().sets" :key="set.name" :header="set.name">
            <div class="flex-container">
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
</template>

<style scoped>
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

</style>