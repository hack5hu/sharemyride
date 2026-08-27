import { ActiveRideRole } from '@/navigation/types.d';
import { ActiveRideLiveInfo } from './useLiveRideStore';

export const sanitizeMetric = (
  val: number | null | undefined,
): number | undefined => {
  if (val === null || val === undefined || isNaN(Number(val))) return undefined;
  const num = Number(val);
  if (num < 0) return undefined;
  return num;
};

export const formatLiveLocationNotificationBody = (
  etaMinutes: number | undefined | null,
  distanceKm: number | undefined | null,
  fallbackMsg: string,
  trackingTemplate?: string,
): string => {
  const hasEta = etaMinutes !== undefined && etaMinutes !== null;
  const hasDistance =
    distanceKm !== undefined && distanceKm !== null && Number(distanceKm) > 0;

  if (hasEta && hasDistance) {
    const minText = etaMinutes === 1 ? 'min' : 'mins';
    const etaStr = `${etaMinutes} ${minText}`;
    const distStr = `${Number(distanceKm).toFixed(1)} km away`;

    if (trackingTemplate) {
      return trackingTemplate
        .replace('{{eta}}', etaStr)
        .replace('{{distance}}', distStr);
    }
    return `ETA: ${etaStr} • ${distStr}`;
  }

  if (hasEta) {
    const minText = etaMinutes === 1 ? 'min' : 'mins';
    return `ETA: ${etaMinutes} ${minText}`;
  }

  if (hasDistance) {
    return `${Number(distanceKm).toFixed(1)} km away`;
  }

  return fallbackMsg;
};

export const computeDynamicSubtitle = (
  etaMinutes: number | undefined | null,
  distanceKm: number | undefined | null,
  startTime?: string,
): string | undefined => {
  if (etaMinutes !== undefined && etaMinutes !== null) {
    const distPart =
      distanceKm !== undefined &&
      distanceKm !== null &&
      Number(distanceKm) > 0
        ? ` • ${Number(distanceKm).toFixed(1)} km`
        : '';
    return `${etaMinutes} mins away${distPart}`;
  }

  if (startTime) {
    try {
      const startDate = new Date(startTime);
      const now = new Date();
      const diffMinutes = Math.round(
        (startDate.getTime() - now.getTime()) / (1000 * 60),
      );
      const formattedTime = startDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      if (diffMinutes > 0 && diffMinutes <= 60) {
        return `Starts in ${diffMinutes} mins • ${formattedTime}`;
      } else if (diffMinutes > 60 && diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        return `Starts in ${hours}h ${mins > 0 ? `${mins}m ` : ''}• ${formattedTime}`;
      } else {
        return `Scheduled for ${formattedTime}`;
      }
    } catch {
      return undefined;
    }
  }

  return undefined;
};

export const parseLiveRidePayload = (data: any): ActiveRideLiveInfo | null => {
  if (!data || !data.rideFound || !data.ride) return null;

  const role =
    String(data.role || data.ride.role || '').toUpperCase() === 'PASSENGER'
      ? ActiveRideRole.PASSENGER
      : ActiveRideRole.DRIVER;

  const isStarted =
    data.ride.rideStatus === 'STARTED' || data.ride.rideStatus === 'ACTIVE';

  const firstPassenger = data.ride.passengers?.[0];
  const passengerDistance =
    firstPassenger?.distanceFromDriverKm ??
    firstPassenger?.distanceKm ??
    firstPassenger?.distance;
  const passengerEta = firstPassenger?.etaMinutes ?? firstPassenger?.eta;

  const rawDistance =
    data.distanceKm ??
    data.distance ??
    data.ride.distanceKm ??
    data.ride.distance ??
    passengerDistance;

  const rawEta =
    data.etaMinutes ??
    data.eta ??
    data.ride.etaMinutes ??
    data.ride.eta ??
    passengerEta;

  const distanceKm = sanitizeMetric(rawDistance);
  let etaMinutes = sanitizeMetric(rawEta);

  if (etaMinutes === undefined && data.ride.startTime) {
    try {
      const start = new Date(data.ride.startTime).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.round((start - now) / 60000));
      etaMinutes = diff > 0 ? diff : undefined;
    } catch {}
  }

  const dynamicSubtitle = computeDynamicSubtitle(
    etaMinutes,
    distanceKm,
    data.ride.startTime,
  );

  return {
    hasActiveRide: true,
    rideId: data.ride.rideId ? String(data.ride.rideId) : undefined,
    role,
    status: data.ride.rideStatus || 'CREATED',
    message: isStarted
      ? 'Active Ride in Progress'
      : 'Your ride is about to start!',
    subtitle: dynamicSubtitle,
    etaMinutes,
    distanceKm,
    startTime: data.ride.startTime,
    rideDetails: data.ride,
  };
};
