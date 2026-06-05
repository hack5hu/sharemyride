import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  EmitterSubscription,
} from 'react-native';
import { Logger } from '@/utils/logger';

/**
 * JS wrapper around the native TruecallerVerifyModule (Android only) that drives
 * Truecaller's non-Truecaller-user verification (drop-call / IM-OTP) for users
 * who don't have the Truecaller app installed.
 *
 * Only the resulting Truecaller `accessToken` is used; the backend must validate
 * it server-side with Truecaller.
 */

export type TruecallerVerificationEvent =
  | { type: 'missed_call_initiated'; ttl?: string; requestNonce?: string }
  | { type: 'missed_call_received' }
  | { type: 'otp_initiated'; ttl?: string; requestNonce?: string }
  | { type: 'otp_received'; otp?: string }
  | { type: 'verification_complete'; accessToken?: string }
  | { type: 'verified_before'; accessToken?: string }
  | { type: 'failure'; code?: number; message?: string }
  | { type: 'unknown'; callbackType?: number };

interface TruecallerVerifyNativeModule {
  requestVerification: (countryCode: string, phoneNumber: string) => Promise<void>;
  verifyMissedCall: (firstName: string, lastName: string) => Promise<void>;
  verifyOtp: (firstName: string, lastName: string, otp: string) => Promise<void>;
}

const nativeModule: TruecallerVerifyNativeModule | undefined =
  Platform.OS === 'android' ? NativeModules.TruecallerVerifyModule : undefined;

const emitter = nativeModule ? new NativeEventEmitter(NativeModules.TruecallerVerifyModule) : null;

export const truecallerVerify = {
  /** Whether the native verification module is available (Android + linked). */
  isAvailable: (): boolean => !!nativeModule,

  /**
   * Request the dangerous permissions Truecaller's drop-call detection needs.
   * Returns true if the minimum (READ_PHONE_STATE) is granted. The drop-call
   * auto-read additionally needs READ_CALL_LOG/ANSWER_PHONE_CALLS; without them
   * the IM/SMS-OTP path still works.
   */
  requestPermissions: async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      const perms = [
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.ANSWER_PHONE_CALLS,
      ].filter(Boolean) as string[];
      const result = await PermissionsAndroid.requestMultiple(perms as any);
      return (
        result[PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE] ===
        PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      Logger.error('[TruecallerVerify] permission request failed:', error);
      return false;
    }
  },

  /** Subscribe to the verification lifecycle events. Returns an unsubscribe fn. */
  subscribe: (
    listener: (event: TruecallerVerificationEvent) => void
  ): (() => void) => {
    if (!emitter) return () => {};
    const sub: EmitterSubscription = emitter.addListener(
      'TruecallerVerification',
      listener as (e: any) => void
    );
    return () => sub.remove();
  },

  /** Start verification for a phone number (digits only, no country code). */
  requestVerification: async (
    phoneNumber: string,
    countryCode: string = 'IN'
  ): Promise<void> => {
    if (!nativeModule) {
      throw new Error('Truecaller verification is not available on this platform');
    }
    return nativeModule.requestVerification(countryCode, phoneNumber);
  },

  /** Finalize a drop-call verification (call after 'missed_call_received'). */
  verifyMissedCall: async (
    firstName: string = 'User',
    lastName: string = ''
  ): Promise<void> => {
    if (!nativeModule) throw new Error('Truecaller verification unavailable');
    return nativeModule.verifyMissedCall(firstName, lastName);
  },

  /** Finalize an OTP verification (call after the user enters / SDK reads OTP). */
  verifyOtp: async (
    otp: string,
    firstName: string = 'User',
    lastName: string = ''
  ): Promise<void> => {
    if (!nativeModule) throw new Error('Truecaller verification unavailable');
    return nativeModule.verifyOtp(firstName, lastName, otp);
  },
};
