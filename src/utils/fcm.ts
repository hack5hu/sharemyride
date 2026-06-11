import messaging from '@react-native-firebase/messaging';
import { Logger } from '@/utils/logger';

/**
 * Request notification permissions and retrieve the Firebase Cloud Messaging token.
 *
 * @returns A promise that resolves to the FCM token, or null if it cannot be retrieved.
 */
export const getFcmToken = async (): Promise<string | null> => {
  try {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // On iOS, device must be registered for remote messages before retrieving the FCM token
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      const token = await messaging().getToken();
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
