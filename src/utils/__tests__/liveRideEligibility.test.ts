import { LiveRideStatus } from '@/constants/liveLocation';
import { ActiveRideRole } from '@/navigation/types.d';
import { isTrackingEligible } from '@/utils/liveRideEligibility';

const ride = { hasActiveRide: true, rideId: '123', role: ActiveRideRole.DRIVER, status: LiveRideStatus.STARTED };
describe('ride tracking eligibility', () => {
  it('accepts upcoming and active rides for drivers and passengers', () => {
    for (const status of ['CREATED', 'SCHEDULED', 'CONFIRMED', 'STARTED', 'ACTIVE']) {
      expect(isTrackingEligible({ ...ride, status })).toBe(true);
      expect(isTrackingEligible({ ...ride, role: ActiveRideRole.PASSENGER, status })).toBe(true);
    }
  });
  it('rejects terminal rides', () => {
    for (const status of ['COMPLETED', 'CANCELLED', 'REJECTED']) {
      expect(isTrackingEligible({ ...ride, status })).toBe(false);
    }
  });
  it('rejects missing ride or role', () => {
    expect(isTrackingEligible(null)).toBe(false);
    expect(isTrackingEligible({ ...ride, role: undefined })).toBe(false);
  });
});
