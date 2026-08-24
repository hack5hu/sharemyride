import { useMemo, useCallback, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { ActiveRideRole } from '@/navigation/types.d';
import { useLiveRideStore } from '@/store/useLiveRideStore';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useLocale } from '@/constants/localization';
import {
  DriverStop,
  DriverStopStatus,
  NextStopInfo,
  DriverVehicleInfo,
  GroupedStop,
} from '@/components/templates/ActiveRideDriverTemplate';
import {
  PassengerTimelineItem,
  DriverDetails,
} from '@/components/templates/ActiveRidePassengerTemplate';
import { ActiveRideRouteProp, UseActiveRideReturn } from './types.d';
import {
  calculateDistanceKm,
  formatPassengerDistance,
} from './activeRideHelpers';

export const useActiveRideDriver = (): UseActiveRideReturn => {
  const navigation = useAppNavigation();
  const route = useRoute<ActiveRideRouteProp>();
  const { activeRideDriver: locale } = useLocale();

  const roleParam = (route.params as any)?.role;
  const isPassenger =
    route.name === 'ActiveRidePassenger' ||
    roleParam === ActiveRideRole.PASSENGER ||
    String(roleParam).toUpperCase() === 'PASSENGER';

  const {
    activeRide,
    isLiveLocationEnabled,
    setLiveLocationEnabled,
    fetchLiveStatus,
  } = useLiveRideStore();
  const rideDetails = activeRide?.rideDetails;

  useEffect(() => {
    fetchLiveStatus();
    const intervalId = setInterval(() => {
      fetchLiveStatus();
    }, 45000);
    return () => clearInterval(intervalId);
  }, [fetchLiveStatus]);

  const groupedStops = useMemo<GroupedStop[]>(() => {
    if (!rideDetails?.passengers || !rideDetails?.stops) return [];

    const stopMap = new Map<number | string, DriverStop[]>();
    rideDetails.passengers.forEach((p: any) => {
      const pStopId = p.sourceStopId;
      if (!stopMap.has(pStopId)) stopMap.set(pStopId, []);

      const stopObj = rideDetails.stops.find(
        (s: any) => s.id === pStopId,
      );
      const stopLat = stopObj?.lat ?? stopObj?.latitude;
      const stopLon = stopObj?.lon ?? stopObj?.lng ?? stopObj?.longitude;

      const pLat =
        p.lat ?? p.latitude ?? p.currentLat ?? p.liveLocation?.latitude;
      const pLon =
        p.lng ??
        p.lon ??
        p.longitude ??
        p.currentLng ??
        p.liveLocation?.longitude;

      const computedKm = calculateDistanceKm(pLat, pLon, stopLat, stopLon);

      const rawDist =
        p.distanceFromStopKm ??
        p.distanceFromStop ??
        p.distanceFromPickupKm ??
        computedKm ??
        p.distanceFromDriverKm ??
        p.distanceKm ??
        p.distance;

      const distanceAway =
        formatPassengerDistance(rawDist, locale) ||
        (p.isLiveLocationShared === false
          ? locale.liveLocationInactive
          : undefined);

      stopMap.get(pStopId)!.push({
        id: p.bookingId || p.passengerId,
        userId: p.passengerId,
        passengerName: p.name,
        passengerAvatar: p.photoUrl,
        pickupLocation: p.sourceStopName,
        status:
          p.status === 'CONFIRMED'
            ? DriverStopStatus.PENDING
            : DriverStopStatus.ACTIVE,
        phone: p.phoneNumber || p.phone,
        distanceAway,
      });
    });

    const groups: GroupedStop[] = [];
    rideDetails.stops.forEach((s: any) => {
      const pass = stopMap.get(s.id);
      if (pass && pass.length > 0) {
        groups.push({
          stopId: s.id,
          stopName: s.stopName,
          passengers: pass,
        });
      }
    });

    return groups;
  }, [rideDetails?.passengers, rideDetails?.stops, locale]);

  const nextStop = useMemo<NextStopInfo>(() => {
    if (groupedStops.length > 0 && groupedStops[0].passengers.length > 0) {
      const nextPassengerId = groupedStops[0].passengers[0].userId;
      const nextPassenger = rideDetails?.passengers?.find(
        (p: any) => p.passengerId === nextPassengerId,
      );

      const distance =
        nextPassenger?.distanceFromDriverKm ?? activeRide?.distanceKm ?? 3.8;
      const eta = nextPassenger?.etaMinutes ?? activeRide?.etaMinutes ?? 5;

      return {
        passengerName: groupedStops[0].passengers[0].passengerName,
        distanceKm: distance,
        etaMinutes: eta,
      };
    }
    return {
      passengerName: 'Destination',
      distanceKm: activeRide?.distanceKm || 0,
      etaMinutes: activeRide?.etaMinutes || 0,
    };
  }, [groupedStops, activeRide, rideDetails]);

  const vehicleInfo = useMemo<DriverVehicleInfo>(() => {
    const v = rideDetails?.vehicle;
    return {
      model: v ? `${v.company} ${v.model}`.trim() : 'Unknown Vehicle',
      batteryPercentage: 100,
    };
  }, [rideDetails?.vehicle]);

  const driverDetails = useMemo<DriverDetails>(() => {
    const d = rideDetails?.driver || {};
    const v = rideDetails?.vehicle;
    return {
      id: d.id || 'driver-1',
      name: d.name || 'Driver',
      avatar: d.photoUrl,
      rating: d.rating || 4.9,
      vehicleModel: v ? `${v.company} ${v.model}`.trim() : 'Unknown Vehicle',
      phone: d.phoneNumber,
    };
  }, [rideDetails]);

  const passengerTimeline = useMemo<PassengerTimelineItem[]>(() => {
    if (!rideDetails?.stops) return [];
    return rideDetails.stops.map((stop: any, index: number) => ({
      id: `tl-${stop.id || index}`,
      title: stop.stopName,
      subtitle: stop.arrivalTime
        ? new Date(stop.arrivalTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '',
      isPending: true,
      isFinalDestination: index === rideDetails.stops.length - 1,
    }));
  }, [rideDetails?.stops]);

  const handleCall = useCallback((phone?: string) => {
    if (!phone) return;
    const sanitized = phone.replace(/[^0-9+]/g, '');
    const url = `${Platform.OS === 'ios' ? 'telprompt' : 'tel'}:${sanitized}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) Linking.openURL(url);
        else
          showNotification(
            NotificationType.WARNING,
            'Calling Unavailable',
            'Dialer not supported.',
          );
      })
      .catch(() => {});
  }, []);

  return {
    isPassenger,
    isLiveLocationEnabled,
    handleBack: useCallback(() => navigation.goBack(), [navigation]),
    handleToggleLiveLocation: setLiveLocationEnabled,
    handleSafetyCenterPress: useCallback(
      () => navigation.navigate('HelpAndSupport'),
      [navigation],
    ),
    nextStop,
    groupedStops,
    vehicleInfo,
    handleDriverChatPress: useCallback(
      (stop: DriverStop) => {
        navigation.navigate('ChatDetails', {
          userId: stop.userId,
          name: stop.passengerName,
          avatarUri: stop.passengerAvatar,
          rideId: route.params?.rideId,
        });
      },
      [navigation, route.params?.rideId],
    ),
    handleDriverCallPress: useCallback(
      (stop: DriverStop) => handleCall(stop.phone),
      [handleCall],
    ),
    passengerEtaMinutes: activeRide?.etaMinutes || 5,
    passengerDistanceKm: activeRide?.distanceKm || 3.8,
    driverDetails,
    passengerTimeline,
    handlePassengerChatPress: useCallback(() => {
      navigation.navigate('ChatDetails', {
        userId: driverDetails.id,
        name: driverDetails.name,
        avatarUri: driverDetails.avatar,
        rideId: route.params?.rideId,
      });
    }, [navigation, driverDetails, route.params?.rideId]),
    handlePassengerCallPress: useCallback(
      () => handleCall(driverDetails.phone),
      [handleCall, driverDetails.phone],
    ),
    nextStopName: useMemo(() => {
      if (!rideDetails?.stops || rideDetails.stops.length === 0) return '';
      const name =
        rideDetails.stops[0].stopName || rideDetails.stops[0].name || '';
      return name.split(',')[0].trim();
    }, [rideDetails?.stops]),
  };
};
