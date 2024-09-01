import api from "@/api/api";
import type { Competition, CompetitionSubmit } from "@/interfaces/CompetitionsIntercfaces";
import type { Game, GameSubmit } from "@/interfaces/GamesInterfaces";
import type { Match, MatchSubmit } from "@/interfaces/MatchesInterfaces";
import type { Place, PlaceSubmit } from "@/interfaces/PlacesInterfaces";
import type { Player, PlayerSubmit } from "@/interfaces/PlayerInterfaces";
import type { Set, SetSubmit } from "@/interfaces/SetsInterfaces";


const savePlayer = async (player: PlayerSubmit) => {
    //make a custom requets
    const response = await api.post<Player>('/players?name='+player.name+'&forehand='+player.forehand);
    return response.data;
}

const saveMatch = async (match: MatchSubmit) => {
    //make a custom requets
    const response = await api.post<Match>('/matches', match);
    return response.data;
}

const updateWinner = async (matchId: number, match : MatchSubmit) => {
    //make a custom requets
    const matchWinner = {winnerId: match.winner}
    const response = await api.patch<Match>('/matches/'+matchId+'/winner', matchWinner);
    return response.data;
}

const saveSet = async (set: SetSubmit) => {
    //make a custom requets
    const response = await api.post<Set>('/sets', set);
    return response.data;
}

const saveGame = async (game: GameSubmit) => {
    //make a custom requets
    const response = await api.post<Game>('/games', game);
    return response.data;
}

const saveCompetition = async (competition: CompetitionSubmit) => {
    //make a custom requets
    const response = await api.post<Competition>('/competitions', competition);
    return response.data;
}

const savePlace = async (place: PlaceSubmit) => {
    //make a custom requets
    const response = await api.post<Place>('/places', place);
    return response.data;
}



export default {
    savePlayer,
    saveMatch,
    updateWinner,
    saveSet,
    saveCompetition,
    savePlace,
    saveGame
}