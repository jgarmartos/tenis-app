export interface Game {
    id: number,
    set: number,
    gameNumber: number,
    pointsPlayer1: number,
    pointsPlayer2: number,
    scorePlayer1: string,
    scorePlayer2: string,
    winner: number | null
    type: string
    server: number
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