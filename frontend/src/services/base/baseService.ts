import { apiClient } from '@/api';
import type { AxiosResponse } from 'axios';

/**
 * Base service class with common CRUD operations
 * All entity services can extend this class
 */
export abstract class BaseService<T, TSubmit = T> {
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Get all items
     */
    async getAll(): Promise<T[]> {
        const response: AxiosResponse<T[]> = await apiClient.get(this.endpoint);
        return response.data;
    }

    /**
     * Get item by ID
     */
    async getById(id: number): Promise<T> {
        const response: AxiosResponse<T> = await apiClient.get(`${this.endpoint}/${id}`);
        return response.data;
    }

    /**
     * Create new item
     */
    async create(data: TSubmit): Promise<T> {
        const response: AxiosResponse<T> = await apiClient.post(this.endpoint, data);
        return response.data;
    }

    /**
     * Update existing item
     */
    async update(id: number, data: TSubmit): Promise<T> {
        const response: AxiosResponse<T> = await apiClient.put(`${this.endpoint}/${id}`, data);
        return response.data;
    }

    /**
     * Delete item
     */
    async delete(id: number): Promise<void> {
        await apiClient.delete(`${this.endpoint}/${id}`);
    }

    /**
     * Patch/partial update item
     */
    async patch(id: number, data: Partial<TSubmit>): Promise<T> {
        const response: AxiosResponse<T> = await apiClient.patch(`${this.endpoint}/${id}`, data);
        return response.data;
    }
}
