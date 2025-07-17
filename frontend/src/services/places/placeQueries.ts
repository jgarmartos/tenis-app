import { useQuery } from '@tanstack/vue-query';
import { placeService } from './placeService';

/**
 * Query hooks for Place data
 */

/**
 * Get all places
 */
export function usePlaces() {
    return useQuery({
        queryKey: ['places'],
        queryFn: () => placeService.getAll(),
        staleTime: 1000 * 60 * 10, // 10 minutes (places change infrequently)
    });
}

/**
 * Get place by ID
 */
export function usePlace(id: number) {
    return useQuery({
        queryKey: ['places', id],
        queryFn: () => placeService.getById(id),
        staleTime: 1000 * 60 * 10,
        enabled: !!id,
    });
}
