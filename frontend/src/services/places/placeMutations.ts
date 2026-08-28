import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { placeService } from './placeService';
import type { PlaceSubmit } from '@/interfaces/PlacesInterfaces';
import type { MutationOptions } from '@/api/types';

/**
 * Mutation hooks for Place data modifications
 */

/**
 * Create new place
 */
export function useCreatePlace(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PlaceSubmit) => placeService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update existing place
 */
export function useUpdatePlace(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PlaceSubmit }) =>
            placeService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Delete place
 */
export function useDeletePlace(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => placeService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}
