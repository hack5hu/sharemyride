export interface TimelinePoint {
  description: string;
  time: string;
  location: string;
  subLocation?: string;
  type: 'pickup' | 'stop' | 'destination';
}

export interface DriverData {
  driverPhotoUrl: string | undefined;
  name: string;
  rating: number;
  rideCount: number;
  avatar: string;
  isVerified: boolean;
}

export interface RideData {
  id: string;
  driver: DriverData;
  price: number;
  timeline: TimelinePoint[];
  features: string[];
  seatsLeft: number;
  isFrequentCoRider?: boolean;
  pickupDistance?: number;
  dropoffDistance?: number;
  departureHour?: number;
  vehicle?: {
    registration: string;
    type: string;
  };
  totalDistance?: number;
  totalDuration: number;
  routePath?: string;
  rawStops?: Array<{
    lat: number;
    lon: number;
    name: string;
    sequence: number;
  }>;
}

export interface AvailableRidesProps {
  rides: RideData[];
  onBook: (id: string) => void;
  onDetails: (id: string) => void;
}
