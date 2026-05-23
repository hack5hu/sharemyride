import { AxiosError } from 'axios';

interface BackendErrorResponse {
  message?: string;
  success?: boolean;
  status?: number;
  details?: unknown;
}

/**
 * Safely extracts a backend-returned or standard error message.
 * Inspects the detailed response data first, then falls back to standard Axios error strings, 
 * and finally defaults to the provided fallback message.
 */
export const getErrorMessage = (error: unknown, fallbackMessage?: string): string => {
  if (error && typeof error === 'object') {
    const axiosError = error as AxiosError<BackendErrorResponse>;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (axiosError.message) {
      return axiosError.message;
    }
  }
  return fallbackMessage || 'An unexpected error occurred';
};
