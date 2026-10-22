import { TrackingDisplayStatus, TrackingReason } from '@/constants/liveLocation';

export interface TrackingFeedbackState {
  isEnabled: boolean;
  isStarting: boolean;
  reason: TrackingReason;
  lastUploadedTimestamp: number;
}

/** A running GPS subscription alone is not proof that a position reached the server. */
export const getTrackingDisplayStatus = (
  state: TrackingFeedbackState,
  now: number,
): TrackingDisplayStatus => {
  if (state.isStarting) return TrackingDisplayStatus.CONNECTING;
  if (!state.isEnabled) {
    if (state.reason === TrackingReason.AUTH) return TrackingDisplayStatus.AUTH_REQUIRED;
    if (state.reason === TrackingReason.PERMISSION) return TrackingDisplayStatus.PERMISSION_REQUIRED;
    if (state.reason === TrackingReason.UNAVAILABLE) return TrackingDisplayStatus.UNAVAILABLE;

    return TrackingDisplayStatus.PAUSED;
  }
  if (state.reason === TrackingReason.OFFLINE) return TrackingDisplayStatus.OFFLINE;
  const age = now - state.lastUploadedTimestamp;
  if (state.reason !== TrackingReason.NONE || !Number.isFinite(age) ||
      state.lastUploadedTimestamp <= 0 || age < 0 || age > 30000) {
    return TrackingDisplayStatus.DELAYED;
  }

  return TrackingDisplayStatus.LIVE;
};
