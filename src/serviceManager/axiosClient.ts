import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '@/constants/apiEndpoints';
import { useNetworkLoggerStore } from '@/store/useNetworkLoggerStore';
import {
  isNetworkLoggerEnabled,
  redactSensitiveData,
  sanitizeHeaders,
} from '@/utils/networkSecurity';
import { Logger } from '@/utils/logger';
import { logApiError, logApiRequest, logApiResponse } from './apiConsoleLogger';
import { AnalyticsService, AnalyticsEvent } from './AnalyticsService';
import {
  isUserNotFoundOrDeleted,
  clearAuthSessionAndLogout,
  processFailedQueue,
  enqueueFailedRequest,
  getIsRefreshing,
  setIsRefreshing,
  executeTokenRefresh,
} from './tokenRefreshManager';

interface TrackedRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _logId?: string;
  _startTime?: number;
}

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 12)}`;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const trackedConfig = config as TrackedRequestConfig;
    try {
      const authCreds = await Keychain.getGenericPassword({
        service: 'auth_token',
      });
      if (authCreds && authCreds.password) {
        config.headers.Authorization = `Bearer ${authCreds.password}`;
      }
    } catch (error) {
      Logger.error('[Keychain] Failed to read auth token:', error);
    }

    const isFormDataPayload =
      config.data &&
      (config.data instanceof FormData ||
        (typeof config.data === 'object' &&
          typeof (config.data as any).append === 'function' &&
          Array.isArray((config.data as any)._parts)));

    if (isFormDataPayload) {
      config.transformRequest = [(data: unknown) => data];
      if (config.headers) {
        config.headers.set('Content-Type', 'multipart/form-data');
      }
    }

    const logId = generateId();
    trackedConfig._logId = logId;
    trackedConfig._startTime = Date.now();
    logApiRequest(config);

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
        startTime: trackedConfig._startTime,
        endTime: null,
        duration: null,
        isError: false,
      });
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  response => {
    const trackedConfig = response.config as TrackedRequestConfig;
    logApiResponse(response);

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
    return response;
  },
  async error => {
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config as
      | TrackedRequestConfig
      | undefined;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    logApiError(axiosError);

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

    const responseStatus = axiosError.response?.status;
    const responseData = axiosError.response?.data;

    // 1. Check if user is deleted or does not exist
    if (isUserNotFoundOrDeleted(responseData, responseStatus)) {
      Logger.warn('[Auth] User not found / account deleted. Logging out.');
      await clearAuthSessionAndLogout();
      return Promise.reject(error);
    }

    // 2. Check if token expired (401)
    const isAuthRoute =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/verify-otp') ||
      originalRequest.url?.includes('/auth/refresh');

    if (responseStatus === 401 && !originalRequest._retry && !isAuthRoute) {
      if (getIsRefreshing()) {
        return new Promise<string | null>((resolve, reject) => {
          enqueueFailedRequest(resolve, reject);
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      setIsRefreshing(true);

      try {
        const newToken = await executeTokenRefresh(
          axiosClient.defaults.baseURL || BASE_URL,
        );
        axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processFailedQueue(null, newToken);
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processFailedQueue(refreshError, null);
        Logger.error('[Auth] Token refresh failed. Clearing session:', refreshError);
        await clearAuthSessionAndLogout();
        return Promise.reject(refreshError);
      } finally {
        setIsRefreshing(false);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
