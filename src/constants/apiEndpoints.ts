import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : 'http://13.61.176.230:8080';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    VERIFY_OTP: '/auth/verify-otp',
    REFRESH_TOKEN: '/auth/refresh',
    RESEND_OTP: 'auth/resend-otp',
    LOGOUT: 'auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    VEHICLES: '/user/vehicle',
  },
  RIDE: {
    PUBLISH: '/ride',
    GET_MY_RIDES: '/ride',
    SEARCH: '/ride/search',
    CANCEL_RIDE: (id: string | number) => `/ride/${id}`,
    PREFERENCES: '/ride/preferences',
  },
} as const;
