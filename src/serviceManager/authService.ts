import * as Keychain from 'react-native-keychain';
import { Platform } from 'react-native';
import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { useAuthStore } from '@/store/useAuthStore';
import { getDeviceId } from '@/utils/deviceId';

export interface LoginResponse {
  status: string;
  message: string;
}

export interface VerifyOtpResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  existingUser: boolean;
  userProfileCompleted: boolean;
  status: string; // "success"
}

export const AuthService = {
  login: async (
    phoneNumber: string,
    termandconditionSelected: boolean = true,
  ) => {
    const response = await axiosClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      { phoneNumber, termandconditionSelected },
    );
    return { status: response.status, data: response.data };
  },

  verifyOtp: async (
    phoneNumber: string,
    otp: string,
    deviceId?: string | null,
    fcmToken?: string | null,
  ) => {
    const payload: any = {
      phoneNumber: Number(phoneNumber),
      otp: Number(otp),
      platform: Platform.OS.toUpperCase(),
    };
    if (deviceId) payload.deviceId = deviceId;
    if (fcmToken) payload.fcmToken = fcmToken;

    const response = await axiosClient.post<VerifyOtpResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      payload,
    );
    if (response.data.status === 'success' || response.status === 200) {
      await Promise.all([
        Keychain.setGenericPassword('auth_token', response.data.token, { service: 'auth_token' }),
        Keychain.setGenericPassword('refresh_token', response.data.refreshToken, { service: 'refresh_token' }),
      ]);
    }
    return { status: response.status, data: response.data };
  },

  truecallerLogin: async (
    authorizationCode: string,
    deviceId?: string | null,
    fcmToken?: string | null,
    codeVerifier?: string,
  ) => {
    const payload: any = { authorizationCode, platform: Platform.OS.toUpperCase() };
    if (codeVerifier) payload.codeVerifier = codeVerifier;
    if (deviceId) payload.deviceId = deviceId;
    if (fcmToken) payload.fcmToken = fcmToken;

    const response = await axiosClient.post<VerifyOtpResponse>(
      API_ENDPOINTS.AUTH.TRUECALLER_LOGIN,
      payload,
    );

    if (response.data.status === 'success' || response.status === 200) {
      await Promise.all([
        Keychain.setGenericPassword('auth_token', response.data.token, { service: 'auth_token' }),
        Keychain.setGenericPassword('refresh_token', response.data.refreshToken, { service: 'refresh_token' }),
      ]);
    }
    return { status: response.status, data: response.data };
  },

  logout: async () => {
    try {
      const refreshCreds = await Keychain.getGenericPassword({ service: 'refresh_token' });
      if (refreshCreds) {
        const deviceId = await getDeviceId().catch(() => null);
        const payload: any = { refreshToken: refreshCreds.password };
        if (deviceId) payload.deviceId = deviceId;

        await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT, payload);
      }
    } catch (error) {
      console.error('Logout API error', error);
    } finally {
      await AuthService.clearLocalSession();
    }
  },

  clearLocalSession: async () => {
    try {
      await Promise.all([
        Keychain.resetGenericPassword({ service: 'auth_token' }),
        Keychain.resetGenericPassword({ service: 'refresh_token' }),
      ]);
    } catch (e) {
      console.error('Failed to reset keychain', e);
    }
    const { resetAllStores } = require('@/store/resetAllStores');
    resetAllStores();
  },

  resendOtp: async (phoneNumber: string) => {
    const response = await axiosClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.RESEND_OTP,
      { phoneNumber },
    );
    return { status: response.status, data: response.data };
  },
};
