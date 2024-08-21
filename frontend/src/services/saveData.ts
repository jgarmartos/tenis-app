import api from "@/api/api";
import type { Game, GameSubmit } from "@/interfaces/GamesInterfaces";
import type { Match, MatchSubmit } from "@/interfaces/MatchesInterfaces";
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



export default {
    savePlayer,
    saveMatch,
    saveSet,
    saveGame
}