import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationStore {
  history: Record<string, Location[]>;
  addSearchHistory: (location: Location, contextKey: string) => void;
  clearHistory: (contextKey?: string) => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      history: {},
      addSearchHistory: (location, contextKey) =>
        set((state) => {
          const currentBucket = state.history[contextKey] || [];
          
          // Deduplicate by ID or identical coordinates (lat/lng)
          const filteredBucket = currentBucket.filter((item) => {
            const isSameId = item.id === location.id;
            const isSameCoords = 
              item.latitude === location.latitude && 
              item.longitude === location.longitude;
            
            return !isSameId && !isSameCoords;
          });

          // Prepend new location and limit history size
          const updatedBucket = [location, ...filteredBucket].slice(0, 5);
          
          return {
            history: {
              ...state.history,
              [contextKey]: updatedBucket,
            },
          };
        }),
      clearHistory: (contextKey) =>
        set((state) => {
          if (contextKey) {
            return {
              history: {
                ...state.history,
                [contextKey]: [],
              },
            };
          }
          return { history: {} };
        }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
