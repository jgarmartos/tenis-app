<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import { useAppData } from '@/services/core/useAppData';
import { useMatchCreation } from '@/composables/useMatchCreation';
import MatchTabView from './MatchTabView.vue';
import router from '@/router';

/**
 * App data and match creation composable
 */
const { matchesQuery, competitions, places, players } = useAppData();
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
        await matchesQuery.refetch();
        router.push('/');
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
  <header>
    <MenuBar />
  </header>

  <body>
    <div class="panels-container">
      <Panel class="panel">
        <template #header>
          <div class="title">
            <!-- <i class="pi pi-user" /> -->
            <span style="font-weight: bold">Añadir partido</span>
          </div>
        </template>
        <div class="dialog-content">
          <div class="center-div" name="competition">
            <div>
              <Dropdown v-model="formData.competition" :options="competitions" filter class="right-side"
                optionLabel="name" placeholder="Competición: ">
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <div>
              <Dropdown v-model="formData.place" :options="places" filter :invalid="hasFieldError('place')"
                optionLabel="name" placeholder="Lugar: " class="right-side">
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <div>
              <Dropdown v-model="formData.surface" :options="surfaces" filter :invalid="hasFieldError('surface')"
                placeholder="Superficie: " class="right-side">
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <div>{{ slotProps.option }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <div>
              <Calendar id="calendar-timeonly" v-model="formData.startTime" showTime :invalid="hasFieldError('date')"
                dateFormat="dd/mm/yy" hourFormat="24" />
              <label v-if="hasFieldError('date')" style="font-size: small; display: inline; color: brown">
                {{ getFieldError('date') }}
              </label>
            </div>
          </div>

          <div class="center-div">
            <div>
              <Dropdown v-model="formData.player1" :options="players" filter :invalid="hasFieldError('player1')"
                optionLabel="name" placeholder="Jugador 1" />
            </div>
            <div>
              <Dropdown v-model="formData.player2" :options="players" filter :invalid="hasFieldError('player2')"
                optionLabel="name" placeholder="Jugador 2" />
            </div>
          </div>

          <MatchTabView :formData="formData" />
        </div>
        <template #footer>
          <div class="center-div">
            <Button label="Guardar" :loading="isLoading" @click="handleSaveMatch" autofocus />
          </div>
        </template>
      </Panel>
    </div>
  </body>
</template>

<!-- <style scoped>
header {
    line-height: 2;
    max-height: 20vh;
}

.panel {
    border-radius: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #d9d9d9;
    width: 100%;
}

.panels-container {
    padding-top: 1%;
    display: flex !important;
    width: 100%;
    height: 100%;
}

.dialog-content {
    padding: 1rem;
    width: 100%;
}

.center-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    width: 100%;
}

.p-calendar {
    width: 100%;
    margin-left: auto;
}
</style> -->

<style scoped>
header {
  line-height: 2;
  max-height: 20vh;
}

.panel {
  border-radius: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  width: 100%;
  padding: 0.5rem;
  /* Reduce padding en móviles */
}

.panels-container {
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  /* Colocar los elementos en columna en móviles */
  width: 100%;
  height: 100%;
}

.dialog-content {
  padding: 0.5rem;
  /* Reduce padding para móviles */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.center-div {
  display: flex;
  align-items: flex-start;
  /* Alinea los elementos al inicio */
  justify-content: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
}

.p-calendar {
  width: 100%;
  margin-left: auto;
}

/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
  .panel {
    padding: 1rem;
    margin: 0.5rem;
    box-shadow: none;
    /* Eliminar sombras en móviles */
  }

  .dialog-content {
    padding: 0.5rem;
  }

  .center-div {
    flex-direction: column;
    align-items: stretch;
    /* Asegura que los elementos ocupen todo el ancho */
  }

  .p-calendar {
    width: 100%;
    margin: 0;
  }
}
</style>
