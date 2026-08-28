import { useQuery } from '@tanstack/vue-query';
import { matchService } from './matchService';
import { queryKeys } from '../base/queryKeys';
import type { Match } from '@/interfaces/MatchesInterfaces';
import type { MatchStatistics } from '@/interfaces/StatisticsInterface';

/**
 * Query hooks for Match data fetching
 */

/**
 * Get all matches
 */
export function useMatches() {
    return useQuery({
        queryKey: queryKeys.matches.all,
        queryFn: () => matchService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Get match by ID
 */
export function useMatch(id: number) {
    return useQuery({
        queryKey: queryKeys.matches.detail(id),
        queryFn: () => matchService.getById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Get match statistics
 */
export function useMatchStatistics(matchId: number | null) {
    return useQuery({
        queryKey: ['matchStatistics', matchId],
        queryFn: () => matchService.getStatistics(matchId!),
        enabled: !!matchId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Get matches by place
 */
export function useMatchesByPlace(placeId: number) {
    return useQuery({
        queryKey: ['matches', 'byPlace', placeId],
        queryFn: () => matchService.getByPlace(placeId),
        enabled: !!placeId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
