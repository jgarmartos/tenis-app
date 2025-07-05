// src/services/requests/usePlaceMutations.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '@/api/api';
import type { PlaceSubmit } from '@/interfaces/PlacesInterfaces';

/**
 * Custom hook for Place mutations (create, update, delete).
 * @param {() => void} [onSuccessCallback] - Optional callback to run on mutation success.
 * @returns {{ createPlace, updatePlace, deletePlace }} - Place mutation hooks.
 */
export function usePlaceMutations(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  /**
   * Mutation for creating a new Place.
   */
  const createPlace = useMutation({
    mutationFn: (newPlace: PlaceSubmit) => api.post('/places', newPlace),
    onSuccess: () => {
      // Invalidate 'places' query to refresh data after mutation
      queryClient.invalidateQueries({ queryKey: ['places'] });
      onSuccessCallback?.();
    },
  });

  /**
   * Mutation for updating an existing Place.
   */
  const updatePlace = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PlaceSubmit }) =>
      api.put(`/places/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
      onSuccessCallback?.();
    },
  });

  /**
   * Mutation for deleting a Place.
   */
  const deletePlace = useMutation({
    mutationFn: (id: number) => api.delete(`/places/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
      onSuccessCallback?.();
    },
  });

  return { createPlace, updatePlace, deletePlace };
}
