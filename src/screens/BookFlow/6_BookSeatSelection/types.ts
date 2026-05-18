export interface BookSeat {
  id: number;
  seatName: string;
  available: boolean;
  price: number;
}

export interface Passenger {
  name: string;
  photoUrl: string;
  segment: string;
}

export interface BookSeatSelectionParams {
  rideId: string;
  sourceStopId?: number;
  destinationStopId?: number;
  seats?: BookSeat[];
  passengers?: Passenger[];
  vehicleType?: string;
  departureDate?: string;
  departureTime?: string;
}

export interface BookSeatSelectionProps {
  route: { params: BookSeatSelectionParams };
}
