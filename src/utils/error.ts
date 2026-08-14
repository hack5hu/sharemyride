import { AxiosError } from 'axios';
import { useSettingsStore } from '@/store/settings';
import { en } from '@/constants/localization/en';
import { hi } from '@/constants/localization/hi';

const translations = { en, hi };

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
export const getErrorMessage = (
  error: unknown,
  fallbackMessage?: string,
): string => {
  if (error && typeof error === 'object') {
    const axiosError = error as AxiosError<BackendErrorResponse>;
    let responseData: any = axiosError.response?.data;

    if (typeof responseData === 'string') {
      try {
        responseData = JSON.parse(responseData);
      } catch (e) {
        // Not a JSON string
      }
    }

    if (responseData?.message) {
      const message = responseData.message;
      if (
        message ===
        'You already have an active booking during this time. Please complete or cancel it first.'
      ) {
        const lang = useSettingsStore.getState().language || 'en';
        return translations[lang].notification.activeBookingOverlap;
      }
      return message;
    }

    if (axiosError.message) {
      // In Axios, 400 errors have a default message 'Request failed with status code 400'
      // We only fallback to it if no backend message is provided
      return axiosError.message;
    }
  }
  return fallbackMessage || 'An unexpected error occurred';
};
