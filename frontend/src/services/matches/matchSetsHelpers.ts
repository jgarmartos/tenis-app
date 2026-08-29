/**
 * Pure helpers for deriving set information for a match from an already-loaded
 * sets array (e.g. from useAppData()), replacing the old store-backed matchServices.ts.
 */

import type { SetResponse } from '@/interfaces/SetsInterfaces';

/**
 * Sets belonging to a given match
 */
export function getSetsForMatch(sets: SetResponse[], matchId: number): SetResponse[] {
    return sets.filter(set => set.match.id === matchId);
}

/**
 * Compact "6-4, 3-6, 7-5" style result string for a match
 */
export function getSetsResultForMatch(sets: SetResponse[], matchId: number): string {
    return getSetsForMatch(sets, matchId)
        .map(set => `${set.player1Score}-${set.player2Score}`)
        .join(', ');
}

/**
 * Per-set score and win flag for a given player in a match, ordered by set number
 */
export function getSetsForMatchByPlayer(
    sets: SetResponse[],
    matchId: number,
    playerId: number
): Array<{ score: number; isWinner: boolean } | undefined> {
    return getSetsForMatch(sets, matchId)
        .sort((a, b) => a.numberSet - b.numberSet)
        .map(set => {
            const isPlayer1 = set.match.player1.id === playerId;
            const isPlayer2 = set.match.player2.id === playerId;

            if (isPlayer1 && set.player1Score > set.player2Score) {
                return { score: set.player1Score, isWinner: true };
            }
            if (isPlayer2 && set.player2Score > set.player1Score) {
                return { score: set.player2Score, isWinner: true };
            }
            if (isPlayer1 && set.player1Score < set.player2Score) {
                return { score: set.player1Score, isWinner: false };
            }
            if (isPlayer2 && set.player2Score < set.player1Score) {
                return { score: set.player2Score, isWinner: false };
            }
            return undefined;
        });
}
