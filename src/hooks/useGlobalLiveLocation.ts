import { useEffect } from 'react';
import { AppState } from 'react-native';
import { AppVisibility, TrackingReason } from '@/constants/liveLocation';
import { LiveLocationService } from '@/serviceManager/LiveLocationService';
import { useAuthStore } from '@/store/useAuthStore';
import { useLiveRideStore } from '@/store/useLiveRideStore';

export const useGlobalLiveLocation = () => {
  useEffect(() => {
    const store = useLiveRideStore;
    const reconcile = async () => {
      if (!useAuthStore.getState().isAuthenticated) {
        store.getState().resetLiveRide();

        return;
      }
      const state = await LiveLocationService.getTrackingState();
      if (!useAuthStore.getState().isAuthenticated) return;
      store.getState().reconcileTracking(state);
      await store.getState().fetchLiveStatus();
    };
    const unsubscribeNative = LiveLocationService.onTrackingStateChanged(state => {
      if (useAuthStore.getState().isAuthenticated) store.getState().reconcileTracking(state);
    });
    const unsubscribeAuth = useAuthStore.subscribe((state, previous) => {
      const userId = state.user?.userId ?? state.user?.id;
      const previousId = previous.user?.userId ?? previous.user?.id;
      if (!state.isAuthenticated || (previousId && userId !== previousId)) {
        store.getState().resetLiveRide();
      } else if (state.token && state.token !== previous.token) {
        LiveLocationService.updateAuthToken(state.token);
      }
    });
    const subscription = AppState.addEventListener('change', state => {
      if (state === AppVisibility.ACTIVE) reconcile();
    });
    const timer = setInterval(() => {
      if (AppState.currentState === AppVisibility.ACTIVE && useAuthStore.getState().isAuthenticated) {
        store.getState().fetchLiveStatus();
      }
    }, 30000);
    reconcile();

    return () => {
      clearInterval(timer);
      subscription.remove();
      unsubscribeNative();
      unsubscribeAuth();
      if (!useAuthStore.getState().isAuthenticated) LiveLocationService.stopTracking(TrackingReason.AUTH);
    };
  }, []);
};
