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
  addDraft: (state: any) => void;
  removeDraft: (id: string) => void;
  clearDrafts: () => void;
}

export const useMyRidesStore = create<MyRidesState>()(
  persist(
    (set) => ({
      drafts: [],
      upcoming: [],
      past: [],

      addDraft: (state) => set((prevState) => ({
        drafts: [
          {
            id: `draft-${Date.now()}`,
            savedAt: new Date().toISOString(),
            state,
          },
          ...prevState.drafts,
        ],
      })),

      removeDraft: (id) => set((prevState) => ({
        drafts: prevState.drafts.filter((draft) => draft.id !== id),
      })),

      clearDrafts: () => set({ drafts: [] }),
    }),
    {
      name: 'my-rides-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
