import { useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';

export const useMiddleStops = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { 
    startLocation, 
    destinationLocation, 
    middleStops,
    addMiddleStop,
    removeMiddleStop
  } = useRidePublishStore();

  const updatedLocation = (route.params as any)?.updatedLocation;
  const type = (route.params as any)?.type;

  // Handle incoming new stops from MapPicker
  useEffect(() => {
    // Condition: only select for 'middleStop' type to avoid cross-contamination
    if (updatedLocation && type === 'middleStop') {
      addMiddleStop(updatedLocation);
      
      // Clear params to avoid duplicate adds on re-focus or state updates
      navigation.setParams({ 
        updatedLocation: undefined,
        type: undefined 
      } as any);
    }
  }, [updatedLocation, type, navigation, addMiddleStop]);

  const handleBackPress = useCallback(() => {
    (navigation.navigate as any)('RouteSelection');
  }, [navigation]);

  const handleAddStop = useCallback(() => {
    // Navigate to MapPicker with specific context for MiddleStops
    (navigation.navigate as any)('MapPicker', {
      returnTo: 'MiddleStops',
      type: 'middleStop',
      module: 'publish'
    });
  }, [navigation]);

  const handleRemoveStop = useCallback((id: string) => {
    removeMiddleStop(id);
  }, [removeMiddleStop]);

  const handleContinuePress = useCallback(() => {
    (navigation.navigate as any)('DateSelection');
  }, [navigation]);

  return {
    startLocation: startLocation?.name || startLocation?.address || 'Pick Start Location',
    destination: destinationLocation?.name || destinationLocation?.address || 'Pick Destination',
    startLocationRaw: startLocation,
    destinationLocationRaw: destinationLocation,
    middleStops: middleStops.map(s => ({ id: s.id, name: s.name || s.address || 'Unknown Stop' })),
    middleStopsRaw: middleStops,
    handleBackPress,
    handleAddStop,
    handleRemoveStop,
    handleContinuePress,
  };
};
