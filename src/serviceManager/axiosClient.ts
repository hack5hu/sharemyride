import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '@/constants/apiEndpoints';
import { Logger } from '@/utils/logger';
import {
  type TrackedRequestConfig,
  trackRequestLog,
  trackResponseSuccess,
  trackResponseError,
} from './apiClientHelper';
import { logApiError, logApiRequest, logApiResponse } from './apiConsoleLogger';
import {
  isUserNotFoundOrDeleted,
  clearAuthSessionAndLogout,
  processFailedQueue,
  enqueueFailedRequest,
  getIsRefreshing,
  setIsRefreshing,
  executeTokenRefresh,
} from './tokenRefreshManager';

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

    trackedConfig._startTime = Date.now();
    trackedConfig._logId = trackRequestLog(config);
    logApiRequest(config);

    return config;
  },
  error => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  response => {
    logApiResponse(response);
    trackResponseSuccess(response);

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
    trackResponseError(axiosError, originalRequest);

    const responseStatus = axiosError.response?.status;
    const responseData = axiosError.response?.data;

    // 1. Check if user is deleted or does not exist
    if (isUserNotFoundOrDeleted(responseData, responseStatus)) {
      Logger.warn('[Auth] User not found / account deleted. Logging out.');
      await clearAuthSessionAndLogout();

      return Promise.reject(error);
    }

    // 2. Check if token expired (401)
    if (responseStatus === 401) {
      // If 401 comes directly from /auth/refresh, the refresh token itself is expired/invalid
      if (originalRequest.url?.includes('/auth/refresh')) {
        Logger.warn('[Auth] 401 received on refresh endpoint. Logging out user.');
        await clearAuthSessionAndLogout();

        return Promise.reject(error);
      }

      const isAuthRoute =
        originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/verify-otp') ||
        originalRequest.url?.includes('/auth/resend-otp');

      if (!originalRequest._retry && !isAuthRoute) {
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
          Logger.error(
            '[Auth] Token refresh failed. Clearing session and logging out:',
            refreshError,
          );
          await clearAuthSessionAndLogout();

          return Promise.reject(refreshError);
        } finally {
          setIsRefreshing(false);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;

