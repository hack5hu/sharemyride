import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useNetworkLoggerStore } from '@/store/useNetworkLoggerStore';
import {
  isNetworkLoggerEnabled,
  redactSensitiveData,
  sanitizeHeaders,
} from '@/utils/networkSecurity';
import { AnalyticsService, AnalyticsEvent } from './AnalyticsService';

export interface TrackedRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _logId?: string;
  _startTime?: number;
}

export const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 12)}`;

export const trackRequestLog = (config: InternalAxiosRequestConfig): string => {
  const logId = generateId();
  if (isNetworkLoggerEnabled()) {
    useNetworkLoggerStore.getState().addLog({
      id: logId,
      method: config.method?.toUpperCase() || 'GET',
      url: config.url || '',
      requestHeaders: sanitizeHeaders(config.headers),
      requestBody: redactSensitiveData(config.data),
      responseStatus: null,
      responseHeaders: null,
      responseBody: null,
      startTime: Date.now(),
      endTime: null,
      duration: null,
      isError: false,
    });
  }
  return logId;
};

export const trackResponseSuccess = (response: AxiosResponse) => {
  const trackedConfig = response.config as TrackedRequestConfig;
  if (
    isNetworkLoggerEnabled() &&
    trackedConfig._logId &&
    trackedConfig._startTime
  ) {
    const endTime = Date.now();
    const duration = endTime - trackedConfig._startTime;
    useNetworkLoggerStore.getState().updateLog(trackedConfig._logId, {
      responseStatus: response.status,
      responseHeaders: sanitizeHeaders(response.headers),
      responseBody: redactSensitiveData(response.data),
      endTime,
      duration,
    });

    AnalyticsService.logEvent(AnalyticsEvent.API_SUCCESS, {
      method: trackedConfig.method?.toUpperCase(),
      url: trackedConfig.url,
      status: response.status,
      duration,
    });
  }
};

export const trackResponseError = (
  axiosError: AxiosError,
  originalRequest: TrackedRequestConfig,
) => {
  if (
    isNetworkLoggerEnabled() &&
    originalRequest._logId &&
    originalRequest._startTime
  ) {
    const endTime = Date.now();
    const duration = endTime - originalRequest._startTime;
    useNetworkLoggerStore.getState().updateLog(originalRequest._logId, {
      responseStatus: axiosError.response?.status || 0,
      responseHeaders: sanitizeHeaders(axiosError.response?.headers),
      responseBody: redactSensitiveData(
        axiosError.response?.data || axiosError.message,
      ),
      endTime,
      duration,
      isError: true,
    });

    AnalyticsService.logEvent(AnalyticsEvent.API_ERROR, {
      method: originalRequest.method?.toUpperCase(),
      url: originalRequest.url,
      status: axiosError.response?.status || 0,
      duration,
      error_message: axiosError.message,
    });
  }
};
