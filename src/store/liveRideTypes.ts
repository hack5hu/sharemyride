import type { ActiveRideRole } from '@/navigation/types.d';

export interface LiveRideDetails {
  rideId?: string | number;
  rideStatus?: string;
  role?: string;
  startTime?: string;
  distanceKm?: number;
  distance?: number;
  etaMinutes?: number;
  eta?: number;
  vehicle?: { vehicleNumber?: string; numberPlate?: string; licensePlate?: string; registrationNumber?: string; number?: string; company?: string; model?: string; color?: string; fuelType?: string; batteryPercentage?: number; type?: string };
  driver?: { id?: string; name?: string; photoUrl?: string; rating?: number; phoneNumber?: string };
  stops: Array<{ id?: string | number; stopName?: string; name?: string; arrivalTime?: string; lat?: number; lon?: number }>;
  passengers?: Array<{ distanceToPickupKm?: number; etaToPickupMinutes?: number; distanceFromDriverKm?: number; distanceKm?: number; distance?: number; etaMinutes?: number; eta?: number }>;
  [key: string]: unknown;
}

export interface LiveRidePayload {
  rideFound?: boolean;
  ride?: Partial<LiveRideDetails>;
  role?: string;
  distanceKm?: number;
  distance?: number;
  etaMinutes?: number;
  eta?: number;
}

export interface ActiveRideLiveInfo {
  hasActiveRide: boolean;
  rideId?: string;
  role?: ActiveRideRole;
  status?: string;
  message?: string;
  subtitle?: string;
  etaMinutes?: number;
  distanceKm?: number;
  pickupLocation?: string;
  destinationLocation?: string;
  startTime?: string;
  rideDetails?: LiveRideDetails;
}
