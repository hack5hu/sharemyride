import { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { locationService } from '@/serviceManager/locationService';
import { useAppNavigation } from '@/hooks/useAppNavigation'; // ensure custom navigation hook is used
import { decodePolyline, getBoundingBox } from '@/utils/polyline';

export const useMiddleStops = () => {
  const navigation = useAppNavigation(); // use custom navigation hook per guidelines
  const route = useRoute();
  const params = route.params as any;

  const { 
    startLocation, 
    destinationLocation, 
    middleStops,
    setMiddleStops,
    removeMiddleStop,
    setRouteDetails,
    selectedRoute,
    setSelectedRoute,
  } = useRidePublishStore();

  const [isSorting, setIsSorting] = useState(false);
  const [totalDistanceMeters, setTotalDistanceMeters] = useState<number | null>(null);


  const sortedStops = middleStops; // Already sorted in store
  console.log('sortedStops', sortedStops);
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddStop = useCallback(() => {
    navigation.push('MiddleStopMap');
  }, [navigation]);

  const handleRemoveStop = useCallback((id: string) => {
    removeMiddleStop(id);
  }, [removeMiddleStop]);

  const handleContinuePress = useCallback(async () => {
   
    if (!startLocation || !destinationLocation) {
      navigation.navigate('DateSelection' as any);
      return;
    }

    setIsSorting(true);
    try {
      const waypoints = middleStops.length > 0 
        ? middleStops.map(s => `${s.latitude},${s.longitude}`).join('|')
        : undefined;

      const results = await locationService.getDirections(
        startLocation.latitude,
        startLocation.longitude,
        destinationLocation.latitude,
        destinationLocation.longitude,
        waypoints
      );

      if (results && results.length > 0) {
        const mainRoute = results[0];
        const legs = mainRoute.legs?.map((leg, i) => ({
          distanceMeters: leg.distance,
          durationSeconds: leg.duration,
          startAddress: i === 0 ? startLocation.name : (middleStops[i - 1]?.name || 'Stop'),
          endAddress: i === (mainRoute.legs?.length || 0) - 1 ? destinationLocation.name : (middleStops[i]?.name || 'Stop'),
        })) || [];

        const totalDistanceMeters = mainRoute.distance ?? legs.reduce((acc, leg) => acc + leg.distanceMeters, 0);
        const totalDurationSeconds = mainRoute.duration ?? legs.reduce((acc, leg) => acc + leg.durationSeconds, 0);

        const details = {
          totalDistanceMeters,
          totalDurationSeconds,
          legs,
        };
        setRouteDetails(details);
        // Store total distance for display in UI
        setTotalDistanceMeters(totalDistanceMeters);

        // Update selectedRoute in store to route through the middle stops
        const polyline = mainRoute.overview_polyline || mainRoute.geometry || '';
        const coordinates = decodePolyline(polyline, 1e5);
        const bounds = getBoundingBox(coordinates);

        if (selectedRoute) {
          setSelectedRoute({
            ...selectedRoute,
            coordinates,
            bounds,
            polylineString: polyline,
            uiData: {
              ...selectedRoute.uiData,
              distance: `${(totalDistanceMeters / 1000).toFixed(1)} km`,
              duration: Math.round(totalDurationSeconds / 60) > 60 
                ? `${Math.floor(Math.round(totalDurationSeconds / 60) / 60)} hr ${Math.round(totalDurationSeconds / 60) % 60} min` 
                : `${Math.round(totalDurationSeconds / 60)} min`,
            },
          });
        }
      } else {
        setRouteDetails(null as any);
        setTotalDistanceMeters(null);
      }
    } catch (error) {
      console.error('Failed to calculate full route details:', error);
      setRouteDetails(null as any);
    } finally {
      setIsSorting(false);
      if (params?.returnTo === 'SummaryPublish') {
        (navigation.navigate as any)('SummaryPublish');
      } else {
        (navigation.navigate as any)('DateSelection');
      }
    }
  }, [navigation, setRouteDetails, startLocation, destinationLocation, middleStops, params]);

  // Compute total distance for display as soon as stops are updated
  useEffect(() => {
    const computeTotal = async () => {
      if (!startLocation || !destinationLocation) {
        setTotalDistanceMeters(null);
        return;
      }
      try {
        const waypoints = middleStops.length > 0 ? middleStops.map(s => `${s.latitude},${s.longitude}`).join('|') : undefined;
        const res = await locationService.getDirections(
          startLocation.latitude,
          startLocation.longitude,
          destinationLocation.latitude,
          destinationLocation.longitude,
          waypoints
        );
        if (res && res.length > 0) {
          const route = res[0];
          const legs = route.legs?.map((leg) => ({ distance: leg.distance })) || [];
          const total = route.distance ?? legs.reduce((a, l) => a + (l.distance || 0), 0);
          setTotalDistanceMeters(total);

          // Dynamically update the selectedRoute in store to pass through waypoints in real-time
          const polyline = route.overview_polyline || route.geometry || '';
          const coordinates = decodePolyline(polyline, 1e5);
          const bounds = getBoundingBox(coordinates);

          const currentRoute = useRidePublishStore.getState().selectedRoute;
          if (currentRoute) {
            useRidePublishStore.getState().setSelectedRoute({
              ...currentRoute,
              coordinates,
              bounds,
              polylineString: polyline,
              uiData: {
                ...currentRoute.uiData,
                distance: `${(total / 1000).toFixed(1)} km`,
              },
            });
          }
        } else {
          setTotalDistanceMeters(null);
        }
      } catch (e) {
        console.error('Failed to compute total distance', e);
        setTotalDistanceMeters(null);
      }
    };
    computeTotal();
  }, [startLocation, destinationLocation, middleStops]);

  const startDistanceText = '0 km';
  const destinationDistanceText = totalDistanceMeters !== null ? `${(totalDistanceMeters / 1000).toFixed(1)} km` : undefined;

  return {
    startLocation: startLocation?.name || startLocation?.address || 'Pick Start Location',
    destination: destinationLocation?.name || destinationLocation?.address || 'Pick Destination',
    startLocationRaw: startLocation,
    destinationLocationRaw: destinationLocation,
    middleStops: sortedStops.map(s => ({
      id: s.id,
      name: s.name || s.address || 'Unknown Stop',
      distanceText: (s as any).distanceFromStart
        ? `${((s as any).distanceFromStart / 1000).toFixed(1)} km from start`
        : undefined,
    })),
    middleStopsRaw: sortedStops,
    startDistanceText,
    destinationDistanceText,
    handleBackPress,
    handleAddStop,
    handleRemoveStop,
    handleContinuePress,
    isLoading: isSorting,
  };
};
