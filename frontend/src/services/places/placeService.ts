import { BaseService } from '../base/baseService';
import type { Place, PlaceSubmit } from '@/interfaces/PlacesInterfaces';

/**
 * Place service for venue/location operations
 * Extends BaseService for common CRUD operations
 */
class PlaceService extends BaseService<Place, PlaceSubmit> {
    constructor() {
        super('/places');
    }

    /**
     * Search places by name
     */
    async searchByName(name: string): Promise<Place[]> {
        const allPlaces = await this.getAll();
        return allPlaces.filter(place =>
            place.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    /**
     * Get places by city
     */
    async getByCity(city: string): Promise<Place[]> {
        const allPlaces = await this.getAll();
        return allPlaces.filter(place =>
            place.city?.toLowerCase().includes(city.toLowerCase())
        );
    }
}

// Export singleton instance
export const placeService = new PlaceService();
