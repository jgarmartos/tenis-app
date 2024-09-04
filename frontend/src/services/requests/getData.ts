import api from "@/api/api";
import type { Competition } from "@/interfaces/CompetitionsIntercfaces";
import type { Game } from "@/interfaces/GamesInterfaces";

import type { Match, MatchSubmit } from "@/interfaces/MatchesInterfaces";
import type { Place } from "@/interfaces/PlacesInterfaces";
import type { Set, SetResponse } from "@/interfaces/SetsInterfaces";
import { useQuery } from "@tanstack/vue-query";


const getMatch = async (id: number) => {
    //make a custom requets
    const response = await api.get<Match>('/matches7'+id);
    return response.data;
}

const getSetsByMatch = async (id: number) => {
    //make a custom requets
    const response = await api.get<Set[]>('/sets/match/'+id);
    return response.data;
}

export function useGetData() {
    // const store = useDataStore();

    const getGamesBySetQuery = (id: number) => useQuery({
        queryKey: ["games/sets", id], // 'id' es el identificador del set
        queryFn: async ({ queryKey }) => {
            const [, id] = queryKey; // Extrae el 'id' desde queryKey
            const response = await api.get<Game[]>(`/games/set/${id}`);
            // store.setPlayers(response.data); // Esto es opcional, si quieres guardar los datos en un store
            return response.data;
        },
    });
    

    // const matchesQuery = useQuery({
    //     queryKey: ["matches"],
    //     queryFn: async () => {
    //         const response = await api.get<Match[]>("/matches");
    //         store.setMatches(response.data);
    //         return response.data;
    //     },
    // });

    // const competitionsQuery = useQuery({
    //     queryKey: ["competitions"],
    //     queryFn: async () => {
    //         const response = await api.get<Competition[]>("/competitions");
    //         store.setCompetitions(response.data);
    //         return response.data;
    //     },
    // });

    // const placesQuery = useQuery({
    //     queryKey: ["places"],
    //     queryFn: async () => {
    //         const response = await api.get<Place[]>("/places");
    //         store.setPlaces(response.data);
    //         return response.data;
    //     },
    // });

    // const setsQuery = useQuery({
    //     queryKey: ["sets"],
    //     queryFn: async () => {
    //         const response = await api.get<SetResponse[]>("/sets");
    //         store.setSets(response.data);
    //         return response.data;
    //     }
    // });

    return {
        getGamesBySetQuery,
        // matchesQuery,
        // competitionsQuery,
        // placesQuery,
        // setsQuery,
    };
}