import { AppState, PermissionsAndroid, Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { LocationPlatform, TrackingReason } from '@/constants/liveLocation';
import { LiveLocationService } from '@/serviceManager/LiveLocationService';
import NativeLiveLocation from '@/specs/NativeLiveLocation';

jest.mock('@/specs/NativeLiveLocation', () => ({
  __esModule: true,
  default: {
    startTracking: jest.fn(), stopTracking: jest.fn(),
    getTrackingState: jest.fn(), updateAuthToken: jest.fn(),
    onTrackingStateChanged: jest.fn(() => ({ remove: jest.fn() })),
  },
}));
jest.mock('react-native-keychain', () => ({ getGenericPassword: jest.fn() }));
const fine = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
type Grants = Awaited<ReturnType<typeof PermissionsAndroid.requestMultiple>>;
const grants = Object.fromEntries(Object.values(PermissionsAndroid.PERMISSIONS).map(key => [key, PermissionsAndroid.RESULTS.GRANTED])) as Grants;
const stopped = { isTracking: false, rideId: '', sessionId: '', reason: TrackingReason.USER, lastTimestamp: 0 };
const native = jest.mocked(NativeLiveLocation!);

describe('LiveLocationService lifecycle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'android';
    AppState.currentState = 'active';
    jest.spyOn(PermissionsAndroid, 'requestMultiple').mockResolvedValue(grants);
    jest.mocked(Keychain.getGenericPassword).mockResolvedValue({ password: 'token', username: 'user', service: 'auth_token', storage: Keychain.STORAGE_TYPE?.AES_GCM });
    native.stopTracking.mockResolvedValue(stopped);
    native.startTracking.mockResolvedValue({ ...stopped, isTracking: true, rideId: '123' });
  });

  it('never starts without precise permission', async () => {
    jest.mocked(PermissionsAndroid.requestMultiple).mockResolvedValue({ ...grants, [fine]: PermissionsAndroid.RESULTS.DENIED });
    expect((await LiveLocationService.startTracking('123', 'en')).reason).toBe(TrackingReason.PERMISSION);
    expect(native.startTracking).not.toHaveBeenCalled();
  });

  it('never starts while the activity is backgrounded', async () => {
    AppState.currentState = 'background';
    expect((await LiveLocationService.startTracking('123', 'en')).isTracking).toBe(false);
    expect(PermissionsAndroid.requestMultiple).not.toHaveBeenCalled();
  });

  it('cancels a pending permission request when sharing is stopped', async () => {
    let grant: ((value: typeof grants) => void) | undefined;
    jest.mocked(PermissionsAndroid.requestMultiple).mockImplementation(() => new Promise(resolve => { grant = resolve; }));
    const start = LiveLocationService.startTracking('123', 'en');
    await LiveLocationService.stopTracking();
    grant?.(grants);
    expect((await start).isTracking).toBe(false);
    expect(native.startTracking).not.toHaveBeenCalled();
  });

  it('does not start with missing credentials', async () => {
    jest.mocked(Keychain.getGenericPassword).mockResolvedValue(false);
    expect((await LiveLocationService.startTracking('123', 'en')).reason).toBe(TrackingReason.AUTH);
    expect(native.startTracking).not.toHaveBeenCalled();
  });

  it('passes central endpoint configuration to native', async () => {
    await LiveLocationService.startTracking('123', 'hi');
    expect(native.startTracking).toHaveBeenCalledWith(expect.objectContaining({
      rideId: '123', authToken: 'token', language: 'hi',
      uploadUrl: expect.stringMatching(/\/ride\/123\/location$/),
    }));
  });

  it('returns failure when native start rejects', async () => {
    native.startTracking.mockRejectedValueOnce(new Error('service unavailable'));
    expect((await LiveLocationService.startTracking('123', 'en')).isTracking).toBe(false);
  });

  it('synchronizes refreshed tokens without another start', () => {
    LiveLocationService.updateAuthToken('new-token');
    expect(native.updateAuthToken).toHaveBeenCalledWith('new-token');
    expect(native.startTracking).not.toHaveBeenCalled();
  });

  it('uses the native iOS collector without Android permissions', async () => {
    Platform.OS = LocationPlatform.IOS;
    expect(LiveLocationService.isSupported()).toBe(true);
    await LiveLocationService.startTracking('123', 'en');
    expect(PermissionsAndroid.requestMultiple).not.toHaveBeenCalled();
    expect(native.startTracking).toHaveBeenCalledWith(expect.objectContaining({ rideId: '123' }));
    LiveLocationService.updateAuthToken('rotated-ios-token');
    expect(native.updateAuthToken).toHaveBeenCalledWith('rotated-ios-token');
    await LiveLocationService.stopTracking(TrackingReason.USER, 'ios-session');
    expect(native.stopTracking).toHaveBeenCalledWith(TrackingReason.USER, 'ios-session');
  });

  it('cancels iOS startup if stopped while credentials are loading', async () => {
    Platform.OS = LocationPlatform.IOS;
    let finish: ((value: false) => void) | undefined;
    jest.mocked(Keychain.getGenericPassword).mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
    const start = LiveLocationService.startTracking('123', 'en');
    await LiveLocationService.stopTracking();
    finish?.(false);
    expect((await start).reason).toBe(TrackingReason.USER);
    expect(native.startTracking).not.toHaveBeenCalled();
  });
});
