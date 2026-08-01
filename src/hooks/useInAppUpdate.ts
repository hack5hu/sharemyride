import { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';
import { Logger } from '@/utils/logger';

export const useInAppUpdate = () => {
  useEffect(() => {
    // Pass false to disable verbose debugging logs in production
    const inAppUpdates = new SpInAppUpdates(__DEV__);

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
      } catch (error) {
        Logger.error('[InAppUpdate] Error checking/starting update:', error);
      }
    };

    checkUpdates();
  }, []);
};
