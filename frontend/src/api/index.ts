import axios, { type AxiosResponse, type AxiosError } from 'axios';
import type { ApiError } from './types';

/**
 * Configure axios instance with base configuration
 */
const createApiInstance = () => {
    const instance = axios.create({
        baseURL: import.meta.env.PROD
            ? 'https://backend-tennis.fly.dev/'
            : 'http://localhost:8080/',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return instance;
};

export const apiClient = createApiInstance();

/**
 * Response interceptor for handling common response patterns
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const apiError: ApiError = {
            message: error.message || 'An unexpected error occurred',
            status: error.response?.status || 500,
            code: error.code,
        };

        // You can add global error handling here
        console.error('API Error:', apiError);

        return Promise.reject(apiError);
    }
);

export default apiClient;
