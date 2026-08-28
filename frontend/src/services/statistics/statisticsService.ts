import { BaseService } from '../base/baseService';
import type { MatchStatistics } from '@/interfaces/StatisticsInterface';

/**
 * Statistics service for match statistics operations
 */
class StatisticsService extends BaseService<MatchStatistics> {
    constructor() {
        super('/matches/statistics');
    }

    /**
     * Get match statistics by match ID
     */
    async getMatchStatistics(matchId: number): Promise<MatchStatistics> {
        return this.getById(matchId);
    }
}

// Export singleton instance
export const statisticsService = new StatisticsService();
