import { StateCreator } from 'zustand';
import { SettingsStore, AppearanceSlice } from './types';

export const createAppearanceSlice: StateCreator<
  SettingsStore,
  [],
  [],
  AppearanceSlice
> = (set, get) => ({
  themeMode: 'light',
  setTheme: (theme) => set({ themeMode: theme }),
  toggleTheme: () => set({ themeMode: get().themeMode === 'light' ? 'dark' : 'light' }),
});
