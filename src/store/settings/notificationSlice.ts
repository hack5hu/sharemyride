import { StateCreator } from 'zustand';
import { SettingsStore, NotificationSlice } from './types';

export const createNotificationSlice: StateCreator<
  SettingsStore,
  [],
  [],
  NotificationSlice
> = (set) => ({
  pushNotifications: true,
  promoEmails: true,
  rideReceipts: true,
  accountSecurity: true, // Static in UI for design
  togglePushNotifications: () => set((state) => ({ pushNotifications: !state.pushNotifications })),
  togglePromoEmails: () => set((state) => ({ promoEmails: !state.promoEmails })),
  toggleRideReceipts: () => set((state) => ({ rideReceipts: !state.rideReceipts })),
});
