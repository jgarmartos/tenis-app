import { BaseService } from '../base/baseService';
import { apiClient } from '@/api';
import type { Game, GameSubmit } from '@/interfaces/GamesInterfaces';
import type { AxiosResponse } from 'axios';

/**
 * Game service for tennis game operations
 * Extends BaseService for common CRUD operations
 */
class GameService extends BaseService<Game, GameSubmit> {
    constructor() {
        super('/games');
    }

    /**
     * Get games for a set, sorted by game number (delegates to the backend endpoint
     * instead of filtering client-side, since Game's set relation is nested, not a flat id)
     */
    async getBySetId(setId: number): Promise<Game[]> {
        const response: AxiosResponse<Game[]> = await apiClient.get(`${this.endpoint}/set/${setId}`);
        return response.data;
    }
}

// Export singleton instance
export const gameService = new GameService();
