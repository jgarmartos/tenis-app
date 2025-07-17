import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { gameService } from './gameService';
import { queryKeys } from '../base/queryKeys';
import type { GameSubmit } from '@/interfaces/GamesInterfaces';
import type { MutationOptions } from '@/api/types';

/**
 * Mutation hooks for Game data modifications
 */

/**
 * Create new game
 */
export function useCreateGame(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: GameSubmit) => gameService.create(data),
        onSuccess: (newGame) => {
            // Invalidate games queries
            queryClient.invalidateQueries({ queryKey: ['games'] });

            // Also invalidate related data (sets and matches)
            queryClient.invalidateQueries({ queryKey: ['sets'] });
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });

            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update existing game
 */
export function useUpdateGame(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: GameSubmit }) =>
            gameService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['games'] });
            queryClient.invalidateQueries({ queryKey: ['sets'] });
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Delete game
 */
export function useDeleteGame(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => gameService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['games'] });
            queryClient.invalidateQueries({ queryKey: ['sets'] });
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}
