import { BaseService } from '../base/baseService';
import type { Game, GameSubmit } from '@/interfaces/GamesInterfaces';

/**
 * Game service for tennis game operations
 * Extends BaseService for common CRUD operations
 */
class GameService extends BaseService<Game, GameSubmit> {
    constructor() {
        super('/games');
    }

    /**
     * Get games by set ID
     */
    async getBySetId(setId: number): Promise<Game[]> {
        const allGames = await this.getAll();
        return allGames.filter(game => game.set === setId);
    }

    /**
     * Get games by match (through set relationship)
     * Note: Games don't have direct matchId, need to filter through sets
     */
    async getBySetNumber(setNumber: number): Promise<Game[]> {
        const allGames = await this.getAll();
        return allGames.filter(game => game.set === setNumber);
    }
}

// Export singleton instance
export const gameService = new GameService();
