import api from "@/api/api";
import type { Player } from "@/interfaces/PlayerInterfaces";
import type { get } from "node_modules/axios/index.cjs";


const getPlayersData = async () => {
    //make a custom requets
    const response = await api.get<Player[]>('/players');
    return response.data;
}

export default {
    getPlayersData
}

