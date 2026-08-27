import { useMemo, useCallback, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useRoute } from '@react-navigation/native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { ActiveRideRole } from '@/navigation/types.d';
import { useLiveRideStore } from '@/store/useLiveRideStore';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import {
  DriverStop,
  NextStopInfo,
  DriverVehicleInfo,
  GroupedStop,
} from '@/components/templates/ActiveRideDriverTemplate';
import {
  PassengerTimelineItem,
  DriverDetails,
} from '@/components/templates/ActiveRidePassengerTemplate';
import { ActiveRideRouteProp, UseActiveRideReturn } from './types.d';
import { buildGroupedStops } from './groupedStopsHelper';
import { getReadableColorName } from './activeRideHelpers';

export const useActiveRideDriver = (): UseActiveRideReturn => {
  const navigation = useAppNavigation();
  const route = useRoute<ActiveRideRouteProp>();

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
    }, 30000);
    return () => clearInterval(intervalId);
  }, [fetchLiveStatus]);

  const groupedStops = useMemo<GroupedStop[]>(() => {
    return buildGroupedStops(rideDetails, activeRide);
  }, [rideDetails, activeRide]);

  const nextStop = useMemo<NextStopInfo>(() => {
    if (groupedStops.length > 0 && groupedStops[0].passengers.length > 0) {
      const nextPassengerId = groupedStops[0].passengers[0].userId;
      const nextPassenger = rideDetails?.passengers?.find(
        (p: any) => p.passengerId === nextPassengerId,
      );
      const rawDist = nextPassenger?.distanceToPickupKm ?? nextPassenger?.distanceFromDriverKm ?? activeRide?.distanceKm;
      const rawEta = nextPassenger?.etaToPickupMinutes ?? nextPassenger?.etaMinutes ?? activeRide?.etaMinutes;
      return {
        passengerName: groupedStops[0].passengers[0].passengerName,
        distanceKm: rawDist !== null && rawDist !== undefined ? Number(rawDist) : 0,
        etaMinutes: rawEta !== null && rawEta !== undefined ? Number(rawEta) : 0,
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
      company: v?.company?.trim() || 'Active',
      model: v?.model?.trim() || 'Vehicle',
      licensePlate: v?.licensePlate || v?.registrationNumber || v?.number,
      color: getReadableColorName(v?.color),
      fuelType: v?.fuelType,
      batteryPercentage: v?.batteryPercentage !== undefined ? Number(v.batteryPercentage) : undefined,
      type: v?.type ? v.type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) : undefined,
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
        ? new Date(stop.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '',
      isPending: true,
      isFinalDestination: index === rideDetails.stops.length - 1,
      lat: stop.lat,
      lon: stop.lon,
    }));
  }, [rideDetails?.stops]);

  const handleCall = useCallback((phone?: string) => {
    if (!phone) return;
    const sanitized = phone.replace(/[^0-9+]/g, '');
    const url = `${Platform.OS === 'ios' ? 'telprompt' : 'tel'}:${sanitized}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) Linking.openURL(url);
      else showNotification(NotificationType.WARNING, 'Calling Unavailable', 'Dialer not supported.');
    }).catch(() => {});
  }, []);

  const handleCopyLocation = useCallback((address: string) => {
    if (!address) return;
    Clipboard.setString(address);
    showNotification(NotificationType.SUCCESS, 'Address Copied', address);
  }, []);

  const handleOpenMap = useCallback((lat?: number, lon?: number, address?: string) => {
    let url = '';
    if (lat && lon) {
      url = Platform.select({
        ios: `maps:0,0?q=${encodeURIComponent(address || 'Location')}@${lat},${lon}`,
        android: `geo:0,0?q=${lat},${lon}(${encodeURIComponent(address || 'Location')})`,
      }) || `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    } else if (address) {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
    if (!url) return;
    Linking.openURL(url).catch(() => {
      showNotification(NotificationType.ERROR, 'Map Error', 'Could not open maps application.');
    });
  }, []);

  return {
    isPassenger,
    isLiveLocationEnabled,
    handleBack: useCallback(() => navigation.goBack(), [navigation]),
    handleToggleLiveLocation: setLiveLocationEnabled,
    handleSafetyCenterPress: useCallback(() => navigation.navigate('HelpAndSupport'), [navigation]),
    nextStop,
    groupedStops,
    vehicleInfo,
    handleDriverChatPress: useCallback((stop: DriverStop) => {
      navigation.navigate('ChatDetails', { userId: stop.userId, name: stop.passengerName, avatarUri: stop.passengerAvatar, rideId: route.params?.rideId });
    }, [navigation, route.params?.rideId]),
    handleDriverCallPress: useCallback((stop: DriverStop) => handleCall(stop.phone), [handleCall]),
    passengerEtaMinutes: activeRide?.etaMinutes || 0,
    passengerDistanceKm: activeRide?.distanceKm || 0,
    driverDetails,
    passengerTimeline,
    handlePassengerChatPress: useCallback(() => {
      navigation.navigate('ChatDetails', { userId: driverDetails.id, name: driverDetails.name, avatarUri: driverDetails.avatar, rideId: route.params?.rideId });
    }, [navigation, driverDetails, route.params?.rideId]),
    handlePassengerCallPress: useCallback(() => handleCall(driverDetails.phone), [handleCall, driverDetails.phone]),
    nextStopName: useMemo(() => {
      if (!rideDetails?.stops || rideDetails.stops.length === 0) return '';
      const name = rideDetails.stops[0].stopName || rideDetails.stops[0].name || '';
      return name.trim();
    }, [rideDetails?.stops]),
    nextStopLat: rideDetails?.stops?.[0]?.lat,
    nextStopLon: rideDetails?.stops?.[0]?.lon,
    handleCopyLocation,
    handleOpenMap,
  };
};
