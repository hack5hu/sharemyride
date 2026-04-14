import { useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useRidePublishStore } from '@/store/useRidePublishStore';

type NavigationProp = StackNavigationProp<RootStackParamList, 'LocationSelection'>;

export const useLocationSelection = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const { 
    startLocation, 
    destinationLocation, 
    setStartLocation, 
    setDestinationLocation,
    clearPublishState
  } = useRidePublishStore();

  // Clear state when the publish flow is completely exited
  useEffect(() => {
    return () => {
      clearPublishState();
    };
  }, [clearPublishState]);

  const handlePressStart = useCallback(() => {
    navigation.navigate('MapPicker', { 
      type: 'start', 
      returnTo: 'LocationSelection',
      module: 'publish'
    });
  }, [navigation]);

  const handlePressDestination = useCallback(() => {
    navigation.navigate('MapPicker', { 
      type: 'destination', 
      returnTo: 'LocationSelection',
      module: 'publish'
    });
  }, [navigation]);

  const updatedLocation = (route.params as any)?.updatedLocation;
  const type = (route.params as any)?.type;

  useEffect(() => {
    if (updatedLocation && type) {
      if (type === 'start') {
        setStartLocation(updatedLocation);
      } else if (type === 'destination') {
        setDestinationLocation(updatedLocation);
      }
      // Clear params so it doesn't apply again unexpectedly
      navigation.setParams({ updatedLocation: undefined, type: undefined });
    }
  }, [updatedLocation, type, navigation, setStartLocation, setDestinationLocation]);

  const handleContinue = useCallback(() => {
    navigation.navigate('RouteSelection');
  }, [navigation]);

  // Enforce validation: Must have both start and destination to proceed
  const canContinue = !!startLocation && !!destinationLocation;

  return {
    startLocationName: startLocation?.name || '',
    destinationLocationName: destinationLocation?.name || '',
    handlePressStart,
    handlePressDestination,
    handleContinue,
    canContinue,
  };
};

