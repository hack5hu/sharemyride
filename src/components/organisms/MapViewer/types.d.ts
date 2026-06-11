export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MaskedLocation {
  center: Coordinate;
  radius: number; // in meters (e.g., 1500)
}

export interface PassengerInfo {
  id: string;
  name: string;
  pickupLocation: Coordinate;
}

export enum RideStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface RideDetails {
  id: string | number;
  isDriver: boolean;
  status: RideStatus;
  maskedLocation?: MaskedLocation; // Used in Phase 1 (Scheduled)
  driverLocation?: Coordinate; // Initial or fallback driver coordinates
  passengers?: PassengerInfo[]; // Used by Driver in Phase 2
  myPickupLocation?: Coordinate; // Used by Passenger in Phase 2
  unifiedPolyline?: string; // Used by Passenger in Phase 2
}

export interface DriverLocationPayload {
  rideId: string | number;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  timestamp: number;
}

export interface MapViewerProps {
  rideDetails: RideDetails;
  webSocketUrl?: string; // Optional Spring Boot STOMP WS endpoint (default provided)
}
