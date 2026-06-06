import { authService } from '@/serviceManager/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { getDeviceId } from '@/utils/deviceId';
import { getFcmToken } from '@/utils/fcm';
import { TRUECALLER_ANDROID_CUSTOMIZATIONS } from '@ajitpatel28/react-native-truecaller';

// User explicitly chose "another method" or tapped cancel/dismiss
export const USER_DISMISS_CODES = /cancel|dismiss|another[_\s]?method|use_another_method|footer|denied/i;

// Transient SDK noise — silently ignore without changing state
export const TRANSIENT_SDK_CODES = /activity is null|^null$|4|5/i;

export const executeTruecallerAuth = async (
  authorizationCode: string,
  codeVerifier?: string
) => {
  const [deviceId, fcmToken] = await Promise.all([
    getDeviceId().catch(() => null),
    getFcmToken().catch(() => null),
  ]);

  return authService.truecallerLogin(
    authorizationCode,
    deviceId,
    fcmToken,
    codeVerifier
  );
};

export const syncUserProfileAndData = async (
  userId: string,
  token: string,
  completed: boolean,
  setAuth: (user: any, token: string, completed?: boolean) => void
) => {
  setAuth({ id: userId, phone: '' }, token, completed);
  if (completed) {
    useAuthStore.getState().fetchProfile();
    require('@/store/useVehicleStore').useVehicleStore.getState().syncVehicles();
    require('@/store/useTravelPrefStore').useTravelPrefStore.getState().syncPreferences();
  }
};

export const getTruecallerOptions = (androidSuccessHandler: (data: any) => void) => ({
  androidClientId: 'xo3glydxwgapbf0zumg28mys6qud3tkzfnfzbxcqiay',
  iosAppKey: 'xo3glydxwgapbf0zumg28mys6qud3tkzfnfzbxcqiay',
  iosAppLink: 'https://sharemyride.com/truecaller',
  androidButtonColor: '#2C765CFF',
  androidButtonTextColor: '#FFFFFF',
  androidButtonShape: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_SHAPES.ROUNDED,
  androidButtonText: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_TEXTS.ACCEPT,
  androidFooterButtonText:
    TRUECALLER_ANDROID_CUSTOMIZATIONS.FOOTER_TEXTS.ANOTHER_METHOD,
  androidConsentHeading:
    TRUECALLER_ANDROID_CUSTOMIZATIONS.CONSENT_HEADINGS.LOG_IN_TO,
  androidSdkOptions: TRUECALLER_ANDROID_CUSTOMIZATIONS.SDK_OPTIONS.VERIFY_ONLY_TC_USERS,
  androidSuccessHandler,
});
