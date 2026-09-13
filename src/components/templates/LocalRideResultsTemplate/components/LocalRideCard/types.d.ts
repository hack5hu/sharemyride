export interface LocalRideItemData {
  id: string;
  driverName: string;
  driverPhotoUrl?: string;
  driverRating: number;
  vehicleModel?: string;
  vehicleType?: string;
  startTime: string;
  price: number;
  availableSeats: number;
  duration?: string;
  pickupDistanceMeters?: number;
  dropoffDistanceMeters?: number;
  sourceStopName?: string;
  destinationStopName?: string;
  sourceStopId?: number;
  destinationStopId?: number;
  routePath?: string;
  encodedPolyline?: string;
  sourceCoords: { latitude: number; longitude: number };
  destCoords: { latitude: number; longitude: number };
}

export interface LocalRideCardProps {
  ride: LocalRideItemData;
  isSelected: boolean;
  onSelect: (rideId: string) => void;
  onPressDetails: (rideId: string) => void;
}
