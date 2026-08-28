import { useQuery } from '@tanstack/vue-query';
import { competitionService } from './competitionService';

/**
 * Query hooks for Competition data
 */

/**
 * Get all competitions
 */
export function useCompetitions() {
    return useQuery({
        queryKey: ['competitions'],
        queryFn: () => competitionService.getAll(),
        staleTime: 1000 * 60 * 10, // 10 minutes (competitions change less frequently)
    });
}

/**
 * Get competition by ID
 */
export function useCompetition(id: number) {
    return useQuery({
        queryKey: ['competitions', id],
        queryFn: () => competitionService.getById(id),
        staleTime: 1000 * 60 * 10,
        enabled: !!id,
    });
}
