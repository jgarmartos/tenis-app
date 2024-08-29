export interface Match {
    id: number,
    player1: number,
    player2: number,
    place: number,
    competition: number,
    date: Date,
    startTime: Date,
    endTime: Date,
    winner: number
}

export interface MatchSubmit {
    player1: number,
    player2: number,
    place: number,
    competition: number | null | undefined,
    date: Date,
    startTime: number,
    endTime: number,
    winner: number | null
}

