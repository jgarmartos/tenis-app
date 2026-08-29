<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCreateCompetition } from '@/services/competitions/competitionMutations';
import type { CompetitionSubmit } from '@/interfaces/CompetitionsIntercfaces';

const props = defineProps<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  retry: () => void;
}>();

/**
 * i18n composable for accessing translation functions.
 */
const { t } = useI18n();

/**
 * Feedback message shown when the creation request fails.
 */
const errorMessage = ref('');

/**
 * Reactive competition form state.
 */
const competition = ref<CompetitionSubmit>({
  name: '',
  startDate: new Date(),
  endDate: new Date(),
});

/**
 * Mutation for creating a competition, closing the dialog and refreshing the
 * panel data on success.
 */
const { mutate: createCompetition, isPending: isSaving } = useCreateCompetition({
  onSuccess: () => {
    errorMessage.value = '';
    props.setVisible(false);
    props.retry();
  },
  onError: () => {
    errorMessage.value = t('competitions.form.error');
  },
});

/**
 * Saves the new competition.
 */
const saveCompetition = (): void => {
  errorMessage.value = '';
  createCompetition(competition.value);
};
</script>

<template>
  <Dialog :visible="visible" modal :header="t('competitions.form.createTitle')" :style="{ width: '25rem' }"
    :closable="false">
    <div class="form-field">
      <label for="competitionName" class="field-label">{{ t('competitions.form.name') }}</label>
      <InputText v-model="competition.name" id="competitionName" class="flex-auto" autocomplete="off" />
    </div>
    <div class="form-field">
      <label for="competitionStartDate" class="field-label">{{ t('competitions.form.startDate') }}</label>
      <Calendar v-model="competition.startDate" inputId="competitionStartDate" />
    </div>
    <div class="form-field">
      <label for="competitionEndDate" class="field-label">{{ t('competitions.form.endDate') }}</label>
      <Calendar v-model="competition.endDate" inputId="competitionEndDate" />
    </div>

    <!-- Feedback after attempting to save -->
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>

    <template #footer>
      <Button :label="t('common.cancel')" text severity="secondary" @click="setVisible(false)" />
      <Button :label="t('common.save')" outlined severity="secondary" :loading="isSaving" @click="saveCompetition" />
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
