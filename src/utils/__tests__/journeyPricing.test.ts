import { RideType } from '@/constants/enums';
import {
  allocateSegmentPrices,
  allocateFrontSeatPrices,
  buildJourneyPricing,
  premiumPercentageForAmount,
} from '@/utils/journeyPricing';
import { makeLegs } from '../__fixtures__/publish';

describe('A single quote for a whole journey', () => {
  it('does not apply the minimum fare to every leg', () => {
    expect(allocateSegmentPrices(50, makeLegs(5000, 5000))).toEqual({
      'seg-0': 25,
      'seg-1': 25,
    });
  });
  it('preserves the exact total after rounding irregular legs', () => {
    expect(allocateSegmentPrices(50, makeLegs(3333, 3333, 3334))).toEqual({
      'seg-0': 17,
      'seg-1': 16,
      'seg-2': 17,
    });
  });
  it('keeps valid custom amounts, including zero, and replaces stale amounts', () => {
    const legs = makeLegs(5000, 5000);
    expect(
      allocateSegmentPrices(50, legs, { 'seg-0': 0, 'seg-1': 50 }),
    ).toEqual({
      'seg-0': 0,
      'seg-1': 50,
    });
    expect(
      allocateSegmentPrices(50, legs, { 'seg-0': 50, 'seg-1': 50 }),
    ).toEqual({
      'seg-0': 25,
      'seg-1': 25,
    });
  });
  it('rounds the premium once and preserves full-route totals', () => {
    const quote = buildJourneyPricing(
      50,
      makeLegs(3000, 7000),
      RideType.INTERCITY,
      true,
      50,
    );
    const frontLegs = Object.values(allocateFrontSeatPrices(quote.segmentPrices, quote.premiumPercentage));
    expect(quote.premiumEnabled).toBe(true);
    expect(quote.premiumPercentage).toBe(10);
    expect(quote.frontSeatPrice).toBe(frontLegs.reduce((a, b) => a + b, 0));
    expect(quote.frontSeatPrice).toBe(60);
  });
  it('enables city premiums with ₹5 rounding increment', () => {
    expect(
      buildJourneyPricing(50, makeLegs(2000), RideType.LOCAL, true, 10),
    ).toMatchObject({
      fullJourneyPrice: 50,
      frontSeatPrice: 55,
      premiumEnabled: true,
      premiumPercentage: 10,
    });
  });
  it('maps a city premium counter change to an attainable total in ₹5 steps', () => {
    const legs = makeLegs(10000);
    const percentage = premiumPercentageForAmount(
      5,
      50,
      legs,
      {},
      RideType.LOCAL,
    );
    expect(
      buildJourneyPricing(50, legs, RideType.LOCAL, true, percentage)
        .frontSeatPrice,
    ).toBe(55);
  });
  it('maps a premium counter change to an attainable total', () => {
    const legs = makeLegs(50000, 50000);
    const percentage = premiumPercentageForAmount(12, 230, legs);
    expect(
      buildJourneyPricing(230, legs, RideType.INTERCITY, true, percentage)
        .frontSeatPrice,
    ).toBe(240);
    expect(premiumPercentageForAmount(99, 230, legs)).toBe(10);
  });
});
