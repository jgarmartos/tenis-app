/**
 * Sets Management Composable
 * 
 * Handles reactive set and game state management with tennis scoring logic.
 * Provides reactive updates for set scores based on game results.
 * 
 * @module composables/useSetsManagement
 */

import { reactive, watch, computed } from 'vue';
import type { SetFormData, GameFormData } from '@/interfaces/MatchFormInterfaces';
import { tennisScoring } from '@/services/matches/tennisScoring';

/**
 * Composable for managing sets and games state
 */
export function useSetsManagement() {
    /**
     * Creates a default game structure
     */
    const createDefaultGame = (gameNumber: number): GameFormData => ({
        name: gameNumber === 13 ? 'Tiebreak' : `Game ${gameNumber}`,
        number: gameNumber,
        selectedPuntuation1: 0,
        selectedPuntuation2: 0,
        deuceNumber: 1,
    });

    /**
     * Creates a default set structure
     */
    const createDefaultSet = (setNumber: number): SetFormData => ({
        name: `Set ${setNumber}`,
        score1: 0,
        score2: 0,
        startsServing: 'player1',
        type: 'Set',
        games: Array.from({ length: 13 }, (_, i) => createDefaultGame(i + 1)),
    });

    /**
     * Creates the initial sets structure
     */
    const createInitialSets = (): SetFormData[] => {
        return Array.from({ length: 5 }, (_, i) => createDefaultSet(i + 1));
    };

    /**
     * Sets up reactive scoring for a set
     * @param setData - The set data to make reactive
     */
    const setupSetScoring = (setData: SetFormData) => {
        // Watch for changes in game scores and update set scores
        watch(
            () => setData.games.map(game => [
                game.selectedPuntuation1,
                game.selectedPuntuation2,
            ]),
            () => {
                if (setData.type === 'Set') {
                    const scores = tennisScoring.calculateSetScore(setData.games);
                    setData.score1 = scores.score1;
                    setData.score2 = scores.score2;
                }
            },
            { deep: true }
        );

        // Ensure starting server is set
        if (!setData.startsServing) {
            setData.startsServing = 'player1';
        }
    };

    /**
     * Sets up reactive scoring for all sets
     * @param sets - Array of sets to make reactive
     */
    const setupAllSetsScoring = (sets: SetFormData[]) => {
        sets.forEach(setupSetScoring);
    };

    /**
     * Validates a set's data
     * @param setData - Set data to validate
     * @returns Validation result
     */
    const validateSet = (setData: SetFormData): { isValid: boolean; errors: string[] } => {
        const errors: string[] = [];

        if (setData.type === 'Set') {
            // Validate each game in the set
            setData.games.forEach((game, index) => {
                const isTiebreak = index === 12;
                const validation = tennisScoring.validateGameScore(
                    game.selectedPuntuation1,
                    game.selectedPuntuation2,
                    isTiebreak
                );
                errors.push(...validation.errors);
            });
        } else if (setData.type === 'Super Tie Break') {
            // Validate super tie break scores
            if (setData.score1 < 0 || setData.score2 < 0) {
                errors.push('Super tie break scores cannot be negative');
            }
            if (setData.score1 > 50 || setData.score2 > 50) {
                errors.push('Super tie break scores cannot exceed 50');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    };

    /**
     * Validates all sets
     * @param sets - Array of sets to validate
     * @returns Validation result
     */
    const validateAllSets = (sets: SetFormData[]): { isValid: boolean; errors: string[] } => {
        const allErrors: string[] = [];

        sets.forEach((set, index) => {
            const validation = validateSet(set);
            if (!validation.isValid) {
                validation.errors.forEach(error => {
                    allErrors.push(`Set ${index + 1}: ${error}`);
                });
            }
        });

        return {
            isValid: allErrors.length === 0,
            errors: allErrors
        };
    };

    /**
     * Calculates match score from sets
     * @param sets - Array of sets
     * @returns Match score
     */
    const calculateMatchScore = (sets: SetFormData[]): { score1: number; score2: number } => {
        return tennisScoring.calculateMatchScore(sets);
    };

    /**
     * Resets a set to default state
     * @param setData - Set to reset
     */
    const resetSet = (setData: SetFormData) => {
        setData.score1 = 0;
        setData.score2 = 0;
        setData.startsServing = 'player1';
        setData.type = 'Set';

        setData.games.forEach(game => {
            game.selectedPuntuation1 = 0;
            game.selectedPuntuation2 = 0;
            game.deuceNumber = 1;
        });
    };

    /**
     * Resets all sets to default state
     * @param sets - Array of sets to reset
     */
    const resetAllSets = (sets: SetFormData[]) => {
        sets.forEach(resetSet);
    };

    /**
     * Gets the server for a specific game
     * @param gameNumber - Game number (1-based)
     * @param startsServing - Who starts serving the set
     * @returns Server player
     */
    const getGameServer = (gameNumber: number, startsServing: 'player1' | 'player2'): 'player1' | 'player2' => {
        return tennisScoring.determineServer(gameNumber, startsServing);
    };

    /**
     * Formats a score for display
     * @param score - Score to format
     * @param isAdvantage - Whether this is an advantage scenario
     * @returns Formatted score
     */
    const formatScore = (score: number, isAdvantage: boolean = false): string => {
        return tennisScoring.formatScore(score, isAdvantage);
    };

    return {
        // Factory functions
        createDefaultGame,
        createDefaultSet,
        createInitialSets,

        // Setup functions
        setupSetScoring,
        setupAllSetsScoring,

        // Validation
        validateSet,
        validateAllSets,

        // Calculations
        calculateMatchScore,
        getGameServer,
        formatScore,

        // Utilities
        resetSet,
        resetAllSets,
    };
}
