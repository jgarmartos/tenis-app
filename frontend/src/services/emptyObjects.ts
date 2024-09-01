import type { Place } from "@/interfaces/PlacesInterfaces";
import type { Match } from "@/interfaces/MatchesInterfaces";

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

const emptyPlayer = () => ({
    id: 0,
    name: "",
    forehand: "",
});

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