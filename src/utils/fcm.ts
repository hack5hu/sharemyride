import { 
  getMessaging, 
  requestPermission, 
  registerDeviceForRemoteMessages, 
  getToken 
} from '@react-native-firebase/messaging';
import { Logger } from '@/utils/logger';

/**
 * Request notification permissions and retrieve the Firebase Cloud Messaging token.
 *
 * @returns A promise that resolves to the FCM token, or null if it cannot be retrieved.
 */
export const getFcmToken = async (): Promise<string | null> => {
  try {
    const messaging = getMessaging();
    const authStatus = await requestPermission(messaging);
    
    // AUTHORIZED = 1, PROVISIONAL = 2
    const enabled = authStatus === 1 || authStatus === 2;

    if (enabled) {
      // On iOS, device must be registered for remote messages before retrieving the FCM token
      if (typeof registerDeviceForRemoteMessages === 'function') {
        await registerDeviceForRemoteMessages(messaging);
      }
      const token = await getToken(messaging);
      Logger.log('[FCM] Token retrieved successfully:', token);
      return token;
    } else {
      Logger.warn('[FCM] Notification permissions not granted');
    }
  } catch (error) {
    Logger.error('[FCM] Failed to retrieve FCM token:', error);
  }
  return null;
};
