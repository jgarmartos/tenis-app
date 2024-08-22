<script setup lang="ts">
import { ref } from "vue";
import type { PlayerSubmit } from "@/interfaces/PlayerInterfaces";
import saveData from "@/services/saveData";

const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
}>();

const player = ref<PlayerSubmit>({
  name: "",
  forehand: "",
});

const selectedHand = ref({ name: "" });

const preferedHand = [
  { name: "Derecha" },
  { name: "Izquierda" },
];

const savePlayer = () => {
  props.setVisible(false);
  player.value.forehand = selectedHand.value.name;
  saveData.savePlayer(player.value).then((response) => {
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
      :style="{ width: '25rem' }">
      <template #header>
        <div class="inline-flex align-items-center justify-content-center gap-2">
          <span class="font-bold white-space-nowrap">Crear jugador</span>
        </div>
      </template>
      <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
      <div class="add-player-line">
        <label for="username" class="font-semibold w-6rem">Nombre</label>
        <InputText v-model="player.name" id="username" class="flex-auto w-1rem" autocomplete="off" />
      </div>
      <div class="add-player-line">
        <label for="email" class="font-semibold w-6rem">Mano preferida</label>
        <Dropdown v-model="selectedHand" :options="preferedHand" optionLabel="name" placeholder="" class="w-full md:w-8rem" /> 
        
      </div>
      <template #footer>
        <Button label="Cancel" text severity="secondary"
          @click="setVisible(false)" autofocus />
        <Button label="Save" outlined severity="secondary"
          @click="savePlayer" autofocus />
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