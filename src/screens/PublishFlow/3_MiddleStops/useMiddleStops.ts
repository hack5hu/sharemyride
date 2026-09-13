import { type RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { type RootStackParamList } from '@/navigation/types';
import { LocationService } from '@/serviceManager/LocationService';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { formatDisplayAddress } from '@/utils/address';
import { decodePolyline, getBoundingBox } from '@/utils/polyline';
import { isPublishRouteValid } from '@/utils/publishRouteValidation';

export const useMiddleStops = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'MiddleStops'>>();
  const { t } = useTranslation();
  const startLocation = useRidePublishStore(s => s.startLocation);
  const destinationLocation = useRidePublishStore(s => s.destinationLocation);
  const middleStops = useRidePublishStore(s => s.middleStops);
  const routeDetails = useRidePublishStore(s => s.routeDetails);
  const removeMiddleStop = useRidePublishStore(s => s.removeMiddleStop);
  const [isLoading, setIsLoading] = useState(false);
  const notifyInvalid = useCallback(
    () =>
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        t('notification.defaultErrorMessage'),
      ),
    [t],
  );

  useEffect(() => {
    let cancelled = false;
    const computeRoute = async () => {
      const state = useRidePublishStore.getState();
      if (!startLocation || !destinationLocation) return;
      // Preserve the chosen alternative while the stop list is unchanged.
      if (
        state.selectedRoute?.polylineString &&
        isPublishRouteValid(
          state.routeDetails,
          state.rideType,
          middleStops.length + 2,
        )
      )
        {return;}
      setIsLoading(true);
      try {
        const waypoints = middleStops.length
          ? middleStops
              .map(stop => stop.latitude + ',' + stop.longitude)
              .join('|')
          : undefined;
        const results = await LocationService.getDirections(
          startLocation.latitude,
          startLocation.longitude,
          destinationLocation.latitude,
          destinationLocation.longitude,
          waypoints,
        );
        if (cancelled) return;
        const result = results[0];
        const polyline = result?.overview_polyline || result?.geometry;
        if (!result || !polyline || !state.selectedRoute) {
          notifyInvalid();

          return;
        }
        const stops = [startLocation, ...middleStops, destinationLocation];
        const legs = (
          result.legs ??
          (stops.length === 2
            ? [
                {
                  distance: result.distance ?? 0,
                  duration: result.duration ?? 0,
                },
              ]
            : [])
        ).map((leg, i) => ({
          distanceMeters: leg.distance,
          durationSeconds: leg.duration,
          startAddress: stops[i]?.address ?? '',
          endAddress: stops[i + 1]?.address ?? '',
        }));
        const details = {
          totalDistanceMeters: legs.reduce(
            (sum, leg) => sum + leg.distanceMeters,
            0,
          ),
          totalDurationSeconds: legs.reduce(
            (sum, leg) => sum + leg.durationSeconds,
            0,
          ),
          legs,
        };
        if (!isPublishRouteValid(details, state.rideType, stops.length)) {
          notifyInvalid();

          return;
        }
        const coordinates = decodePolyline(polyline, 1e5);
        state.setRouteDetails(details);
        state.setSelectedRoute({
          ...state.selectedRoute,
          coordinates,
          bounds: getBoundingBox(coordinates),
          polylineString: polyline,
          distanceMeters: details.totalDistanceMeters,
          durationSeconds: details.totalDurationSeconds,
        });
      } catch {
        if (!cancelled) notifyInvalid();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    computeRoute();

    return () => {
      cancelled = true;
    };
  }, [startLocation, destinationLocation, middleStops, notifyInvalid]);

  const handleContinuePress = useCallback(() => {
    const state = useRidePublishStore.getState();
    if (
      isLoading ||
      !state.selectedRoute?.polylineString ||
      !isPublishRouteValid(
        state.routeDetails,
        state.rideType,
        middleStops.length + 2,
      )
    ) {
      notifyInvalid();

      return;
    }
    navigation.navigate(
      route.params?.returnTo === 'SummaryPublish'
        ? 'PriceSelection'
        : 'DateSelection',
    );
  }, [isLoading, middleStops.length, navigation, notifyInvalid, route.params]);
  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);
  const handleAddStop = useCallback(
    () => navigation.push('MiddleStopMap'),
    [navigation],
  );
  const handleRemoveStop = useCallback(
    (id: string) => removeMiddleStop(id),
    [removeMiddleStop],
  );
  const unit = t('bookRideInfo.searchRadiusUnit');

  return {
    startLocation:
      formatDisplayAddress(startLocation?.name || startLocation?.address) ||
      t('middleStops.startPointLabel'),
    destination:
      formatDisplayAddress(
        destinationLocation?.name || destinationLocation?.address,
      ) || t('middleStops.destinationLabel'),
    startLocationRaw: startLocation,
    destinationLocationRaw: destinationLocation,
    middleStops: middleStops.map(stop => ({
      id: stop.id,
      name: stop.name || stop.address || t('middleStops.stopLabel'),
    })),
    middleStopsRaw: middleStops,
    startDistanceText: '0 ' + unit,
    destinationDistanceText: routeDetails
      ? (routeDetails.totalDistanceMeters / 1000).toFixed(1) + ' ' + unit
      : undefined,
    handleBackPress,
    handleAddStop,
    handleRemoveStop,
    handleContinuePress,
    isLoading,
  };
};
