import { RideType } from '@/constants/enums';
import { PricingBound } from '@/constants/pricingPolicy';
import {
  calculateIntracityPrice,
  calculateSmartPrice,
  calculateFrontSeatPrice,
  isRecommendedPrice,
} from '../pricing';

describe('Pricing Engine', () => {
  describe('Intracity (Local) 3-band cumulative pricing', () => {
    it('calculates suggested fare correctly for pilot distance bands', () => {
      expect(calculateIntracityPrice(5, PricingBound.MID, '5')).toBe(50);
      expect(calculateIntracityPrice(10, PricingBound.MID, '5')).toBe(50);
      expect(calculateIntracityPrice(15, PricingBound.MID, '5')).toBe(75);
      expect(calculateIntracityPrice(20, PricingBound.MID, '5')).toBe(95);
      expect(calculateIntracityPrice(25, PricingBound.MID, '5')).toBe(120);
      expect(calculateIntracityPrice(30, PricingBound.MID, '5')).toBe(130);
      expect(calculateIntracityPrice(40, PricingBound.MID, '5')).toBe(155);
      expect(calculateIntracityPrice(50, PricingBound.MID, '5')).toBe(180);
    });

    it('enforces flat base fare of ₹50 for distances up to 10 km', () => {
      expect(calculateIntracityPrice(1, PricingBound.MID, '5')).toBe(50);
      expect(calculateIntracityPrice(4, PricingBound.MID, '5')).toBe(50);
      expect(calculateIntracityPrice(7, PricingBound.MID, '5')).toBe(50);
      expect(calculateIntracityPrice(10, PricingBound.MID, '5')).toBe(50);
    });

    it('calculates driver min/max boundary adjustments in ₹5 steps', () => {
      // For 10km (rec = 50): min is 40, max is 65
      expect(calculateIntracityPrice(10, PricingBound.MIN, '5')).toBe(40);
      expect(calculateIntracityPrice(10, PricingBound.MAX, '5')).toBe(65);

      // For 30km (rec = 130): min is 100, max is 165
      expect(calculateIntracityPrice(30, PricingBound.MIN, '5')).toBe(100);
      expect(calculateIntracityPrice(30, PricingBound.MAX, '5')).toBe(165);

      // For 50km (rec = 180): min is 135, max is 225
      expect(calculateIntracityPrice(50, PricingBound.MIN, '5')).toBe(135);
      expect(calculateIntracityPrice(50, PricingBound.MAX, '5')).toBe(225);
    });

    it('applies 1.1x multiplier for 7-seater vehicles', () => {
      // 10km * 5 = 50 * 1.1 = 55
      expect(calculateIntracityPrice(10, PricingBound.MID, '7')).toBe(55);
    });
  });

  describe('calculateSmartPrice dispatcher', () => {
    it('dispatches to intracity for RideType.LOCAL', () => {
      expect(
        calculateSmartPrice(10, RideType.LOCAL, PricingBound.MID, '5'),
      ).toBe(50);
      expect(
        calculateSmartPrice(30, RideType.LOCAL, PricingBound.MID, '5'),
      ).toBe(130);
    });

    it('dispatches to BlaBlaCar for RideType.INTERCITY', () => {
      // 100km * 2.25 = 225 -> rounded to nearest 10 = 230
      expect(
        calculateSmartPrice(100, RideType.INTERCITY, PricingBound.MID, '5'),
      ).toBe(230);
    });
  });
});

describe('Pricing boundaries', () => {
  it('rounds allowed city bounds inward', () => {
    expect(calculateIntracityPrice(8, PricingBound.MIN)).toBe(40);
    expect(calculateIntracityPrice(8, PricingBound.MAX)).toBe(65);
    for (let distance = 2; distance < 100; distance += 0.5) {
      const suggested = calculateIntracityPrice(distance);
      expect(
        calculateIntracityPrice(distance, PricingBound.MIN),
      ).toBeGreaterThanOrEqual(40);
      expect(
        calculateIntracityPrice(distance, PricingBound.MAX),
      ).toBeGreaterThanOrEqual(suggested);
    }
  });
  it.each([0, -1, NaN, Infinity])('rejects invalid distance %s', distance => {
    expect(calculateIntracityPrice(distance)).toBe(0);
  });
  it('rounds front seat premium to nearest ₹10 for intercity and ₹5 for city', () => {
    expect(calculateFrontSeatPrice(50, 10)).toBe(60);
    expect(calculateFrontSeatPrice(310, 10)).toBe(340);
    expect(calculateFrontSeatPrice(50, 10, 5)).toBe(55);
    expect(calculateFrontSeatPrice(130, 10, 5)).toBe(145);
    expect(calculateFrontSeatPrice(180, 10, 5)).toBe(200);
    expect(calculateFrontSeatPrice(25, 100)).toBe(25);
    expect(calculateFrontSeatPrice(50, -10)).toBe(50);
  });
  it('removes the recommendation badge outside the recommended range', () => {
    expect(isRecommendedPrice(230, 230)).toBe(true);
    expect(isRecommendedPrice(280, 230)).toBe(false);
  });
});
