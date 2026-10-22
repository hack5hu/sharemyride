import { create } from 'zustand';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { TrackingReason } from '@/constants/liveLocation';
import { getTranslations } from '@/constants/localization';
import { LiveLocationService } from '@/serviceManager/LiveLocationService';
import { RideService } from '@/serviceManager/RideService';
import type { NativeTrackingState } from '@/specs/NativeLiveLocation';
import { isTrackingEligible } from '@/utils/liveRideEligibility';
import { parseLiveRidePayload } from './liveRideHelpers';
import { useSettingsStore } from './settings';
import { useAuthStore } from './useAuthStore';
import type { ActiveRideLiveInfo, LiveRidePayload } from './liveRideTypes';

export type { ActiveRideLiveInfo } from './liveRideTypes';
interface LiveRideState {
  activeRide: ActiveRideLiveInfo | null;
  isLoading: boolean;
  isBannerDismissed: boolean;
  isLiveLocationEnabled: boolean;
  isGpsDisabled: boolean;
  lastFetchedAt: number | null;
  trackingReason: TrackingReason;
  isStartingTracking: boolean;
  lastUploadedTimestamp: number;
  fetchLiveStatus: () => Promise<boolean>;
  setLiveLocationEnabled: (enabled: boolean) => Promise<void>;
  setIsGpsDisabled: (disabled: boolean) => void;
  dismissBanner: () => void;
  resetLiveRide: () => void;
  reconcileTracking: (state: NativeTrackingState) => void;
}
let revision = 0;
let pendingStatus: Promise<boolean> | null = null;

export const useLiveRideStore = create<LiveRideState>()((set, get) => ({
  activeRide: null, isLoading: false, isBannerDismissed: false,
  isLiveLocationEnabled: false, isGpsDisabled: false, lastFetchedAt: null,
  trackingReason: TrackingReason.NONE, isStartingTracking: false, lastUploadedTimestamp: 0,
  setIsGpsDisabled: disabled => set({ isGpsDisabled: disabled }),
  dismissBanner: () => set({ isBannerDismissed: true }),
  reconcileTracking: state => {
    const previous = get();
    const reason = Object.values(TrackingReason).find(value => value === state.reason) ?? TrackingReason.UNAVAILABLE;
    set({ lastUploadedTimestamp: state.lastUploadedTimestamp ?? 0, isLiveLocationEnabled: state.isTracking,
      isGpsDisabled: reason === TrackingReason.LOCATION_DISABLED, trackingReason: reason });
    if (previous.isLiveLocationEnabled && !state.isTracking && reason !== TrackingReason.USER &&
        reason !== TrackingReason.LOCATION_DISABLED) {
      const t = getTranslations().tracking;
      showNotification(NotificationType.WARNING, t.title, t.detail);
    }
  },
  resetLiveRide: () => {
    revision++;
    LiveLocationService.stopTracking(TrackingReason.AUTH);
    set({ activeRide: null, isLiveLocationEnabled: false, isStartingTracking: false, lastUploadedTimestamp: 0, lastFetchedAt: null,
      isLoading: false, isGpsDisabled: false, isBannerDismissed: false });
  },
  setLiveLocationEnabled: async enabled => {
    if (enabled && get().isStartingTracking) return;
    const attempt = ++revision;
    set({ isStartingTracking: enabled });
    try {
      if (!enabled) {
        const state = await LiveLocationService.stopTracking();
        if (attempt === revision) get().reconcileTracking(state);

        return;
      }
      await pendingStatus;
      if (attempt !== revision) return;
      const verified = await get().fetchLiveStatus();
      const ride = get().activeRide;
      if (attempt !== revision || !useAuthStore.getState().isAuthenticated) return;
      if (!verified || !isTrackingEligible(ride) || !ride?.rideId) {
        set({ trackingReason: TrackingReason.INELIGIBLE });
        const t = getTranslations().tracking;
        showNotification(NotificationType.WARNING, t.title, t.ineligible);

        return;
      }
      const state = await LiveLocationService.startTracking(ride.rideId, useSettingsStore.getState().language);
      if (attempt !== revision) return;
      get().reconcileTracking(state);
      if (!state.isTracking && state.reason !== TrackingReason.LOCATION_DISABLED) {
        const t = getTranslations().tracking;
        showNotification(NotificationType.WARNING, t.title, t.detail);
      }
    } finally {
      if (attempt === revision) set({ isStartingTracking: false });
    }
  },
  fetchLiveStatus: () => {
    if (pendingStatus) return pendingStatus;
    const requestRevision = revision;
    set({ isLoading: true });
    pendingStatus = (async () => {
      try {
        const payload: LiveRidePayload = await RideService.getLiveStatus({
          lat: null, lng: null, liveLocationEnabled: get().isLiveLocationEnabled,
        });
        if (requestRevision !== revision || !useAuthStore.getState().isAuthenticated) return false;
        const ride = parseLiveRidePayload(payload);
        const native = await LiveLocationService.getTrackingState();
        if (requestRevision !== revision) return false;
        if (native.isTracking && (!isTrackingEligible(ride) || native.rideId !== ride?.rideId)) {
          get().reconcileTracking(await LiveLocationService.stopTracking(TrackingReason.INELIGIBLE, native.sessionId));
        } else {
          get().reconcileTracking(native);
        }
        set({ activeRide: ride, isBannerDismissed: !ride, lastFetchedAt: Date.now() });

        return true;
      } catch {
        // Retain existing status; native validation has its own bounded lease.
        return false;
      } finally {
        set({ isLoading: false });
        pendingStatus = null;
      }
    })();

    return pendingStatus;
  },
}));
