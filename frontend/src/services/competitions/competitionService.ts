import { BaseService } from '../base/baseService';
import type { Competition, CompetitionSubmit } from '@/interfaces/CompetitionsIntercfaces';

/**
 * Competition service for tournament operations
 * Extends BaseService for common CRUD operations
 */
class CompetitionService extends BaseService<Competition, CompetitionSubmit> {
    constructor() {
        super('/competitions');
    }

    /**
     * Search competitions by name
     */
    async searchByName(name: string): Promise<Competition[]> {
        const allCompetitions = await this.getAll();
        return allCompetitions.filter(competition =>
            competition.name.toLowerCase().includes(name.toLowerCase())
        );
    }
}

// Export singleton instance
export const competitionService = new CompetitionService();
