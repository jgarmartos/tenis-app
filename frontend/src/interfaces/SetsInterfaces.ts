export interface Set {
    id: number
    matchId : number,
    setNumber: number,
    winner: number,
    scorePlayer1: number,
    scorePlayer2: number,
    type: string
}

export interface SetSubmit {
    matchId : number,
    setNumber: number,
    winner: number | null,
    scorePlayer1: number,
    scorePlayer2: number,
    type: string
}

export interface SetResponse {
    id: number
    match : {
        id: number
    },
    setNumber: number,
    winner: number,
    player1Score: number,
    player2Score: number,
    type: string
    }


