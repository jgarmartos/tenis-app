import { defineStore } from "pinia";
import type { Competition } from "@/interfaces/CompetitionsIntercfaces";
import type { Match } from "@/interfaces/MatchesInterfaces";
import type { Place } from "@/interfaces/PlacesInterfaces";
import type { Player } from "@/interfaces/PlayerInterfaces";

export const useDataStore = defineStore("dataStore", {
    state: () => ({
        players: [] as Player[],
        matches: [] as Match[],
        competitions: [] as Competition[],
        places: [] as Place[],
    }),
    actions: {
        setPlayers(players: Player[]) {
            this.players = players;
        },
        setMatches(matches: Match[]) {
            this.matches = matches;
        },
        setCompetitions(competitions: Competition[]) {
            this.competitions = competitions;
        },
        setPlaces(places: Place[]) {
            this.places = places;
        },
    },
});