/**
 * Tennis Scoring Utilities
 * 
 * Provides pure functions for tennis scoring calculations.
 * Handles set scoring, game scoring, and complex tennis rules.
 * 
 * @module services/matches/tennisScoring
 */

import type { SetFormData, GameFormData } from '@/interfaces/MatchFormInterfaces';

/**
 * Tennis scoring utilities class
 */
export class TennisScoring {
    /**
     * Calculates set scores based on game results
     * @param games - Array of games in the set
     * @returns Object with score1 and score2
     */
    static calculateSetScore(games: GameFormData[]): { score1: number; score2: number } {
        let score1 = 0;
        let score2 = 0;

        games.forEach((game, index) => {
            if (index === 12) {
                // Tiebreak logic
                if (
                    game.selectedPuntuation1 >= 7 &&
                    game.selectedPuntuation1 > game.selectedPuntuation2 &&
                    game.selectedPuntuation1 - game.selectedPuntuation2 >= 2
                ) {
                    score1++;
                } else if (
                    game.selectedPuntuation2 >= 7 &&
                    game.selectedPuntuation2 > game.selectedPuntuation1 &&
                    game.selectedPuntuation2 - game.selectedPuntuation1 >= 2
                ) {
                    score2++;
                }
            } else {
                // Regular game logic
                if (
                    game.selectedPuntuation1 === 40 &&
                    ['0', '15', '30'].includes(game.selectedPuntuation2.toString())
                ) {
                    score1++;
                } else if (
                    game.selectedPuntuation2 === 40 &&
                    ['0', '15', '30'].includes(game.selectedPuntuation1.toString())
                ) {
                    score2++;
                } else if (
                    game.selectedPuntuation1 === 50 &&
                    game.selectedPuntuation2 !== 50
                ) {
                    score1++;
                } else if (
                    game.selectedPuntuation2 === 50 &&
                    game.selectedPuntuation1 !== 50
                ) {
                    score2++;
                }
            }
        });

        return { score1, score2 };
    }

    /**
     * Determines if a game is won
     * @param score1 - Player 1 score
     * @param score2 - Player 2 score
     * @param isTiebreak - Whether this is a tiebreak game
     * @returns Object indicating winner and if game is complete
     */
    static isGameWon(score1: number, score2: number, isTiebreak: boolean = false): {
        isWon: boolean;
        winner: 1 | 2 | null;
    } {
        if (isTiebreak) {
            // Tiebreak rules: first to 7 with 2-point margin
            if (score1 >= 7 && score1 - score2 >= 2) {
                return { isWon: true, winner: 1 };
            }
            if (score2 >= 7 && score2 - score1 >= 2) {
                return { isWon: true, winner: 2 };
            }
        } else {
            // Regular game rules
            if (score1 === 40 && ['0', '15', '30'].includes(score2.toString())) {
                return { isWon: true, winner: 1 };
            }
            if (score2 === 40 && ['0', '15', '30'].includes(score1.toString())) {
                return { isWon: true, winner: 2 };
            }
            if (score1 === 50 && score2 !== 50) {
                return { isWon: true, winner: 1 };
            }
            if (score2 === 50 && score1 !== 50) {
                return { isWon: true, winner: 2 };
            }
        }

        return { isWon: false, winner: null };
    }

    /**
     * Determines if a set is won
     * @param score1 - Player 1 set score
     * @param score2 - Player 2 set score
     * @returns Object indicating winner and if set is complete
     */
    static isSetWon(score1: number, score2: number): {
        isWon: boolean;
        winner: 1 | 2 | null;
    } {
        // Set rules: first to 6 games with 2-game margin, or 7-6 after tiebreak
        if (score1 >= 6 && score1 - score2 >= 2) {
            return { isWon: true, winner: 1 };
        }
        if (score2 >= 6 && score2 - score1 >= 2) {
            return { isWon: true, winner: 2 };
        }
        if (score1 === 7 && score2 === 6) {
            return { isWon: true, winner: 1 };
        }
        if (score2 === 7 && score1 === 6) {
            return { isWon: true, winner: 2 };
        }

        return { isWon: false, winner: null };
    }

    /**
     * Formats a tennis score for display
     * @param score - Numeric score
     * @param isAdvantage - Whether this is an advantage situation
     * @returns Formatted score string
     */
    static formatScore(score: number, isAdvantage: boolean = false): string {
        if (isAdvantage) {
            return score === 50 ? 'AD' : score.toString();
        }

        switch (score) {
            case 0: return '0';
            case 15: return '15';
            case 30: return '30';
            case 40: return '40';
            case 50: return 'AD';
            default: return score.toString();
        }
    }

    /**
     * Calculates match score based on set results
     * @param sets - Array of sets
     * @returns Object with match score
     */
    static calculateMatchScore(sets: SetFormData[]): { score1: number; score2: number } {
        let matchScore1 = 0;
        let matchScore2 = 0;

        sets.forEach(set => {
            if (set.score1 === 0 && set.score2 === 0) return;

            const setResult = this.isSetWon(set.score1, set.score2);
            if (setResult.isWon) {
                if (setResult.winner === 1) {
                    matchScore1++;
                } else if (setResult.winner === 2) {
                    matchScore2++;
                }
            }
        });

        return { score1: matchScore1, score2: matchScore2 };
    }

    /**
     * Determines the server for a specific game
     * @param gameNumber - Game number (1-based)
     * @param startsServing - Who starts serving ('player1' or 'player2')
     * @returns 'player1' or 'player2'
     */
    static determineServer(gameNumber: number, startsServing: 'player1' | 'player2'): 'player1' | 'player2' {
        const gameIndex = gameNumber - 1; // Convert to 0-based
        const isFirstPlayerServing = (gameIndex % 2 === 0 && startsServing === 'player1') ||
            (gameIndex % 2 === 1 && startsServing === 'player2');

        return isFirstPlayerServing ? 'player1' : 'player2';
    }

    /**
     * Validates if game scores are consistent with tennis rules
     * @param score1 - Player 1 score
     * @param score2 - Player 2 score
     * @param isTiebreak - Whether this is a tiebreak
     * @returns Validation result
     */
    static validateGameScore(score1: number, score2: number, isTiebreak: boolean = false): {
        isValid: boolean;
        errors: string[];
    } {
        const errors: string[] = [];

        if (isTiebreak) {
            if (score1 < 0 || score2 < 0) {
                errors.push('Tiebreak scores cannot be negative');
            }
            if (score1 > 50 || score2 > 50) {
                errors.push('Tiebreak scores cannot exceed 50');
            }
        } else {
            const validScores = [0, 15, 30, 40, 50];
            if (!validScores.includes(score1)) {
                errors.push('Invalid score for player 1');
            }
            if (!validScores.includes(score2)) {
                errors.push('Invalid score for player 2');
            }

            // Check for invalid deuce scenarios
            if (score1 === 50 && score2 < 40) {
                errors.push('Advantage can only occur after deuce (40-40)');
            }
            if (score2 === 50 && score1 < 40) {
                errors.push('Advantage can only occur after deuce (40-40)');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Export singleton instance
export const tennisScoring = TennisScoring;
