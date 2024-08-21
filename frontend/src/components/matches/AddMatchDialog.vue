<script setup lang="ts">
import { computed, onUpdated, ref, watch, type Ref } from "vue";
import getInitialData from "@/services/getInitialData";
import { useQuery } from "@tanstack/vue-query";
import { useCreateMatchStore } from "@/stores/createMatch";
import MatchTabView from "./MatchTabView.vue";

const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
}>();

const saveMatch = () => {
  props.retry()
  props.setVisible(false)
  if ( !selectedPlace.value || !startTime.value || !endTime.value) {
    return;
  }
  useCreateMatchStore().saveMatch(
    selectedCompetition.value,
    selectedPlace.value,
    startTime.value,
    endTime.value)
}


const playersFn = useQuery({
  queryKey: ["players"],
  queryFn: getInitialData.initialPlayersData,
});

/**
 * Competitions
 */
const competitionsFn = useQuery({
  queryKey: ["competitions"],
  queryFn: getInitialData.initialCompetitionsData,
});

const competitions = computed(() => {
  return competitionsFn.data.value?.data;
});

const selectedCompetition = ref(competitions.value?.[0]);

/**
 * Places
 */
const placesFn = useQuery({
  queryKey: ["places"],
  queryFn: getInitialData.initialPlacesData,
});

const places = computed(() => {
  return placesFn.data.value?.data;
});

const selectedPlace = ref(places.value?.[0]);


/**
 * Start and end time
 */
const startTime = ref();

const endTime = ref();


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
      <MatchTabView :players="playersFn.data.value?.data"/>
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

.p-calendar {
  width: 60%;
  margin-left: auto;
}
</style>
