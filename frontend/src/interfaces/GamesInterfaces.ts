export interface Game {
    id: number,
    set: number,
    player1: number,
    player2: number,
    match: number,
    competition: number,
    place: number,
    result: string,
    winner: number
}

export interface GameSubmit {
    set: number,
    gameNumber: number,
    pointsPlayer1: number,
    pointsPlayer2: number,
    scorePlayer1: number,
    scorePlayer2: number,
    winner: number | null
}