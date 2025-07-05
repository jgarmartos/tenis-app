// src/services/requests/usePlayerMutations.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '@/api/api';
import type { PlayerSubmit } from '@/interfaces/PlayerInterfaces';

export function usePlayerMutations(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const createPlayer = useMutation({
    mutationFn: (newPlayer: PlayerSubmit) => api.post('/players', newPlayer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      onSuccessCallback?.();
    },
  });

  const updatePlayer = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PlayerSubmit }) =>
      api.put(`/players/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      onSuccessCallback?.();
    },
  });

  const deletePlayer = useMutation({
    mutationFn: (id: number) => api.delete(`/players/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      onSuccessCallback?.();
    },
  });

  return { createPlayer, updatePlayer, deletePlayer };
}
