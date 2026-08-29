import { BaseService } from '../base/baseService';
import { apiClient } from '@/api';
import type { Set, SetSubmit, SetResponse } from '@/interfaces/SetsInterfaces';
import type { AxiosResponse } from 'axios';

/**
 * Set service for tennis set operations
 * Extends BaseService for common CRUD operations
 */
class SetService extends BaseService<Set, SetSubmit> {
    constructor() {
        super('/sets');
    }

    /**
     * Get sets for a match, sorted by set number (delegates to the backend endpoint
     * instead of filtering client-side, since Set's match relation is nested, not a flat id)
     */
    async getByMatchId(matchId: number): Promise<SetResponse[]> {
        const response: AxiosResponse<SetResponse[]> = await apiClient.get(`${this.endpoint}/match/${matchId}`);
        return response.data;
    }
}

// Export singleton instance
export const setService = new SetService();
