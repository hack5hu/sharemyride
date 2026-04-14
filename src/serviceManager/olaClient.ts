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

olaClient.interceptors.request.use(
  (config) => {
    // Inject API Key as a query parameter for all Ola Maps requests
    config.params = {
      ...config.params,
      api_key: OLA_API_KEY,
    };
    
    console.log(`\n🚙 [Ola Maps Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

olaClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [Ola Maps Success] ${response.status}\n ${JSON.stringify(response.data)}`);
    return response;
  },
  (error) => {
    console.log(`❌ [Ola Maps Error] ${error.response?.status} ${error.config?.url}`);
    if (error.response?.data) {
      console.log(`[Ola Maps Error Payload]`, JSON.stringify(error.response.data, null, 2));
    }
    return Promise.reject(error);
  }
);

export default olaClient;
