export interface TimelinePoint {
  time: string;
  location: string;
  subLocation?: string;
  type: 'pickup' | 'stop' | 'destination';
}

export interface DriverData {
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
}

export interface AvailableRidesProps {
  rides: RideData[];
  onBook: (id: string) => void;
  onDetails: (id: string) => void;
}
