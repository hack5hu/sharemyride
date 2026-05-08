export interface BookSeatSelectionParams {
  rideId: string;
  sourceStopId?: number;
  destinationStopId?: number;
  seats?: any[];
  passengers?: any[];
  vehicleType?: string;
  departureDate?: string;
  departureTime?: string;
}

export interface BookSeatSelectionProps {
  route: { params: BookSeatSelectionParams };
}
