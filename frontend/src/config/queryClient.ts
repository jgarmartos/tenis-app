/**
 * 🚀 TanStack Query Configuration
 * 
 * Configures React Query/TanStack Query with default settings
 * for optimal performance and caching behavior.
 */

import { QueryClient } from '@tanstack/vue-query';

// ============================================================================
// 🎯 QUERY CLIENT CONFIGURATION
// ============================================================================

/**
 * Creates a configured QueryClient instance with default settings
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // ⏱️ Time before data becomes stale (1 minute)
        staleTime: 60000,
        
        // 🗄️ Time data stays in cache (5 minutes)
        gcTime: 300000, // Renamed from cacheTime in v5
        
        // 🔄 Retry failed requests
        retry: 3,
        
        // 🔄 Retry delay strategy (exponential backoff)
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        
        // 📡 Refetch on window focus
        refetchOnWindowFocus: false,
        
        // 🌐 Refetch on network reconnect
        refetchOnReconnect: true,
        
        // 🎯 Refetch on mount if data is stale
        refetchOnMount: true,
      },
      mutations: {
        // 🔄 Retry failed mutations
        retry: 1,
        
        // ⏱️ Retry delay for mutations
        retryDelay: 1000,
      },
    },
  });
};

// ============================================================================
// 🔧 QUERY KEYS FACTORY
// ============================================================================

/**
 * Factory for generating consistent query keys with environment context
 */
export const queryKeys = {
  // 👥 Players
  players: {
    all: ['players'] as const,
    list: () => [...queryKeys.players.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.players.all, 'detail', id] as const,
    matches: (id: string) => [...queryKeys.players.all, 'matches', id] as const,
  },
  
  // 🎾 Matches
  matches: {
    all: ['matches'] as const,
    list: () => [...queryKeys.matches.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.matches.all, 'detail', id] as const,
    byPlace: (placeId: string) => [...queryKeys.matches.all, 'byPlace', placeId] as const,
  },
  
  // 📍 Places
  places: {
    all: ['places'] as const,
    list: () => [...queryKeys.places.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.places.all, 'detail', id] as const,
  },
  
  // 🏆 Competitions
  competitions: {
    all: ['competitions'] as const,
    list: () => [...queryKeys.competitions.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.competitions.all, 'detail', id] as const,
  },
  
  // 📊 Statistics
  statistics: {
    all: ['statistics'] as const,
    player: (playerId: string) => [...queryKeys.statistics.all, 'player', playerId] as const,
    match: (matchId: string) => [...queryKeys.statistics.all, 'match', matchId] as const,
  },
} as const;

// ============================================================================
// 🎯 EXPORTS
// ============================================================================

// Create the default query client instance
export const queryClient = createQueryClient();
