import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { locationService } from '@/serviceManager/locationService';

export const useMiddleStops = () => {
  const navigation = useNavigation();
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

  const updatedLocation = (route.params as any)?.updatedLocation;
  const type = (route.params as any)?.type;

  // Handle incoming new stops from MapPicker
  useEffect(() => {
    const handleNewStop = async () => {
      if (updatedLocation && type === 'middleStop' && startLocation) {
        // Prevent duplicate addition if effect triggers twice before params clear
        const isAlreadyAdded = middleStops.some(s => s.id === updatedLocation.id);
        if (isAlreadyAdded) return;

        setIsSorting(true);
        try {
          // Fetch distance from start to this new stop to determine its position
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
          
          // Add stop with distance metadata
          const stopWithDistance = {
            ...updatedLocation,
            distanceFromStart: distanceMeters
          };
          
          // Create new array with existing stops + new stop
          const updatedStops = [...middleStops, stopWithDistance];
          
          // Sort by distance from start
          updatedStops.sort((a, b) => 
            (a as any).distanceFromStart - (b as any).distanceFromStart
          );
          setMiddleStops(updatedStops);
        } catch (error) {
          console.error('Failed to calculate stop distance:', error);
          const fallbackStops = [...middleStops, updatedLocation];
          setMiddleStops(fallbackStops);
        } finally {
          setIsSorting(false);
          // Clear params immediately to prevent re-trigger
          navigation.setParams({ 
            updatedLocation: undefined,
            type: undefined 
          } as any);
        }
      }
    };

    handleNewStop();
  }, [updatedLocation, type, navigation, setMiddleStops, middleStops, startLocation]);

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
          startAddress: i === 0 ? startLocation.name : (middleStops[i-1]?.name || 'Stop'),
          endAddress: i === (mainRoute.legs?.length || 0) - 1 ? destinationLocation.name : (middleStops[i]?.name || 'Stop')
        })) || [];

        const details = {
          totalDistanceMeters: mainRoute.distance ?? legs.reduce((acc, leg) => acc + leg.distanceMeters, 0),
          totalDurationSeconds: mainRoute.duration ?? legs.reduce((acc, leg) => acc + leg.durationSeconds, 0),
          legs
        };
        setRouteDetails(details);
      } else {
        setRouteDetails(null as any);
      }
    } catch (error) {
      console.error('Failed to calculate full route details:', error);
      setRouteDetails(null as any);
    } finally {
      setIsSorting(false);
      (navigation.navigate as any)('DateSelection');
    }
  }, [navigation, setRouteDetails, startLocation, destinationLocation, middleStops]);

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
        : undefined
    })),
    middleStopsRaw: sortedStops,
    handleBackPress,
    handleAddStop,
    handleRemoveStop,
    handleContinuePress,
    isLoading: isSorting
  };
};
