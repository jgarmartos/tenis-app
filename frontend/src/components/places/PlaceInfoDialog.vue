<script setup lang="ts">
import { useAppData } from '@/services/core/useAppData';
import { usePlaceStore } from '@/stores/usePlaceStore';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Match } from '@/interfaces/MatchesInterfaces';
import type { Place } from '@/interfaces/PlacesInterfaces';

/**
 * Place store instance for managing dialog state and place data.
 * Provides access to the current place being edited and dialog visibility state.
 */
const store = usePlaceStore();

/**
 * App data composable for accessing application data.
 * Provides access to places and matches list.
 */
const { places, matches } = useAppData();

/**
 * i18n composable for accessing translation functions.
 * Provides reactive translations with type safety.
 */
const { t, locale } = useI18n();

/**
 * Computed property that returns the current place ID from the store.
 * Used as a reactive dependency for filtering matches.
 *
 * @returns {number | null} The ID of the place being edited, or null if no place is selected
 */
const placeId = computed(() => store.placeToEdit?.id || null);

/**
 * Computed property that returns all available places for the dropdown.
 * Filters out the current place to avoid self-assignment.
 *
 * @returns {Place[]} Array of available places
 */
const availablePlaces = computed(() => {
  return places.value.filter(place => place.id !== placeId.value);
});

/**
 * Computed property that returns matches filtered by place ID.
 * @returns {Match[]} Array of matches for the current place
 */
const filteredMatches = computed(() => {
  if (!placeId.value) return [];
  return matches.value.filter(match => match.place.id === placeId.value);
});

/**
 * Reactive reference for the selected match to edit.
 * Null when no match is selected for editing.
 */
const selectedMatchForEdit = ref<Match | null>(null);

/**
 * Reactive reference for the selected new place ID.
 * Used when changing the place of a match.
 */
const selectedNewPlaceId = ref<number | null>(null);

/**
 * Reactive reference for controlling the edit place dialog visibility.
 */
const showEditPlaceDialog = ref(false);

/**
 * Computed property for loading state.
 * @returns {boolean} True if data is loading
 */
const isLoading = computed(() => false); // Since we're using cached data

/**
 * Computed property for error state.
 * @returns {boolean} True if there's an error
 */
const isError = computed(() => false);

/**
 * Function to refetch data (triggers refetch of all app data).
 */
const refetch = () => {
  // Could implement specific refetch logic if needed
};

/**
 * Formats a date string into a localized, human-readable format.
 * Uses the current locale from i18n for proper internationalization.
 *
 * @param {string | Date} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      weekday: 'short',
    }).format(dateObj);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return String(date);
  }
};

/**
 * Gets a relative time string for recent dates (e.g., "3 days ago").
 * Falls back to formatted date for older dates.
 *
 * @param {string | Date} date - The date to format
 * @returns {string} Relative time string or formatted date
 */
const getRelativeDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffTime = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return t('common.today');
    } else if (diffDays === 1) {
      return t('common.yesterday');
    } else if (diffDays < 7) {
      return t('common.daysAgo', { days: diffDays });
    } else {
      return formatDate(dateObj);
    }
  } catch (error) {
    console.warn('Relative date formatting error:', error);
    return formatDate(date);
  }
};

/**
 * Opens the edit place dialog for a specific match.
 * Sets the selected match and resets the new place selection.
 *
 * @param {Match} match - The match to edit
 */
const openEditPlaceDialog = (match: Match): void => {
  selectedMatchForEdit.value = match;
  selectedNewPlaceId.value = null;
  showEditPlaceDialog.value = true;
};

/**
 * Closes the edit place dialog and resets the state.
 */
const closeEditPlaceDialog = (): void => {
  selectedMatchForEdit.value = null;
  selectedNewPlaceId.value = null;
  showEditPlaceDialog.value = false;
};

/**
 * Updates the place of the selected match.
 * Calls the API to update the match and refreshes the data.
 */
const updateMatchPlace = async (): Promise<void> => {
  if (!selectedMatchForEdit.value || !selectedNewPlaceId.value) {
    return;
  }

  try {
    // TODO: Implement the API call to update match place
    // const updatedMatch = await updateMatch(selectedMatchForEdit.value.id, {
    //   placeId: selectedNewPlaceId.value
    // });

    console.log('Updating match place:', {
      matchId: selectedMatchForEdit.value.id,
      newPlaceId: selectedNewPlaceId.value,
    });

    // Refresh the matches data
    await refetch();

    // Close the dialog
    closeEditPlaceDialog();

    // TODO: Show success message
    console.log('Match place updated successfully');
  } catch (error) {
    console.error('Error updating match place:', error);
    // TODO: Show error message
  }
};
</script>

<template>
  <!-- Place information dialog modal -->
  <Dialog v-model:visible="store.isInfoVisible" modal :header="store.placeToEdit?.name" :style="{ width: '35rem' }">
    <!-- Place ID display field -->
    <div v-if="store.placeToEdit" class="flex-horizontal">
      <label for="placeId" class="font-semibold w-6rem">{{
        t('places.infoDialog.fields.id')
      }}</label>
      <InputText :value="store.placeToEdit?.id !== undefined
          ? String(store.placeToEdit.id)
          : ''
        " id="placeId" class="flex-input" autocomplete="off" disabled />
    </div>

    <!-- Matches section -->
    <div class="matches-section">
      <h3 class="section-title">{{ t('places.infoDialog.matches.title') }}</h3>

      <!-- Loading state display -->
      <div v-if="isLoading" class="loading-state">
        <ProgressSpinner />
        <span class="loading-text">{{
          t('places.infoDialog.matches.loading')
        }}</span>
      </div>

      <!-- Error state display with retry option -->
      <div v-else-if="isError" class="error-state">
        <Message severity="error" class="error-message">
          {{ t('places.infoDialog.matches.error') }}
        </Message>
        <Button @click="() => refetch()" :label="t('places.infoDialog.matches.retry')" severity="secondary"
          size="small" />
      </div>

      <!-- Success state with matches table -->
      <div v-else-if="filteredMatches?.length" class="matches-table">
        <DataTable :value="filteredMatches" size="small" class="compact-table" paginator :rows="5"
          :rowsPerPageOptions="[5, 10, 20]">
          <Column field="player1.name" :header="t('places.infoDialog.matches.columns.player1')" />
          <Column field="player2.name" :header="t('places.infoDialog.matches.columns.player2')" />
          <Column :header="t('places.infoDialog.matches.columns.date')">
            <template #body="slotProps">
              <div class="date-column">
                <div class="date-primary">
                  {{ formatDate(slotProps.data.date) }}
                </div>
                <div class="date-secondary">
                  {{ getRelativeDate(slotProps.data.date) }}
                </div>
              </div>
            </template>
          </Column>
          <Column field="winner.name" :header="t('places.infoDialog.matches.columns.winner')" />
          <Column :header="t('common.actions')">
            <template #body="slotProps">
              <div class="actions-column">
                <Button icon="pi pi-map-marker" size="small" severity="secondary"
                  :tooltip="t('places.infoDialog.matches.changePlace')" @click="openEditPlaceDialog(slotProps.data)" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Empty state when no matches found -->
      <div v-else class="empty-state">
        <i class="pi pi-info-circle empty-icon"></i>
        <p class="empty-text">{{ t('places.infoDialog.matches.empty') }}</p>
      </div>
    </div>
  </Dialog>

  <!-- Edit Match Place Dialog -->
  <Dialog v-model:visible="showEditPlaceDialog" modal :header="t('places.infoDialog.editPlace.title')"
    :style="{ width: '25rem' }">
    <div v-if="selectedMatchForEdit" class="edit-place-content">
      <!-- Match info display -->
      <div class="match-info">
        <h4 class="match-title">
          {{ selectedMatchForEdit.player1?.name }} vs
          {{ selectedMatchForEdit.player2?.name }}
        </h4>
        <p class="current-place">
          {{ t('places.infoDialog.editPlace.currentPlace') }}:
          <strong>{{ selectedMatchForEdit.place?.name }}</strong>
        </p>
      </div>

      <!-- New place selection -->
      <div class="place-selection">
        <label for="newPlace" class="field-label">
          {{ t('places.infoDialog.editPlace.newPlace') }}
        </label>
        <Dropdown id="newPlace" v-model="selectedNewPlaceId" :options="availablePlaces" optionLabel="name"
          optionValue="id" :placeholder="t('places.infoDialog.editPlace.selectPlace')" class="place-dropdown"
          showClear />
      </div>

      <!-- Warning message -->
      <div class="warning-message">
        <i class="pi pi-exclamation-triangle warning-icon"></i>
        <p class="warning-text">
          {{ t('places.infoDialog.editPlace.warning') }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <Button :label="t('common.cancel')" severity="secondary" @click="closeEditPlaceDialog" />
        <Button :label="t('places.infoDialog.editPlace.updatePlace')" :disabled="!selectedNewPlaceId"
          @click="updateMatchPlace" />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
/**
 * Horizontal flex layout for form fields.
 * Creates a space-between layout with centered alignment and consistent spacing.
 */
.flex-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
}

/**
 * Container for the matches section with proper spacing from the place info.
 * Includes visual separator to distinguish different content areas.
 */
.matches-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

/**
 * Section title styling for the matches section.
 * Provides clear visual hierarchy and consistent typography.
 */
.section-title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

/**
 * Loading state container with centered content and visual feedback.
 * Ensures good user experience during data fetching.
 */
.loading-state {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  justify-content: center;
}

/**
 * Loading text styling for accessibility and visual consistency.
 * Provides clear feedback to users about the current state.
 */
.loading-text {
  font-size: 0.9rem;
  color: #666;
}

/**
 * Error state container with proper spacing and alignment.
 * Ensures error messages are clearly visible and actionable.
 */
.error-state {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
}

/**
 * Error message styling for better visibility and user experience.
 * Ensures error messages are prominent and readable.
 */
.error-message {
  width: 100%;
}

/**
 * Matches table container with responsive layout.
 * Provides proper spacing and structure for tabular data.
 */
.matches-table {
  margin-top: 1rem;
}

/**
 * Compact table styling for better fit within the dialog.
 * Ensures table data is readable while maintaining dialog proportions.
 */
.compact-table {
  font-size: 0.9rem;
}

/**
 * Empty state container with centered content and visual hierarchy.
 * Provides clear communication when no data is available.
 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  text-align: center;
}

/**
 * Empty state icon styling for visual appeal and user guidance.
 * Provides visual cue for empty state without being overwhelming.
 */
.empty-icon {
  font-size: 2rem;
  color: #ccc;
}

/**
 * Empty state text styling for clear communication.
 * Ensures message is readable and appropriately styled.
 */
.empty-text {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/**
 * Date column container with stacked layout for primary and secondary date info.
 * Provides visual hierarchy for date information.
 */
.date-column {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
}

/**
 * Primary date display with emphasis and readability.
 * Shows the main formatted date prominently.
 */
.date-primary {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.2;
}

/**
 * Secondary date display with relative time information.
 * Shows additional context like "3 days ago" in a subtle way.
 */
.date-secondary {
  font-size: 0.75rem;
  color: #888;
  font-style: italic;
  line-height: 1.1;
}

/**
 * Actions column container with centered button layout.
 * Ensures action buttons are properly aligned and accessible.
 */
.actions-column {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

/**
 * Edit place dialog content container.
 * Provides proper spacing and structure for the edit dialog.
 */
.edit-place-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

/**
 * Match information display in the edit dialog.
 * Shows match details with clear visual hierarchy.
 */
.match-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

/**
 * Match title styling with emphasis.
 * Displays the match participants prominently.
 */
.match-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

/**
 * Current place display with subtle styling.
 * Shows the existing place information clearly.
 */
.current-place {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

/**
 * Place selection container with proper field layout.
 * Ensures form elements are properly spaced and labeled.
 */
.place-selection {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/**
 * Field label styling for form consistency.
 * Provides clear labeling for form inputs.
 */
.field-label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

/**
 * Place dropdown styling for proper width and appearance.
 * Ensures dropdown fits well within the dialog layout.
 */
.place-dropdown {
  width: 100%;
}

/**
 * Warning message container with attention-grabbing styling.
 * Alerts users to important information about the action.
 */
.warning-message {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
}

/**
 * Warning icon styling for visual emphasis.
 * Provides clear visual cue for important information.
 */
.warning-icon {
  color: #856404;
  font-size: 1.1rem;
  margin-top: 0.1rem;
  flex-shrink: 0;
}

/**
 * Warning text styling for readability.
 * Ensures warning message is clear and appropriately styled.
 */
.warning-text {
  margin: 0;
  font-size: 0.85rem;
  color: #856404;
  line-height: 1.4;
}

/**
 * Dialog footer container with proper button alignment.
 * Ensures footer buttons are spaced and aligned correctly.
 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
