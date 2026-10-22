import { AppState, PermissionsAndroid, Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { API_ENDPOINTS, BASE_URL } from '@/constants/apiEndpoints';
import { AppVisibility, LocationPlatform, TrackingReason } from '@/constants/liveLocation';
import NativeLiveLocation from '@/specs/NativeLiveLocation';
import type { NativeTrackingState } from '@/specs/NativeLiveLocation';

let generation = 0;
const stopped = (reason = TrackingReason.UNAVAILABLE): NativeTrackingState => ({
  isTracking: false, rideId: '', sessionId: '', reason, lastTimestamp: 0,
});

export class LiveLocationService {
  static isSupported(): boolean {
    return (Platform.OS === LocationPlatform.ANDROID || Platform.OS === LocationPlatform.IOS) && NativeLiveLocation !== null &&
      typeof NativeLiveLocation.onTrackingStateChanged === 'function' &&
      typeof NativeLiveLocation.updateAuthToken === 'function';
  }

  static async startTracking(rideId: string, language: string): Promise<NativeTrackingState> {
    const attempt = ++generation;
    if (!this.isSupported() || AppState.currentState !== AppVisibility.ACTIVE) {
      return stopped();
    }
    try {
      if (Platform.OS === LocationPlatform.ANDROID) {
        const permission = PermissionsAndroid.PERMISSIONS;
        const granted = await PermissionsAndroid.requestMultiple([
          permission.ACCESS_COARSE_LOCATION, permission.ACCESS_FINE_LOCATION,
        ]);
        if (attempt !== generation) return stopped(TrackingReason.USER);
        if (granted[permission.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED) {
          return stopped(TrackingReason.PERMISSION);
        }
      }
      const credentials = await Keychain.getGenericPassword({ service: 'auth_token' });
      if (attempt !== generation) return stopped(TrackingReason.USER);
      if (!credentials || !credentials.password) return stopped(TrackingReason.AUTH);
      if (AppState.currentState !== AppVisibility.ACTIVE) return stopped();

      return await NativeLiveLocation!.startTracking({
        rideId, language,
        sessionId: `${Date.now()}-${attempt}`,
        authToken: credentials.password,
        uploadUrl: `${BASE_URL}${API_ENDPOINTS.RIDE.UPDATE_LOCATION(rideId)}`,
        statusUrl: `${BASE_URL}${API_ENDPOINTS.RIDE.LIVE_STATUS}`,
      });
    } catch {
      return stopped();
    }
  }

  static async stopTracking(reason = TrackingReason.USER, sessionId = ''): Promise<NativeTrackingState> {
    if (!sessionId) generation++;
    if (!this.isSupported()) return stopped(reason);

    return NativeLiveLocation!.stopTracking(reason, sessionId);
  }

  static async getTrackingState(): Promise<NativeTrackingState> {
    if (!this.isSupported()) return stopped();

    return NativeLiveLocation!.getTrackingState();
  }

  static updateAuthToken(token: string): void {
    if (this.isSupported()) NativeLiveLocation!.updateAuthToken(token);
  }

  static onTrackingStateChanged(listener: (state: NativeTrackingState) => void): () => void {
    const subscription = this.isSupported()
      ? NativeLiveLocation!.onTrackingStateChanged(listener) : null;

    return () => subscription?.remove();
  }
}
