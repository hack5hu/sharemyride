import { useCallback } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { RootStackParamList } from '@/navigation/types';
import { BottomTabType } from './types';

export const useBottomNav = (activeTab: BottomTabType) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const handlePress = useCallback((tab: BottomTabType) => {
    if (tab === activeTab) return;

    const tabScreenMap: Record<BottomTabType, keyof RootStackParamList> = {
      BOOK: 'BookRideInfo',
      PROFILE: 'ProfileHub',
      CHATS: 'ChatList',
      MY_RIDES: 'MyRides',
      PUBLISH: 'LocationSelection',
    };

    const targetScreen = tabScreenMap[tab];
    if (!targetScreen) {
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
      return;
    }

    if (tab === 'BOOK') {
      navigation.navigate('BookRideInfo');
    } else {
      if (activeTab === 'BOOK') {
        navigation.navigate(targetScreen);
      } else {
        navigation.replace(targetScreen);
      }
    }
  }, [activeTab, navigation, t]);

  return {
    t,
    handlePress,
  };
};
