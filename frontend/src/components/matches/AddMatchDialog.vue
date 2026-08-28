<script setup lang="ts">
import { useMatchCreation } from '@/composables/useMatchCreation';
import MatchTabView from './MatchTabView.vue';
import { useAppData } from '@/services/core/useAppData';

/**
 * Component props
 */
const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
}>();

/**
 * App data and match creation composable
 */
const { competitions, places, players, matchesQuery } = useAppData();
const {
  formData,
  isLoading,
  createMatch,
  hasFieldError,
  getFieldError
} = useMatchCreation();

/**
 * Available surface types
 */
const surfaces = ['Tierra batida', 'Hierba', 'Pista dura'];

/**
 * Handles match creation
 */
const handleSaveMatch = async () => {
  try {
    const matchId = await createMatch({
      validate: true,
      onSuccess: async (id: number) => {
        props.setVisible(false);
        await matchesQuery.refetch();
      },
      onError: (error: Error) => {
        console.error('Error creating match:', error);
      }
    });
  } catch (error) {
    console.error('Failed to create match:', error);
  }
};
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
        <Dropdown v-model="formData.competition" :options="competitions" filter optionLabel="name"
          placeholder="Competición: " class="right-side">
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="add-player-line" name="place">
        <label for="place" class="font-semibold w-6rem">Lugar</label>
        <Dropdown v-model="formData.place" :options="places" filter optionLabel="name" :invalid="hasFieldError('place')"
          placeholder="Lugar: " class="right-side">
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="add-player-line" name="surface">
        <label for="place" class="font-semibold w-6rem">Superficie</label>
        <Dropdown v-model="formData.surface" :options="surfaces" :invalid="hasFieldError('surface')"
          placeholder="Superficie: " class="right-side">
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="add-player-line" name="endDate">
        <label for="date" class="font-semibold w-6rem">Fecha</label>
        <Calendar id="calendar-timeonly" v-model="formData.startTime" showTime dateFormat="dd/mm/yy"
          :invalid="hasFieldError('date')" hourFormat="24" />
      </div>
      <div class="add-player-line">
        <label for="date" class="font-semibold w-6rem">Jugadores</label>
        <div class="right-side-players">
          <div class="players-imput">
            <div>
              <Dropdown v-model="formData.player1" :options="players" filter optionLabel="name"
                :invalid="hasFieldError('player1')" placeholder="Jugador 1" />
            </div>
            <div>
              <Dropdown v-model="formData.player2" :options="players" filter optionLabel="name"
                :invalid="hasFieldError('player2')" placeholder="Jugador 2" />
            </div>
          </div>
        </div>
      </div>

      <MatchTabView :formData="formData" />
    </div>
    <template #footer>
      <Button label="Cancelar" text severity="secondary" @click="setVisible(false)" autofocus />
      <Button label="Guardar" outlined severity="secondary" :loading="isLoading" @click="handleSaveMatch" autofocus />
    </template>
  </Dialog>
</template>

<style scoped>
.dialog-content {
  padding: 1rem;
  width: 71rem;
}

.add-player-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
}

.players-imput {
  display: flex;
  gap: 10px;
}

.right-side {
  margin-left: auto;
  max-width: 14rem;
}

.right-side-players {
  margin-left: auto;
  /* max-width: 14rem; */
}

.p-calendar {
  width: 60%;
  margin-left: auto;
}
</style>
