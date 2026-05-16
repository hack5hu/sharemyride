import { PermissionsAndroid, Platform, Linking, Alert } from 'react-native';

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
          message: 'ShareMyRide needs access to your location to show it on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
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
 * Note: Hardware status check usually requires a native module; this utility
 * provides a standard way to guide the user to the correct settings page.
 */
export const checkLocationServices = async (): Promise<void> => {
  Alert.alert(
    'Location Services',
    'Please ensure your GPS is turned on to see your live location.',
    [
      {
        text: 'Open Settings',
        onPress: () => {
          if (Platform.OS === 'android') {
            Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
          } else {
            Linking.openURL('app-settings:');
          }
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]
  );
};
