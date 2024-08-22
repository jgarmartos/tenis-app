<script setup lang="ts">
import { computed } from "vue";
import { useCreateMatchStore } from "@/stores/createMatchStore";
import MatchTabView from "./MatchTabView.vue";
import { useInitialData } from "@/services/useInitialData";
import { useDataStore } from "@/stores/useDataStore";

const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
}>();

const { matchesQuery } = useInitialData();

const saveMatch = () => {
  

}

const handleSaveMatch = async () => {
  props.setVisible(false);
  await useCreateMatchStore().saveMatch(); // Guardar el partido
  await matchesQuery.refetch(); // Esperar a que la refetch complete
  console.log(useDataStore().matches); // Verificar si los datos han cambiado
};



/**
 * Competitions
 */
 const { competitionsQuery } = useInitialData();

const competitions = computed(() => useDataStore().matches);

/**
 * Places
 */
const { placesQuery } = useInitialData();

const places = computed(() => useDataStore().places);


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
          placeholder="Selecciona una competición: " class="right-side">
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
          placeholder="Selecciona un lugar: " class="right-side">
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="add-player-line" name="startDate">
        <label for="date" class="font-semibold w-6rem">Fecha Inicio</label>
        <Calendar v-model="useCreateMatchStore().startTime" showIcon :showOnFocus="false" dateFormat="dd/mm/yy" />
      </div>
      <div class="add-player-line" name="endDate">
        <label for="date" class="font-semibold w-6rem">Fecha Final</label>
        <Calendar v-model="useCreateMatchStore().endTime" showIcon :showOnFocus="false" dateFormat="dd/mm/yy" />
      </div>
      <div class="add-player-line" name="resultTitle">
        <label for="date" class="font-semibold w-6rem">Resultado</label>
      </div>
      <MatchTabView/>
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
