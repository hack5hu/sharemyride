import { useCallback } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { BottomTabType } from './types';

export const useBottomNav = (activeTab: BottomTabType) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const handlePress = useCallback((tab: BottomTabType) => {
    if (tab === activeTab) return;

    const tabActionMap: Record<BottomTabType, () => void> = {
      BOOK: () => navigation.resetTo('BookRideInfo'),
      PROFILE: () => navigation.resetWithStack([
        { name: 'BookRideInfo' },
        { name: 'ProfileHub' }
      ]),
      CHATS: () => navigation.resetWithStack([
        { name: 'BookRideInfo' },
        { name: 'ChatList' }
      ]),
      MY_RIDES: () => navigation.resetWithStack([
        { name: 'BookRideInfo' },
        { name: 'MyRides' }
      ]),
      PUBLISH: () => navigation.resetWithStack([
        { name: 'BookRideInfo' },
        { name: 'LocationSelection' }
      ]),
    };

    const action = tabActionMap[tab];
    if (action) {
      action();
    } else {
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
    }
  }, [activeTab, navigation, t]);

  return {
    t,
    handlePress,
  };
};
