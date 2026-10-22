import { TurboModuleRegistry } from 'react-native';
import type { CodegenTypes, TurboModule } from 'react-native';

export type TrackingOptions = {
  rideId: string;
  sessionId: string;
  authToken: string;
  uploadUrl: string;
  statusUrl: string;
  language: string;
};

export type NativeTrackingState = {
  isTracking: boolean;
  rideId: string;
  sessionId: string;
  reason: string;
  lastTimestamp: number;
  lastUploadedTimestamp?: number;
};

export interface Spec extends TurboModule {
  startTracking(options: TrackingOptions): Promise<NativeTrackingState>;
  stopTracking(reason: string, sessionId: string): Promise<NativeTrackingState>;
  getTrackingState(): Promise<NativeTrackingState>;
  updateAuthToken(token: string): void;
  readonly onTrackingStateChanged: CodegenTypes.EventEmitter<NativeTrackingState>;
}

export default TurboModuleRegistry.get<Spec>('NativeLiveLocation');
