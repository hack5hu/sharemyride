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
  getMyRides: async (filter: 'UPCOMING' | 'COMPLETED' | 'CANCELLED', page: number = 0, size: number = 15) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.RIDE.GET_MY_RIDES}?filter=${filter}&page=${page}&size=${size}`);
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
    return rideService.updateBookingStatus(bookingId, 'CONFIRMED');
  },
  rejectBooking: async (bookingId: string | number) => {
    return rideService.updateBookingStatus(bookingId, 'REJECTED');
  },
  getRideDetail: async (rideId: string | number, sourceStopId?: number, destinationStopId?: number) => {
    try {
      let url = API_ENDPOINTS.RIDE.GET_RIDE_DETAIL(rideId);
      const queryParams: string[] = [];
      if (sourceStopId) queryParams.push(`sourceStopId=${sourceStopId}`);
      if (destinationStopId) queryParams.push(`destinationStopId=${destinationStopId}`);
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Fetching ride details failed:', error);
      throw error;
    }
  },
  updateBookingStatus: async (bookingId: string | number, status: 'CONFIRMED' | 'REJECTED') => {
    try {
      const url = `${API_ENDPOINTS.RIDE.UPDATE_BOOKING_STATUS(bookingId)}?status=${status}`;
      const response = await apiClient.put(url);
      return response.data;
    } catch (error) {
      console.error('Updating booking status failed:', error);
      throw error;
    }
  },
};

export default rideService;
