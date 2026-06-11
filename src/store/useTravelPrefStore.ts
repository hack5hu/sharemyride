import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';
import rideService, { TravelPreferenceData } from '@/serviceManager/rideService';

interface TravelPrefStore {
  preferences: TravelPreferenceData;
  isLoading: boolean;
  setPreferences: (prefs: Partial<TravelPreferenceData>) => void;
  syncPreferences: () => Promise<void>;
  savePreferences: (prefs: TravelPreferenceData) => Promise<void>;
}

const DEFAULT_PREFERENCES: TravelPreferenceData = {
  nonSmoking: true,
  womenOnly: false,
  manualApproval: true,
  musicPreference: 'Pop',
  luggageAllowed: true,
  petFriendly: false,
  maxBackSeats: 2,
  waitingTime: 10,
};

export const useTravelPrefStore = create<TravelPrefStore>()(
  persist(
    (set, get) => ({
      preferences: DEFAULT_PREFERENCES,
      isLoading: false,

      setPreferences: (newPrefs) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPrefs },
        }));
      },

      syncPreferences: async () => {
        const currentPrefs = get().preferences;
        // Determine initial load by checking if it's identical to default or uninitialized
        const isInitialLoad = !currentPrefs || Object.keys(currentPrefs).length === 0;
        if (isInitialLoad) {
          set({ isLoading: true });
        }
        try {
          const data = await rideService.getPreferences();
          if (data) {
            const isIdentical = 
              currentPrefs.nonSmoking === data.nonSmoking &&
              currentPrefs.womenOnly === data.womenOnly &&
              currentPrefs.manualApproval === data.manualApproval &&
              currentPrefs.musicPreference === data.musicPreference &&
              currentPrefs.luggageAllowed === data.luggageAllowed &&
              currentPrefs.petFriendly === data.petFriendly &&
              currentPrefs.maxBackSeats === data.maxBackSeats &&
              currentPrefs.waitingTime === data.waitingTime;

            if (!isIdentical) {
              set({ preferences: data });
            }
          }
        } catch (error) {
          console.error('Failed to sync preferences:', error);
        } finally {
          if (isInitialLoad) {
            set({ isLoading: false });
          }
        }
      },

      savePreferences: async (prefs) => {
        set({ isLoading: true });
        try {
          await rideService.savePreferences(prefs);
          set({ preferences: prefs });
        } catch (error) {
          console.error('Failed to save preferences:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'travel-preferences-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
