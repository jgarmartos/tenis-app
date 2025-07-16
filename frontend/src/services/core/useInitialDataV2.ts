/**
 * Modern data loading strategy using new services + stores
 * This combines React Query for server state with Pinia for client state
 */

import { useQueries } from '@tanstack/vue-query';
import { useDataStore } from '@/stores/useDataStore';
import { queryKeys } from '@/services/base/queryKeys';
import {
    matchService,
    playerService
} from '@/services';
import { computed, watch } from 'vue';

// You'll need to create these services following the same pattern
import api from '@/api/api';
import type { Competition } from '@/interfaces/CompetitionsIntercfaces';
import type { Place } from '@/interfaces/PlacesInterfaces';
import type { Set, SetResponse } from '@/interfaces/SetsInterfaces';
import type { Game } from '@/interfaces/GamesInterfaces';

/**
 * Modern approach: Use React Query for server state, stores for client state
 */
export function useInitialDataV2() {
    const store = useDataStore();

    // Use the new services for queries
    const queriesResult = useQueries({
        queries: [
            {
                queryKey: queryKeys.players.all,
                queryFn: () => playerService.getAll(),
                staleTime: 1000 * 60 * 5, // 5 minutes
            },
            {
                queryKey: queryKeys.matches.all,
                queryFn: () => matchService.getAll(),
                staleTime: 1000 * 60 * 5,
            },
            {
                queryKey: ['competitions'],
                queryFn: async () => {
                    const response = await api.get<Competition[]>('/competitions');
                    return response.data;
                },
                staleTime: 1000 * 60 * 10, // 10 minutes (competitions change less)
            },
            {
                queryKey: ['places'],
                queryFn: async () => {
                    const response = await api.get<Place[]>('/places');
                    return response.data;
                },
                staleTime: 1000 * 60 * 10,
            },
            {
                queryKey: ['sets'],
                queryFn: async () => {
                    const response = await api.get<SetResponse[]>('/sets');
                    return response.data;
                },
                staleTime: 1000 * 60 * 2, // Sets change more frequently
            },
            {
                queryKey: ['games'],
                queryFn: async () => {
                    const response = await api.get<Game[]>('/games');
                    return response.data;
                },
                staleTime: 1000 * 60 * 1, // Games change very frequently
            },
        ],
    });

    // Extract individual query results
    const playersQuery = computed(() => queriesResult.value[0]);
    const matchesQuery = computed(() => queriesResult.value[1]);
    const competitionsQuery = computed(() => queriesResult.value[2]);
    const placesQuery = computed(() => queriesResult.value[3]);
    const setsQuery = computed(() => queriesResult.value[4]);
    const gamesQuery = computed(() => queriesResult.value[5]);

    // Computed properties for easy access
    const players = computed(() => playersQuery.value.data || []);
    const matches = computed(() => matchesQuery.value.data || []);
    const competitions = computed(() => competitionsQuery.value.data || []);
    const places = computed(() => placesQuery.value.data || []);
    const sets = computed(() => setsQuery.value.data || []);
    const games = computed(() => gamesQuery.value.data || []);

    // Optional: Sync with store for components that still need it
    watch([players, matches, competitions, places, sets, games], () => {
        if (players.value.length) store.setPlayers(players.value);
        if (matches.value.length) store.setMatches(matches.value);
        if (competitions.value.length) store.setCompetitions(competitions.value);
        if (places.value.length) store.setPlaces(places.value);
        if (sets.value.length) store.setSets(sets.value);
        if (games.value.length) store.setGames(games.value);
    });

    // Loading states
    const isLoading = computed(() =>
        queriesResult.value.some(query => query.isLoading)
    );

    const isInitialLoading = computed(() =>
        queriesResult.value.some(query => query.isInitialLoading)
    );

    const hasError = computed(() =>
        queriesResult.value.some(query => query.isError)
    );

    const errors = computed(() =>
        queriesResult.value.filter(query => query.error).map(query => query.error)
    );

    return {
        // Data
        players,
        matches,
        competitions,
        places,
        sets,
        games,

        // Loading states
        isLoading,
        isInitialLoading,
        hasError,
        errors,

        // Individual queries (for advanced usage)
        playersQuery,
        matchesQuery,
        competitionsQuery,
        placesQuery,
        setsQuery,
        gamesQuery,

        // Refetch methods
        refetchAll: () => queriesResult.value.forEach(query => query.refetch()),
        refetchPlayers: () => playersQuery.value.refetch(),
        refetchMatches: () => matchesQuery.value.refetch(),
    };
}
