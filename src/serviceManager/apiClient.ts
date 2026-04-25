import axios, { InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';
import { API_ENDPOINTS, BASE_URL } from '@/constants/apiEndpoints';

const apiClient = axios.create({
  baseURL: BASE_URL,
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
    // 1. Fetch token from Keychain if available
    try {
      const credentials = await Keychain.getGenericPassword({ service: 'auth_token' });
      if (credentials) {
        config.headers.Authorization = `Bearer ${credentials.password}`;
      }
    } catch (error) {
      console.error('Keychain access error', error);
    }

    // 2. Enhanced Logging
    console.log('\n---------------------------------------------------------');
    console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
    
    if (config.headers.Authorization) {
      console.log(`🔑 [Token] ${config.headers.Authorization}`);
    } else {
      console.log('🔑 [Token] No Authorization token attached');
    }

    if (config.data) {
      if (config.data instanceof FormData) {
        console.log(`📦 [Request FormData]`, (config.data as any).getParts ? (config.data as any).getParts() : 'FormData Instance');
        
        // CRITICAL FIX for boundary issues
        if (config.headers) {
          delete config.headers['Content-Type'];
          delete config.headers['content-type'];
        }
      } else {
        console.log(`📦 [Request Data]`, JSON.stringify(config.data, null, 2));
      }
    }
    console.log('---------------------------------------------------------\n');

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`\n✅ [API Response Success] ${response.status} ${response.config.url}`);
    console.log(`[API Response Data]`, JSON.stringify(response.data, null, 2));
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.log(`\n❌ [API Error] ${error.response?.status} ${originalRequest?.url}`);
    if (error.response?.data) {
      console.log(`[API Error Response]`, JSON.stringify(error.response.data, null, 2));
    }

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
