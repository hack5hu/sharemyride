import { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RouteOption } from '@/components/organisms/RouteCard';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { locationService } from '@/serviceManager/locationService';
import { decodePolyline, getBoundingBox } from '@/utils/polyline';

export interface RouteData {
  uiData: RouteOption;
  coordinates: [number, number][];
  bounds: [number, number, number, number];
}

export const useRouteSelection = () => {
  const navigation = useNavigation();
  const { startLocation, destinationLocation, setSelectedRoute } = useRidePublishStore();
  console.log(startLocation, destinationLocation);
  const [routesData, setRoutesData] = useState<RouteData[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!startLocation || !destinationLocation) return;
      
      setIsLoading(true);
      const routesResponse = await locationService.getDirections(
        startLocation.latitude,
        startLocation.longitude,
        destinationLocation.latitude,
        destinationLocation.longitude
      );
      console.log('routesResponse', routesResponse);

      if (routesResponse && routesResponse.length > 0) {
        // Sort by distance (meters) ascending
        const sortedRoutes = [...routesResponse].sort((a, b) => {
          const distA = a.legs?.[0]?.distance || a.distance || 0;
          const distB = b.legs?.[0]?.distance || b.distance || 0;
          return distA - distB;
        });

        const mappedData: RouteData[] = sortedRoutes.map((route, index) => {
          const id = `route_${index + 1}`;
          
          const routeDistance = route.legs?.[0]?.distance || route.distance || 0;
          const routeDuration = route.legs?.[0]?.duration || route.duration || 0;
          
          // Format metrics
          const distKm = (routeDistance / 1000).toFixed(1);
          const mins = Math.round(routeDuration / 60);
          const durStr = mins > 60 ? `${Math.floor(mins / 60)} hr ${mins % 60} min` : `${mins} min`;
          
          // Determine description
          let desc = `Standard route via ${route.weight_name || 'main roads'}.`;
          if (route.has_toll) {
             desc = route.toll_price ? `Includes tolls (~₹${route.toll_price}).` : 'This route has tolls.';
          } else if (index === 0) {
             desc = 'Shortest distance available.';
          }

          // Decode geometry
          const polyline = route.overview_polyline || route.geometry || '';
          const coordinates = decodePolyline(polyline, 1e5); // Ola and OSRM usually use 1e5
          const bounds = getBoundingBox(coordinates);
          console.log(coordinates)
          // Determine title
          let title = '';
          if (route.summary) {
            title = `Via ${route.summary}`;
          } else if (index === 0) {
            title = 'Recommended Route';
          } else {
            title = `Alternative Route ${index + 1}`;
          }

          return {
            uiData: {
              id,
              title,
              isRecommended: index === 0,
              duration: durStr,
              distance: `${distKm} km`,
              description: desc,
              iconName: route.has_toll ? 'toll' : (index === 0 ? 'bolt' : 'straighten'),
            },
            coordinates,
            bounds,
          };
        });

        setRoutesData(mappedData);
        if (mappedData.length > 0) {
          setSelectedRouteId(mappedData[0].uiData.id);
        }
      }
      setIsLoading(false);
    };

    fetchRoutes();
  }, [startLocation, destinationLocation]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectRoute = useCallback((id: string) => {
    setSelectedRouteId(id);
  }, []);

  const handleContinuePress = useCallback(() => {
    const selectedRoute = routesData.find(r => r.uiData.id === selectedRouteId);
    if (selectedRoute) {
      setSelectedRoute(selectedRoute);
    }
    console.log(selectedRoute)
    navigation.navigate('MiddleStops' as never);
  }, [navigation, routesData, selectedRouteId, setSelectedRoute]);

  return {
    routes: routesData.map(r => r.uiData),
    routesData,
    selectedRouteId,
    isLoading,
    handleBackPress,
    handleSelectRoute,
    handleContinuePress,
  };
};
