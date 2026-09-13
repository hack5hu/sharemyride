import { useState, useCallback, useEffect } from 'react';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { type RouteOption } from '@/components/organisms/RouteCard';
import { NotificationType, RideType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { LocationService } from '@/serviceManager/LocationService';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useTravelPrefStore } from '@/store/useTravelPrefStore';
import { useVehicleStore } from '@/store/useVehicleStore';
import { decodePolyline, getBoundingBox } from '@/utils/polyline';
import { isPublishDistanceValid } from '@/utils/publishRouteValidation';

export interface RouteData {
  uiData: RouteOption;
  coordinates: [number, number][];
  bounds: [number, number, number, number];
  polylineString?: string;
  distanceMeters?: number;
  durationSeconds?: number;
}

export const useRouteSelection = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const {
    startLocation,
    destinationLocation,
    setSelectedRoute,
    setRouteDetails,
    setRideType,
  } = useRidePublishStore();
  const [routesData, setRoutesData] = useState<RouteData[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Background fetch vehicles and preferences
  useEffect(() => {
    useVehicleStore.getState().syncVehicles();
    useTravelPrefStore.getState().syncPreferences();
  }, []);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!startLocation || !destinationLocation) return;

      setIsLoading(true);
      const routesResponse = await LocationService.getDirections(
        startLocation.latitude,
        startLocation.longitude,
        destinationLocation.latitude,
        destinationLocation.longitude,
      );
      if (routesResponse && routesResponse.length > 0) {
        const sortedRoutes = [...routesResponse].sort((a, b) => {
          const distA = a.legs?.[0]?.distance || a.distance || 0;
          const distB = b.legs?.[0]?.distance || b.distance || 0;

          return distA - distB;
        });

        const mappedData: RouteData[] = sortedRoutes.map((route, index) => {
          const id = `route_${index + 1}`;
          const routeDistance =
            route.legs?.[0]?.distance || route.distance || 0;
          const routeDuration =
            route.legs?.[0]?.duration || route.duration || 0;

          const distKm = (routeDistance / 1000).toFixed(1);
          const mins = Math.round(routeDuration / 60);
          const durStr =
            mins > 60
              ? `${Math.floor(mins / 60)} hr ${mins % 60} min`
              : `${mins} min`;

          const desc = route.has_toll
            ? route.toll_price
              ? `Includes tolls (~₹${route.toll_price}).`
              : 'This route has tolls.'
            : index === 0
            ? 'Shortest distance available.'
            : `Standard route via ${route.weight_name || 'main roads'}.`;

          const polyline = route.overview_polyline || route.geometry || '';
          const coordinates = decodePolyline(polyline, 1e5);
          const bounds = getBoundingBox(coordinates);

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
              iconName: route.has_toll
                ? 'toll'
                : index === 0
                ? 'bolt'
                : 'straighten',
            },
            coordinates,
            bounds,
            polylineString: polyline,
            distanceMeters: routeDistance,
            durationSeconds: routeDuration,
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

  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);
  const handleSelectRoute = useCallback((id: string) => setSelectedRouteId(id), []);

  const handleContinuePress = useCallback(() => {
    const selectedRoute = routesData.find(r => r.uiData.id === selectedRouteId);
    if (isLoading || !selectedRoute?.polylineString) return;
    const distanceMeters = selectedRoute.distanceMeters ?? 0;
    const detectedType =
      distanceMeters <= 50000 ? RideType.LOCAL : RideType.INTERCITY;
    setRideType(detectedType);
    if (!isPublishDistanceValid(distanceMeters, detectedType)) {
      showNotification(
        NotificationType.ERROR,
        t('locationSelection.minDistanceErrorTitle'),
        t(
          detectedType === RideType.LOCAL
            ? 'locationSelection.minDistanceErrorIntracity'
            : 'locationSelection.minDistanceError',
        ),
      );

      return;
    }
    setSelectedRoute(selectedRoute);
    if (startLocation && destinationLocation) {
      setRouteDetails({
        totalDistanceMeters: distanceMeters,
        totalDurationSeconds: selectedRoute.durationSeconds || 0,
        legs: [
          {
            distanceMeters,
            durationSeconds: selectedRoute.durationSeconds || 0,
            startAddress: startLocation.address,
            endAddress: destinationLocation.address,
          },
        ],
      });
    }

    if (detectedType === RideType.LOCAL) {
      navigation.navigate('DateSelection' as never);
    } else {
      navigation.navigate('MiddleStops' as never);
    }
  }, [
    navigation,
    routesData,
    selectedRouteId,
    setSelectedRoute,
    setRouteDetails,
    setRideType,
    startLocation,
    destinationLocation,
    isLoading,
    t,
  ]);

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
