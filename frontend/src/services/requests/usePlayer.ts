import { useQuery } from '@tanstack/vue-query';
import api from '@/api/api';
import type { Player } from '@/interfaces/PlayerInterfaces';

interface UsePlayerOptions {
    staleTime?: number;
    refetchOnMount?: boolean | 'always';
    enabled?: boolean;
}

export const usePlayer = (playerId: number, options: UsePlayerOptions = {}) => {
    return useQuery({
        queryKey: ['player', playerId], // Clave única para identificar esta consulta
        queryFn: () => api.get(`/players/${playerId}`).then((response) => response.data),
        enabled: !!playerId, // Solo ejecuta la consulta si playerId es válido
        ...options, // Sobrescribe con opciones proporcionadas
    });
};


export const usePlayerQuery = (id: string | string[]) => {
  return useQuery({
    queryKey: ['player', id],
    queryFn: async () => {
      const { data } = await api.get(`/players/${id}`);
      return data;
    },
    enabled: !!id, // Solo se ejecuta si el ID está definido
  });
};

