import { BaseService } from '../base/baseService';
import type { Set, SetSubmit } from '@/interfaces/SetsInterfaces';

/**
 * Set service for tennis set operations
 * Extends BaseService for common CRUD operations
 */
class SetService extends BaseService<Set, SetSubmit> {
    constructor() {
        super('/sets');
    }

    /**
     * Get sets by match ID
     */
    async getByMatchId(matchId: number): Promise<Set[]> {
        const allSets = await this.getAll();
        return allSets.filter(set => set.matchId === matchId);
    }
}

// Export singleton instance
export const setService = new SetService();
