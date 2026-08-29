/** * AddPlayerDialog.vue * * Dialog component for creating or updating a
player. * Handles form state, validation, and submission for player data. * *
@module components/players/AddPlayerDialog */

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useCreatePlayer, useUpdatePlayer } from '@/services/players/playerMutations';
import type { PlayerSubmit } from '@/interfaces/PlayerInterfaces';

/**
 * Store instance for managing player dialog state and player to edit.
 */
const store = usePlayerStore();

/**
 * i18n composable for accessing translation functions.
 */
const { t } = useI18n();

/**
 * Feedback message shown when the create/update request fails.
 */
const errorMessage = ref('');

/**
 * Player mutation functions for creating and updating players.
 * Closes the dialog after mutation is complete.
 */
const { mutate: createPlayer, isPending: isCreating } = useCreatePlayer({
  onError: () => {
    errorMessage.value = t('players.form.error');
  },
});
const { mutate: updatePlayer, isPending: isUpdating } = useUpdatePlayer({
  onError: () => {
    errorMessage.value = t('players.form.error');
  },
});

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
const preferedHand = [{ name: t('players.form.handRight') }, { name: t('players.form.handLeft') }];

/**
 * Watch for changes in the player to edit from the store.
 * If editing, initialize form fields with player data; otherwise, reset fields.
 */
watch(
  () => store.playerToEdit,
  playerToEdit => {
    errorMessage.value = '';
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
  errorMessage.value = '';
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
    :header="store.playerToEdit ? t('players.form.editTitle') : t('players.form.createTitle')"
    :style="{ width: '25rem' }">
    <div class="form-field">
      <label for="playerName" class="field-label">{{ t('players.form.name') }}</label>
      <InputText v-model="player.name" id="playerName" class="flex-auto" autocomplete="off" />
    </div>
    <div class="form-field">
      <label for="playerForehand" class="field-label">{{ t('players.form.forehand') }}</label>
      <Dropdown v-model="selectedHand" :options="preferedHand" optionLabel="name" inputId="playerForehand"
        class="w-full md:w-8rem" />
    </div>

    <!-- Feedback after attempting to save -->
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>

    <template #footer>
      <Button :label="t('common.cancel')" text severity="secondary" @click="store.closeDialog()" />
      <Button :label="t('common.save')" outlined severity="secondary" :loading="isCreating || isUpdating"
        @click="savePlayer" />
    </template>
  </Dialog>
</template>

<style scoped>
.form-field {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.field-label {
  font-weight: 600;
  width: 6rem;
  flex-shrink: 0;
}
</style>
