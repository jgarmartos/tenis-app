import { useQuery } from '@tanstack/vue-query';
import { setService } from './setService';

/**
 * Query hooks for Set data
 */

/**
 * Get all sets
 */
export function useSets() {
    return useQuery({
        queryKey: ['sets'],
        queryFn: () => setService.getAll(),
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
}

/**
 * Get sets by match ID
 */
export function useSetsByMatch(matchId: number) {
    return useQuery({
        queryKey: ['sets', 'match', matchId],
        queryFn: () => setService.getByMatchId(matchId),
        staleTime: 1000 * 60 * 2,
        enabled: !!matchId,
    });
}
