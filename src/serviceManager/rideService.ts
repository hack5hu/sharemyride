import apiClient from './apiClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface RouteStop {
  name: string;
  lat: number;
  lon: number;
  sequence: number;
  distanceFromPreviousStop: number;
  priceFromPreviousStop: number;
  arrivalTime: string;
}

export interface PublishRidePayload {
  vehicleType: string;
  startTime: string;
  endTime: string;
  offeredSeats: string[];
  routePath: [number, number][];
  routeStops: RouteStop[];
}

const rideService = {
  publishRide: async (payload: PublishRidePayload) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RIDE.PUBLISH, payload);
      return response.data;
    } catch (error) {
      console.error('Ride publication failed:', error);
      throw error;
    }
  },
  getMyRides: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RIDE.GET_MY_RIDES);
      return response.data;
    } catch (error) {
      console.error('Fetching my rides failed:', error);
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
};

export default rideService;
