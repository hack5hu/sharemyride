import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Geolocation from '@react-native-community/geolocation';
import { mmkvStorage } from '@/utils/storage';
import { RideService } from '@/serviceManager/RideService';
import { ActiveRideRole } from '@/navigation/types.d';
import { requestLocationPermission } from '@/utils/permissionUtils';

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
  lastFetchedAt: number | null;
  fetchLiveStatus: () => Promise<void>;
  setLiveLocationEnabled: (enabled: boolean) => Promise<void>;
  dismissBanner: () => void;
  resetLiveRide: () => void;
}

const sanitizeMetric = (
  val: number | null | undefined,
): number | undefined => {
  if (val === null || val === undefined || isNaN(Number(val))) return undefined;
  const num = Number(val);
  if (num < 0) return undefined;
  return num;
};

const computeDynamicSubtitle = (
  etaMinutes: number | undefined | null,
  distanceKm: number | undefined | null,
  startTime?: string,
): string | undefined => {
  if (etaMinutes !== undefined && etaMinutes !== null) {
    const distPart =
      distanceKm !== undefined &&
      distanceKm !== null &&
      Number(distanceKm) > 0
        ? ` • ${Number(distanceKm).toFixed(1)} km`
        : '';
    return `${etaMinutes} mins away${distPart}`;
  }

  if (startTime) {
    try {
      const startDate = new Date(startTime);
      const now = new Date();
      const diffMinutes = Math.round(
        (startDate.getTime() - now.getTime()) / (1000 * 60),
      );
      const formattedTime = startDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      if (diffMinutes > 0 && diffMinutes <= 60) {
        return `Starts in ${diffMinutes} mins • ${formattedTime}`;
      } else if (diffMinutes > 60 && diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        return `Starts in ${hours}h ${mins > 0 ? `${mins}m ` : ''}• ${formattedTime}`;
      } else {
        return `Scheduled for ${formattedTime}`;
      }
    } catch {
      return undefined;
    }
  }

  return undefined;
};

export const useLiveRideStore = create<LiveRideState>()(
  persist(
    (set) => ({
      activeRide: null,
      isLoading: false,
      isBannerDismissed: false,
      isLiveLocationEnabled: false,
      lastFetchedAt: null,

      setLiveLocationEnabled: async (enabled: boolean) => {
        set({ isLiveLocationEnabled: enabled });
        if (enabled) {
          try {
            await requestLocationPermission();
          } catch {}
        }
        useLiveRideStore.getState().fetchLiveStatus();
      },

      dismissBanner: () => set({ isBannerDismissed: true }),

      resetLiveRide: () =>
        set({
          activeRide: null,
          isBannerDismissed: false,
          lastFetchedAt: null,
          isLiveLocationEnabled: false,
        }),

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

        if (data && data.rideFound && data.ride) {
          const role =
            String(data.role || data.ride.role || '').toUpperCase() ===
            'PASSENGER'
              ? ActiveRideRole.PASSENGER
              : ActiveRideRole.DRIVER;

          const isStarted =
            data.ride.rideStatus === 'STARTED' ||
            data.ride.rideStatus === 'ACTIVE';

          const firstPassenger = data.ride.passengers?.[0];
          const passengerDistance =
            firstPassenger?.distanceFromDriverKm ??
            firstPassenger?.distanceKm ??
            firstPassenger?.distance;
          const passengerEta =
            firstPassenger?.etaMinutes ?? firstPassenger?.eta;

          const rawDistance =
            data.distanceKm ??
            data.distance ??
            data.ride.distanceKm ??
            data.ride.distance ??
            passengerDistance;

          const rawEta =
            data.etaMinutes ??
            data.eta ??
            data.ride.etaMinutes ??
            data.ride.eta ??
            passengerEta;

          const distanceKm = sanitizeMetric(rawDistance);
          let etaMinutes = sanitizeMetric(rawEta);

          // If no valid live ETA from GPS, calculate from arrival/start time
          if (etaMinutes === undefined && data.ride.startTime) {
            try {
              const start = new Date(data.ride.startTime).getTime();
              const now = Date.now();
              const diff = Math.max(0, Math.round((start - now) / 60000));
              etaMinutes = diff > 0 ? diff : undefined;
            } catch {}
          }

          const dynamicSubtitle = computeDynamicSubtitle(
            etaMinutes,
            distanceKm,
            data.ride.startTime,
          );

          set({
            activeRide: {
              hasActiveRide: true,
              rideId: data.ride.rideId ? String(data.ride.rideId) : undefined,
              role,
              status: data.ride.rideStatus || 'CREATED',
              message: isStarted
                ? 'Active Ride in Progress'
                : 'Your ride is about to start!',
              subtitle: dynamicSubtitle,
              etaMinutes,
              distanceKm,
              startTime: data.ride.startTime,
              rideDetails: data.ride,
            },
            isBannerDismissed: false,
            lastFetchedAt: Date.now(),
            isLoading: false,
          });
        } else {
          set({
            activeRide: null,
            isLoading: false,
            lastFetchedAt: Date.now(),
          });
        }
      } catch (error) {
        set({ isLoading: false });
      }
    };

    const isLiveLocationEnabled =
      useLiveRideStore.getState().isLiveLocationEnabled;

    if (!isLiveLocationEnabled) {
      sendRequest(null, null);
      return;
    }

    try {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendRequest(latitude, longitude);
        },
        (error) => {
          console.warn('Geolocation Error in LiveRideStore:', error);
          // Immediately fallback to calling API with liveLocationEnabled flag
          sendRequest(null, null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
      );
    } catch (e) {
      console.warn('Geolocation Catch Error:', e);
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
}
));
