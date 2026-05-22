import { useCallback } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { BottomTabType } from './types';

export const useBottomNav = (activeTab: BottomTabType) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const handlePress = useCallback((tab: BottomTabType) => {
    if (tab === activeTab) return;

    switch (tab) {
      case 'BOOK':
        navigation.navigate('BookRideInfo');
        break;
      case 'PROFILE':
        navigation.navigate('ProfileHub');
        break;
      case 'CHATS':
        navigation.navigate('ChatList');
        break;
      case 'MY_RIDES':
        navigation.navigate('MyRides');
        break;
      case 'PUBLISH':
        navigation.navigate('LocationSelection');
        break;
      default: {
        const tabStr = tab as string;
        navigation.navigate('Dummy', {
          title: t(
            `profileHub.nav${
              tabStr.replace('_', '').toLowerCase().charAt(0).toUpperCase() +
              tabStr.replace('_', '').toLowerCase().slice(1)
            }`,
          ),
          activeTab: tab as BottomTabType,
        });
        break;
      }
    }
  }, [activeTab, navigation, t]);

  return {
    t,
    handlePress,
  };
};
