import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { playerService } from './playerService';
import { queryKeys } from '../base/queryKeys';
import type { PlayerSubmit } from '@/interfaces/PlayerInterfaces';
import type { MutationOptions } from '@/api/types';

/**
 * Mutation hooks for Player data modifications
 */

/**
 * Create new player
 */
export function useCreatePlayer(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PlayerSubmit) => playerService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update existing player
 */
export function useUpdatePlayer(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PlayerSubmit }) =>
            playerService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Delete player
 */
export function useDeletePlayer(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => playerService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}
