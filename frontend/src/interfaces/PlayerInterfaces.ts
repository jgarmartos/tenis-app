import type { PlayerStatistics } from "./StatisticsInterface"

export interface Player {
    id: number,
    name: string,
    forehand: string
    statistics: PlayerStatistics
}

export interface PlayerSubmit {
    name: string,
    forehand: string
}

