import { PermissionsAndroid, Platform, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';

/**
 * Common utility to request location permissions on both Android and iOS.
 * @returns Promise<boolean> true if granted, false otherwise.
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'ZyncRide needs access to your location to show it on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Android Permission Error:', err);
      return false;
    }
  }
  return true;
};

/**
 * Checks if location services are enabled. If not, prompts the user to open settings.
 */
export const checkLocationServices = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
  } else {
    Linking.openURL('app-settings:');
  }
};

/**
 * Check if GPS/Location Services are active on the device.
 * @returns Promise<boolean> true if GPS is enabled, false if disabled/unavailable.
 */
export const checkGpsStatus = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      () => resolve(true),
      (error) => {
        // error.code 2 (POSITION_UNAVAILABLE) indicates location provider/GPS is turned off
        if (error.code === 2) {
          resolve(false);
        } else {
          resolve(true); // Treat timeouts or permission issues as enabled (handled separately)
        }
      },
      { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
    );
  });
};

/**
 * Checks GPS status. If disabled, shows a warning notification toast and redirects the user to settings.
 * @returns Promise<boolean> true if enabled, false otherwise.
 */
export const checkGpsAndPrompt = async (
  title = 'GPS/Location Off',
  message = 'Please enable GPS/location services for accurate navigation and tracking.'
): Promise<boolean> => {
  const isEnabled = await checkGpsStatus();
  if (!isEnabled) {
    showNotification(NotificationType.WARNING, title, message);
    setTimeout(() => {
      checkLocationServices();
    }, 1500);
    return false;
  }
  return true;
};

/**
 * Request photo library/gallery permissions on Android and iOS.
 * @returns Promise<boolean> true if granted, false otherwise.
 */
export const requestPhotoPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const apiLevel = parseInt(Platform.Version.toString(), 10);
      if (apiLevel >= 33) {
        const granted = await PermissionsAndroid.request(
          (PermissionsAndroid.PERMISSIONS as any).READ_MEDIA_IMAGES
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn('Android Photo Permission Error:', err);
      return false;
    }
  }
  return true;
};

/**
 * Request notification permissions on Android (API 33+) and iOS.
 * @returns Promise<boolean> true if granted, false otherwise.
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const apiLevel = parseInt(Platform.Version.toString(), 10);
    if (apiLevel >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          (PermissionsAndroid.PERMISSIONS as any).POST_NOTIFICATIONS
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Android Notification Permission Error:', err);
        return false;
      }
    }
  }
  return true;
};
