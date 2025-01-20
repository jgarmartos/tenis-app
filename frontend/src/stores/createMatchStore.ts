import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { GameSubmit } from '@/interfaces/GamesInterfaces';
import type { SetSubmit } from '@/interfaces/SetsInterfaces';
import type { Match, MatchSubmit } from '@/interfaces/MatchesInterfaces';

import type { Place } from '@/interfaces/PlacesInterfaces';
import type { Player } from '@/interfaces/PlayerInterfaces';
import type { Competition } from '@/interfaces/CompetitionsIntercfaces';

import { emptyMatch, emptyPlace, emptyPlayer } from '@/services/emptyObjects';
import saveData from '@/services/requests/saveData';


export const useCreateMatchStore = defineStore('createMatch', {
  state: () => ({

    match: ref<MatchSubmit>({
      player1: undefined,
      player2: undefined,
      competition: undefined,
      place: undefined,
      surface: undefined,
      date: undefined,
      startTime: undefined,
      endTime: undefined,
      winner: undefined,
    }),

    selectedPlayer1: ref<Player>(emptyPlayer()),

    selectedPlayer2: ref<Player>(emptyPlayer()),

    selectedCompetition: ref<Competition | undefined>(),

    selectedPlace: ref<Place | undefined>(undefined),

    selectedSurface: ref<string>(''),

    date: ref<Date>(new Date()),

    startTime: ref<Date>(new Date()),

    endTime: ref<Date>(new Date()),

    matchScore: ref({ score1: 0, score2: 0 }),

    sets: ref(
      Array.from({ length: 5 }, (_, i) => ({
        name: `Set ${i + 1}`,
        score1: ref(0),
        score2: ref(0),
        startsServing: ref(),
        type: ref<'Set' | 'Super Tie Break'>('Set'),
        games: Array.from({ length: 13 }, (_, i) => ({
          name: i === 12 ? 'Tiebreak' : `Game ${i + 1}`,
          number: i + 1,
          selectedPuntuation1: ref(0),
          selectedPuntuation2: ref(0),
          deuceNumber: ref(1),
        })),
      }))),

  }),
  actions: {
    saveMatch() {
      this.matchScore.score1 = 0;
      this.matchScore.score2 = 0;
      const matchSubmit: MatchSubmit = {
        player1: this.selectedPlayer1.id,
        player2: this.selectedPlayer2.id,
        competition: this.selectedCompetition?.id,
        place: this.selectedPlace?.id,
        surface: this.selectedSurface,
        date: this.startTime,
        startTime: this.startTime.getTime(),
        endTime: this.endTime.getTime(),
        winner: null,
      };
      saveData.saveMatch(matchSubmit).then((response) => {
        // useInitialData().matchesQuery.refetch();
        this.createAndSaveSets(matchSubmit, response.id);
      });
    },
    createAndSaveSets(matchSubmit: MatchSubmit, matchId: number) {
      this.sets.forEach((set, index) => {
        if (set.score1 === 0 && set.score2 === 0) return;
        const submitSet: SetSubmit = {
          matchId: matchId,
          numberSet: index + 1,
          winner: set.score1 > set.score2 ? this.selectedPlayer1.id :
            set.score1 < set.score2 ? this.selectedPlayer2.id : null,
          scorePlayer1: set.score1,
          scorePlayer2: set.score2,
          type: set.type,
        };
        saveData.saveSet(submitSet).then((response) => {
          this.createAndSaveGames(response.id, set.games, set.startsServing, set.type, set.score1, set.score2);
        });
        if (submitSet.winner === this.selectedPlayer1.id) {
          this.matchScore.score1++;
        } else {
          this.matchScore.score2++;
        }
      });
      // create logic to save the winner of the match depending on the sets
      matchSubmit.winner = this.matchScore.score1 > this.matchScore.score2 ? this.selectedPlayer1.id :
        this.matchScore.score1 < this.matchScore.score2 ? this.selectedPlayer2.id : null;
      if (matchSubmit.winner !== null) {
        saveData.updateWinner(matchId, matchSubmit)
      }
    },
    createAndSaveGames(id: number,
      games: Array<{ name: string, selectedPuntuation1: number, selectedPuntuation2: number, deuceNumber: number }>,
      startsServing: string,
      type: string,
      score1: number,
      score2: number) {

      if (type === 'Set') {

        games.forEach((game, index) => {
          if (game.selectedPuntuation1 === 0 && game.selectedPuntuation2 === 0) return;

          // Determinamos el servidor en función del set y el número de juego
          const server = (index % 2 === 0)
            ? (startsServing === 'player1' ? this.selectedPlayer1.id : this.selectedPlayer2.id)
            : (startsServing === 'player1' ? this.selectedPlayer2.id : this.selectedPlayer1.id);

          const submitGame: GameSubmit = {
            set: id,
            gameNumber: index + 1,
            winner: game.selectedPuntuation1 > game.selectedPuntuation2 ? this.selectedPlayer1.id :
              game.selectedPuntuation1 < game.selectedPuntuation2 ? this.selectedPlayer2.id : null,
            scorePlayer1: game.selectedPuntuation1 == 50 ? 'AD' : game.selectedPuntuation1.toString(),
            scorePlayer2: game.selectedPuntuation2 == 50 ? 'AD' : game.selectedPuntuation2.toString(),
            pointsPlayer1: index === 12 ? game.selectedPuntuation1 :
              game.selectedPuntuation1 == 15 ? 1 :
                game.selectedPuntuation1 == 30 ? 2 :
                  game.selectedPuntuation1 == 40 ? game.selectedPuntuation2 == 50 ? 3 : 4 :
                    game.selectedPuntuation1 == 50 ? 5 : 0,
            pointsPlayer2: index === 12 ? game.selectedPuntuation2 :
              game.selectedPuntuation2 == 15 ? 1 :
                game.selectedPuntuation2 == 30 ? 2 :
                  game.selectedPuntuation2 == 40 ? game.selectedPuntuation1 == 50 ? 3 : 4 :
                    game.selectedPuntuation2 == 50 ? 5 : 0,
            type: index === 12 ? 'tiebreak' : 'normal',
            server: server
          };
          if (game.deuceNumber !== 0) {
            submitGame.pointsPlayer1 = submitGame.pointsPlayer1 + game.deuceNumber - 1;
            submitGame.pointsPlayer2 = submitGame.pointsPlayer2 + game.deuceNumber - 1;
          }
          saveData.saveGame(submitGame);

        });
      } else {
        const submitGame: GameSubmit = {
          set: id,
          gameNumber: 1,
          winner: score1 > score2 ? this.selectedPlayer1.id : score1 < score2 ? this.selectedPlayer2.id : null,
          scorePlayer1: score1 + '',
          scorePlayer2: score2 + '',
          pointsPlayer1: score1,
          pointsPlayer2: score2,
          type: 'tiebreak',
          server: startsServing === 'player1' ? this.selectedPlayer1.id : this.selectedPlayer2.id
        };
        saveData.saveGame(submitGame);
      }
    }
  }

});

export const useMatchInfoStore = defineStore('matchInfo', {
  state: () => ({
    matchInfo: ref<Match>(emptyMatch())
  }),
  actions: {
    setMatchInfo(match: Match) {
      this.matchInfo = match;
    }

  }
});
