import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Geolocation from '@react-native-community/geolocation';
import { mmkvStorage } from '@/utils/storage';
import { RideService } from '@/serviceManager/RideService';
import { ActiveRideRole } from '@/navigation/types.d';
import { requestLocationPermission } from '@/utils/permissionUtils';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getTranslations } from '@/constants/localization';
import { NotificationService } from '@/serviceManager/NotificationService';
import {
  parseLiveRidePayload,
  formatLiveLocationNotificationBody,
} from './liveRideHelpers';

export interface ActiveRideLiveInfo {
  hasActiveRide: boolean;
  rideId?: string;
  role?: ActiveRideRole | 'DRIVER' | 'PASSENGER';
  status?: string;
  message?: string;
  subtitle?: string;
  etaMinutes?: number;
  distanceKm?: number;
  pickupLocation?: string;
  destinationLocation?: string;
  startTime?: string;
  rideDetails?: any;
}

interface LiveRideState {
  activeRide: ActiveRideLiveInfo | null;
  isLoading: boolean;
  isBannerDismissed: boolean;
  isLiveLocationEnabled: boolean;
  isGpsDisabled: boolean;
  lastFetchedAt: number | null;
  fetchLiveStatus: () => Promise<void>;
  setLiveLocationEnabled: (enabled: boolean) => Promise<void>;
  setIsGpsDisabled: (disabled: boolean) => void;
  dismissBanner: () => void;
  resetLiveRide: () => void;
}

export const useLiveRideStore = create<LiveRideState>()(
  persist(
    (set) => ({
      activeRide: null,
      isLoading: false,
      isBannerDismissed: false,
      isLiveLocationEnabled: false,
      isGpsDisabled: false,
      lastFetchedAt: null,

      setIsGpsDisabled: (disabled: boolean) => set({ isGpsDisabled: disabled }),

      setLiveLocationEnabled: async (enabled: boolean) => {
        set({ isLiveLocationEnabled: enabled, isGpsDisabled: false });
        const t = getTranslations().notification;
        const currentRide = useLiveRideStore.getState().activeRide;
        if (enabled) {
          try {
            await requestLocationPermission();
          } catch {}
          const bodyText = formatLiveLocationNotificationBody(
            currentRide?.etaMinutes,
            currentRide?.distanceKm,
            t.liveLocationActiveMessage,
            t.liveLocationTrackingBody,
          );
          showNotification(
            NotificationType.INFO,
            t.liveLocationActiveTitle,
            bodyText,
          );
          NotificationService.displayLiveLocationNotification(
            t.liveLocationActiveTitle,
            bodyText,
          );
        } else {
          showNotification(
            NotificationType.INFO,
            t.liveLocationPausedTitle,
            t.liveLocationPausedMessage,
          );
          NotificationService.cancelLiveLocationNotification();
        }
        useLiveRideStore.getState().fetchLiveStatus();
      },

      dismissBanner: () => set({ isBannerDismissed: true }),

      resetLiveRide: () => {
        NotificationService.cancelLiveLocationNotification();
        set({
          activeRide: null,
          isBannerDismissed: false,
          lastFetchedAt: null,
          isLiveLocationEnabled: false,
          isGpsDisabled: false,
        });
      },

      fetchLiveStatus: async () => {
        set({ isLoading: true });

        const sendRequest = async (lat: number | null, lng: number | null) => {
          const isLiveLocationEnabled =
            useLiveRideStore.getState().isLiveLocationEnabled;

          try {
            const data = await RideService.getLiveStatus({
              lat: isLiveLocationEnabled ? lat : null,
              lng: isLiveLocationEnabled ? lng : null,
              liveLocationEnabled: isLiveLocationEnabled,
            });

            const parsedRide = parseLiveRidePayload(data);
            set({
              activeRide: parsedRide,
              isBannerDismissed: parsedRide ? false : true,
              lastFetchedAt: Date.now(),
              isLoading: false,
            });

            if (useLiveRideStore.getState().isLiveLocationEnabled) {
              const t = getTranslations().notification;
              const bodyText = formatLiveLocationNotificationBody(
                parsedRide?.etaMinutes,
                parsedRide?.distanceKm,
                t.liveLocationActiveMessage,
                t.liveLocationTrackingBody,
              );
              NotificationService.displayLiveLocationNotification(
                t.liveLocationActiveTitle,
                bodyText,
              );
            } else {
              NotificationService.cancelLiveLocationNotification();
            }
          } catch {
            set({ isLoading: false });
          }
        };

        const isLiveLocationEnabled =
          useLiveRideStore.getState().isLiveLocationEnabled;

        if (!isLiveLocationEnabled) {
          NotificationService.cancelLiveLocationNotification();
          set({ isGpsDisabled: false });
          sendRequest(null, null);
          return;
        }

        try {
          Geolocation.getCurrentPosition(
            (position) => {
              set({ isGpsDisabled: false });
              const { latitude, longitude } = position.coords;
              sendRequest(latitude, longitude);
            },
            () => {
              set({ isGpsDisabled: true });
              sendRequest(null, null);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
          );
        } catch {
          set({ isGpsDisabled: true });
          sendRequest(null, null);
        }
      },
    }),
    {
      name: 'live-ride-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        isLiveLocationEnabled: state.isLiveLocationEnabled,
      }),
    },
  ),
);
