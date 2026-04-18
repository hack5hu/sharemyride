import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';

export interface DraftRide {
  id: string;
  savedAt: string;
  state: any; // This will hold the entire publish store state
}

interface MyRidesState {
  drafts: DraftRide[];
  upcoming: any[];
  past: any[];

  // Actions
  addDraft: (state: any, id?: string | null) => void;
  removeDraft: (id: string) => void;
  clearDrafts: () => void;
  setUpcoming: (rides: any[]) => void;
  setPast: (rides: any[]) => void;
}

export const useMyRidesStore = create<MyRidesState>()(
  persist(
    (set) => ({
      drafts: [],
      upcoming: [],
      past: [],

      addDraft: (state, id) => set((prevState) => {
        if (id) {
          // Update existing
          const newDrafts = prevState.drafts.map((d) => 
            d.id === id ? { ...d, state, savedAt: new Date().toISOString() } : d
          );
          return { drafts: newDrafts };
        } else {
          // Add new
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
      setUpcoming: (upcoming) => set({ upcoming }),
      setPast: (past) => set({ past }),
    }),
    {
      name: 'my-rides-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
