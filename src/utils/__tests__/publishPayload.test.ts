import { RideType } from '@/constants/enums';
import {
  buildPublishRidePayload,
  PublishValidationError,
} from '@/screens/PublishFlow/9_SummaryPublish/utils/publishPayloadBuilder';
import { isPublishDistanceValid } from '@/utils/publishRouteValidation';
import { makePublishSnapshot } from '../__fixtures__/publish';

describe('Publish payload validation and fare consistency', () => {
  it('publishes consistent full and cumulative stop totals', () => {
    const payload = buildPublishRidePayload(makePublishSnapshot());
    expect(payload.routeStops.map(stop => stop.priceFromPreviousStop)).toEqual([
      0, 25, 50,
    ]);
    expect(payload.fullJourneyPrice).toBe('50');
    expect(payload.frontSeatPrice).toBe('60');
    expect(payload.routeStops[2].frontSeatPriceFromPreviousStop).toBe(60);
    expect(payload.routeStops[2].arrivalTime).toBe(payload.endTime);
    expect(payload.rideType).toBe(RideType.INTERCITY);
  });
  it('keeps a short city fare at 50 at both ends of the contract when premium disabled', () => {
    const state = makePublishSnapshot(RideType.LOCAL, [2000]);
    state.price = 50;
    state.premiumEnabled = false;
    const payload = buildPublishRidePayload(state);
    expect(payload.fullJourneyPrice).toBe('50');
    expect(payload.frontSeatPrice).toBe('50');
    expect(payload.routeStops[1].priceFromPreviousStop).toBe(50);
    expect(payload.rideType).toBe(RideType.LOCAL);
  });
  it('applies ₹5 rounded front seat premium to city rides when enabled', () => {
    const state = makePublishSnapshot(RideType.LOCAL, [2000]);
    state.price = 50;
    state.premiumEnabled = true;
    state.premiumPercentage = 10;
    const payload = buildPublishRidePayload(state);
    expect(payload.fullJourneyPrice).toBe('50');
    expect(payload.frontSeatPrice).toBe('55');
    expect(payload.routeStops[1].frontSeatPriceFromPreviousStop).toBe(55);
  });
  it('rebuilds stale per-leg minimum fares instead of overcharging', () => {
    const state = makePublishSnapshot();
    state.segmentPrices = { 'seg-0': 50, 'seg-1': 50 };
    expect(
      buildPublishRidePayload(state).routeStops[2].priceFromPreviousStop,
    ).toBe(50);
  });
  it.each([1999, 0, NaN, Infinity])(
    'rejects ineligible city road distance %s',
    distance => {
      const state = makePublishSnapshot(RideType.LOCAL, [distance]);
      state.price = 50;
      expect(() => buildPublishRidePayload(state)).toThrow(
        PublishValidationError.INVALID_ROUTE,
      );
    },
  );
  it('checks road-distance thresholds exactly, before display rounding', () => {
    expect(isPublishDistanceValid(2000, RideType.LOCAL)).toBe(true);
    expect(isPublishDistanceValid(4999, RideType.INTERCITY)).toBe(false);
    expect(isPublishDistanceValid(5000, RideType.INTERCITY)).toBe(true);
  });
  it('rejects routes with missing legs or geometry', () => {
    const state = makePublishSnapshot();
    state.routeDetails!.legs.pop();
    expect(() => buildPublishRidePayload(state)).toThrow(
      PublishValidationError.INVALID_ROUTE,
    );
    const noGeometry = makePublishSnapshot();
    noGeometry.selectedRoute = null;
    expect(() => buildPublishRidePayload(noGeometry)).toThrow(
      PublishValidationError.INVALID_ROUTE,
    );
  });
  it.each([35, 70, 41])(
    'rejects city price %s outside the 8 km bounds or increment',
    price => {
      const state = makePublishSnapshot(RideType.LOCAL, [8000]);
      state.price = price;
      expect(() => buildPublishRidePayload(state)).toThrow(
        PublishValidationError.INVALID_PRICE,
      );
    },
  );
  it('validates every departure date and malformed times', () => {
    const state = makePublishSnapshot();
    state.departureDates.push('2000-01-01');
    expect(() => buildPublishRidePayload(state)).toThrow(
      PublishValidationError.INVALID_SCHEDULE,
    );
    state.departureDates = ['2099-01-01'];
    state.departureTime = '13:90 AM';
    expect(() => buildPublishRidePayload(state)).toThrow(
      PublishValidationError.INVALID_SCHEDULE,
    );
  });
});
