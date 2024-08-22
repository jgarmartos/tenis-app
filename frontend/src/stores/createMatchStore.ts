import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { GameSubmit } from '@/interfaces/GamesInterfaces';
import type { SetSubmit } from '@/interfaces/SetsInterfaces';
import type { MatchSubmit } from '@/interfaces/MatchesInterfaces';

import type { Place } from '@/interfaces/PlacesInterfaces';
import type { Player } from '@/interfaces/PlayerInterfaces';
import type { Competition } from '@/interfaces/CompetitionsIntercfaces';

import { emptyPlace, emptyPlayer } from '@/services/emptyObjects';
import saveData from '@/services/saveData';
import { useDataStore } from './useDataStore';
import { useInitialData } from '@/services/useInitialData';



export const useCreateMatchStore = defineStore('createMatch', {
  state: () => ({

    selectedPlayer1 :  ref<Player>(emptyPlayer()),

    selectedPlayer2 :  ref<Player>(emptyPlayer()),

    selectedCompetition :  ref<Competition | undefined>(),

    selectedPlace :  ref<Place>(emptyPlace()),

    startTime :  ref<Date>(new Date()),

    endTime : ref<Date>(new Date()),

    sets : ref(
    Array.from({ length: 5 }, (_, i) => ({
      name: `Set ${i + 1}`,
      score1: ref(0),
      score2: ref(0),
      games: Array.from({ length: 13 }, (_, i) => ({
        name: `Game ${i + 1}`,
        selectedPuntuation1: ref(0),
        selectedPuntuation2: ref(0),
      })),
    }))),

  }),
  actions: {
    setSelectedPlayer1(player: Player) {
      this.selectedPlayer1 = player;
    },
    setSelectedPlayer2(player: Player) {
      this.selectedPlayer2 = player;
    },
    setSelectedCompetition(competition: Competition) {
      this.selectedCompetition = competition;
    },
    setSelectedPlace(place: Place) {
      this.selectedPlace = place;
    },
    setStartTime(date: Date) {
      this.startTime = date;
    },
    setEndTime(date: Date) {
      this.endTime = date;
    },
    saveMatch() {
      const matchSubmit: MatchSubmit = {
        player1: this.selectedPlayer1.id,
        player2: this.selectedPlayer2.id,
        competition: this.selectedCompetition?.id,
        place: this.selectedPlace.id,
        date: this.startTime,
        startTime: this.startTime,
        endTime: this.endTime,
        winner: null,
      };
      saveData.saveMatch(matchSubmit).then((response) => {
        // useInitialData().matchesQuery.refetch();
        this.createAndSaveSets(response.id);
      });
    },
    createAndSaveSets(id: number) {
      this.sets.forEach((set, index) => {
        if (set.score1 === 0 && set.score2 === 0) return;
        const submitSet: SetSubmit = {
          matchId: id,
          setNumber: index + 1,
          winner: null,
          scorePlayer1: set.score1,
          scorePlayer2: set.score2,
        };
        saveData.saveSet(submitSet).then((response) => {
          this.createAndSaveGames(response.id, set.games);
        });
      });
    },
    createAndSaveGames(id: number, games: Array<{name: string, selectedPuntuation1: number, selectedPuntuation2: number}>) {
      games.forEach((game, index) => {
        if (game.selectedPuntuation1 === 0 && game.selectedPuntuation2 === 0) return;
        const submitGame: GameSubmit = {
          set: id,
          gameNumber: index + 1,
          winner: null,
          scorePlayer1: game.selectedPuntuation1 == 50 ? 'AD' : game.selectedPuntuation1.toString(),
          scorePlayer2: game.selectedPuntuation2 == 50 ? 'AD' : game.selectedPuntuation2.toString(),
          pointsPlayer1: index === 12 ? game.selectedPuntuation1 :
                        game.selectedPuntuation1 == 15 ? 1 : 
                        game.selectedPuntuation1 == 30 ? 2 : 
                        game.selectedPuntuation1 == 40 ? 3 : 
                        game.selectedPuntuation1 == 50 ? 4 : 0,
          pointsPlayer2: index === 12 ? game.selectedPuntuation2 :
                        game.selectedPuntuation2 == 15 ? 1 : 
                        game.selectedPuntuation2 == 30 ? 2 : 
                        game.selectedPuntuation2 == 40 ? 3 : 
                        game.selectedPuntuation2 == 50 ? 4 : 0,
          type: index === 12 ? 'tiebreak' : 'normal',
        };
        saveData.saveGame(submitGame);
        
      });
    },
  }

});
