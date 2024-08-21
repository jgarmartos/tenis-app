
import type { Competition, CompetitionSubmit } from '@/interfaces/CompetitionsIntercfaces';
import type { GameSubmit } from '@/interfaces/GamesInterfaces';
import type { MatchSubmit } from '@/interfaces/MatchesInterfaces';
import type { Place } from '@/interfaces/PlacesInterfaces';
import type { Player } from '@/interfaces/PlayerInterfaces';
import type { SetSubmit } from '@/interfaces/SetsInterfaces';
import saveData from '@/services/saveData';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCreateMatchStore = defineStore('createMatch', {
    state: () => ({
        sets: ref(
            Array.from({ length: 5 }, (_, i) => ({
                name: `Set ${i + 1}`,
                score1: ref(0),
                score2: ref(0),
                games: createGames(),
            }))
        ),
        matchSubmit: ref<MatchSubmit>(emptyMatch()),
        players: ref<Player[] | undefined>(),
        selectedPlayer1: ref<Player>(emptyPlayer()),
        selectedPlayer2: ref<Player>(emptyPlayer()),
    }),
    actions: {
        saveMatch(selectedCompetition: Competition | undefined, selectedPlace: Place, startTime: Date, endTime: Date) {
            
            this.matchSubmit.player1 = this.selectedPlayer1.id;
            this.matchSubmit.player2 = this.selectedPlayer2.id;
            this.matchSubmit.competition = selectedCompetition?.id;
            this.matchSubmit.place = selectedPlace.id;
            this.matchSubmit.date = startTime;
            this.matchSubmit.startTime = startTime;
            this.matchSubmit.endTime = endTime;
            saveData.saveMatch(this.matchSubmit).then((response) => {
                createAndSaveSets(response.id, this.sets);
            });
        }
    },
    getters: {
        // Define your getters here
    },
});


function createGames() {
    return Array.from({ length: 13 }, (_, i) => ({
        name: `Game ${i + 1}`,
        selectedPuntuation1: ref(0),
        selectedPuntuation2: ref(0),
    }));
}

const emptyMatch = () => ({
    player1: 0,
    player2: 0,
    competition: 0,
    place: 0,
    date: new Date("2021-10-10T10:00:00"),
    startTime: new Date("2021-10-10T10:00:00"),
    endTime: new Date("2021-10-10T10:00:00"),
    winner: null,
});

const emptyPlayer = () => ({
    id: 0,
    name: "",
    forehand: "",
});

function createAndSaveSets(id: number, sets : Array<{name: string, score1: number, score2: number, games: Array<{name: string, selectedPuntuation1: number, selectedPuntuation2: number}>}>) {
    sets.forEach((set, index) => {

        const submitSet = ref<SetSubmit>({
            matchId: id,
            setNumber: index + 1,
            winner: null,
            scorePlayer1: set.score1,
            scorePlayer2: set.score2,
        });
        saveData.saveSet(submitSet.value).then((response) => {
        //   props.retry();
          createAndSaveGames(response.id, set.games);
        });
      });
}

function createAndSaveGames(id: number, games: Array<{name: string, selectedPuntuation1: number, selectedPuntuation2: number}>) {
    games.forEach((game, index) => {
        const submitGame = ref<GameSubmit>({
            set: id,
            gameNumber: index + 1,
            winner: null,
            scorePlayer1: game.selectedPuntuation1,
            scorePlayer2: game.selectedPuntuation2,
            pointsPlayer1: 0,
            pointsPlayer2: 0,
        });
        saveData.saveGame(submitGame.value);
    });
}
