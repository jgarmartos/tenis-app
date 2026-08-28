import { useQuery } from '@tanstack/vue-query';
import { statisticsService } from './statisticsService';
import { queryKeys } from '../base/queryKeys';

/**
 * Query hooks for Statistics data
 */

/**
 * Get match statistics
 */
export function useMatchStatistics(matchId: number | null) {
    return useQuery({
        queryKey: queryKeys.matches.statistics(matchId || 0),
        queryFn: () => {
            if (!matchId) {
                throw new Error('matchId no está disponible.');
            }
            return statisticsService.getMatchStatistics(matchId);
        },
        enabled: !!matchId, // Only run query if matchId exists
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
}
