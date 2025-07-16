import type { PlayerStatistics } from './StatisticsInterface';

/**
 * Frontend Player interface (expected structure)
 */
export interface Player {
  id: number;
  name: string;
  forehand: string;
  statistics: PlayerStatistics;
}

/**
 * Backend Player response interface (actual structure returned by API)
 */
export interface PlayerResponse {
  id: number;
  name: string;
  forehand: string;
  avatar?: string;
  playerStatistics: PlayerStatistics;
}

export interface PlayerSubmit {
  name: string;
  forehand: string;
}
