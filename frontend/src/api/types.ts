/**
 * Common types for API responses and requests
 */
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface MutationOptions {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
