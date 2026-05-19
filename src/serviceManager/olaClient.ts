import axios from 'axios';
import { OLA_API_KEY } from '@/constants/OlaStyle';
import { Logger } from '@/utils/logger';

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
    return config;
  },
  (error) => Promise.reject(error)
);

olaClient.interceptors.response.use(
  (response) => {
    Logger.log(`[Ola Maps Success] ${response.status} ${response.config.url}`);
    
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
    Logger.error(`[Ola Maps Error] ${error.response?.status} ${error.config?.url}`);
    return Promise.reject(error);
  }
);

export default olaClient;
