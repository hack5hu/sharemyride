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

interface RidePublishState {
  startLocation: Location | null;
  destinationLocation: Location | null;
  middleStops: Location[];
  routeDetails: FinalRouteDetails | null;
  selectedRoute: any | null;
  seatCount: number;
  setStartLocation: (location: Location) => void;
  setDestinationLocation: (location: Location) => void;
  addMiddleStop: (location: Location) => void;
  removeMiddleStop: (id: string) => void;
  setMiddleStops: (locations: Location[]) => void;
  setRouteDetails: (details: FinalRouteDetails | null) => void;
  setSelectedRoute: (route: any) => void;
  setSeatCount: (count: number) => void;
  clearPublishState: () => void;
}

export const useRidePublishStore = create<RidePublishState>((set) => ({
  startLocation: null,
  destinationLocation: null,
  middleStops: [],
  routeDetails: null,
  selectedRoute: null,
  seatCount: 1, // Defaulting to 1 to avoid division by zero
  
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

  setSeatCount: (count) => set({ seatCount: count }),
  
  clearPublishState: () => set({ 
    startLocation: null, 
    destinationLocation: null,
    middleStops: [],
    routeDetails: null,
    selectedRoute: null,
    seatCount: 1,
  }),
}));
