// src/services/requests/useMatchesByPlace.ts
import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import api from '@/api/api';
import type { Match } from '@/interfaces/MatchesInterfaces';

/**
 * Fetches matches played at a specific place using Vue Query
 * @param placeId - Reactive reference to the place ID
 * @returns Vue Query result with matches data, loading state, and error handling
 */
export function useMatchesByPlace(placeId: Ref<number | null>) {
  return useQuery({
    queryKey: ['matchesByPlace', placeId],
    queryFn: async () => {
      if (!placeId.value) {
        throw new Error('Place ID is required');
      }

      try {
        const response = await api.get<Match[]>(`/matches/byplace/${placeId.value}`);
        return response.data;
      } catch (error: any) {
        // Handle different HTTP status codes
        if (error.response?.status === 404) {
          throw new Error('Place not found');
        } else if (error.response?.status === 400) {
          throw new Error('Invalid place ID');
        } else {
          throw new Error('Failed to fetch matches for this place');
        }
      }
    },
    enabled: computed(() => placeId.value !== null && placeId.value > 0),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
