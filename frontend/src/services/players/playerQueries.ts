import { useQuery } from '@tanstack/vue-query';
import { playerService } from './playerService';
import { queryKeys } from '../base/queryKeys';

/**
 * Query hooks for Player data fetching
 */

/**
 * Get all players
 */
export function usePlayers() {
    return useQuery({
        queryKey: queryKeys.players.all,
        queryFn: () => playerService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Get player by ID
 */
export function usePlayer(id: number) {
    return useQuery({
        queryKey: queryKeys.players.detail(id),
        queryFn: () => playerService.getById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
