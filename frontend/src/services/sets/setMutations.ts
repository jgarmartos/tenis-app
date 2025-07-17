import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { setService } from './setService';
import { queryKeys } from '../base/queryKeys';
import type { SetSubmit } from '@/interfaces/SetsInterfaces';
import type { MutationOptions } from '@/api/types';

/**
 * Mutation hooks for Set data modifications
 */

/**
 * Create new set
 */
export function useCreateSet(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SetSubmit) => setService.create(data),
        onSuccess: (newSet) => {
            // Invalidate sets queries
            queryClient.invalidateQueries({ queryKey: ['sets'] });

            // Also invalidate the parent match's data
            if (newSet.matchId) {
                queryClient.invalidateQueries({
                    queryKey: queryKeys.matches.detail(newSet.matchId)
                });
            }

            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update existing set
 */
export function useUpdateSet(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: SetSubmit }) =>
            setService.update(id, data),
        onSuccess: (updatedSet) => {
            queryClient.invalidateQueries({ queryKey: ['sets'] });

            if (updatedSet.matchId) {
                queryClient.invalidateQueries({
                    queryKey: queryKeys.matches.detail(updatedSet.matchId)
                });
            }

            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Delete set
 */
export function useDeleteSet(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => setService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sets'] });
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}
