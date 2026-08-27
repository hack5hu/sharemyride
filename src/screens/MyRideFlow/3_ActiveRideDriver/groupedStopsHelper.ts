import {
  DriverStop,
  DriverStopStatus,
  GroupedStop,
} from '@/components/templates/ActiveRideDriverTemplate';
import {
  calculateDistanceKm,
  formatPassengerStopProgress,
} from './activeRideHelpers';

export const buildGroupedStops = (
  rideDetails: any,
  activeRide: any,
): GroupedStop[] => {
  if (!rideDetails?.passengers || !rideDetails?.stops) return [];

  const stopMap = new Map<number | string, DriverStop[]>();
  rideDetails.passengers.forEach((p: any) => {
    const pStopId = p.sourceStopId;
    if (!stopMap.has(pStopId)) stopMap.set(pStopId, []);

    const stopObj = rideDetails.stops.find((s: any) => s.id === pStopId);
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

    let computedKm = calculateDistanceKm(pLat, pLon, stopLat, stopLon);

    if (computedKm === null && activeRide?.distanceKm) {
      computedKm = activeRide.distanceKm;
    }

    const rawDist =
      p.distanceToPickupKm ??
      p.distanceFromDriverKm ??
      p.distanceFromStopKm ??
      p.distanceFromStop ??
      p.distanceKm ??
      computedKm;

    const rawEta =
      p.etaToPickupMinutes ??
      p.etaMinutes ??
      p.etaMinutesToStop ??
      p.etaToStopMinutes ??
      p.eta ??
      activeRide?.etaMinutes;

    const distanceAway = formatPassengerStopProgress(
      rawDist,
      rawEta,
      stopObj?.arrivalTime || rideDetails?.startTime,
    );

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
      distanceKm:
        rawDist !== null && rawDist !== undefined ? Number(rawDist) : undefined,
      etaMinutes:
        rawEta !== null && rawEta !== undefined ? Number(rawEta) : undefined,
      seatCount: p.seatCount || p.seats || p.seatIds?.length || 1,
    });
  });

  const groups: GroupedStop[] = [];
  rideDetails.stops.forEach((s: any) => {
    const pass = stopMap.get(s.id);
    if (pass && pass.length > 0) {
      groups.push({
        stopId: s.id,
        stopName: s.stopName,
        lat: s.lat ?? s.latitude,
        lon: s.lon ?? s.longitude ?? s.lng,
        passengers: pass,
      });
    }
  });

  return groups;
};
