<script setup lang="ts">
import { ref } from 'vue';
import type { PlayerSubmit } from '@/interfaces/PlayerInterfaces';
import saveData from '@/services/requests/saveData';
import type { CompetitionSubmit } from '@/interfaces/CompetitionsIntercfaces';

const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
}>();

const competition = ref<CompetitionSubmit>({
  name: '',
  startDate: new Date(),
  endDate: new Date(),
});

const saveCompetition = () => {
  props.setVisible(false);
  saveData.saveCompetition(competition.value).then(response => {
    props.retry();
    console.log(response);
  });
};
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
    :closable="false"
  >
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Crear competición</span>
      </div>
    </template>
    <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
    <div class="add-player-line">
      <label for="username" class="font-semibold w-6rem">Nombre</label>
      <InputText
        v-model="competition.name"
        id="username"
        class="flex-auto w-1rem"
        autocomplete="off"
      />
    </div>
    <div class="add-player-line">
      <label for="email" class="font-semibold w-6rem">Fecha Inicio</label>
      <Calendar v-model="competition.startDate" />
    </div>
    <div class="add-player-line">
      <label for="email" class="font-semibold w-6rem">Fecha Inicio</label>
      <Calendar v-model="competition.endDate" />
    </div>
    <template #footer>
      <Button
        label="Cancel"
        text
        severity="secondary"
        @click="setVisible(false)"
        autofocus
      />
      <Button
        label="Save"
        outlined
        severity="secondary"
        @click="saveCompetition"
        autofocus
      />
    </template>
  </Dialog>
</template>

<style scoped>
.add-player-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.right-side {
  margin-left: auto;
}
</style>
