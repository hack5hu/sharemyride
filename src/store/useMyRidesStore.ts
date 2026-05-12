import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';

export interface DraftRide {
  id: string;
  savedAt: string;
  state: any; // This will hold the entire publish store state
}

export type RideCategory = 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'REQUESTS' | 'ARCHIVE';

interface CategoryState {
  data: any[];
  page: number;
  hasMore: boolean;
}

interface MyRidesState {
  drafts: DraftRide[];
  rides: Record<RideCategory, CategoryState>;

  // Actions
  addDraft: (state: any, id?: string | null) => void;
  removeDraft: (id: string) => void;
  clearDrafts: () => void;
  setRides: (category: RideCategory, rides: any[], hasMore: boolean) => void;
  appendRides: (category: RideCategory, rides: any[], hasMore: boolean) => void;
  setPage: (category: RideCategory, page: number) => void;
  resetCategory: (category: RideCategory) => void;
  removeRide: (category: RideCategory, id: string | number) => void;
}

export const useMyRidesStore = create<MyRidesState>()(
  persist(
    (set) => ({
      drafts: [],
      rides: {
        UPCOMING: { data: [], page: 0, hasMore: true },
        COMPLETED: { data: [], page: 0, hasMore: true },
        CANCELLED: { data: [], page: 0, hasMore: true },
        REQUESTS: { data: [], page: 0, hasMore: true },
        ARCHIVE: { data: [], page: 0, hasMore: true },
      },

      addDraft: (state, id) => set((prevState) => {
        if (id) {
          const newDrafts = prevState.drafts.map((d) => 
            d.id === id ? { ...d, state, savedAt: new Date().toISOString() } : d
          );
          return { drafts: newDrafts };
        } else {
          return {
            drafts: [
              {
                id: `draft-${Date.now()}`,
                savedAt: new Date().toISOString(),
                state,
              },
              ...prevState.drafts,
            ],
          };
        }
      }),

      removeDraft: (id) => set((prevState) => ({
        drafts: prevState.drafts.filter((draft) => draft.id !== id),
      })),

      clearDrafts: () => set({ drafts: [] }),

      setRides: (category, data, hasMore) => set((state) => {
        let finalData = data;
        if (category === 'ARCHIVE' && finalData.length > 10) {
          finalData = finalData.slice(0, 10);
        }
        return {
          rides: {
            ...state.rides,
            [category]: { ...state.rides[category], data: finalData, hasMore, page: 0 }
          }
        };
      }),

      appendRides: (category, data, hasMore) => set((state) => {
        const existingData = state.rides[category].data;
        const newData = data.filter(
          (newRide) => !existingData.some((oldRide) => (oldRide.id || oldRide.bookingId) === (newRide.id || newRide.bookingId))
        );
        let finalData = [...existingData, ...newData];
        
        if (category === 'ARCHIVE' && finalData.length > 10) {
          finalData = finalData.slice(0, 10);
        }

        return {
          rides: {
            ...state.rides,
            [category]: { 
              ...state.rides[category], 
              data: finalData, 
              hasMore 
            }
          }
        };
      }),

      setPage: (category, page) => set((state) => ({
        rides: {
          ...state.rides,
          [category]: { ...state.rides[category], page }
        }
      })),

      resetCategory: (category) => set((state) => ({
        rides: {
          ...state.rides,
          [category]: { data: [], page: 0, hasMore: true }
        }
      })),

      removeRide: (category, id) => set((state) => {
        const categoryData = state.rides[category];
        const newData = categoryData.data.filter(
          (ride) => (ride.id || ride.bookingId) !== id
        );
        return {
          rides: {
            ...state.rides,
            [category]: { ...categoryData, data: newData }
          }
        };
      }),
    }),
    {
      name: 'my-rides-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
