import { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';
import { Logger } from '@/utils/logger';

export const useInAppUpdate = () => {
  useEffect(() => {
    // In-App Updates only work on production builds installed from the Store.
    // Skip in development/emulator builds to prevent store service binding errors.
    if (__DEV__) return;

    const inAppUpdates = new SpInAppUpdates(false);

    const checkUpdates = async () => {
      try {
        const curVersion = DeviceInfo.getVersion();
        const result = await inAppUpdates.checkNeedsUpdate({
          curVersion,
          country: 'in',
        });

        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === 'android') {
            // Immediate update enforces a full screen prompt by Google Play
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          } else if (Platform.OS === 'ios') {
            // iOS prompts with native alert and redirects to the App Store page
            updateOptions = {
              title: 'Update Available',
              message:
                'A new version of ZyncRide is available on the App Store. Please update to continue enjoying the latest features.',
              buttonUpgradeText: 'Update Now',
              buttonCancelText: 'Later',
              country: 'in',
            };
          }
          await inAppUpdates.startUpdate(updateOptions);
        }
      } catch (error: unknown) {
        const errorStr = String((error as Error)?.message || error || '');
        // Ignore expected Store service binding failures on sideloaded/debug builds
        if (!errorStr.includes('Failed to bind') && !errorStr.includes('zzy')) {
          Logger.warn('[InAppUpdate] Error checking/starting update:', error);
        }
      }
    };

    checkUpdates();
  }, []);
};
