import { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'LocationSelection'>;

export const useLocationSelection = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [startLocationName, setStartLocationName] = useState<string>('');
  const [destinationLocationName, setDestinationLocationName] = useState<string>('');

  const handlePressStart = useCallback(() => {
    navigation.navigate('MapPicker', { type: 'start' });
  }, [navigation]);

  const handlePressDestination = useCallback(() => {
    navigation.navigate('MapPicker', { type: 'destination' });
  }, [navigation]);

  useEffect(() => {
    if ((route.params as any)?.updatedLocation && (route.params as any)?.type) {
      const { updatedLocation, type } = (route.params as any);
      if (type === 'start') {
        setStartLocationName(updatedLocation.name);
      } else if (type === 'destination') {
        setDestinationLocationName(updatedLocation.name);
      }
      // Clear params so it doesn't apply again unexpectedly
      navigation.setParams({ updatedLocation: undefined, type: undefined });
    }
  }, [route.params, navigation]);

  const handleContinue = useCallback(() => {
    navigation.navigate('RouteSelection');
  }, [navigation]);

  // Optionally set these manually for demonstration or integration later
   const canContinue =  true ||!!startLocationName && !!destinationLocationName;

  return {
    startLocationName,
    destinationLocationName,
    handlePressStart,
    handlePressDestination,
    handleContinue,
    canContinue,
  };
};
