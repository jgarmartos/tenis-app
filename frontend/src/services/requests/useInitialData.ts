import { useQuery } from "@tanstack/vue-query";
import { useDataStore } from "@/stores/useDataStore";
import api from "@/api/api";
import type { Competition } from "@/interfaces/CompetitionsIntercfaces";
import type { Match } from "@/interfaces/MatchesInterfaces";
import type { Place } from "@/interfaces/PlacesInterfaces";
import type { Player } from "@/interfaces/PlayerInterfaces";
import type { Set, SetResponse } from "@/interfaces/SetsInterfaces";
import type { Game } from "@/interfaces/GamesInterfaces";


export function useInitialData() {
    const store = useDataStore();

    const playersQuery = useQuery({
        queryKey: ["players"],
        queryFn: async () => {
            const response = await api.get<Player[]>("/players");
            store.setPlayers(response.data);
            return response.data;
        },
    });

    const matchesQuery = useQuery({
        queryKey: ["matches"],
        queryFn: async () => {
            const response = await api.get<Match[]>("/matches");
            store.setMatches(response.data);
            return response.data;
        },
    });

    const competitionsQuery = useQuery({
        queryKey: ["competitions"],
        queryFn: async () => {
            const response = await api.get<Competition[]>("/competitions");
            store.setCompetitions(response.data);
            return response.data;
        },
    });

    const placesQuery = useQuery({
        queryKey: ["places"],
        queryFn: async () => {
            const response = await api.get<Place[]>("/places");
            store.setPlaces(response.data);
            return response.data;
        },
    });

    const setsQuery = useQuery({
        queryKey: ["sets"],
        queryFn: async () => {
            const response = await api.get<SetResponse[]>("/sets");
            store.setSets(response.data);
            return response.data;
        }

    });

    const gamesQuery = useQuery({
        queryKey: ["games"],
        queryFn: async () => {
            const response = await api.get<Game[]>("/games");
            store.setGames(response.data);
            return response.data;
        }
    });

    return {
        playersQuery,
        matchesQuery,
        competitionsQuery,
        placesQuery,
        setsQuery,
        gamesQuery,
    };
}
