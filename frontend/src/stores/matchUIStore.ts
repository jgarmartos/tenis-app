/**
 * Match UI Store
 * 
 * Simplified store focused only on UI state management.
 * Business logic has been moved to services and composables.
 * 
 * @module stores/matchUIStore
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Match } from '@/interfaces/MatchesInterfaces';
import { emptyMatch } from '@/services/emptyObjects';

/**
 * Store for match-related UI state
 */
export const useMatchUIStore = defineStore('matchUI', () => {
    // Match info state for viewing match details
    const selectedMatchInfo = ref<Match>(emptyMatch());

    // Dialog visibility states
    const isCreateMatchDialogVisible = ref(false);
    const isMatchInfoDialogVisible = ref(false);

    // Loading states
    const isCreatingMatch = ref(false);

    /**
     * Sets the selected match for viewing details
     */
    const setSelectedMatch = (match: Match) => {
        selectedMatchInfo.value = match;
    };

    /**
     * Opens the create match dialog
     */
    const openCreateMatchDialog = () => {
        isCreateMatchDialogVisible.value = true;
    };

    /**
     * Closes the create match dialog
     */
    const closeCreateMatchDialog = () => {
        isCreateMatchDialogVisible.value = false;
    };

    /**
     * Opens the match info dialog
     */
    const openMatchInfoDialog = (match?: Match) => {
        if (match) {
            setSelectedMatch(match);
        }
        isMatchInfoDialogVisible.value = true;
    };

    /**
     * Closes the match info dialog
     */
    const closeMatchInfoDialog = () => {
        isMatchInfoDialogVisible.value = false;
    };

    /**
     * Resets all UI state
     */
    const resetUIState = () => {
        selectedMatchInfo.value = emptyMatch();
        isCreateMatchDialogVisible.value = false;
        isMatchInfoDialogVisible.value = false;
        isCreatingMatch.value = false;
    };

    return {
        // State
        selectedMatchInfo,
        isCreateMatchDialogVisible,
        isMatchInfoDialogVisible,
        isCreatingMatch,

        // Actions
        setSelectedMatch,
        openCreateMatchDialog,
        closeCreateMatchDialog,
        openMatchInfoDialog,
        closeMatchInfoDialog,
        resetUIState,
    };
});

