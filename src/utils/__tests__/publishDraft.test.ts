import { RideType } from '@/constants/enums';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { restorePublishDraft } from '@/utils/publishDraft';
import { makePublishSnapshot } from '../__fixtures__/publish';

beforeEach(() => useRidePublishStore.getState().clearPublishState());
describe('Draft restoration and invalidation', () => {
  it('restores city mode, saved dates, and one consistent fare with premium', () => {
    const draft = makePublishSnapshot(RideType.LOCAL, [2000]);
    draft.price = 50;
    draft.premiumEnabled = true;
    draft.premiumPercentage = 10;
    restorePublishDraft(draft, 'draft-1');
    expect(useRidePublishStore.getState()).toMatchObject({
      rideType: RideType.LOCAL,
      price: 50,
      fullJourneyPrice: 50,
      frontSeatPrice: 55,
      premiumEnabled: true,
      editingDraftId: 'draft-1',
      middleStops: [],
      departureDates: ['2099-01-01'],
      segmentPrices: { 'seg-0': 50 },
    });
  });
  it('treats legacy drafts as intercity and restores their single date', () => {
    const {
      rideType: _rideType,
      departureDates: _dates,
      ...legacy
    } = makePublishSnapshot();
    restorePublishDraft(legacy);
    expect(useRidePublishStore.getState()).toMatchObject({
      rideType: RideType.INTERCITY,
      departureDates: ['2099-01-01'],
      fullJourneyPrice: 50,
    });
  });
  it('normalizes saved city prices that exceed the revised bounds', () => {
    const draft = makePublishSnapshot(RideType.LOCAL, [8000]);
    draft.price = 70;
    restorePublishDraft(draft);
    expect(useRidePublishStore.getState().price).toBe(50);
  });
  it('clears all fare totals when the ride type, route, or vehicle changes', () => {
    const draft = makePublishSnapshot();
    restorePublishDraft(draft);
    useRidePublishStore.getState().setRideType(RideType.LOCAL);
    expect(useRidePublishStore.getState()).toMatchObject({
      routeDetails: null,
      selectedRoute: null,
      price: 0,
      fullJourneyPrice: 0,
      frontSeatPrice: 0,
      segmentPrices: {},
      middleStops: [],
      premiumEnabled: false,
    });
    restorePublishDraft(draft);
    useRidePublishStore.getState().setPublishVehicleType('7');
    expect(useRidePublishStore.getState().price).toBe(0);
    restorePublishDraft(draft);
    useRidePublishStore.getState().setRouteDetails(null);
    expect(useRidePublishStore.getState().fullJourneyPrice).toBe(0);
  });
});
