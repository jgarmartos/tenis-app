<script setup lang="ts">
import { useCreateMatchStore } from '@/stores/createMatchStore';
import { useDataStore } from '@/stores/useDataStore';
import SelectButton from 'primevue/selectbutton';
import { computed, ref, watch } from 'vue'

const players = computed(() => useDataStore().players);

const setTypes = ['Set', 'Super Tie Break'];

const selectedSetType = ref(setTypes[0]);

useCreateMatchStore().sets.forEach((set) => {
  if (!set.startsServing) {
    set.startsServing = null; // Asegurar que initialServer está definido
  }

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
          <SelectButton v-model="set.type" :options="setTypes" />
        </div>

        <!-- PANEL WITH THE PLAYERS DROPDOWN AND PUNTUATIONS -->

        <div class="flex-container">

          <!-- PUNTUATIONS -->

          <div id='Set' v-if="set.type == 'Set'" class="flex-container-points">
            <Stepper>
              <StepperPanel v-for="(game, index) in set.games" :header="game.number + 'º juego'">
                <template v-if="index == 0" #content="{ nextCallback }">
                  <div class="flex-container">
                    <div>
                      <div class="flex-container-row">
                        <div>
                          <span v-if="useCreateMatchStore().selectedPlayer1.name">{{
                            useCreateMatchStore().selectedPlayer1.name }}
                          </span>
                          <span v-else> Jugador 1 </span>
                        </div>
                        <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                          <RadioButton v-model="game.selectedPuntuation1" :inputId="'puntuation' + option"
                            :name="option.toString()" :value="option" />
                          <label v-if="option === 50" :for="'puntuation' + option" class="ml-2">AD</label>
                          <label v-else :for="'puntuation' + option" class="ml-2">{{ option }}</label>
                        </div>
                        <div class="flex-container">
                          <RadioButton id="sever" v-model="set.startsServing" value="player1"></RadioButton>
                          <v-icon name="gi-tennis-ball" fill="green" />

                        </div>
                        <div class="flex-container">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                            v-model="set.score1" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex-container-row">
                        <div>
                          <span v-if="useCreateMatchStore().selectedPlayer2.name"> {{
                            useCreateMatchStore().selectedPlayer2.name }}
                          </span>
                          <span v-else> Jugador 2 </span>
                        </div>
                        <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                          <RadioButton v-model="game.selectedPuntuation2" :inputId="'puntuation' + option"
                            :name="option.toString()" :value="option" />
                          <label v-if="option === 50" :for="'puntuation' + option" class="ml-2">AD</label>
                          <label v-else :for="'puntuation' + option" class="ml-2">{{ option }}</label>
                        </div>
                        <div class="flex-container">
                          <RadioButton id="sever" v-model="set.startsServing" value="player2"></RadioButton>
                          <v-icon name="gi-tennis-ball" fill="green" />

                        </div>
                        <div class="flex-container">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                            v-model="set.score2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="game.selectedPuntuation1 == 50 || game.selectedPuntuation2 == 50 " class="flex-container">
                    <span> Nº iguales: </span>
                    <InputNumber v-model="game.deuceNumber" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" fluid 
                    :inputStyle="{ width: '4rem' }"/>
                  </div>

                  <div class="flex-container-buttons">
                    <!-- <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" /> -->
                    <div class="white-border">
                      <span class="bold-font"> {{ (index + 1) + 'º juego' }} </span>
                    </div>
                    <Button :label="(index + 2) + 'º juego'" icon="pi pi-arrow-right" :iconPos="'right'"
                      @click="nextCallback" />
                  </div>
                </template>
                <template v-else-if="index < 12" #content="{ prevCallback, nextCallback }">
                  <div class="flex-container">
                    <div>
                      <div class="flex-container-row">
                        <div>
                          <span v-if="useCreateMatchStore().selectedPlayer1.name">{{
                            useCreateMatchStore().selectedPlayer1.name }}
                          </span>
                          <span v-else> Jugador 1 </span>
                        </div>
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
                      <div class="flex-container-row">
                        <div>
                          <span v-if="useCreateMatchStore().selectedPlayer2.name"> {{
                            useCreateMatchStore().selectedPlayer2.name }}
                          </span>
                          <span v-else> Jugador 2 </span>
                        </div>
                        <div v-if="index === 12" class="flex-container">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '100px' }"
                            v-model="game.selectedPuntuation2" />
                        </div>
                        <div v-else v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                          <RadioButton v-model="game.selectedPuntuation2" :inputId="'puntuation' + option"
                            :name="option.toString()" :value="option" />
                          <label v-if="option === 50" :for="'puntuation' + option" class="ml-2">AD</label>
                          <label v-else :for="'puntuation' + option" class="ml-2">{{ option }}</label>
                        </div>
                        <div class="flex-container">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                            v-model="set.score2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="game.selectedPuntuation1 == 50 || game.selectedPuntuation2 == 50 " class="flex-container">
                    <InputNumber v-model="game.deuceNumber" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" fluid 
                    :inputStyle="{ width: '4rem' }"/>
                  </div>

                  <div class="flex-container-buttons">
                    <Button :label="(index) + 'º juego'" severity="secondary" icon="pi pi-arrow-left"
                      @click="prevCallback" />
                    <div class="white-border">
                      <span class="bold-font"> {{ (index + 1) + 'º juego' }} </span>
                    </div>

                    <Button :label="(index + 2) + 'º juego'" icon="pi pi-arrow-right" iconPos="right"
                      @click="nextCallback" />
                  </div>
                </template>
                <template v-else #content="{ prevCallback }">
                  <div class="flex-container">
                    <div>
                      <div class="flex-container-row">
                        <div>
                          <span v-if="useCreateMatchStore().selectedPlayer1.name">{{
                            useCreateMatchStore().selectedPlayer1.name }}
                          </span>
                          <span v-else> Jugador 1 </span>
                        </div>
                        <div v-if="index === 12" class="flex-container">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '100px' }"
                            v-model="game.selectedPuntuation1" />
                        </div>
                        <div class="flex-container-row" style="justify-content: right;">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                            v-model="set.score1" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex-container-row">
                        <div>
                          <span v-if="useCreateMatchStore().selectedPlayer2.name"> {{
                            useCreateMatchStore().selectedPlayer2.name }}
                          </span>
                          <span v-else> Jugador 2 </span>
                        </div>
                        <div v-if="index === 12" class="flex-container">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '100px' }"
                            v-model="game.selectedPuntuation2" />
                        </div>
                        <div class="flex-container" style="justify-content: right;">
                          <InputNumber inputId="integeronly" class="score" :inputStyle="{ width: '50px' }"
                            v-model="set.score2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="game.selectedPuntuation1 == 50 || game.selectedPuntuation2 == 50 " class="flex-container">
                    <InputNumber v-model="game.deuceNumber" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" fluid 
                    :inputStyle="{ width: '4rem' }"/>
                  </div>

                  <div class="flex-container-buttons">
                    <Button :label="(index) + 'º juego'" severity="secondary" icon="pi pi-arrow-left"
                      @click="prevCallback" />
                    <div class="white-border">
                      <span class="bold-font"> {{ (index + 1) + 'º juego' }} </span>
                    </div>

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

        <div class="flex-container-row">
          <v-icon name="gi-tennis-ball" fill="green" />
          <span> => </span>
          <span> Empieza sacando</span>
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
  flex-direction: column;
}

.flex-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px;
  width: 100%;
  /* min-width: 70%; */
  flex-direction: column;
}

.flex-container-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px;
  width: 70%;
  /* flex-direction: column; */
}

.flex-options {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  width: 100%;
}

.flex-container-players,
.flex-container-points {
  width: 100%;
  flex-direction: column;
}

.flex-container-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 5px;
  width: 100%;
}

.bold-font {
  font-weight: bold;
}

.white-border {
  border: 1px solid white;
  padding: 10px;
  border-radius: 5px;
}

.p-tabview.p-component {
  width: 100%;
}

p-inputnumber {
  width: 20%;
  max-width: 20%;
}

p-inputnumber-input {
  width: 100%;
  max-width: 100%;
}

.p-inputnumber p-component {
    font-family: var(--font-family);
    font-feature-settings: var(--font-feature-settings, normal);
    font-size: 1rem;
    font-weight: normal;
}

@media (max-width: 600px) {
  .score {
    width: 40px;
  }

  .flex-container-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 5px;
    width: 100%;
    flex-direction: column;
  }

  .flex-container-players,
  .flex-container-points,
  .flex-options {
    gap: 0.5rem;
  }

  .flex-options {
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  }

  .flex-container {
    gap: 1rem;
    flex-direction: row;
  }

  .flex-options label {
    font-size: 0.9rem;
  }

  .flex-container-buttons {
    gap: 0.5rem;
  }

  .add-player-line {
    gap: 5px;
    padding: 5px;
  }
}
</style>