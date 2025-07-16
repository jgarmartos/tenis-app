import { useQuery } from '@tanstack/vue-query';
import apiClient from '@/api';
import type { MatchStatistics } from '@/interfaces/StatisticsInterface';

export const useMatchStatistics = (matchId: number | null) => {
  return useQuery({
    queryKey: ['matchStatistics', matchId],
    queryFn: async () => {
      if (!matchId) {
        throw new Error('matchId no está disponibles.');
      }
      const response = await apiClient.get<MatchStatistics>(
        `/matches/statistics/${matchId}`
      );
      return response.data;
    },
    // enabled: enabled, // Desactivamos la consulta automática por defecto
    // staleTime: 1000 * 60 * 5, // Opcional: tiempo para que los datos se consideren frescos
  });
};

export const getStats = async (matchId: number) => {
  const response = await apiClient.get<MatchStatistics>(
    `/matches/statistics/${matchId}`
  );
  return response.data;
};

export const getPlayer = async (playerId: number) => {
  const response = await apiClient.get(`/players/${playerId}`);
  return response.data;
};
