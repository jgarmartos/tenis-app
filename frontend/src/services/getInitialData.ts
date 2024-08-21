import api from "@/api/api";
import type { Competition } from "@/interfaces/CompetitionsIntercfaces";
import type { Match } from "@/interfaces/MatchesInterfaces";
import type { Place } from "@/interfaces/PlacesInterfaces";
import type { Player } from "@/interfaces/PlayerInterfaces";


const initialPlayersData = async () => await api.get<Player[]>("/players");

const initialMatchesData = async () => await api.get<Match[]>("/matches");

const initialCompetitionsData = async () => await api.get<Competition[]>("/competitions");

const initialPlacesData = async () => await api.get<Place[]>("/places");


export default {
    initialPlayersData,

    initialMatchesData,

    initialCompetitionsData,

    initialPlacesData
}

