import { defineStore } from 'pinia';
import type { Competition } from '@/interfaces/CompetitionsIntercfaces';
import type { Match } from '@/interfaces/MatchesInterfaces';
import type { Place } from '@/interfaces/PlacesInterfaces';
import type { PlayerResponse } from '@/interfaces/PlayerInterfaces';
import type { Set, SetResponse } from '@/interfaces/SetsInterfaces';
import type { Game } from '@/interfaces/GamesInterfaces';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    players: [] as PlayerResponse[],
    matches: [] as Match[],
    competitions: [] as Competition[],
    places: [] as Place[],
    sets: [] as SetResponse[],
    games: [] as Game[],
  }),
  actions: {
    setPlayers(players: PlayerResponse[]) {
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
    setSets(sets: SetResponse[]) {
      this.sets = sets;
    },
    setGames(games: Game[]) {
      this.games = games;
    },
  },
});
