<script setup lang="ts">
import { computed } from "vue";
import { useCreateMatchStore } from "@/stores/createMatchStore";
import MatchTabView from "./MatchTabView.vue";
import { useInitialData } from "@/services/requests/useInitialData";
import { useDataStore } from "@/stores/useDataStore";

const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
  getSetsForMatch: (matchId: number) => string;
}>();

const { matchesQuery } = useInitialData();


const handleSaveMatch = async () => {
  props.setVisible(false);
  // props.getSetsForMatch();
  await useCreateMatchStore().saveMatch(); // Guardar el partido
  await matchesQuery.refetch(); // Esperar a que la refetch complete
  console.log(useDataStore().matches); // Verificar si los datos han cambiado
};

const surfaces = [
    "Tierra batida",
    "Hierba",
    "Pista dura",
  ]

/**
 * Competitions
 */
const { competitionsQuery } = useInitialData();

const competitions = computed(() => useDataStore().competitions);

/**
 * Places
 */
const { placesQuery } = useInitialData();

const places = computed(() => useDataStore().places);

const players = computed(() => useDataStore().players);


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
        <Dropdown v-model="useCreateMatchStore().selectedCompetition" :options="competitions" filter optionLabel="name"
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
        <Dropdown v-model="useCreateMatchStore().selectedPlace" :options="places" filter optionLabel="name"
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
        <Dropdown v-model="useCreateMatchStore().selectedSurface" :options="surfaces"
          placeholder="Superficie: " class="right-side">
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <!-- <div class="add-player-line" name="startDate">
        <label for="date" class="font-semibold w-6rem">Fecha</label>
        <Calendar v-model="useCreateMatchStore().date" showIcon :showOnFocus="false" dateFormat="dd/mm/yy" />
      </div> -->
      <div class="add-player-line" name="endDate">
        <label for="date" class="font-semibold w-6rem">Fecha</label>
        <Calendar id="calendar-timeonly" v-model="useCreateMatchStore().startTime" showTime dateFormat="dd/mm/yy" hourFormat="24" />
        <!-- <Calendar id="calendar-timeonly" v-model="useCreateMatchStore().endTime" timeOnly /> -->
      </div>
      <div class="add-player-line">
        <label for="date" class="font-semibold w-6rem">Jugadores</label>
        <div class="right-side-players">
          <div class="players-imput">
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
        </div>
      </div>

      <MatchTabView />
    </div>
    <template #footer>
      <Button label="Cancelar" text severity="secondary" @click="setVisible(false)" autofocus />
      <Button label="Guardar" outlined severity="secondary" @click="handleSaveMatch" autofocus />
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
