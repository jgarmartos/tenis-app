/**
 * Match Form Interfaces
 * 
 * Type definitions for match creation form data structures.
 * These interfaces separate form data from the final submission data.
 * 
 * @module interfaces/MatchFormInterfaces
 */

import type { Player } from './PlayerInterfaces';
import type { Competition } from './CompetitionsIntercfaces';
import type { Place } from './PlacesInterfaces';

/**
 * Form data for individual games within a set
 */
export interface GameFormData {
    /** Game name/identifier */
    name: string;
    /** Game number in the set */
    number: number;
    /** Score for player 1 (0, 15, 30, 40, 50 for advantage) */
    selectedPuntuation1: number;
    /** Score for player 2 (0, 15, 30, 40, 50 for advantage) */
    selectedPuntuation2: number;
    /** Number of deuces if applicable */
    deuceNumber: number;
}

/**
 * Form data for sets within a match
 */
export interface SetFormData {
    /** Set name/identifier */
    name: string;
    /** Final score for player 1 */
    score1: number;
    /** Final score for player 2 */
    score2: number;
    /** Which player starts serving ('player1' or 'player2') */
    startsServing: string;
    /** Type of set */
    type: 'Set' | 'Super Tie Break';
    /** Games within this set */
    games: GameFormData[];
}

/**
 * Complete form data for match creation
 */
export interface MatchFormData {
    /** First player */
    player1: Player;
    /** Second player */
    player2: Player;
    /** Competition information */
    competition?: Competition;
    /** Place/venue information */
    place?: Place;
    /** Surface type */
    surface: string;
    /** Match start time */
    startTime: Date;
    /** Sets data */
    sets: SetFormData[];
}

/**
 * Validation result interface
 */
export interface ValidationResult {
    /** Whether validation passed */
    isValid: boolean;
    /** Validation errors by field */
    errors: Record<string, string>;
}

/**
 * Match creation options
 */
export interface MatchCreationOptions {
    /** Whether to validate before saving */
    validate?: boolean;
    /** Success callback */
    onSuccess?: (matchId: number) => void;
    /** Error callback */
    onError?: (error: Error) => void;
}
