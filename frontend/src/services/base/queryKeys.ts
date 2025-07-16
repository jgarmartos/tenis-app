/**
 * Centralized query keys for React Query
 * This helps maintain consistency and avoid typos
 */
export const queryKeys = {
    // Players
    players: {
        all: ['players'] as const,
        lists: () => [...queryKeys.players.all, 'list'] as const,
        list: (filters: string) => [...queryKeys.players.lists(), { filters }] as const,
        details: () => [...queryKeys.players.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.players.details(), id] as const,
    },

    // Matches
    matches: {
        all: ['matches'] as const,
        lists: () => [...queryKeys.matches.all, 'list'] as const,
        list: (filters: string) => [...queryKeys.matches.lists(), { filters }] as const,
        details: () => [...queryKeys.matches.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.matches.details(), id] as const,
        statistics: (id: number) => [...queryKeys.matches.detail(id), 'statistics'] as const,
        byPlace: (placeId: number) => [...queryKeys.matches.lists(), 'byPlace', placeId] as const,
    },

    // Places
    places: {
        all: ['places'] as const,
        lists: () => [...queryKeys.places.all, 'list'] as const,
        list: (filters: string) => [...queryKeys.places.lists(), { filters }] as const,
        details: () => [...queryKeys.places.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.places.details(), id] as const,
    },

    // Competitions
    competitions: {
        all: ['competitions'] as const,
        lists: () => [...queryKeys.competitions.all, 'list'] as const,
        list: (filters: string) => [...queryKeys.competitions.lists(), { filters }] as const,
        details: () => [...queryKeys.competitions.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.competitions.details(), id] as const,
    },
} as const;
