import { useEffect } from 'react';
import { AppState, type AppStateStatus, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SpInAppUpdates, {
  IAUUpdateKind,
  type StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import { Logger } from '@/utils/logger';

export const useInAppUpdate = () => {
  useEffect(() => {
    const inAppUpdates = new SpInAppUpdates(false);

    const checkAndForceUpdate = async () => {
      try {
        const curVersion = DeviceInfo.getVersion();
        const curBuildNumber = DeviceInfo.getBuildNumber();
        Logger.info(
          `[InAppUpdate] Checking force update (Version: ${curVersion}, Build: ${curBuildNumber})`,
        );

        const checkOptions = Platform.select({
          android: {
            curVersion: curBuildNumber,
            customVersionComparator: (newV: string, curV: string): -1 | 0 | 1 => {
              const newNum = parseInt(newV, 10);
              const curNum = parseInt(curV, 10);
              if (!isNaN(newNum) && !isNaN(curNum)) {
                if (newNum > curNum) return 1;
                if (newNum < curNum) return -1;
                return 0;
              }
              const comp = newV.localeCompare(curV);
              return comp > 0 ? 1 : comp < 0 ? -1 : 0;
            },
          },
          ios: {
            curVersion,
            country: 'in',
          },
        });

        const result = await inAppUpdates.checkNeedsUpdate(checkOptions);
        Logger.info('[InAppUpdate] Check result:', result);

        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions;

          if (Platform.OS === 'android') {
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          } else {
            updateOptions = {
              title: 'Update Available',
              message:
                'A new version of ZyncRide is available on the App Store. Please update to continue enjoying the latest features.',
              buttonUpgradeText: 'Update Now',
              forceUpgrade: true,
              country: 'in',
            };
          }

          await inAppUpdates.startUpdate(updateOptions);
        }
      } catch (error: unknown) {
        const errorStr = String((error as Error)?.message || error || '');
        if (!errorStr.includes('Failed to bind') && !errorStr.includes('zzy')) {
          Logger.warn('[InAppUpdate] Error checking/starting update:', error);
        }
      }
    };

    checkAndForceUpdate();

    const subscription = AppState.addEventListener(
      'change',
      (status: AppStateStatus) => {
        if (status === 'active') {
          checkAndForceUpdate();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
};
