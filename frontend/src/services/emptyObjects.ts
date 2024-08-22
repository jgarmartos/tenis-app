import type { Place } from "@/interfaces/PlacesInterfaces";

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

const emptyPlace = () => {
    const place: Place = {
        id: 0,
        name: "",
        address: "",
        city: ""
    };
    return place;
};

export { emptyMatch, emptyPlayer, emptyPlace };