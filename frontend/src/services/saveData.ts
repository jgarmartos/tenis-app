import api from "@/api/api";
import type { PlayerSubmit } from "@/interfaces/PlayerInterfaces";


const savePlayer = async (player: PlayerSubmit) => {
    //make a custom requets
    const response = await api.post<PlayerSubmit[]>('/players?name='+player.name+'&forehand='+player.forehand);
    return response.data;
}

export default {
    savePlayer
}