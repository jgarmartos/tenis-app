import type { Competition } from "./CompetitionsIntercfaces"
import type { Place } from "./PlacesInterfaces"
import type { Player } from "./PlayerInterfaces"

export interface Match {
    id: number,
    player1: Player,
    player2: Player,
    place: Place,
    competition: Competition | null | undefined,
    date: Date,
    startTime: Date,
    endTime: Date,
    surface: string
    winner: number | null
}

export interface MatchSubmit {
    player1: number,
    player2: number,
    place: number,
    competition: number | null | undefined,
    date: Date,
    startTime: number,
    endTime: number,
    surface: string
    winner: number | null
}

