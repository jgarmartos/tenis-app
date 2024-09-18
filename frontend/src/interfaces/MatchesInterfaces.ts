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
    player1: number | undefined,
    player2: number | undefined,
    place: number | undefined,
    competition: number | null | undefined,
    date: Date  | undefined,
    startTime: number | undefined,
    endTime: number | undefined,
    surface: string | undefined,
    winner: number | undefined | null
}

