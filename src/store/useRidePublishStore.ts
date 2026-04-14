import { create } from 'zustand';
import { Location } from './useLocationStore';

interface RidePublishState {
  startLocation: Location | null;
  destinationLocation: Location | null;
  middleStops: Location[];
  setStartLocation: (location: Location) => void;
  setDestinationLocation: (location: Location) => void;
  addMiddleStop: (location: Location) => void;
  removeMiddleStop: (id: string) => void;
  clearPublishState: () => void;
}

export const useRidePublishStore = create<RidePublishState>((set) => ({
  startLocation: null,
  destinationLocation: null,
  middleStops: [],
  
  setStartLocation: (location) => set({ startLocation: location }),
  
  setDestinationLocation: (location) => set({ destinationLocation: location }),

  addMiddleStop: (location) => set((state) => ({ 
    middleStops: [...state.middleStops, location] 
  })),

  removeMiddleStop: (id) => set((state) => ({
    middleStops: state.middleStops.filter((stop) => stop.id !== id)
  })),
  
  clearPublishState: () => set({ 
    startLocation: null, 
    destinationLocation: null,
    middleStops: []
  }),
}));
