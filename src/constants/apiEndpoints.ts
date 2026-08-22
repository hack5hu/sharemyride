export const BASE_URL = 'https://api.zyncride.com';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    VERIFY_OTP: '/auth/verify-otp',
    REFRESH_TOKEN: '/auth/refresh',
    RESEND_OTP: 'auth/resend-otp',
    LOGOUT: 'auth/logout',
    TRUECALLER_LOGIN: '/auth/truecaller-login',
    ACCOUNT: '/auth/account',
  },
  USER: {
    PROFILE: '/user/profile',
    DELETE_PHOTO: '/user/profile/photo',
    VEHICLES: '/user/vehicle',
    REPORT: '/user/report',
  },
  RIDE: {
    PUBLISH: '/ride',
    GET_MY_RIDES: '/ride/my-rides',
    SEARCH: '/ride/search',
    CANCEL_RIDE: (id: string | number) => `/ride/${id}/cancel`,
    CANCEL_BOOKING: (bookingId: string | number) =>
      `/ride/booking/${bookingId}/cancel`,
    BOOK_RIDE: (id: string | number) => `/ride/${id}/book`,
    GET_RIDE_DETAIL: (id: string | number) => `/ride/${id}/detail`,
    GET_MY_RIDE_DETAIL: (id: string | number) => `/ride/my-rides/${id}/detail`,
    UPDATE_BOOKING_STATUS: (bookingId: string | number) =>
      `/ride/booking/${bookingId}/status`,
    PREFERENCES: '/ride/preferences',
    PUBLISHED: '/ride/published',
    PENDING_BOOKINGS: '/ride/bookings/pending',
    DRIVER_PENDING_REQUESTS: '/ride/driver/pending-requests',
    UPDATE_LOCATION: (id: string | number) => `/ride/${id}/location`,
    SYNC_BACKLOG: (id: string | number) => `/ride/${id}/location/backlog`,
    SUBMIT_RATING: '/rating',
    GET_USER_RATINGS: (userId: string) => `/rating/user/${userId}`,
    REPORT: '/ride/report',
  },
} as const;
