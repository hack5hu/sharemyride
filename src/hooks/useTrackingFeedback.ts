import { useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';
import { AppVisibility } from '@/constants/liveLocation';
import { useLiveRideStore } from '@/store/useLiveRideStore';
import { getTrackingDisplayStatus } from '@/utils/trackingFeedback';

export const useTrackingFeedback = () => {
  const isEnabled = useLiveRideStore(state => state.isLiveLocationEnabled);
  const isStarting = useLiveRideStore(state => state.isStartingTracking);
  const reason = useLiveRideStore(state => state.trackingReason);
  const lastUploadedTimestamp = useLiveRideStore(state => state.lastUploadedTimestamp);
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = setInterval(() => {
      if (AppState.currentState === AppVisibility.ACTIVE) setNow(Date.now());
    }, 5000);
    const subscription = AppState.addEventListener('change', state => {
      if (state === AppVisibility.ACTIVE) setNow(Date.now());
    });

    return () => { clearInterval(timer); subscription.remove(); };
  }, []);

  return useMemo(() => {
    const currentTime = Math.max(now, Date.now());

    return {
      isStarting,
      status: getTrackingDisplayStatus({ isEnabled, isStarting, reason, lastUploadedTimestamp }, currentTime),
      secondsSinceUpload: lastUploadedTimestamp > 0
        ? Math.max(0, Math.floor((currentTime - lastUploadedTimestamp) / 1000)) : undefined,
    };
  }, [isEnabled, isStarting, reason, lastUploadedTimestamp, now]);
};
