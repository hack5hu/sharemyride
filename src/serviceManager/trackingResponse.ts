import { TrackingReason } from '@/constants/liveLocation';
import { LiveLocationService } from './LiveLocationService';

/** Stop collection immediately after the server accepts cancellation of this ride. */
export const handleTrackingResponse = async (url?: string): Promise<void> => {
  const cancelledRide = url?.match(/\/ride\/([^/]+)\/cancel(?:\?|$)/)?.[1];
  if (!cancelledRide) return;
  const state = await LiveLocationService.getTrackingState();
  if (state.rideId === cancelledRide) {
    await LiveLocationService.stopTracking(TrackingReason.INELIGIBLE, state.sessionId);
  }
};
