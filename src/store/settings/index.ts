import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../../utils/storage';
import { SettingsStore } from './types';
import { createAppearanceSlice } from './appearanceSlice';
import { createNotificationSlice } from './notificationSlice';
import { createPreferenceSlice } from './preferenceSlice';

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (...a) => ({
      ...createAppearanceSlice(...a),
      ...createNotificationSlice(...a),
      ...createPreferenceSlice(...a),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export * from './types';
