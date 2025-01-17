interface Statistics {

    gamesWon: number;
    gamesLost: number;
    pointsWon: number;
    pointsLost: number;
    gamesWonAsServer: number;
    gamesLostAsServer: number;
    pointsWonAsServer: number;
    pointsLostAsServer: number;
    gamesWonAsReceiver: number;
    gamesLostAsReceiver: number;
    pointsWonAsReceiver: number;
    pointsLostAsReceiver: number;
    gamesWonTo0: number;
    gamesLostTo0: number;
    gamesWonTo15: number;
    gamesLostTo15: number;
    gamesWonTo30: number;
    gamesLostTo30: number;
    gamesWonTo40: number;
    gamesLostTo40: number;
    gamesWonToAd: number;
    gamesLostToAd: number;
}

interface PlayerStatistics {
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    setsPlayed: number;
    setsWon: number;
    setsLost: number;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    pointsPlayed: number;
    pointsWon: number;
    pointsLost: number;
    gamesWonAsServer: number;
    gamesLostAsServer: number;
    gamesWonAsReceiver: number;
    gamesLostAsReceiver: number;
    pointsWonAsServer: number;
    pointsLostAsServer: number;
    pointsWonAsReceiver: number;
    pointsLostAsReceiver: number;
    gamesWonTo0: number;
    gamesWonTo15: number;
    gamesWonTo30: number;
    gamesWonTo40: number;
    gamesLostTo0: number;
    gamesLostTo15: number;
    gamesLostTo30: number;
    gamesLostTo40: number;
    winPercentage: number;
    setsWinPercentage: number;
    gamesWinPercentage: number;
    pointsWinPercentage: number;
    gamesWinPercentageAsServer: number;
    gamesWinPercentageAsReceiver: number;
    pointsWinPercentageAsServer: number;
    pointsWinPercentageAsReceiver: number;
    gamesWinPercentageTo0: number;
    gamesWinPercentageTo15: number;
    gamesWinPercentageTo30: number;
    gamesWinPercentageTo40: number;
    gamesLostPercentageTo0: number;
    gamesLostPercentageTo15: number;
    gamesLostPercentageTo30: number;
    gamesLostPercentageTo40: number;
    pointsPlayedPerMatch: number;
    pointsWonPerMatch: number;
    pointsLostPerMatch: number;
    gamesPlayedPerMatch: number;
    gamesWonPerMatch: number;
    gamesLostPerMatch: number;
    setsPlayedPerMatch: number;
    setsWonPerMatch: number;
    setsLostPerMatch: number;
    pointsPlayedPerSet: number;
    pointsWonPerSet: number;
    pointsLostPerSet: number;
    gamesPlayedPerSet: number;
    gamesWonPerSet: number;
    gamesLostPerSet: number;
    pointsPlayedPerGame: number;
    pointsWonPerGame: number;
    pointsLostPerGame: number;
}


interface PlayerStatisticsByMatch {
    setStatistics: SetStatistics[];
    statistics: Statistics;
}

interface SetStatistics {
    statistics: Statistics;
}

interface MatchStatistics {
    player1Statistics: PlayerStatisticsByMatch;
    player2Statistics: PlayerStatisticsByMatch;
}

export type { Statistics, PlayerStatistics, MatchStatistics, SetStatistics };