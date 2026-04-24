import axios from 'axios';
import { OLA_API_KEY } from '@/constants/OlaStyle';

/**
 * Dedicated Axios instance for Ola Maps API.
 * Automatically injects the API key into every request.
 */
const olaClient = axios.create({
  baseURL: 'https://api.olamaps.io',
  timeout: 10000,
});

const pendingRequests = new Map();
const cache = new Map<string, { data: any; timestamp: number }>();
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
        console.log(`💎 [Ola Maps Cache Hit] ${config.url}`);
        // Return a custom object that axios handles as a response
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

    console.log(`🚙 [Ola Maps Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

olaClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [Ola Maps Success] ${response.status} ${response.config.url}`);
    
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
    console.log(`❌ [Ola Maps Error] ${error.response?.status} ${error.config?.url}`);
    return Promise.reject(error);
  }
);

export default olaClient;
