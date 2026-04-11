import axios, { InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

const apiClient = axios.create({
  baseURL: 'http://13.61.176.230:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh calls simultaneously
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
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
    try {
      const credentials = await Keychain.getGenericPassword({ service: 'auth_token' });
      if (credentials) {
        config.headers.Authorization = `Bearer ${credentials.password}`;
      }
    } catch (error) {
      console.error('Keychain access error', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (Expired Token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshCreds = await Keychain.getGenericPassword({ service: 'refresh_token' });
        if (!refreshCreds) {
          throw new Error('No refresh token available');
        }

        // Use core axios instance to avoid interceptor loop
        const response = await axios.post(`${apiClient.defaults.baseURL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
          refreshToken: refreshCreds.password,
        });

        const { token, refreshToken: newRefreshToken } = response.data;

        // Save new token to Keychain (Single source of truth)
        await Keychain.setGenericPassword('auth_token', token, { service: 'auth_token' });
        
        if (newRefreshToken) {
          await Keychain.setGenericPassword('refresh_token', newRefreshToken, { service: 'refresh_token' });
        }

        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;

        processQueue(null, token);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Note: Global logout should be triggered here if needed. 
        // We'll leave the higher-level error handling to the caller or a global listener.
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
