import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useTranslation } from '@/hooks/useTranslation';
import { BottomTabType } from './types';

export const useBottomNav = (activeTab: BottomTabType) => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = useCallback((tab: BottomTabType) => {
    if (tab === activeTab) return;

    switch (tab) {
      case 'PROFILE':
        navigation.navigate('ProfileHub');
        break;
      case 'CHATS':
        navigation.navigate('ChatList');
        break;
      case 'MY_RIDES':
        navigation.navigate('MyRides');
        break;
      default:
        navigation.navigate('Dummy', { 
          title: t(`profileHub.nav${tab.replace('_', '').toLowerCase().charAt(0).toUpperCase() + tab.replace('_', '').toLowerCase().slice(1)}`),
          activeTab: tab 
        });
        break;
    }
  }, [activeTab, navigation, t]);

  return {
    t,
    handlePress,
  };
};
