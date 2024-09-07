import type { Player } from "./PlayerInterfaces"

export interface Game {
    id: number,
    set: number,
    gameNumber: number,
    pointsPlayer1: number,
    pointsPlayer2: number,
    player1Score: string,
    player2Score: string,
    winner: Player | null
    type: string
    server: Player
}

export interface GameSubmit {
    set: number,
    gameNumber: number,
    pointsPlayer1: number,
    pointsPlayer2: number,
    scorePlayer1: string,
    scorePlayer2: string,
    winner: number | null,
    type: string
    server: number
}