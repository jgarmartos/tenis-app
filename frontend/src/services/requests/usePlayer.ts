import { useQuery } from '@tanstack/vue-query';
import api from '@/api/api';


export const usePlayerQuery = (id: string | string[], options = {}) => {
  return useQuery({
    queryKey: ['player', id],
    queryFn: async () => {
      const { data } = await api.get(`/players/${id}`);
      return data;
    },
    enabled: !!id,
    ...options,
  });
};

