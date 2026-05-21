import { useCallback, useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { locationService } from '@/serviceManager/locationService';
import { useAppNavigation } from '@/hooks/useAppNavigation'; // ensure custom navigation hook is used
export const useMiddleStops = () => {
  const navigation = useAppNavigation(); // use custom navigation hook per guidelines
  const route = useRoute();  
  const { 
    startLocation, 
    destinationLocation, 
    middleStops,
    setMiddleStops,
    removeMiddleStop,
    setRouteDetails
  } = useRidePublishStore();

  const [isSorting, setIsSorting] = useState(false);
  const [totalDistanceMeters, setTotalDistanceMeters] = useState<number | null>(null);
  const processedStopId = useRef<string | null>(null);

  const updatedLocation = (route.params as any)?.updatedLocation;
  const type = (route.params as any)?.type;

  // Handle incoming new stops from MapPicker
  useEffect(() => {
    const handleNewStop = async () => {
      if (!updatedLocation || type !== 'middleStop' || !startLocation) return;
      if (processedStopId.current === updatedLocation.id) return;

      processedStopId.current = updatedLocation.id;
      // Clear params immediately to prevent re-trigger on middleStops change
      navigation.setParams?.({
        updatedLocation: undefined,
        type: undefined,
      });

      setIsSorting(true);
      try {
        const results = await locationService.getDirections(
          startLocation.latitude,
          startLocation.longitude,
          updatedLocation.latitude,
          updatedLocation.longitude
        );

        let distanceMeters = 0;
        if (results && results.length > 0) {
          const mainRoute = results[0];
          distanceMeters = mainRoute.distance ?? (mainRoute.legs?.reduce((acc, leg) => acc + (leg.distance || 0), 0) || 0);
        }

        const stopWithDistance = { ...updatedLocation, distanceFromStart: distanceMeters };
        const currentStops = useRidePublishStore.getState().middleStops;
        if (!currentStops.some(s => s.id === updatedLocation.id)) {
          const sorted = [...currentStops, stopWithDistance].sort(
            (a, b) => (a as any).distanceFromStart - (b as any).distanceFromStart
          );
          setMiddleStops(sorted);
        }
      } catch (error) {
        console.error('Failed to calculate stop distance:', error);
        const currentStops = useRidePublishStore.getState().middleStops;
        if (!currentStops.some(s => s.id === updatedLocation.id)) {
          setMiddleStops([...currentStops, updatedLocation]);
        }
      } finally {
        setIsSorting(false);
      }
    };

    handleNewStop();
  }, [updatedLocation, type, navigation, setMiddleStops, startLocation]);

  const sortedStops = middleStops; // Already sorted in store

  const handleBackPress = useCallback(() => {
    (navigation.navigate as any)('RouteSelection');
  }, [navigation]);

  const handleAddStop = useCallback(() => {
    (navigation.navigate as any)('MapPicker', {
      returnTo: 'MiddleStops',
      type: 'middleStop',
      module: 'publish'
    });
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
      } else {
        setRouteDetails(null as any);
        setTotalDistanceMeters(null);
      }
    } catch (error) {
      console.error('Failed to calculate full route details:', error);
      setRouteDetails(null as any);
    } finally {
      setIsSorting(false);
      (navigation.navigate as any)('DateSelection');
    }
  }, [navigation, setRouteDetails, startLocation, destinationLocation, middleStops]);

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
