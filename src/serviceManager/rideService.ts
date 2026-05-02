import apiClient from './apiClient';
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
  offeredSeats: string[];
  routePath: string;
  routeStops: RouteStop[];
  fullJourneyPrice: number;
  frontSeatPrice: number;
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
}

const rideService = {
  searchRides: async (payload: SearchRidePayload) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RIDE.SEARCH, payload);
      return response.data;
    } catch (error) {
      console.error('Ride search failed:', error);
      throw error;
    }
  },
  publishRide: async (payload: PublishRidePayload) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RIDE.PUBLISH, payload);
      return response.data;
    } catch (error) {
      console.error('Ride publication failed:', error);
      throw error;
    }
  },
  getMyRides: async (filter: 'UPCOMING' | 'COMPLETED' | 'ONGOING', page: number = 0, size: number = 15) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.RIDE.PUBLISHED}?filter=${filter}&page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error(`Fetching ${filter} rides failed:`, error);
      throw error;
    }
  },
  cancelRide: async (rideId: string | number) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.RIDE.CANCEL_RIDE(rideId));
      return response.data;
    } catch (error) {
      console.error('Ride cancellation failed:', error);
      throw error;
    }
  },
  savePreferences: async (payload: TravelPreferenceData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RIDE.PREFERENCES, payload);
      return response.data;
    } catch (error) {
      console.error('Saving preferences failed:', error);
      throw error;
    }
  },
  getPreferences: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RIDE.PREFERENCES);
      return response.data;
    } catch (error) {
      console.error('Fetching preferences failed:', error);
      throw error;
    }
  },
  bookRide: async (rideId: string | number, payload: BookingPayload) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RIDE.BOOK_RIDE(rideId), payload);
      return response.data;
    } catch (error) {
      console.error('Ride booking failed:', error);
      throw error;
    }
  },
  getPendingBookings: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RIDE.PENDING_BOOKINGS);
      return response.data;
    } catch (error) {
      console.error('Fetching pending bookings failed:', error);
      throw error;
    }
  },
  acceptBooking: async (bookingId: string | number) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RIDE.ACCEPT_BOOKING(bookingId));
      return response.data;
    } catch (error) {
      console.error('Accepting booking failed:', error);
      throw error;
    }
  },
  rejectBooking: async (bookingId: string | number) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RIDE.REJECT_BOOKING(bookingId));
      return response.data;
    } catch (error) {
      console.error('Rejecting booking failed:', error);
      throw error;
    }
  },
};

export default rideService;
