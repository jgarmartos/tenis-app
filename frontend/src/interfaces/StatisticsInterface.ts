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

export type { Statistics, MatchStatistics, SetStatistics };