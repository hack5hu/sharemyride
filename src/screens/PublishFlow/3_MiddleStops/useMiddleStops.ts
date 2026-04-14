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

  // Handle incoming new stops from MapPicker/MiddleStopMap
  useEffect(() => {
    const params = route.params as any;
    if (params?.newStop) {
      addMiddleStop(params.newStop);
      // Clear params to avoid duplicate adds on re-focus
      navigation.setParams({ newStop: undefined } as any);
    }
  }, [route.params, navigation, addMiddleStop]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddStop = useCallback(() => {
    (navigation.navigate as any)('MiddleStopMap');
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
    middleStops: middleStops.map(s => ({ id: s.id, name: s.name || s.address })),
    handleBackPress,
    handleAddStop,
    handleRemoveStop,
    handleContinuePress,
  };
};
