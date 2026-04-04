import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader';

export const useMyRides = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<MyRidesTab>('upcoming');

  const onTabChange = useCallback((tab: MyRidesTab) => {
    setActiveTab(tab);
  }, []);

  const onMenuPress = useCallback(() => {
    console.log('Menu pressed');
  }, []);

  const onProfilePress = useCallback(() => {
    console.log('Profile pressed');
  }, []);

  const onAddPress = useCallback(() => {
    console.log('Add pressed');
  }, []);

  const onAcceptRide = useCallback(() => {
    console.log('Ride accepted');
    navigation.navigate('RideDetails', { rideId: 'matched-ride-123' });
  }, [navigation]);

  const onRidePress = useCallback((rideId: string) => {
    navigation.navigate('RideDetails', { rideId });
  }, [navigation]);

  const onClearDrafts = useCallback(() => {
    console.log('Clear drafts pressed');
  }, []);

  return {
    activeTab,
    onTabChange,
    onMenuPress,
    onProfilePress,
    onAddPress,
    onAcceptRide,
    onRidePress,
    onClearDrafts,
  };
};
