/**
 * Simple and effective approach: Individual queries with better organization
 */

import { useQuery } from '@tanstack/vue-query';
import { useDataStore } from '@/stores/useDataStore';
import { queryKeys } from '@/services/base/queryKeys';
import {
    matchService,
    playerService
} from '@/services';
import { computed, watch } from 'vue';
import api from '@/api/api';
import type { Competition } from '@/interfaces/CompetitionsIntercfaces';
import type { Place } from '@/interfaces/PlacesInterfaces';
import type { SetResponse } from '@/interfaces/SetsInterfaces';
import type { Game } from '@/interfaces/GamesInterfaces';

/**
 * Modern approach: Clean individual queries with centralized loading states
 */
export function useAppData() {
    const store = useDataStore();

    // Individual queries using new services
    const playersQuery = useQuery({
        queryKey: queryKeys.players.all,
        queryFn: () => playerService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const matchesQuery = useQuery({
        queryKey: queryKeys.matches.all,
        queryFn: () => matchService.getAll(),
        staleTime: 1000 * 60 * 5,
    });

    // Temporary: These will use old API until you create their services
    const competitionsQuery = useQuery({
        queryKey: ['competitions'],
        queryFn: async () => {
            const response = await api.get<Competition[]>('/competitions');
            return response.data;
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    const placesQuery = useQuery({
        queryKey: ['places'],
        queryFn: async () => {
            const response = await api.get<Place[]>('/places');
            return response.data;
        },
        staleTime: 1000 * 60 * 10,
    });

    const setsQuery = useQuery({
        queryKey: ['sets'],
        queryFn: async () => {
            const response = await api.get<SetResponse[]>('/sets');
            return response.data;
        },
        staleTime: 1000 * 60 * 2,
    });

    const gamesQuery = useQuery({
        queryKey: ['games'],
        queryFn: async () => {
            const response = await api.get<Game[]>('/games');
            return response.data;
        },
        staleTime: 1000 * 60 * 1,
    });

    // Data accessors
    const players = computed(() => playersQuery.data.value || []);
    const matches = computed(() => matchesQuery.data.value || []);
    const competitions = computed(() => competitionsQuery.data.value || []);
    const places = computed(() => placesQuery.data.value || []);
    const sets = computed(() => setsQuery.data.value || []);
    const games = computed(() => gamesQuery.data.value || []);

    // Optional: Sync with store for backward compatibility
    watch(players, (newPlayers) => {
        if (newPlayers.length) store.setPlayers(newPlayers);
    });

    watch(matches, (newMatches) => {
        if (newMatches.length) store.setMatches(newMatches);
    });

    watch(competitions, (newCompetitions) => {
        if (newCompetitions.length) store.setCompetitions(newCompetitions);
    });

    watch(places, (newPlaces) => {
        if (newPlaces.length) store.setPlaces(newPlaces);
    });

    watch(sets, (newSets) => {
        if (newSets.length) store.setSets(newSets);
    });

    watch(games, (newGames) => {
        if (newGames.length) store.setGames(newGames);
    });

    // Global loading states
    const isLoading = computed(() =>
        playersQuery.isLoading.value ||
        matchesQuery.isLoading.value ||
        competitionsQuery.isLoading.value ||
        placesQuery.isLoading.value ||
        setsQuery.isLoading.value ||
        gamesQuery.isLoading.value
    );

    const isInitialLoading = computed(() =>
        playersQuery.isInitialLoading.value ||
        matchesQuery.isInitialLoading.value ||
        competitionsQuery.isInitialLoading.value ||
        placesQuery.isInitialLoading.value ||
        setsQuery.isInitialLoading.value ||
        gamesQuery.isInitialLoading.value
    );

    const hasError = computed(() =>
        playersQuery.isError.value ||
        matchesQuery.isError.value ||
        competitionsQuery.isError.value ||
        placesQuery.isError.value ||
        setsQuery.isError.value ||
        gamesQuery.isError.value
    );

    const errors = computed(() => [
        playersQuery.error.value,
        matchesQuery.error.value,
        competitionsQuery.error.value,
        placesQuery.error.value,
        setsQuery.error.value,
        gamesQuery.error.value
    ].filter(Boolean));

    return {
        // Data - Use these instead of store getters
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

        // Individual queries for specific components
        playersQuery,
        matchesQuery,
        competitionsQuery,
        placesQuery,
        setsQuery,
        gamesQuery,

        // Utility methods
        refetchAll: () => {
            playersQuery.refetch();
            matchesQuery.refetch();
            competitionsQuery.refetch();
            placesQuery.refetch();
            setsQuery.refetch();
            gamesQuery.refetch();
        },
    };
}
