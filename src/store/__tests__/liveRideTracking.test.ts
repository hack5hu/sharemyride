import { Platform } from 'react-native';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { TrackingReason } from '@/constants/liveLocation';
import { LiveLocationService } from '@/serviceManager/LiveLocationService';
import { RideService } from '@/serviceManager/RideService';
import { useLiveRideStore } from '@/store/useLiveRideStore';

jest.mock('@/components/organisms/GlobalNotification/GlobalNotification', () => ({ showNotification: jest.fn() }));
jest.mock('@/constants/localization', () => ({ getTranslations: () => ({ tracking: { title: '', detail: '', ineligible: '' } }) }));
jest.mock('@/store/settings', () => ({ useSettingsStore: { getState: () => ({ language: 'en' }) } }));
jest.mock('@/store/useAuthStore', () => ({ useAuthStore: { getState: jest.fn(() => ({ isAuthenticated: true })) } }));
jest.mock('@/serviceManager/RideService', () => ({ RideService: { getLiveStatus: jest.fn() } }));
jest.mock('@/serviceManager/LiveLocationService', () => ({ LiveLocationService: {
  startTracking: jest.fn(), stopTracking: jest.fn(), getTrackingState: jest.fn(),
} }));
const native = jest.mocked(LiveLocationService);
const stopped = { isTracking: false, rideId: '', sessionId: '', reason: TrackingReason.USER, lastTimestamp: 0 };
const started = { ...stopped, isTracking: true, rideId: '123', sessionId: 'session' };
const payload = { rideFound: true, role: 'DRIVER', ride: { rideId: 123, rideStatus: 'STARTED' } };

describe('ride tracking orchestration', () => {
  beforeEach(() => {
    Platform.OS = 'android';
    native.stopTracking.mockResolvedValue(stopped);
    useLiveRideStore.getState().resetLiveRide();
    jest.clearAllMocks();
    native.getTrackingState.mockResolvedValue(stopped);
    native.startTracking.mockResolvedValue(started);
    jest.mocked(RideService.getLiveStatus).mockResolvedValue(payload);
  });

  it('keeps iOS status polling free of coordinates while native owns uploads', async () => {
    Platform.OS = 'ios';
    native.getTrackingState.mockResolvedValue(started);
    await useLiveRideStore.getState().fetchLiveStatus();
    expect(RideService.getLiveStatus).toHaveBeenCalledWith({
      lat: null, lng: null, liveLocationEnabled: false,
    });
    expect(useLiveRideStore.getState().isLiveLocationEnabled).toBe(true);
  });

  it('does not mark sharing enabled until native startup succeeds', async () => {
    native.startTracking.mockResolvedValue({ ...stopped, reason: TrackingReason.PERMISSION });
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(useLiveRideStore.getState().isLiveLocationEnabled).toBe(false);
  });

  it('shows the fixed GPS banner without a duplicate generic warning', async () => {
    native.startTracking.mockResolvedValue({ ...stopped, reason: TrackingReason.LOCATION_DISABLED });
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(useLiveRideStore.getState().isGpsDisabled).toBe(true);
    expect(showNotification).not.toHaveBeenCalled();
  });

  it('clears the GPS banner when native location services become available', () => {
    useLiveRideStore.getState().reconcileTracking({ ...stopped, reason: TrackingReason.LOCATION_DISABLED });
    useLiveRideStore.getState().reconcileTracking(stopped);
    expect(useLiveRideStore.getState().isGpsDisabled).toBe(false);
  });

  it('allows a scheduled driver ride to start tracking', async () => {
    jest.mocked(RideService.getLiveStatus).mockResolvedValue({ ...payload, ride: { rideId: 123, rideStatus: 'SCHEDULED' } });
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(native.startTracking).toHaveBeenCalled();
  });

  it('allows a passenger to start tracking', async () => {
    jest.mocked(RideService.getLiveStatus).mockResolvedValue({ ...payload, role: 'PASSENGER' });
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(native.startTracking).toHaveBeenCalledWith('123', 'en');
  });

  it('rejects a completed ride', async () => {
    jest.mocked(RideService.getLiveStatus).mockResolvedValue({ ...payload, ride: { rideId: 123, rideStatus: 'COMPLETED' } });
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(native.startTracking).not.toHaveBeenCalled();
  });

  it('rejects a ride when the server does not confirm a participant role', async () => {
    jest.mocked(RideService.getLiveStatus).mockResolvedValue({ rideFound: true,
      ride: { rideId: 123, rideStatus: 'SCHEDULED' } });
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(native.startTracking).not.toHaveBeenCalled();
  });

  it('does not start from a stale cached ride after a failed status request', async () => {
    await useLiveRideStore.getState().fetchLiveStatus();
    jest.mocked(RideService.getLiveStatus).mockRejectedValueOnce(new Error('offline'));
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(native.startTracking).not.toHaveBeenCalled();
  });

  it('stops a completed ride even when the response still contains its ID', async () => {
    native.getTrackingState.mockResolvedValue(started);
    jest.mocked(RideService.getLiveStatus).mockResolvedValue({ ...payload, ride: { rideId: 123, rideStatus: 'COMPLETED' } });
    await useLiveRideStore.getState().fetchLiveStatus();
    expect(native.stopTracking).toHaveBeenCalledWith(TrackingReason.INELIGIBLE, 'session');
  });

  it('ignores a status response received after reset', async () => {
    let resolve: ((value: typeof payload) => void) | undefined;
    jest.mocked(RideService.getLiveStatus).mockImplementationOnce(() => new Promise(done => { resolve = done; }));
    const fetch = useLiveRideStore.getState().fetchLiveStatus();
    useLiveRideStore.getState().resetLiveRide();
    resolve?.(payload);
    await fetch;
    expect(useLiveRideStore.getState().activeRide).toBeNull();
  });

  it('ignores late startup completion after reset', async () => {
    let resolve: ((value: typeof started) => void) | undefined;
    native.startTracking.mockImplementationOnce(() => new Promise(done => { resolve = done; }));
    const start = useLiveRideStore.getState().setLiveLocationEnabled(true);
    for (let i = 0; i < 10 && !resolve; i++) await Promise.resolve();
    expect(resolve).toBeDefined();
    useLiveRideStore.getState().resetLiveRide();
    resolve?.(started);
    await start;
    expect(useLiveRideStore.getState().isLiveLocationEnabled).toBe(false);
  });

  it('keeps one status request in flight', async () => {
    await Promise.all([useLiveRideStore.getState().fetchLiveStatus(), useLiveRideStore.getState().fetchLiveStatus()]);
    expect(RideService.getLiveStatus).toHaveBeenCalledTimes(1);
  });
  it('keeps a pending start cancellable and does not start twice', async () => {
    let finish: ((value: typeof started) => void) | undefined;
    native.startTracking.mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
    const start = useLiveRideStore.getState().setLiveLocationEnabled(true);
    expect(useLiveRideStore.getState().isStartingTracking).toBe(true);
    await useLiveRideStore.getState().setLiveLocationEnabled(true);
    for (let i = 0; i < 10 && !finish; i++) await Promise.resolve();
    expect(native.startTracking).toHaveBeenCalledTimes(1);
    await useLiveRideStore.getState().setLiveLocationEnabled(false);
    expect(useLiveRideStore.getState().isStartingTracking).toBe(false);
    finish?.(started);
    await start;
    expect(useLiveRideStore.getState().isLiveLocationEnabled).toBe(false);
  });

  it('stores only the acknowledged upload timestamp for live feedback', () => {
    useLiveRideStore.getState().reconcileTracking({ ...started, lastTimestamp: 9000, lastUploadedTimestamp: 1000 });
    expect(useLiveRideStore.getState().lastUploadedTimestamp).toBe(1000);
  });
});
