import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';
import { API_ENDPOINTS, BASE_URL } from '@/constants/apiEndpoints';
import { useAuthStore } from '@/store/useAuthStore';
import { useNetworkLoggerStore } from '@/store/useNetworkLoggerStore';
import {
  isNetworkLoggerEnabled,
  redactSensitiveData,
  sanitizeHeaders,
} from '@/utils/networkSecurity';
import { Logger } from '@/utils/logger';
import { logApiError, logApiRequest, logApiResponse } from './apiConsoleLogger';

interface TrackedRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _logId?: string;
  _startTime?: number;
}
interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}
const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 12)}`;
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
apiClient.interceptors.request.use(
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
    if (config.data instanceof FormData && config.headers) {
      if (typeof config.headers.delete === 'function') {
        config.headers.delete('Content-Type');
        config.headers.delete('content-type');
      } else {
        delete config.headers['Content-Type'];
        delete config.headers['content-type'];
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
apiClient.interceptors.response.use(
  response => {
    const trackedConfig = response.config as TrackedRequestConfig;
    logApiResponse(response);
    if (isNetworkLoggerEnabled() && trackedConfig._logId && trackedConfig._startTime) {
      const endTime = Date.now();
      useNetworkLoggerStore.getState().updateLog(trackedConfig._logId, {
        responseStatus: response.status,
        responseHeaders: sanitizeHeaders(response.headers),
        responseBody: redactSensitiveData(response.data),
        endTime,
        duration: endTime - trackedConfig._startTime,
      });
    }
    return response;
  },
  async error => {
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config as TrackedRequestConfig | undefined;
    if (!originalRequest) {
      return Promise.reject(error);
    }
    logApiError(axiosError);
    if (isNetworkLoggerEnabled() && originalRequest._logId && originalRequest._startTime) {
      const endTime = Date.now();
      useNetworkLoggerStore.getState().updateLog(originalRequest._logId, {
        responseStatus: axiosError.response?.status || 0,
        responseHeaders: sanitizeHeaders(axiosError.response?.headers),
        responseBody: redactSensitiveData(axiosError.response?.data || axiosError.message),
        endTime,
        duration: endTime - originalRequest._startTime,
        isError: true,
      });
    }
    if (axiosError.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshCreds = await Keychain.getGenericPassword({
          service: 'refresh_token',
        });
        if (!refreshCreds) {
          throw new Error('No refresh token available');
        }
        const response = await axios.post(
          `${apiClient.defaults.baseURL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          {
            refreshToken: refreshCreds.password,
          },
        );
        const payload = response.data.data || response.data;
        const { token, refreshToken: newRefreshToken } = payload;
        if (!token) {
          throw new Error('Refresh response did not contain a valid token');
        }
        await Keychain.setGenericPassword('auth_token', token, {
          service: 'auth_token',
        });
        if (newRefreshToken) {
          await Keychain.setGenericPassword('refresh_token', newRefreshToken, {
            service: 'refresh_token',
          });
        }
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        processQueue(null, token);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        Logger.error('Token refresh failed');
        await Keychain.resetGenericPassword({ service: 'auth_token' });
        await Keychain.resetGenericPassword({ service: 'refresh_token' });
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
export default apiClient;
