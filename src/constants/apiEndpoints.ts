import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : 'https://user-service-i6mi.onrender.com';

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
    GET_MY_RIDES: '/ride/my-rides',
    SEARCH: '/ride/search',
    CANCEL_RIDE: (id: string | number) => `/ride/${id}/cancel`,
    CANCEL_BOOKING: (bookingId: string | number) => `/ride/booking/${bookingId}/cancel`,
    BOOK_RIDE: (id: string | number) => `/ride/${id}/book`,
    GET_RIDE_DETAIL: (id: string | number) => `/ride/${id}/detail`,
    UPDATE_BOOKING_STATUS: (bookingId: string | number) => `/ride/booking/${bookingId}/status`,
    PREFERENCES: '/ride/preferences',
    PUBLISHED: '/ride/published',
    PENDING_BOOKINGS: '/ride/bookings/pending',
  },
} as const;
