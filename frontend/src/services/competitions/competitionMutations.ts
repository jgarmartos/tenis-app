import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { competitionService } from './competitionService';
import type { CompetitionSubmit } from '@/interfaces/CompetitionsIntercfaces';
import type { MutationOptions } from '@/api/types';

/**
 * Mutation hooks for Competition data modifications
 */

/**
 * Create new competition
 */
export function useCreateCompetition(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CompetitionSubmit) => competitionService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['competitions'] });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update existing competition
 */
export function useUpdateCompetition(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CompetitionSubmit }) =>
            competitionService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['competitions'] });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Delete competition
 */
export function useDeleteCompetition(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => competitionService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['competitions'] });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}
