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
  history: Location[];
  addSearchHistory: (location: Location) => void;
  clearHistory: () => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      history: [],
      addSearchHistory: (location) =>
        set((state) => {
          // Avoid duplicates and limit to 10 items
          const filteredHistory = state.history.filter((item) => item.id !== location.id);
          return {
            history: [location, ...filteredHistory].slice(0, 10),
          };
        }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
