import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';
import { Location } from './useLocationStore';

export interface RecentSearch {
  id: string;
  startLocation: Location;
  destinationLocation: Location;
  travelDate: string;
  seatCount: number;
}

interface SearchFilters {
  proximityType?: 'PICKUP' | 'DROP_OFF';
  departureTimeSlot?: string;
  noSmoking?: boolean;
  ladiesOnly?: boolean;
  verifiedDrivers?: boolean;
  petFriendly?: boolean;
  luggageAllowed?: boolean;
}

interface BookRideState {
  startLocation: Location | null;
  destinationLocation: Location | null;
  travelDate: string | null; // ISO string
  seatCount: number;
  searchResults: any[] | null;
  recentSearches: RecentSearch[];
  filters: SearchFilters;

  setStartLocation: (location: Location | null) => void;
  setDestinationLocation: (location: Location | null) => void;
  setTravelDate: (date: string | null) => void;
  setSeatCount: (count: number) => void;
  setSearchResults: (results: any[] | null) => void;
  appendSearchResults: (results: any[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  setFilters: (filters: SearchFilters) => void;
  addRecentSearch: (search: Omit<RecentSearch, 'id'>) => void;
  clearRecentSearches: () => void;
  clearBookState: () => void;
}

export const useBookRideStore = create<BookRideState>()(
  persist(
    (set) => ({
      startLocation: null,
      destinationLocation: null,
      travelDate: null,
      seatCount: 1,
      searchResults: null,
      currentPage: 0,
      hasMore: true,
      recentSearches: [],
      filters: {},

      setStartLocation: (location) => set({ startLocation: location }),
      setDestinationLocation: (location) => set({ destinationLocation: location }),
      setTravelDate: (date) => set({ travelDate: date }),
      setSeatCount: (count) => set({ seatCount: count }),
      setSearchResults: (results) => set({ 
        searchResults: results,
        currentPage: 0,
        hasMore: results ? results.length >= 10 : true
      }),
      appendSearchResults: (results) => set((state) => ({ 
        searchResults: [...(state.searchResults || []), ...results],
        hasMore: results.length >= 10
      })),
      setCurrentPage: (page) => set({ currentPage: page }),
      setHasMore: (hasMore) => set({ hasMore }),
      setFilters: (filters) => set({ filters }),

      addRecentSearch: (search) => set((state) => {
        const newSearch: RecentSearch = {
          ...search,
          id: `${Date.now()}`,
        };
        // Avoid duplicates (simplified check by address)
        const filtered = state.recentSearches.filter(
          (s) => 
            s.startLocation.address !== search.startLocation.address ||
            s.destinationLocation.address !== search.destinationLocation.address
        );
        return {
          recentSearches: [newSearch, ...filtered].slice(0, 5), // Keep last 5
        };
      }),

      clearRecentSearches: () => set({ recentSearches: [] }),

      clearBookState: () => set({
        startLocation: null,
        destinationLocation: null,
        travelDate: null,
        seatCount: 1,
        filters: {},
      }),
    }),
    {
      name: 'book-ride-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ recentSearches: state.recentSearches }), // Only persist recent searches
    }
  )
);
