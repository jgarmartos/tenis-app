import { BaseService } from '../base/baseService';
import type { Player, PlayerResponse, PlayerSubmit } from '@/interfaces/PlayerInterfaces';

/**
 * Player service with specific player operations
 * Extends BaseService for common CRUD operations
 * Note: Backend returns PlayerResponse, but we submit PlayerSubmit
 */
class PlayerService extends BaseService<PlayerResponse, PlayerSubmit> {
    constructor() {
        super('/players');
    }

    // Add any player-specific methods here
    // For example:

    /**
     * Search players by name
     */
    async searchByName(name: string): Promise<PlayerResponse[]> {
        const allPlayers = await this.getAll();
        return allPlayers.filter(player =>
            player.name.toLowerCase().includes(name.toLowerCase())
        );
    }
}

// Export singleton instance
export const playerService = new PlayerService();
