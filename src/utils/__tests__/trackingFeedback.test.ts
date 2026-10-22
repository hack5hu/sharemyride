import { TrackingDisplayStatus, TrackingReason } from '@/constants/liveLocation';
import { getTrackingDisplayStatus } from '@/utils/trackingFeedback';

const now = 100000;
const active = { isEnabled: true, isStarting: false, reason: TrackingReason.NONE, lastUploadedTimestamp: now - 5000 };

describe('truthful tracking feedback', () => {
  it('shows connecting while startup is pending', () => {
    expect(getTrackingDisplayStatus({ ...active, isStarting: true }, now)).toBe(TrackingDisplayStatus.CONNECTING);
  });
  it('requires a server-acknowledged recent fix before displaying live', () => {
    expect(getTrackingDisplayStatus(active, now)).toBe(TrackingDisplayStatus.LIVE);
    expect(getTrackingDisplayStatus({ ...active, lastUploadedTimestamp: 0 }, now)).toBe(TrackingDisplayStatus.DELAYED);
  });
  it('expires the live label without needing another native event', () => {
    expect(getTrackingDisplayStatus(active, now + 30000)).toBe(TrackingDisplayStatus.DELAYED);
  });
  it('does not hide network failure behind a recent point', () => {
    expect(getTrackingDisplayStatus({ ...active, reason: TrackingReason.OFFLINE }, now)).toBe(TrackingDisplayStatus.OFFLINE);
  });
  it('never presents a stopped or unauthorized tracker as live', () => {
    expect(getTrackingDisplayStatus({ ...active, isEnabled: false }, now)).toBe(TrackingDisplayStatus.PAUSED);
    expect(getTrackingDisplayStatus({ ...active, isEnabled: false,
      reason: TrackingReason.LOCATION_DISABLED }, now)).toBe(TrackingDisplayStatus.PAUSED);
    expect(getTrackingDisplayStatus({ ...active, isEnabled: false, reason: TrackingReason.AUTH }, now)).toBe(TrackingDisplayStatus.AUTH_REQUIRED);
  });
  it('handles clock rollback and invalid timestamps conservatively', () => {
    for (const lastUploadedTimestamp of [now + 1000, NaN, Infinity]) {
      expect(getTrackingDisplayStatus({ ...active, lastUploadedTimestamp }, now)).toBe(TrackingDisplayStatus.DELAYED);
    }
  });
});
