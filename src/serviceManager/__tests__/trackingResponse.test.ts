import { TrackingReason } from '@/constants/liveLocation';
import { LiveLocationService } from '@/serviceManager/LiveLocationService';
import { handleTrackingResponse } from '@/serviceManager/trackingResponse';

jest.mock('@/serviceManager/LiveLocationService', () => ({ LiveLocationService: {
  getTrackingState: jest.fn(), stopTracking: jest.fn(),
} }));

describe('successful cancellation response', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(LiveLocationService.getTrackingState).mockResolvedValue({
      isTracking: true, rideId: '123', sessionId: 'session', reason: TrackingReason.NONE, lastTimestamp: 0,
    });
  });
  it('stops the matching ride immediately', async () => {
    await handleTrackingResponse('/ride/123/cancel?reason=changed');
    expect(LiveLocationService.stopTracking).toHaveBeenCalledWith(TrackingReason.INELIGIBLE, 'session');
  });
  it('does not stop a different ride or a cancelled passenger booking', async () => {
    await handleTrackingResponse('/ride/456/cancel');
    await handleTrackingResponse('/ride/booking/123/cancel');
    expect(LiveLocationService.stopTracking).not.toHaveBeenCalled();
  });
});
