import { useCallback, useEffect, useRef } from 'react';
import {
  truecallerVerify,
  TruecallerVerificationEvent,
} from '@/serviceManager/truecallerVerify';
import { authService } from '@/serviceManager/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { getDeviceId } from '@/utils/deviceId';
import { getFcmToken } from '@/utils/fcm';
import { Logger } from '@/utils/logger';

interface VerificationHandlers {
  /** Drop-call placed / OTP sent — show a waiting UI. ttl is seconds (string). */
  onPending?: (info: { mode: 'call' | 'otp'; ttl?: string }) => void;
  /** Manual OTP entry needed (no auto-read). Navigate the user to OTP input. */
  onOtpRequired?: (info: { ttl?: string }) => void;
  /** Backend login succeeded. */
  onSuccess?: (info: { userProfileCompleted: boolean }) => void;
  /** Any failure — caller should fall back to SMS OTP. */
  onFailure?: (message: string) => void;
}

/**
 * Drives Truecaller's non-Truecaller-user verification (Android drop-call / IM-OTP)
 * and completes login with the backend. Shared by the Login screen (which starts
 * the flow and auto-completes drop-call) and the OTP screen (manual OTP entry).
 *
 * `enabled` lets a screen own the event stream while it's the active step, so the
 * Login and OTP screens don't both react to the same global events.
 */
export const useTruecallerVerification = (
  handlers: VerificationHandlers,
  enabled: boolean = true
) => {
  const { setAuth } = useAuthStore();
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;
  // Name captured at start; Truecaller requires a TrueProfile to finalize.
  const nameRef = useRef<{ firstName: string; lastName: string }>({
    firstName: 'User',
    lastName: '',
  });

  const completeLogin = useCallback(
    async (accessToken?: string) => {
      if (!accessToken) {
        handlersRef.current.onFailure?.('Missing Truecaller access token');
        return;
      }
      try {
        const [deviceId, fcmToken] = await Promise.all([
          getDeviceId().catch(() => null),
          getFcmToken().catch(() => null),
        ]);
        const res = await authService.truecallerVerifyLogin(
          accessToken,
          deviceId,
          fcmToken
        );
        if (res.data.status === 'success' || res.status === 200) {
          const { token, userId, userProfileCompleted } = res.data;
          await setAuth({ id: userId }, token, userProfileCompleted);
          if (userProfileCompleted) {
            useAuthStore.getState().fetchProfile();
            require('@/store/useVehicleStore').useVehicleStore.getState().syncVehicles();
            require('@/store/useTravelPrefStore').useTravelPrefStore
              .getState()
              .syncPreferences();
          }
          handlersRef.current.onSuccess?.({ userProfileCompleted });
        } else {
          handlersRef.current.onFailure?.(res.data.message || 'Verification failed');
        }
      } catch (error: any) {
        Logger.error('[TruecallerVerify] backend login failed', error);
        handlersRef.current.onFailure?.(error?.message || 'Verification failed');
      }
    },
    [setAuth]
  );

  useEffect(() => {
    if (!enabled || !truecallerVerify.isAvailable()) return;

    const unsubscribe = truecallerVerify.subscribe(
      (event: TruecallerVerificationEvent) => {
        switch (event.type) {
          case 'missed_call_initiated':
            handlersRef.current.onPending?.({ mode: 'call', ttl: event.ttl });
            break;
          case 'missed_call_received':
            // SDK auto-detected the drop call — finalize.
            truecallerVerify
              .verifyMissedCall(nameRef.current.firstName, nameRef.current.lastName)
              .catch((e) =>
                handlersRef.current.onFailure?.(e?.message || 'verifyMissedCall failed')
              );
            break;
          case 'otp_initiated':
            handlersRef.current.onPending?.({ mode: 'otp', ttl: event.ttl });
            handlersRef.current.onOtpRequired?.({ ttl: event.ttl });
            break;
          case 'otp_received':
            // OTP auto-read via Truecaller IM — finalize automatically.
            if (event.otp) {
              truecallerVerify
                .verifyOtp(event.otp, nameRef.current.firstName, nameRef.current.lastName)
                .catch((e) =>
                  handlersRef.current.onFailure?.(e?.message || 'verifyOtp failed')
                );
            }
            break;
          case 'verification_complete':
          case 'verified_before':
            completeLogin(event.accessToken);
            break;
          case 'failure':
            handlersRef.current.onFailure?.(event.message || 'Verification failed');
            break;
        }
      }
    );
    return unsubscribe;
  }, [enabled, completeLogin]);

  /** Begin verification for a phone number (10-digit, no country code). */
  const startVerification = useCallback(
    async (
      phoneNumber: string,
      name?: { firstName?: string; lastName?: string }
    ): Promise<boolean> => {
      if (!truecallerVerify.isAvailable()) return false;
      if (name) {
        nameRef.current = {
          firstName: name.firstName || 'User',
          lastName: name.lastName || '',
        };
      }
      try {
        await truecallerVerify.requestPermissions();
        await truecallerVerify.requestVerification(phoneNumber, 'IN');
        return true;
      } catch (error: any) {
        Logger.error('[TruecallerVerify] requestVerification failed', error);
        handlersRef.current.onFailure?.(error?.message || 'Could not start verification');
        return false;
      }
    },
    []
  );

  /** Finalize with a manually-entered OTP. */
  const submitOtp = useCallback(async (otp: string): Promise<void> => {
    await truecallerVerify.verifyOtp(
      otp,
      nameRef.current.firstName,
      nameRef.current.lastName
    );
  }, []);

  return { startVerification, submitOtp };
};
