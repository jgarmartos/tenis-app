import api from "@/api/api";

import type { Match, MatchSubmit } from "@/interfaces/MatchesInterfaces";


const getMatch = async (id: number) => {
    //make a custom requets
    const response = await api.get<Match>('/matches7'+id);
    return response.data;
}

export default {
    getMatch
}