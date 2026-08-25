import { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';
import { Logger } from '@/utils/logger';

export const useInAppUpdate = () => {
  useEffect(() => {
    const inAppUpdates = new SpInAppUpdates(false);

    const checkUpdates = async () => {
      try {
        const curVersion = DeviceInfo.getVersion();
        const curBuildNumber = DeviceInfo.getBuildNumber();
        Logger.info(`[InAppUpdate] Checking update (Version: ${curVersion}, Build: ${curBuildNumber})`);

        const checkOptions = Platform.select({
          android: {
            curVersion: curBuildNumber,
            customVersionComparator: (newV: string, curV: string) => {
              const newNum = parseInt(newV, 10);
              const curNum = parseInt(curV, 10);
              if (!isNaN(newNum) && !isNaN(curNum)) {
                return newNum - curNum;
              }
              return newV.localeCompare(curV);
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
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === 'android') {
            const isImmediateAllowed = (result.other as any)?.isImmediateUpdateAllowed !== false;
            updateOptions = {
              updateType: isImmediateAllowed ? IAUUpdateKind.IMMEDIATE : IAUUpdateKind.FLEXIBLE,
            };
          } else if (Platform.OS === 'ios') {
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
        if (!errorStr.includes('Failed to bind') && !errorStr.includes('zzy')) {
          Logger.warn('[InAppUpdate] Error checking/starting update:', error);
        }
      }
    };

    checkUpdates();
  }, []);
};
