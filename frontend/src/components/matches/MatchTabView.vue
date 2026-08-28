<script setup lang="ts">
import { computed, watch } from 'vue';
import type { MatchFormData } from '@/interfaces/MatchFormInterfaces';
import { useSetsManagement } from '@/composables/useSetsManagement';

/**
 * Props for the match tab view component
 */
const props = defineProps<{
  formData: MatchFormData;
}>();

/**
 * Use sets management for reactive scoring
 */
const { setupAllSetsScoring } = useSetsManagement();

/**
 * Available set types
 */
const setTypes = ['Set', 'Super Tie Break'];

/**
 * Setup reactive scoring for the sets when component mounts
 */
setupAllSetsScoring(props.formData.sets);
</script>

<template>
  <div class="add-player-line" name="setResults">
    <TabView>
      <TabPanel v-for="set in formData.sets" :key="set.name" :header="set.name">
        <!-- Set type selection -->
        <div class="flex-options">
          <SelectButton v-model="set.type" :options="setTypes" />
        </div>

        <!-- Set content based on type -->
        <div class="flex-container">
          <!-- Regular Set -->
          <div v-if="set.type == 'Set'" id="Set" class="flex-container-points">
            <Stepper>
              <StepperPanel v-for="(game, index) in set.games" :key="index" :header="game.number + 'º juego'">
                <!-- First game template -->
                <template v-if="index == 0" #content="{ nextCallback }">
                  <div class="flex-container">
                    <!-- Player 1 scores -->
                    <div>
                      <div class="flex-container-row">
                        <div>{{ formData.player1.name || 'Jugador 1' }}</div>
                        <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                          <RadioButton v-model="game.selectedPuntuation1" :inputId="`player1-${index}-${option}`"
                            :value="option" />
                          <label :for="`player1-${index}-${option}`">
                            {{ option === 50 ? 'AD' : option }}
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- Player 2 scores -->
                    <div>
                      <div class="flex-container-row">
                        <div>{{ formData.player2.name || 'Jugador 2' }}</div>
                        <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                          <RadioButton v-model="game.selectedPuntuation2" :inputId="`player2-${index}-${option}`"
                            :value="option" />
                          <label :for="`player2-${index}-${option}`">
                            {{ option === 50 ? 'AD' : option }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Deuce counter -->
                  <div v-if="game.selectedPuntuation1 == 50 || game.selectedPuntuation2 == 50" class="flex-container">
                    <span>Nº iguales:</span>
                    <InputNumber v-model="game.deuceNumber" inputId="minmax-buttons" mode="decimal" showButtons :min="1"
                      :max="100" fluid :inputStyle="{ width: '4rem' }" />
                  </div>

                  <!-- Navigation buttons -->
                  <div class="flex-container-buttons">
                    <div class="white-border">
                      <span class="bold-font">{{ index + 1 }}º juego</span>
                    </div>
                    <Button :label="`${index + 2}º juego`" icon="pi pi-arrow-right" iconPos="right"
                      @click="nextCallback" />
                  </div>
                </template>

                <!-- Middle games template -->
                <template v-else-if="index < 12" #content="{ prevCallback, nextCallback }">
                  <div class="flex-container">
                    <!-- Player 1 scores -->
                    <div>
                      <div class="flex-container-row">
                        <div>{{ formData.player1.name || 'Jugador 1' }}</div>
                        <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                          <RadioButton v-model="game.selectedPuntuation1" :inputId="`player1-${index}-${option}`"
                            :value="option" />
                          <label :for="`player1-${index}-${option}`">
                            {{ option === 50 ? 'AD' : option }}
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- Player 2 scores -->
                    <div>
                      <div class="flex-container-row">
                        <div>{{ formData.player2.name || 'Jugador 2' }}</div>
                        <div v-for="option in [0, 15, 30, 40, 50]" :key="option" class="flex-container">
                          <RadioButton v-model="game.selectedPuntuation2" :inputId="`player2-${index}-${option}`"
                            :value="option" />
                          <label :for="`player2-${index}-${option}`">
                            {{ option === 50 ? 'AD' : option }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Deuce counter -->
                  <div v-if="game.selectedPuntuation1 == 50 || game.selectedPuntuation2 == 50" class="flex-container">
                    <span>Nº iguales:</span>
                    <InputNumber v-model="game.deuceNumber" inputId="minmax-buttons" mode="decimal" showButtons :min="1"
                      :max="100" fluid :inputStyle="{ width: '4rem' }" />
                  </div>

                  <!-- Navigation buttons -->
                  <div class="flex-container-buttons">
                    <Button :label="`${index}º juego`" severity="secondary" icon="pi pi-arrow-left"
                      @click="prevCallback" />
                    <div class="white-border">
                      <span class="bold-font">{{ index + 1 }}º juego</span>
                    </div>
                    <Button :label="`${index + 2}º juego`" icon="pi pi-arrow-right" iconPos="right"
                      @click="nextCallback" />
                  </div>
                </template>

                <!-- Last game template -->
                <template v-else #content="{ prevCallback }">
                  <div class="flex-container">
                    <!-- Tiebreak scores -->
                    <div>
                      <div class="flex-container-row">
                        <div>{{ formData.player1.name || 'Jugador 1' }}</div>
                        <InputNumber v-model="game.selectedPuntuation1" inputId="tiebreak1" :min="0" :max="50"
                          :inputStyle="{ width: '4rem' }" />
                      </div>
                    </div>
                    <div>
                      <div class="flex-container-row">
                        <div>{{ formData.player2.name || 'Jugador 2' }}</div>
                        <InputNumber v-model="game.selectedPuntuation2" inputId="tiebreak2" :min="0" :max="50"
                          :inputStyle="{ width: '4rem' }" />
                      </div>
                    </div>
                  </div>

                  <!-- Navigation buttons -->
                  <div class="flex-container-buttons">
                    <Button :label="`${index}º juego`" severity="secondary" icon="pi pi-arrow-left"
                      @click="prevCallback" />
                    <div class="white-border">
                      <span class="bold-font">{{ index + 1 }}º juego (Tiebreak)</span>
                    </div>
                  </div>
                </template>
              </StepperPanel>
            </Stepper>
          </div>

          <!-- Super Tie Break -->
          <div v-else id="Super-Tie-Break" class="flex-container-points">
            <div class="flex-container" style="margin-top: 2rem">
              <div class="flex-container" style="justify-content: left">
                <FloatLabel>
                  <InputNumber id="score1" v-model="set.score1" inputId="integeronly" class="score"
                    :inputStyle="{ width: '150px' }" />
                  <label for="score1" style="min-width: 5rem">
                    {{ formData.player1.name || 'Jugador 1' }}
                  </label>
                </FloatLabel>
              </div>
              <div class="flex-container" style="justify-content: left">
                <FloatLabel>
                  <InputNumber id="score2" v-model="set.score2" inputId="integeronly" class="score"
                    :inputStyle="{ width: '150px' }" />
                  <label for="score2" style="min-width: 10rem">
                    {{ formData.player2.name || 'Jugador 2' }}
                  </label>
                </FloatLabel>
              </div>
            </div>
          </div>
        </div>

        <!-- Serving indicator -->
        <div class="flex-container-row">
          <v-icon name="gi-tennis-ball" fill="green" />
          <span>Empieza sacando:</span>
          <SelectButton v-model="set.startsServing" :options="[
            { label: formData.player1.name || 'Jugador 1', value: 'player1' },
            { label: formData.player2.name || 'Jugador 2', value: 'player2' }
          ]" optionLabel="label" optionValue="value" />
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
  flex-direction: column;
}

.flex-container-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px;
  width: 70%;
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
