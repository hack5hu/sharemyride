import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RouteOption } from '@/components/organisms/RouteCard';

const MOCK_ROUTES: RouteOption[] = [
  {
    id: 'route_1',
    title: 'Route 1: Fastest',
    isRecommended: true,
    duration: '24 mins',
    distance: '12.4 km',
    description: 'Avoids heavy traffic on Main St. via the bypass.',
    iconName: 'bolt',
  },
  {
    id: 'route_2',
    title: 'Route 2: Shortest',
    duration: '31 mins',
    distance: '10.1 km',
    description: 'Direct city route with moderate stoplights.',
    iconName: 'straighten',
  },
  {
    id: 'route_3',
    title: 'Route 3: Scenic',
    duration: '38 mins',
    distance: '14.2 km',
    description: 'Lush park views, ideal for a relaxed morning commute.',
    iconName: 'eco',
  },
];

export const useRouteSelection = () => {
  const navigation = useNavigation();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('route_1');

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectRoute = useCallback((id: string) => {
    setSelectedRouteId(id);
  }, []);

  const handleContinuePress = useCallback(() => {
    navigation.navigate('MiddleStops' as never);
  }, [navigation]);

  return {
    routes: MOCK_ROUTES,
    selectedRouteId,
    handleBackPress,
    handleSelectRoute,
    handleContinuePress,
  };
};
