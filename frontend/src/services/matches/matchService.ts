import { BaseService } from '../base/baseService';
import { apiClient } from '@/api';
import type { Match, MatchSubmit } from '@/interfaces/MatchesInterfaces';
import type { MatchStatistics } from '@/interfaces/StatisticsInterface';
import type { AxiosResponse } from 'axios';

/**
 * Match service with specific match operations
 * Extends BaseService for common CRUD operations
 */
class MatchService extends BaseService<Match, MatchSubmit> {
    constructor() {
        super('/matches');
    }

    /**
     * Get match statistics
     */
    async getStatistics(matchId: number): Promise<MatchStatistics> {
        const response: AxiosResponse<MatchStatistics> = await apiClient.get(
            `${this.endpoint}/statistics/${matchId}`
        );
        return response.data;
    }

    /**
     * Get matches by place
     */
    async getByPlace(placeId: number): Promise<Match[]> {
        const response: AxiosResponse<Match[]> = await apiClient.get(
            `${this.endpoint}/place/${placeId}`
        );
        return response.data;
    }

    /**
     * Update only the place of a match
     * This is your specific requirement
     */
    async updatePlace(matchId: number, placeId: number): Promise<Match> {
        const response: AxiosResponse<Match> = await apiClient.patch(
            `${this.endpoint}/${matchId}/place`,
            { placeId }
        );
        return response.data;
    }

    /**
     * Update only the winner of a match
     */
    async updateWinner(matchId: number, winnerId: number | null): Promise<Match> {
        const response: AxiosResponse<Match> = await apiClient.patch(
            `${this.endpoint}/${matchId}`,
            { winner: winnerId }
        );
        return response.data;
    }

    /**
     * Update match start time
     */
    async updateStartTime(matchId: number, startTime: number): Promise<Match> {
        const response: AxiosResponse<Match> = await apiClient.patch(
            `${this.endpoint}/${matchId}`,
            { startTime }
        );
        return response.data;
    }

    /**
     * Update match end time
     */
    async updateEndTime(matchId: number, endTime: number): Promise<Match> {
        const response: AxiosResponse<Match> = await apiClient.patch(
            `${this.endpoint}/${matchId}`,
            { endTime }
        );
        return response.data;
    }
}

// Export singleton instance
export const matchService = new MatchService();
