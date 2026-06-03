import axios from 'axios';
import { OLA_API_KEY } from '@/constants/OlaStyle';
import { Logger } from '@/utils/logger';
import { useNetworkLoggerStore } from '@/store/useNetworkLoggerStore';
import { isNetworkLoggerEnabled, redactSensitiveData, sanitizeHeaders } from '@/utils/networkSecurity';
import { InternalAxiosRequestConfig, AxiosError } from 'axios';

interface TrackedRequestConfig extends InternalAxiosRequestConfig {
  _logId?: string;
  _startTime?: number;
}

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 12)}`;

/**
 * Dedicated Axios instance for Ola Maps API.
 * Automatically injects the API key into every request.
 */
const olaClient = axios.create({
  baseURL: 'https://api.olamaps.io',
  timeout: 10000,
});

if (!OLA_API_KEY) {
  Logger.error(
    '[Ola Maps Client] OLA_API_KEY is empty! Please verify that OLA_API_KEY is set in your .env.local file, and restart your Metro server with cache reset (e.g. yarn start --reset-cache).'
  );
}

// removed unused pendingRequests
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

olaClient.interceptors.request.use(
  (config) => {
    const trackedConfig = config as TrackedRequestConfig;
    trackedConfig._logId = generateId();
    trackedConfig._startTime = Date.now();

    config.params = {
      ...config.params,
      api_key: OLA_API_KEY,
    };
    
    // Only cache GET and Directions POST
    const isCacheable = config.method === 'get' || (config.method === 'post' && config.url?.includes('directions'));
    
    if (isCacheable) {
      const cacheKey = `${config.method}:${config.url}:${JSON.stringify(config.params)}:${JSON.stringify(config.data || {})}`;
      const cached = cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        Logger.log(`[Ola Maps Cache Hit] ${config.url}`);
        config.adapter = () => Promise.resolve({
          data: cached.data,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          request: {}
        });
      }
    }

    Logger.log(`[Ola Maps Request] ${config.method?.toUpperCase()} ${config.url}`);
    
    if (isNetworkLoggerEnabled()) {
      let fullUrl = `${config.baseURL || ''}${config.url || ''}`;
      if (config.params) {
        const query = Object.entries(config.params)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join('&');
        if (query) fullUrl += `?${query}`;
      }

      useNetworkLoggerStore.getState().addLog({
        id: trackedConfig._logId,
        method: config.method?.toUpperCase() || 'GET',
        url: fullUrl,
        requestHeaders: sanitizeHeaders(config.headers),
        requestBody: redactSensitiveData(config.data || config.params),
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
  (error) => Promise.reject(error)
);

olaClient.interceptors.response.use(
  (response) => {
    const trackedConfig = response.config as TrackedRequestConfig;
    Logger.log(`[Ola Maps Success] ${response.status} ${response.config.url}`);
    
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

    const isCacheable = response.config.method === 'get' || 
                       (response.config.method === 'post' && response.config.url?.includes('directions'));

    if (isCacheable && response.status === 200) {
      const cacheKey = `${response.config.method}:${response.config.url}:${JSON.stringify(response.config.params)}:${JSON.stringify(response.config.data || {})}`;
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
    }
    
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config as TrackedRequestConfig | undefined;
    Logger.error(`[Ola Maps Error] ${axiosError.response?.status} ${axiosError.config?.url}`);
    
    if (isNetworkLoggerEnabled() && originalRequest && originalRequest._logId && originalRequest._startTime) {
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
    
    return Promise.reject(error);
  }
);

export default olaClient;
