/**
 * Pure helpers for deriving game information for a set from an already-loaded
 * games array (e.g. from useAppData()), replacing the old store-backed gameService.ts.
 */

import type { Game } from '@/interfaces/GamesInterfaces';

/**
 * Games belonging to a given set, ordered by game number
 */
export function getGamesBySet(games: Game[], setId: number): Game[] {
    return games
        .filter(game => game.set.id === setId)
        .sort((a, b) => a.gameNumber - b.gameNumber);
}
