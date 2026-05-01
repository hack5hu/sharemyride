import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useTranslation } from '@/hooks/useTranslation';
import { useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export const useProfileHub = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuthStore();

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const navigateToVehicleDetails = useCallback(() => {
    navigation.navigate('VehicleList');
  }, [navigation]);

  const navigateToTravelPreferences = useCallback(() => {
    navigation.navigate('TravelPreferences');
  }, [navigation]);

  const navigateToDummy = useCallback((title: string, options?: { 
    showBack?: boolean, 
    showBottomNav?: boolean, 
    contentKey?: 'about' | 'help' | 'terms' 
  }) => {
    navigation.navigate('Dummy', { title, ...options });
  }, [navigation]);

  const navigateToSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);



  return {
    t,
    user,
    navigateToEditProfile,
    navigateToVehicleDetails,
    navigateToTravelPreferences,
    navigateToSettings,
    navigateToDummy,
  };
};
