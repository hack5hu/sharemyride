import { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteStop } from '@/components/organisms/MiddleStopsList';

export const useMiddleStops = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Mock initial locations
  const startLocation = 'Indiranagar Metro Station';
  const destination = 'Whitefield ITPL';

  // State to manage dynamic stops
  const [middleStops, setMiddleStops] = useState<RouteStop[]>([
    { id: '1', name: 'Marathahalli Bridge' },
    { id: '2', name: 'Varthur Kodi' },
  ]);

  useEffect(() => {
    const params = route.params as any;
    if (params?.newStop) {
      setMiddleStops(prev => {
        // Only add if not already there
        if (!prev.find(s => s.id === params.newStop.id)) {
          return [...prev, params.newStop];
        }
        return prev;
      });
      (navigation as any).setParams({ newStop: undefined });
    }
  }, [route.params, navigation]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddStop = useCallback(() => {
    (navigation.navigate as any)('MiddleStopMap');
  }, [navigation]);

  const handleRemoveStop = useCallback((id: string) => {
    setMiddleStops((prev) => prev.filter((stop) => stop.id !== id));
  }, []);

  const handleContinuePress = useCallback(() => {
    (navigation.navigate as any)('DateSelection');
  }, [navigation]);

  return {
    startLocation,
    destination,
    middleStops,
    handleBackPress,
    handleAddStop,
    handleRemoveStop,
    handleContinuePress,
  };
};
