import { Locale } from '@/constants/localization/types';

export interface AppearanceSlice {
  themeMode: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export interface NotificationSlice {
  pushNotifications: boolean;
  promoEmails: boolean;
  rideReceipts: boolean;
  accountSecurity: boolean; // Always true visually in the design, but let's keep it in store
  togglePushNotifications: () => void;
  togglePromoEmails: () => void;
  toggleRideReceipts: () => void;
}

export interface PreferenceSlice {
  language: Locale;
  region: string;
  setLanguage: (lang: Locale) => void;
}

export type SettingsStore = AppearanceSlice & NotificationSlice & PreferenceSlice;
