import type { Match } from "./MatchesInterfaces"
import type { Player } from "./PlayerInterfaces"

export interface Set {
    id: number
    matchId : number,
    numberSet: number,
    winner: number,
    scorePlayer1: number,
    scorePlayer2: number,
    type: string
}

export interface SetSubmit {
    matchId : number,
    numberSet: number,
    winner: number | null,
    scorePlayer1: number,
    scorePlayer2: number,
    type: string
}

export interface SetResponse {
    id: number
    match : Match,
    numberSet: number,
    winner: Player,
    player1Score: number,
    player2Score: number,
    type: string
    }


