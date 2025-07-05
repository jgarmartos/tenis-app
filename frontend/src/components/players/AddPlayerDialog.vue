<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePlayerStore } from '@/stores/usePlayerStore';
import type { PlayerSubmit } from '@/interfaces/PlayerInterfaces';
import { usePlayerMutations } from '@/services/requests/usePlayerMutations';

const store = usePlayerStore();
const { createPlayer, updatePlayer } = usePlayerMutations(() => store.closeDialog());

const player = ref<PlayerSubmit>({
  name: '',
  forehand: '',
});

const selectedHand = ref({ name: '' });
const preferedHand = [{ name: 'Derecha' }, { name: 'Izquierda' }];

// Si hay jugador para editar, inicializar campos
watch(
  () => store.playerToEdit,
  (playerToEdit) => {
    if (playerToEdit) {
      player.value = {
        name: playerToEdit.name,
        forehand: playerToEdit.forehand,
      };
      selectedHand.value = { name: playerToEdit.forehand };
    } else {
      player.value = { name: '', forehand: '' };
      selectedHand.value = { name: '' };
    }
  },
  { immediate: true }
);

const savePlayer = () => {
  player.value.forehand = selectedHand.value.name;

  if (store.playerToEdit) {
    updatePlayer.mutate({ id: store.playerToEdit.id, data: player.value });
  } else {
    createPlayer.mutate(player.value);
  }
};
</script>

<template>
  <Dialog v-model:visible="store.isDialogVisible" modal header="Crear jugador" :style="{ width: '25rem' }">
    <div class="add-player-line">
      <label class="font-semibold w-6rem">Nombre</label>
      <InputText v-model="player.name" class="flex-auto w-1rem" autocomplete="off" />
    </div>
    <div class="add-player-line">
      <label class="font-semibold w-6rem">Mano preferida</label>
      <Dropdown v-model="selectedHand" :options="preferedHand" optionLabel="name" class="w-full md:w-8rem" />
    </div>
    <template #footer>
      <Button label="Cancelar" text severity="secondary" @click="store.closeDialog()" />
      <Button label="Guardar" outlined severity="secondary" @click="savePlayer" />
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
</style>
