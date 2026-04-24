import { create } from 'zustand';
import { Location } from './useLocationStore';

interface BookRideState {
  startLocation: Location | null;
  destinationLocation: Location | null;
  travelDate: string | null; // ISO string
  seatCount: number;
  searchResults: any[] | null;

  setStartLocation: (location: Location | null) => void;
  setDestinationLocation: (location: Location | null) => void;
  setTravelDate: (date: string | null) => void;
  setSeatCount: (count: number) => void;
  setSearchResults: (results: any[] | null) => void;
  clearBookState: () => void;
}

export const useBookRideStore = create<BookRideState>((set) => ({
  startLocation: null,
  destinationLocation: null,
  travelDate: null,
  seatCount: 1,
  searchResults: null,

  setStartLocation: (location) => set({ startLocation: location }),
  setDestinationLocation: (location) => set({ destinationLocation: location }),
  setTravelDate: (date) => set({ travelDate: date }),
  setSeatCount: (count) => set({ seatCount: count }),
  setSearchResults: (results) => set({ searchResults: results }),
  clearBookState: () => set({
    startLocation: null,
    destinationLocation: null,
    travelDate: null,
    seatCount: 1,
  }),
}));
