import { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';
import { Logger } from '@/utils/logger';

export const useInAppUpdate = () => {
  useEffect(() => {
    // In-App Updates via Google Play only work on production builds installed directly from Play Store.
    // Skip in development/emulator builds to prevent Play Store service binding errors.
    if (__DEV__) return;

    const inAppUpdates = new SpInAppUpdates(false);

    const checkUpdates = async () => {
      try {
        const curVersion = DeviceInfo.getVersion();
        const result = await inAppUpdates.checkNeedsUpdate({ curVersion });

        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === 'android') {
            // Immediate update enforces a full screen block prompting the user to update
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          }
          await inAppUpdates.startUpdate(updateOptions);
        }
      } catch (error: any) {
        const errorStr = String(error?.message || error || '');
        // Ignore expected Play Store service binding failures on sideloaded/non-Play Store builds
        if (!errorStr.includes('Failed to bind') && !errorStr.includes('zzy')) {
          Logger.warn('[InAppUpdate] Error checking/starting update:', error);
        }
      }
    };

    checkUpdates();
  }, []);
};
