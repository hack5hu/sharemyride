import { type RouteOption } from '@/components/organisms/RouteCard';
import { type RideType } from '@/constants/enums';
import { type Location } from '@/store/useLocationStore';

export interface SelectedPublishRoute {
  uiData: RouteOption;
  coordinates: [number, number][];
  bounds: [number, number, number, number];
  polylineString?: string;
  distanceMeters?: number;
  durationSeconds?: number;
}

export interface RouteLeg {
  distanceMeters: number;
  durationSeconds: number;
  startAddress: string;
  endAddress: string;
}

export interface FinalRouteDetails {
  totalDistanceMeters: number;
  totalDurationSeconds: number;
  legs: RouteLeg[];
}

export interface VehicleDetails {
  company: string;
  model: string;
  numberPlate: string;
  type: string;
  color: string;
  seater: '5' | '7';
}

export interface RidePreferences {
  nonSmoking: boolean;
  womenOnly: boolean;
  music: string;
  luggage: boolean;
  pets: boolean;
}

export interface RidePublishState {
  // Classification
  rideType: RideType;

  // Route
  startLocation: Location | null;
  destinationLocation: Location | null;
  middleStops: Location[];
  routeDetails: FinalRouteDetails | null;
  selectedRoute: SelectedPublishRoute | null;

  // Schedule
  departureDate: string | null;
  departureDates: string[];
  departureTime: string | null;

  // Details
  seatCount: number;
  selectedSeatIds: number[];
  vehicleId: string | null;
  publishVehicleType: '5' | '7';
  vehicleDetails: VehicleDetails | null;
  preferences: RidePreferences | null;

  // Pricing
  price: number;
  fullJourneyPrice: number;
  frontSeatPrice: number;
  premiumEnabled: boolean;
  premiumPercentage: number;
  segmentPrices: Record<string, number>;

  // Strategy
  requestType: 'instant' | 'review';

  // UI / Meta
  editingDraftId: string | null;

  // Setters
  setRideType: (rideType: RideType) => void;
  setStartLocation: (location: Location) => void;
  setDestinationLocation: (location: Location) => void;
  addMiddleStop: (location: Location) => void;
  removeMiddleStop: (id: string) => void;
  setMiddleStops: (locations: Location[]) => void;
  setRouteDetails: (details: FinalRouteDetails | null) => void;
  setSelectedRoute: (route: SelectedPublishRoute | null) => void;
  setDepartureDate: (date: string | null) => void;
  setDepartureDates: (dates: string[]) => void;
  setDepartureTime: (time: string | null) => void;
  setSeatCount: (count: number) => void;
  setSelectedSeatIds: (ids: number[]) => void;
  setVehicleId: (id: string | null) => void;
  setPublishVehicleType: (type: '5' | '7') => void;
  setVehicleDetails: (details: VehicleDetails | null) => void;
  setPreferences: (prefs: RidePreferences | null) => void;
  setPricing: (pricing: {
    price: number;
    fullJourneyPrice: number;
    frontSeatPrice: number;
    premiumEnabled: boolean;
    premiumPercentage: number;
    segmentPrices: Record<string, number>;
  }) => void;
  setRequestType: (type: 'instant' | 'review') => void;
  setEditingDraftId: (id: string | null) => void;
  clearPublishState: () => void;
}

export type PublishSnapshot = {
  [Key in keyof RidePublishState as RidePublishState[Key] extends (
    ...args: never[]
  ) => unknown
    ? never
    : Key]: RidePublishState[Key];
};

export type PublishDraft = Partial<PublishSnapshot>;
