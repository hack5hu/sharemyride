import axios, { InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';

const apiClient = axios.create({
  baseURL: 'https://api.ridepoolcompany.com', // Placeholder
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const credentials = await Keychain.getGenericPassword();
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
    // Handle global errors like 401
    if (error.response?.status === 401) {
      // Logic for logout or token refresh
    }
    return Promise.reject(error);
  }
);

export default apiClient;
