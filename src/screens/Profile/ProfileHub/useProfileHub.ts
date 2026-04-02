import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useTranslation } from '@/hooks/useTranslation';
import { useCallback } from 'react';

export const useProfileHub = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const navigateToVehicleDetails = useCallback(() => {
    navigation.navigate('VehicleDetails');
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


  const handleLogout = useCallback(() => {
    console.log('Logging out...');
    // Add logout logic here
  }, []);

  const handleDeleteAccount = useCallback(() => {
    console.log('Deleting account...');
    // Add delete logic here
  }, []);

  return {
    t,
    navigateToEditProfile,
    navigateToVehicleDetails,
    navigateToTravelPreferences,
    navigateToDummy,
    handleLogout,
    handleDeleteAccount,
  };
};
