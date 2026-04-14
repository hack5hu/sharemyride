import { create } from 'zustand';
import { Location } from './useLocationStore';

interface RidePublishState {
  startLocation: Location | null;
  destinationLocation: Location | null;
  setStartLocation: (location: Location) => void;
  setDestinationLocation: (location: Location) => void;
  clearPublishState: () => void;
}

export const useRidePublishStore = create<RidePublishState>((set) => ({
  startLocation: null,
  destinationLocation: null,
  
  setStartLocation: (location) => set({ startLocation: location }),
  
  setDestinationLocation: (location) => set({ destinationLocation: location }),
  
  clearPublishState: () => set({ 
    startLocation: null, 
    destinationLocation: null 
  }),
}));
