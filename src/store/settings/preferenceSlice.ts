import { StateCreator } from 'zustand';
import { SettingsStore, PreferenceSlice } from './types';

export const createPreferenceSlice: StateCreator<
  SettingsStore,
  [],
  [],
  PreferenceSlice
> = (set) => ({
  language: 'en',
  region: 'INDIA', // Static Region based on design
  setLanguage: (lang) => set({ language: lang }),
});
