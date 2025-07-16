/** * AddPlayerDialog.vue * * Dialog component for creating or updating a
player. * Handles form state, validation, and submission for player data. * *
@module components/players/AddPlayerDialog */

<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useCreatePlayer, useUpdatePlayer, useDeletePlayer } from '@/services/players/playerMutations';
import type { PlayerSubmit } from '@/interfaces/PlayerInterfaces';

/**
 * Store instance for managing player dialog state and player to edit.
 */
const store = usePlayerStore();

/**
 * Player mutation functions for creating and updating players.
 * Closes the dialog after mutation is complete.
 */
const { mutate: createPlayer } = useCreatePlayer();
const { mutate: updatePlayer } = useUpdatePlayer();
const { mutate: deletePlayer } = useDeletePlayer();

/**
 * Reactive player form state.
 * @type {import('@/interfaces/PlayerInterfaces').PlayerSubmit}
 */
const player = ref<PlayerSubmit>({
  name: '',
  forehand: '',
});

/**
 * Reactive state for the selected hand in the dropdown.
 * @type {{ name: string }}
 */
const selectedHand = ref({ name: '' });

/**
 * Options for the preferred hand dropdown.
 * @type {Array<{ name: string }>}
 */
const preferedHand = [{ name: 'Derecha' }, { name: 'Izquierda' }];

/**
 * Watch for changes in the player to edit from the store.
 * If editing, initialize form fields with player data; otherwise, reset fields.
 */
watch(
  () => store.playerToEdit,
  playerToEdit => {
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

/**
 * Save the player (create or update).
 * Sets the forehand value from the dropdown before submitting.
 * Calls the appropriate mutation based on whether editing or creating.
 * @returns {void}
 */
const savePlayer = (): void => {
  player.value.forehand = selectedHand.value.name;

  if (store.playerToEdit) {
    updatePlayer({ id: store.playerToEdit.id, data: player.value }, {
      onSuccess: () => store.closeDialog()
    });
  } else {
    createPlayer(player.value, {
      onSuccess: () => store.closeDialog()
    });
  }
};
</script>

<template>
  <!--
    Dialog for creating or updating a player.
    Contains form fields for player name and preferred hand.
    Footer has Cancel and Save buttons.
  -->
  <Dialog v-model:visible="store.isDialogVisible" modal
    :header="store.playerToEdit ? 'Actualizar jugador' : 'Crear jugador'" :style="{ width: '25rem' }">
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
/*
  Styles for the add player form lines.
*/
.add-player-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
</style>
