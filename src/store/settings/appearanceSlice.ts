import { Appearance } from 'react-native';
import { type StateCreator } from 'zustand';
import NativeSplash from '@/specs/NativeSplash';
import { type SettingsStore, type AppearanceSlice } from './types';

const syncNativeTheme = (theme: 'light' | 'dark') => {
  try {
    NativeSplash?.setTheme(theme);
    Appearance.setColorScheme(theme);
  } catch {
    // Ignore error if module is unavailable
  }
};

export const createAppearanceSlice: StateCreator<
  SettingsStore,
  [],
  [],
  
  AppearanceSlice
> = (set, get) => ({
  themeMode: 'light',
  setTheme: theme => {
    set({ themeMode: theme });
    syncNativeTheme(theme);
  },
  toggleTheme: () => {
    const newTheme = get().themeMode === 'light' ? 'dark' : 'light';
    set({ themeMode: newTheme });
    syncNativeTheme(newTheme);
  },
});
