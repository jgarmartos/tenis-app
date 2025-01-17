import type { Place } from "@/interfaces/PlacesInterfaces";
import type { Match } from "@/interfaces/MatchesInterfaces";
import type { Player } from "@/interfaces/PlayerInterfaces";

const emptyMatch = () => {
    const match: Match = {
        id: 0,
        player1: emptyPlayer(),
        player2: emptyPlayer(),
        competition: emptyCompetition(),
        place: emptyPlace(),
        date: new Date("2021-10-10T10:00:00"),
        startTime: new Date("2021-10-10T10:00:00"),
        endTime: new Date("2021-10-10T10:00:00"),
        winner: null,
        surface: "",
    }

    return match;
};


const emptyPlayer = (): Player => {
    const player: Player = {
        id: 0,
        name: "",
        forehand: "",
        statistics: {
            matchesPlayed: 0,
            matchesWon: 0,
            matchesLost: 0,
            setsPlayed: 0,
            setsWon: 0,
            setsLost: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            pointsPlayed: 0,
            pointsWon: 0,
            pointsLost: 0,
            gamesWonAsServer: 0,
            gamesLostAsServer: 0,
            gamesWonAsReceiver: 0,
            gamesLostAsReceiver: 0,
            pointsWonAsServer: 0,
            pointsLostAsServer: 0,
            pointsWonAsReceiver: 0,
            pointsLostAsReceiver: 0,
            gamesWonTo0: 0,
            gamesWonTo15: 0,
            gamesWonTo30: 0,
            gamesWonTo40: 0,
            gamesLostTo0: 0,
            gamesLostTo15: 0,
            gamesLostTo30: 0,
            gamesLostTo40: 0,
            winPercentage: 0,
            setsWinPercentage: 0,
            gamesWinPercentage: 0,
            pointsWinPercentage: 0,
            gamesWinPercentageAsServer: 0,
            gamesWinPercentageAsReceiver: 0,
            pointsWinPercentageAsServer: 0,
            pointsWinPercentageAsReceiver: 0,
            gamesWinPercentageTo0: 0,
            gamesWinPercentageTo15: 0,
            gamesWinPercentageTo30: 0,
            gamesWinPercentageTo40: 0,
            gamesLostPercentageTo0: 0,
            gamesLostPercentageTo15: 0,
            gamesLostPercentageTo30: 0,
            gamesLostPercentageTo40: 0,
            pointsPlayedPerMatch: 0,
            pointsWonPerMatch: 0,
            pointsLostPerMatch: 0,
            gamesPlayedPerMatch: 0,
            gamesWonPerMatch: 0,
            gamesLostPerMatch: 0,
            setsPlayedPerMatch: 0,
            setsWonPerMatch: 0,
            setsLostPerMatch: 0,
            pointsPlayedPerSet: 0,
            pointsWonPerSet: 0,
            pointsLostPerSet: 0,
            gamesPlayedPerSet: 0,
            gamesWonPerSet: 0,
            gamesLostPerSet: 0,
            pointsPlayedPerGame: 0,
            pointsWonPerGame: 0,
            pointsLostPerGame: 0,
        }
    }
    return player;
};

const emptyPlace = () => {
    const place: Place = {
        id: 0,
        name: "",
        address: "",
        city: ""
    };
    return place;
};

const emptyCompetition = () => ({
    id: 0,
    name: "",
    startDate: new Date("2021-10-10T10:00:00"),
    endDate: new Date("2021-10-10T10:00:00"),
});


export { emptyMatch, emptyPlayer, emptyPlace };