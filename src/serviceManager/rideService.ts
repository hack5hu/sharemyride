import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface RouteStop {
  name: string;
  lat: number;
  lon: number;
  sequence: number;
  distanceFromPreviousStop: number;
  priceFromPreviousStop: number;
  frontSeatPriceFromPreviousStop: number;
  arrivalTime: string;
}

export interface BookingPayload {
  requestedSeatIds?: number[];
  requestedSeats?: string[];
  sourceStopId: number;
  destinationStopId: number;
}

export interface PublishRidePayload {
  vehicleId: string;
  startTime: string;
  endTime: string;
  offeredSeatIds: number[];
  routePath: string;
  routeStops: RouteStop[];
  fullJourneyPrice: number | string;
  frontSeatPrice: number | string;
}

export interface TravelPreferenceData {
  nonSmoking: boolean;
  womenOnly: boolean;
  manualApproval: boolean;
  musicPreference: string;
  luggageAllowed: boolean;
  petFriendly: boolean;
  maxBackSeats: number;
  waitingTime: number;
}

export interface SearchRidePayload {
  sourceLat: number;
  sourceLon: number;
  destLat: number;
  destLon: number;
  travelDate: string; // "YYYY-MM-DDTHH:mm:ss"
  requestedSeats: number;
  radiusInMeters: number; // e.g. 10000 for 10km
  page?: number;
  size?: number;

  // Filters
  proximityType?: 'PICKUP' | 'DROP_OFF';
  departureTimeSlot?: string;
  noSmoking?: boolean;
  ladiesOnly?: boolean;
  verifiedDrivers?: boolean;
  petFriendly?: boolean;
  luggageAllowed?: boolean;
}

export const RideService = {
  searchRides: async (payload: SearchRidePayload) => {
    const response = await axiosClient.post(API_ENDPOINTS.RIDE.SEARCH, payload);
    return response.data;
  },

  publishRide: async (payload: PublishRidePayload) => {
    const response = await axiosClient.post(
      API_ENDPOINTS.RIDE.PUBLISH,
      payload,
    );
    return response.data;
  },

  getMyRides: async (
    filter: 1 | 2 | 3,
    page: number = 0,
    size: number = 15,
  ) => {
    const response = await axiosClient.get(
      `${API_ENDPOINTS.RIDE.GET_MY_RIDES}?filter=${filter}&page=${page}&size=${size}`,
    );
    return response.data;
  },

  cancelRide: async (rideId: string | number, reason: string) => {
    const url = `${API_ENDPOINTS.RIDE.CANCEL_RIDE(
      rideId,
    )}?reason=${encodeURIComponent(reason)}`;
    const response = await axiosClient.put(url);
    return response.data;
  },

  cancelBooking: async (bookingId: string | number, reason: string) => {
    const url = `${API_ENDPOINTS.RIDE.CANCEL_BOOKING(
      bookingId,
    )}?reason=${encodeURIComponent(reason)}`;
    const response = await axiosClient.put(url);
    return response.data;
  },

  savePreferences: async (payload: TravelPreferenceData) => {
    const response = await axiosClient.post(
      API_ENDPOINTS.RIDE.PREFERENCES,
      payload,
    );
    return response.data;
  },

  getPreferences: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.RIDE.PREFERENCES);
    return response.data;
  },

  bookRide: async (rideId: string | number, payload: BookingPayload) => {
    const response = await axiosClient.post(
      API_ENDPOINTS.RIDE.BOOK_RIDE(rideId),
      payload,
    );
    return response.data;
  },

  getPendingBookings: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.RIDE.PENDING_BOOKINGS);
    return response.data;
  },

  getDriverPendingRequests: async () => {
    const response = await axiosClient.get(
      API_ENDPOINTS.RIDE.DRIVER_PENDING_REQUESTS,
    );
    return response.data;
  },

  acceptBooking: async (bookingId: string | number) => {
    return RideService.updateBookingStatus(bookingId, 'CONFIRMED');
  },

  rejectBooking: async (bookingId: string | number) => {
    return RideService.updateBookingStatus(bookingId, 'REJECTED');
  },

  getRideDetail: async (
    rideId: string | number,
    sourceStopId?: number,
    destinationStopId?: number,
  ) => {
    let url = API_ENDPOINTS.RIDE.GET_RIDE_DETAIL(rideId);
    const queryParams: string[] = [];
    if (sourceStopId) queryParams.push(`sourceStopId=${sourceStopId}`);
    if (destinationStopId)
      queryParams.push(`destinationStopId=${destinationStopId}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const response = await axiosClient.get(url);
    return response.data;
  },

  getMyRideDetail: async (
    rideId: string | number,
    sourceStopId?: number,
    destinationStopId?: number,
  ) => {
    let url = API_ENDPOINTS.RIDE.GET_MY_RIDE_DETAIL(rideId);
    const queryParams: string[] = [];
    if (sourceStopId) queryParams.push(`sourceStopId=${sourceStopId}`);
    if (destinationStopId)
      queryParams.push(`destinationStopId=${destinationStopId}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const response = await axiosClient.get(url);
    return response.data;
  },

  updateBookingStatus: async (
    bookingId: string | number,
    status: 'CONFIRMED' | 'REJECTED',
  ) => {
    const url = `${API_ENDPOINTS.RIDE.UPDATE_BOOKING_STATUS(
      bookingId,
    )}?status=${status}`;
    const response = await axiosClient.put(url);
    return response.data;
  },

  updateLocation: async (rideId: string | number, lat: number, lon: number) => {
    const response = await axiosClient.post(
      API_ENDPOINTS.RIDE.UPDATE_LOCATION(rideId),
      { lat, lon },
    );
    return response.data;
  },

  syncLocationBacklog: async (
    rideId: string | number,
    backlog: Array<{ latitude: number; longitude: number; timestamp: number }>,
  ) => {
    const response = await axiosClient.post(
      API_ENDPOINTS.RIDE.SYNC_BACKLOG(rideId),
      { backlog },
    );
    return response.data;
  },

  submitRating: async (
    rideId: string | number,
    targetUserId: string,
    rating: number,
    ratings: Record<string, number>,
    review?: string,
  ) => {
    const response = await axiosClient.post(API_ENDPOINTS.RIDE.SUBMIT_RATING, {
      rideId: Number(rideId),
      ratedUserId: targetUserId,
      score: rating,
      comment: review,
    });
    return response.data;
  },

  reportRide: async (payload: {
    rideId: number | string;
    reason: string;
    description: string;
  }) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.RIDE.REPORT, {
        ...payload,
        rideId: Number(payload.rideId),
      });
      return response.data;
    } catch (error) {
      console.warn('Report Ride API error:', error);
      throw error;
    }
  },
};
