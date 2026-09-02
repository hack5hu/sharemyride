import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { resetAllStores } from '@/store/resetAllStores';
import { useAuthStore } from '@/store/useAuthStore';
import { Logger } from '@/utils/logger';

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

export const isUserNotFoundOrDeleted = (
  data: unknown,
  _status?: number,
): boolean => {
  if (!data) return false;
  const errorObj = data as Record<string, unknown>;
  const msg = typeof data === 'string'
    ? data.toLowerCase()
    : String(
        errorObj?.message || errorObj?.error || errorObj?.details || '',
      ).toLowerCase();

  return (
    msg.includes('user not found') ||
    msg.includes('user_not_found') ||
    msg.includes('user does not exist') ||
    msg.includes('user deleted') ||
    msg.includes('user_deleted') ||
    msg.includes('account deleted') ||
    msg.includes('user deactivated') ||
    msg.includes('invalid user')
  );
};

export const clearAuthSessionAndLogout = async () => {
  try {
    await Promise.all([
      Keychain.resetGenericPassword({ service: 'auth_token' }),
      Keychain.resetGenericPassword({ service: 'refresh_token' }),
    ]);
  } catch (e) {
    Logger.error('Failed to reset keychain tokens on logout', e);
  }
  resetAllStores();
};

export const processFailedQueue = (
  error: unknown,
  token: string | null = null,
) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const enqueueFailedRequest = (
  resolve: (token: string | null) => void,
  reject: (error: unknown) => void,
) => {
  failedQueue.push({ resolve, reject });
};

export const getIsRefreshing = () => isRefreshing;
export const setIsRefreshing = (value: boolean) => {
  isRefreshing = value;
};

export const executeTokenRefresh = async (baseURL: string): Promise<string> => {
  const refreshCreds = await Keychain.getGenericPassword({
    service: 'refresh_token',
  });
  if (!refreshCreds || !refreshCreds.password) {
    throw new Error('No refresh token available');
  }

  const endpoint = `${baseURL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`.replace(
    /([^:]\/)\/+/g,
    '$1',
  );

  const response = await axios.post(
    endpoint,
    { refreshToken: refreshCreds.password },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 15000,
    },
  );

  const payload =
    (response.data as Record<string, unknown>)?.data || response.data || {};
  const data = payload as Record<string, unknown>;
  const rawData = response.data as Record<string, unknown>;

  const newToken = (data.token ||
    data.accessToken ||
    data.jwtToken ||
    data.access_token ||
    rawData?.token ||
    rawData?.accessToken) as string | undefined;

  const newRefreshToken = (data.refreshToken ||
    data.refresh_token ||
    rawData?.refreshToken ||
    rawData?.refresh_token) as string | undefined;

  if (!newToken) {
    throw new Error('Refresh response did not contain a valid token');
  }

  await Keychain.setGenericPassword('auth_token', newToken, {
    service: 'auth_token',
  });
  if (newRefreshToken) {
    await Keychain.setGenericPassword('refresh_token', newRefreshToken, {
      service: 'refresh_token',
    });
  }

  useAuthStore.setState({ token: newToken });

  return newToken;
};

