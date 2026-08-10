export interface MyRideBooking {
  price?: number | string;
  seatCount?: number;
  seatIds?: string[] | number[];
  sourceStopId?: string;
  destinationStopId?: string;
}

export interface MyRideStop {
  id: string;
  stopName?: string;
  name?: string;
  latitude: number;
  longitude: number;
  arrivalTime?: string;
  lat?: number;
  lon?: number;
}

export interface MyRideDetailsData {
  id: string;
  startTime?: string;
  duration?: string;
  availableSeats?: number;
  seatsLeft?: number;
  myBooking?: MyRideBooking;
  bookingPrice?: number | string;
  price?: number | string;
  vehicle?: {
    type?: string;
  };
  vehicleType?: string;
  seatIds?: string[] | number[];
  seatNames?: string[];
  stops?: MyRideStop[];
  sourceStopId?: string;
  destinationStopId?: string;
  status: string;
  passengers?: unknown[];
  driver?: unknown;
  cancellationReason?: string;
  rideStatus?: string;
  preferences?: {
    nonSmoking?: boolean;
    petFriendly?: boolean;
    luggageAllowed?: boolean;
    ladiesOnly?: boolean;
    manualApproval?: boolean;
    musicPreference?: string;
  };
}

export interface MyRideDetailsTemplateProps {
  ride: MyRideDetailsData | null;
  handleBack: () => void;
  handleViewRoute: (index?: number) => void;
  handleCopyAddress: (address: string) => void;
  handleChat: () => void;
  isLoading?: boolean;
  isDriver: boolean;
  onCancelRide: () => void;
  onCancelPassenger: (id: string) => void;
  handlePassengerProfile?: (id: string) => void;
  handleDriverProfile?: (id: string) => void;
  onReportRide?: () => void;
  onRateDriver?: () => void;
  onRatePassenger?: (id: string, name: string) => void;
  t: unknown;
}
