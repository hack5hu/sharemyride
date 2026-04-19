import { create } from 'zustand';
import { Location } from './useLocationStore';

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
  year: string;
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

interface RidePublishState {
  // Route
  startLocation: Location | null;
  destinationLocation: Location | null;
  middleStops: Location[];
  routeDetails: FinalRouteDetails | null;
  selectedRoute: any | null;
  
  // Schedule
  departureDate: string | null; // ISO string
  departureTime: string | null; // e.g., "08:30 AM"

  // Details
  seatCount: number;
  selectedSeatIds: string[];
  publishVehicleType: '5' | '7';
  vehicleDetails: VehicleDetails | null;
  preferences: RidePreferences | null;
  
  // Pricing
  price: number;
  premiumEnabled: boolean;
  premiumPercentage: number;
  segmentPrices: Record<string, number>;
  
  // Strategy
  requestType: 'instant' | 'review';

  // UI / Meta
  editingDraftId: string | null;

  // Setters
  setStartLocation: (location: Location) => void;
  setDestinationLocation: (location: Location) => void;
  addMiddleStop: (location: Location) => void;
  removeMiddleStop: (id: string) => void;
  setMiddleStops: (locations: Location[]) => void;
  setRouteDetails: (details: FinalRouteDetails | null) => void;
  setSelectedRoute: (route: any) => void;
  setDepartureDate: (date: string | null) => void;
  setDepartureTime: (time: string | null) => void;
  setSeatCount: (count: number) => void;
  setSelectedSeatIds: (ids: string[]) => void;
  setPublishVehicleType: (type: '5' | '7') => void;
  setVehicleDetails: (details: VehicleDetails | null) => void;
  setPreferences: (prefs: RidePreferences | null) => void;
  setPricing: (pricing: { 
    price: number; 
    premiumEnabled: boolean; 
    premiumPercentage: number; 
    segmentPrices: Record<string, number> 
  }) => void;
  setRequestType: (type: 'instant' | 'review') => void;
  setEditingDraftId: (id: string | null) => void;
  clearPublishState: () => void;
}

export const useRidePublishStore = create<RidePublishState>((set) => ({
  startLocation: null,
  destinationLocation: null,
  middleStops: [],
  routeDetails: null,
  selectedRoute: null,
  departureDate: null,
  departureTime: null,
  seatCount: 1,
  selectedSeatIds: [],
  publishVehicleType: '5',
  vehicleDetails: null,
  preferences: {
    nonSmoking: true,
    womenOnly: false,
    music: 'Pop',
    luggage: false,
    pets: false,
  },
  price: 0,
  premiumEnabled: true,
  premiumPercentage: 10,
  segmentPrices: {},
  requestType: 'instant',
  editingDraftId: null,
  
  setStartLocation: (location) => set({ startLocation: location }),
  setDestinationLocation: (location) => set({ destinationLocation: location }),
  addMiddleStop: (location) => set((state) => ({ 
    middleStops: [...state.middleStops, location] 
  })),
  removeMiddleStop: (id) => set((state) => ({
    middleStops: state.middleStops.filter((stop) => stop.id !== id)
  })),
  setMiddleStops: (locations) => set({ middleStops: locations }),
  setRouteDetails: (details) => set({ routeDetails: details }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setDepartureDate: (date) => set({ departureDate: date }),
  setDepartureTime: (time) => set({ departureTime: time }),
  setSeatCount: (count) => set({ seatCount: count }),
  setSelectedSeatIds: (ids) => set({ selectedSeatIds: ids }),
  setPublishVehicleType: (type) => set({ publishVehicleType: type }),
  setVehicleDetails: (details) => set({ vehicleDetails: details }),
  setPreferences: (preferences) => set({ preferences }),
  setPricing: (pricing) => set({ ...pricing }),
  setRequestType: (requestType) => set({ requestType }),
  setEditingDraftId: (editingDraftId) => set({ editingDraftId }),
  
  clearPublishState: () => set({ 
    startLocation: null, 
    destinationLocation: null,
    middleStops: [],
    routeDetails: null,
    selectedRoute: null,
    departureDate: null,
    departureTime: null,
    seatCount: 1,
    vehicleDetails: null,
    preferences: {
      nonSmoking: true,
      womenOnly: false,
      music: 'Pop',
      luggage: false,
      pets: false,
    },
    price: 0,
    premiumEnabled: true,
    premiumPercentage: 10,
    segmentPrices: {},
    requestType: 'instant',
    editingDraftId: null,
  }),
}));
