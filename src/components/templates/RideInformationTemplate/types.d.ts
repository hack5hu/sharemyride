import { TimelinePoint, DriverData } from '@/screens/BookFlow/3_AvailableRides/types';

export interface Passenger {
  id?: string;
  bookingId?: string;
  name: string;
  photoUrl?: string;
  segment?: string;
  seatsBooked?: number;
  seatNames?: string[];
}

export interface RideDetailsData {
  id: string;
  driver: DriverData & { id: string; bio?: string };
  price: number;
  timeline: TimelinePoint[];
  features: string[];
  seatsLeft: number;
  isFrequentCoRider?: boolean;
  pickupDistance?: number;
  dropoffDistance?: number;
  departureHour?: number;
  vehicle?: {
    registration?: string;
    type?: string;
    model?: string;
    color?: string;
    company?: string;
  };
  totalDistance: number;
  totalDuration: number;
  routePath?: string;
  seats?: any[];
  passengers?: Passenger[];
  departureDate?: string;
  departureTime?: string;
  rawStops?: Array<{
    lat: number;
    lon: number;
    name: string;
    sequence: number;
    arrivalTime?: string;
    id?: number | string;
  }>;
  userRole?: string;
  bookingPrice?: number;
  seatsBooked?: number;
  seatNames?: string[];
  paymentMethod?: string;
  myBookingId?: string | null;
  status: string;
  cancellationReason?: string;
}

export interface RideInformationTemplateProps {
  ride: RideDetailsData | null;
  t?: unknown;
  handleBack: () => void;
  handleBook: () => void;
  handleViewRoute: (index?: number) => void;
  handleCopyAddress: (address: string) => void;
  handleChat: () => void;
  handleDriverProfile: () => void;
  isLoading?: boolean;
  showBookButton?: boolean;
  hideHeader?: boolean;
  isDriver?: boolean;
  onCancelRide?: () => void;
  onCancelPassenger?: (id: string) => void;
  handlePassengerProfile?: (id: string) => void;
  showVehicleDetails?: boolean;
  onReportRide?: () => void;
}
