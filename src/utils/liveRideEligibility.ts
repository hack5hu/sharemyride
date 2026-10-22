import { LiveRideStatus } from '@/constants/liveLocation';
import { ActiveRideRole } from '@/navigation/types.d';
import type { ActiveRideLiveInfo } from '@/store/liveRideTypes';

const TERMINAL_STATUSES = new Set<string>([
  LiveRideStatus.COMPLETED,
  LiveRideStatus.CANCELLED,
  LiveRideStatus.REJECTED,
]);
const TRACKING_ROLES = new Set<ActiveRideRole>([
  ActiveRideRole.DRIVER,
  ActiveRideRole.PASSENGER,
]);

/** A confirmed ride participant may opt in for an upcoming or active non-terminal ride. */
export const isTrackingEligible = (ride: ActiveRideLiveInfo | null): boolean => {
  const status = (ride?.status || '').toUpperCase();

  return Boolean(ride?.rideId && ride.role && TRACKING_ROLES.has(ride.role) &&
    status.length > 0 && !TERMINAL_STATUSES.has(status));
};
