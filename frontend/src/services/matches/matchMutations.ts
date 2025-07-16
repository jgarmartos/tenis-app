import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { matchService } from './matchService';
import { queryKeys } from '../base/queryKeys';
import type { MatchSubmit } from '@/interfaces/MatchesInterfaces';
import type { MutationOptions } from '@/api/types';

/**
 * Mutation hooks for Match data modifications
 */

/**
 * Create new match
 */
export function useCreateMatch(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: MatchSubmit) => matchService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update existing match
 */
export function useUpdateMatch(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: MatchSubmit }) =>
            matchService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update only the place of a match
 * This is your specific requirement!
 */
export function useUpdateMatchPlace(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ matchId, placeId }: { matchId: number; placeId: number }) =>
            matchService.updatePlace(matchId, placeId),
        onSuccess: () => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update only the winner of a match
 */
export function useUpdateMatchWinner(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ matchId, winnerId }: { matchId: number; winnerId: number | null }) =>
            matchService.updateWinner(matchId, winnerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update match start time
 */
export function useUpdateMatchStartTime(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ matchId, startTime }: { matchId: number; startTime: number }) =>
            matchService.updateStartTime(matchId, startTime),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Update match end time
 */
export function useUpdateMatchEndTime(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ matchId, endTime }: { matchId: number; endTime: number }) =>
            matchService.updateEndTime(matchId, endTime),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}

/**
 * Delete match
 */
export function useDeleteMatch(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => matchService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
}
