import { useQuery } from '@tanstack/vue-query';
import { gameService } from './gameService';

/**
 * Query hooks for Game data
 */

/**
 * Get all games
 */
export function useGames() {
    return useQuery({
        queryKey: ['games'],
        queryFn: () => gameService.getAll(),
        staleTime: 1000 * 60 * 1, // 1 minute (games change frequently)
    });
}

/**
 * Get games by set ID
 */
export function useGamesBySet(setId: number) {
    return useQuery({
        queryKey: ['games', 'set', setId],
        queryFn: () => gameService.getBySetId(setId),
        staleTime: 1000 * 60 * 1,
        enabled: !!setId,
    });
}
