import api from "@/api/api";
import type { Player } from "@/interfaces/PlayerInterfaces";
import type { get } from "node_modules/axios/index.cjs";
import { useQuery } from "@tanstack/vue-query";


const getPlayersData = async () => {
    //make a custom requets
    const response = await api.get<Player[]>('/players');
    return response.data;
}



const getPlayersQuery = () => useQuery({
    queryKey: ['players'],
    queryFn: getPlayersData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true
})


export default {
    getPlayersData
}

