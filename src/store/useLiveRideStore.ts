import { create } from 'zustand';
import Geolocation from '@react-native-community/geolocation';
import { RideService } from '@/serviceManager/RideService';
import { ActiveRideRole } from '@/navigation/types.d';

export interface ActiveRideLiveInfo {
  hasActiveRide: boolean;
  rideId?: string;
  role?: ActiveRideRole | 'DRIVER' | 'PASSENGER';
  status?: string;
  message?: string;
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
  setLiveLocationEnabled: (enabled: boolean) => void;
  dismissBanner: () => void;
  resetLiveRide: () => void;
}

const DEFAULT_COORDS = { lat: 28.6139, lng: 77.209 };

export const useLiveRideStore = create<LiveRideState>(set => ({
  activeRide: null,
  isLoading: false,
  isBannerDismissed: false,
  isLiveLocationEnabled: false,
  lastFetchedAt: null,

  setLiveLocationEnabled: (enabled: boolean) => {
    set({ isLiveLocationEnabled: enabled });
    useLiveRideStore.getState().fetchLiveStatus();
  },

  dismissBanner: () => set({ isBannerDismissed: true }),

  resetLiveRide: () =>
    set({
      activeRide: null,
      isBannerDismissed: false,
      lastFetchedAt: null,
    }),

  fetchLiveStatus: async () => {
    set({ isLoading: true });

    const sendRequest = async (lat: number | null, lng: number | null) => {
      const isLiveLocationEnabled = useLiveRideStore.getState().isLiveLocationEnabled;

      try {
        const data = await RideService.getLiveStatus({
          lat: isLiveLocationEnabled ? lat : null,
          lng: isLiveLocationEnabled ? lng : null,
          liveLocationEnabled: isLiveLocationEnabled,
        });

        if (data && data.rideFound && data.ride) {
          const role =
            String(data.role || data.ride.role || '').toUpperCase() === 'PASSENGER'
              ? ActiveRideRole.PASSENGER
              : ActiveRideRole.DRIVER;

          const isStarted =
            data.ride.rideStatus === 'STARTED' ||
            data.ride.rideStatus === 'ACTIVE';

          const firstPassenger = data.ride.passengers?.[0];
          const passengerDistance = firstPassenger?.distanceFromDriverKm;
          const passengerEta = firstPassenger?.etaMinutes;

          const distanceKm = data.distanceKm ?? passengerDistance ?? 3.8;
          const etaMinutes = data.etaMinutes ?? passengerEta ?? 5;

          set({
            activeRide: {
              hasActiveRide: true,
              rideId: data.ride.rideId ? String(data.ride.rideId) : undefined,
              role,
              status: data.ride.rideStatus || 'CREATED',
              message: isStarted
                ? 'Active Ride in Progress'
                : 'Your ride is about to start!',
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
          set({ activeRide: null, isLoading: false, lastFetchedAt: Date.now() });
        }
      } catch (error) {
        // Non-blocking: fail silently if network or auth error
        set({ isLoading: false });
      }
    };

    const isLiveLocationEnabled = useLiveRideStore.getState().isLiveLocationEnabled;

    if (!isLiveLocationEnabled) {
      sendRequest(null, null);
      return;
    }

    try {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          sendRequest(latitude, longitude);
        },
        () => {
          // Fallback to default coordinates if GPS unavailable
          sendRequest(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 },
      );
    } catch {
      sendRequest(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
    }
  },
}));
