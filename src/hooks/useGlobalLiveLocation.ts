import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuthStore } from '@/store';
import { useLiveRideStore } from '@/store/useLiveRideStore';
import { NotificationService } from '@/serviceManager/NotificationService';
import { getTranslations } from '@/constants/localization';
import { formatLiveLocationNotificationBody } from '@/store/liveRideHelpers';

export const useGlobalLiveLocation = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLiveLocationEnabled = useLiveRideStore(
    (state) => state.isLiveLocationEnabled,
  );
  const fetchLiveStatus = useLiveRideStore((state) => state.fetchLiveStatus);
  const activeRide = useLiveRideStore((state) => state.activeRide);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      NotificationService.cancelLiveLocationNotification();
      return;
    }

    // Initial fetch on mount or auth change
    fetchLiveStatus();

    // If live location tracking is enabled by the user, poll periodically across all screens
    if (isLiveLocationEnabled) {
      const t = getTranslations().notification;
      const bodyText = formatLiveLocationNotificationBody(
        activeRide?.etaMinutes,
        activeRide?.distanceKm,
        t.liveLocationActiveMessage,
        t.liveLocationTrackingBody,
      );
      NotificationService.displayLiveLocationNotification(
        t.liveLocationActiveTitle,
        bodyText,
      );

      intervalRef.current = setInterval(() => {
        if (AppState.currentState === 'active') {
          fetchLiveStatus();
        }
      }, 10000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      NotificationService.cancelLiveLocationNotification();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAuthenticated, isLiveLocationEnabled, fetchLiveStatus]);

  // Handle app state changes (e.g. user returns to foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && isAuthenticated) {
        fetchLiveStatus();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [isAuthenticated, fetchLiveStatus]);
};
