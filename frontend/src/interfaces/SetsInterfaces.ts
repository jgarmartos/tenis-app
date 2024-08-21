export interface Set {
    id: number
    matchId : number,
    setNumber: number,
    winner: number,
    scorePlayer1: number,
    scorePlayer2: number
}

export interface SetSubmit {
    matchId : number,
    setNumber: number,
    winner: number | null,
    scorePlayer1: number,
    scorePlayer2: number
}

