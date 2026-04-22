import * as Keychain from 'react-native-keychain';
import apiClient from './apiClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Alert } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';

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

export const authService = {
  /**
   * Send OTP to the provided phone number for login.
   * @param phoneNumber 10-digit phone number
   * @param termandconditionSelected boolean flag for T&C acceptance
   */
  login: async (
    phoneNumber: string,
    termandconditionSelected: boolean = true
  ): Promise<{ status: number; data: LoginResponse }> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        { phoneNumber, termandconditionSelected }
      );
      
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  /**
   * Verify the OTP provided by the user.
   * @param phoneNumber 10-digit phone number
   * @param otp 6-digit verification code
   */
  verifyOtp: async (
    phoneNumber: string,
    otp: string
  ): Promise<{ status: number; data: VerifyOtpResponse }> => {
    try {
      const response = await apiClient.post<VerifyOtpResponse>(
        API_ENDPOINTS.AUTH.VERIFY_OTP,
        { phoneNumber: Number(phoneNumber), otp: Number(otp) }
      );
      console.log('response', response)
      if (response.data.status === 'success' || response.status === 200) {
        // Store tokens securely
        await Promise.all([
          Keychain.setGenericPassword('auth_token', response.data.token, {
            service: 'auth_token',
          }),
          Keychain.setGenericPassword('refresh_token', response.data.refreshToken, {
            service: 'refresh_token',
          }),
        ]);
      }

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'OTP Verification failed');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  /**
   * Securely logout the user by notifying the backend and clearing local session.
   */
  logout: async (): Promise<void> => {
    try {
      const refreshCreds = await Keychain.getGenericPassword({ service: 'refresh_token' });
      
      if (refreshCreds) {
        // Call logout API with refresh_token as a query parameter
        // apiClient automatically handles the Bearer token in the header
        await apiClient.post(`${API_ENDPOINTS.AUTH.LOGOUT}?refresh_token=${refreshCreds.password}`);
      }
    } catch (error) {
      console.error('Logout API error', error);
    } finally {
      // Always clear local session
      await authService.clearLocalSession();
    }
  },

  /**
   * Clear all local session data from Keychain and Store.
   */
  clearLocalSession: async (): Promise<void> => {
    await Promise.all([
      Keychain.resetGenericPassword({ service: 'auth_token' }),
      Keychain.resetGenericPassword({ service: 'refresh_token' }),
    ]);
    // Reset Zustand store
    useAuthStore.getState().logout();
  },

  resendOtp: async (
    phoneNumber: string,
  ): Promise<{ status: number; data: LoginResponse }> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.RESEND_OTP,
        { phoneNumber }
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Resend OTP failed');
      }
      throw new Error('Network error. Please try again.');
    }
  },
};
