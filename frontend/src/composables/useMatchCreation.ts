/**
 * Match Creation Composable
 * 
 * Provides reactive state and methods for creating matches.
 * Uses new services architecture without store dependencies.
 * 
 * @module composables/useMatchCreation
 */

import { ref, computed, reactive } from 'vue';
import type {
    MatchFormData,
    SetFormData,
    GameFormData,
    ValidationResult,
    MatchCreationOptions
} from '@/interfaces/MatchFormInterfaces';
import type { Player } from '@/interfaces/PlayerInterfaces';
import type { Competition } from '@/interfaces/CompetitionsIntercfaces';
import type { Place } from '@/interfaces/PlacesInterfaces';
import { emptyPlayer } from '@/services/emptyObjects';
import { validateMatch } from '@/services/validations';
import { matchCreationService } from '@/services/matches/matchCreationService';
import { useSetsManagement } from './useSetsManagement';

/**
 * Match Creation Composable
 * 
 * Provides reactive state and methods for creating matches using new services.
 * @param options - Optional configuration for the composable
 */
export function useMatchCreation(options?: {
    autoSetupSets?: boolean;
}) {
    const {
        createInitialSets,
        setupAllSetsScoring,
        validateAllSets,
        calculateMatchScore
    } = useSetsManagement();

    // Form state
    const formData = reactive<MatchFormData>({
        player1: emptyPlayer(),
        player2: emptyPlayer(),
        competition: undefined,
        place: undefined,
        surface: '',
        startTime: new Date(),
        sets: createInitialSets(),
    });

    // Setup reactive scoring for sets
    if (options?.autoSetupSets !== false) {
        setupAllSetsScoring(formData.sets);
    }

    // UI state
    const isLoading = ref(false);
    const errors = ref<Record<string, string>>({});

    // Computed properties
    const isFormValid = computed(() => {
        return formData.player1.id !== 0 &&
            formData.player2.id !== 0 &&
            formData.place !== undefined &&
            formData.surface !== '' &&
            formData.startTime instanceof Date;
    });

    const hasMatchData = computed(() => {
        return formData.sets.some(set => set.score1 > 0 || set.score2 > 0);
    });

    const matchScore = computed(() => {
        return calculateMatchScore(formData.sets);
    });

    /**
     * Validates the form data
     */
    const validateForm = async (): Promise<ValidationResult> => {
        try {
            const matchSubmit = {
                competition: formData.competition?.id,
                place: formData.place?.id,
                surface: formData.surface,
                date: formData.startTime,
                player1: formData.player1.id,
                player2: formData.player2.id,
                startTime: formData.startTime.getTime(),
                endTime: formData.startTime.getTime() + 3600000,
                winner: null,
            };

            await validateMatch(matchSubmit);

            // Also validate sets
            const setsValidation = validateAllSets(formData.sets);
            if (!setsValidation.isValid) {
                throw new Error(setsValidation.errors.join(', '));
            }

            errors.value = {};
            return { isValid: true, errors: {} };
        } catch (error: any) {
            const validationErrors: Record<string, string> = {};

            if (error.inner) {
                error.inner.forEach((err: any) => {
                    validationErrors[err.path] = err.message;
                });
            } else if (error.message) {
                validationErrors.general = error.message;
            }

            errors.value = validationErrors;
            return { isValid: false, errors: validationErrors };
        }
    };

    /**
     * Creates the match using the new service
     */
    const createMatch = async (options?: MatchCreationOptions): Promise<number | null> => {
        isLoading.value = true;

        try {
            // Validate if requested
            if (options?.validate !== false) {
                const validation = await validateForm();
                if (!validation.isValid) {
                    throw new Error('Validation failed');
                }
            }

            // Use the new match creation service
            const matchId = await matchCreationService.createMatch(formData);

            // Call success callback if provided
            options?.onSuccess?.(matchId);

            return matchId;
        } catch (error) {
            console.error('Error creating match:', error);
            options?.onError?.(error as Error);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Resets the form to initial state
     */
    const resetForm = () => {
        formData.player1 = emptyPlayer();
        formData.player2 = emptyPlayer();
        formData.competition = undefined;
        formData.place = undefined;
        formData.surface = '';
        formData.startTime = new Date();
        formData.sets = createInitialSets();

        // Setup reactive scoring for new sets
        if (options?.autoSetupSets !== false) {
            setupAllSetsScoring(formData.sets);
        }

        errors.value = {};
    };

    /**
     * Sets form data from existing match (for editing)
     */
    const setFormData = (data: Partial<MatchFormData>) => {
        Object.assign(formData, data);

        // Setup reactive scoring if sets were updated
        if (data.sets && options?.autoSetupSets !== false) {
            setupAllSetsScoring(formData.sets);
        }
    };

    /**
     * Updates specific form field
     */
    const updateField = <K extends keyof MatchFormData>(
        field: K,
        value: MatchFormData[K]
    ) => {
        formData[field] = value;

        // Setup reactive scoring if sets were updated
        if (field === 'sets' && options?.autoSetupSets !== false) {
            setupAllSetsScoring(formData.sets);
        }

        // Clear error for this field if it exists
        if (errors.value[field as string]) {
            delete errors.value[field as string];
        }
    };

    /**
     * Gets error message for a specific field
     */
    const getFieldError = (field: string): string | undefined => {
        return errors.value[field];
    };

    /**
     * Checks if a specific field has an error
     */
    const hasFieldError = (field: string): boolean => {
        return field in errors.value;
    };

    return {
        // State
        formData,
        isLoading,
        errors,

        // Computed
        isFormValid,
        hasMatchData,
        matchScore,

        // Methods
        validateForm,
        createMatch,
        resetForm,
        setFormData,
        updateField,
        getFieldError,
        hasFieldError,
    };
}
