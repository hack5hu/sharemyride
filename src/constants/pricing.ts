/**
 * Centralized pricing constants for the "Ride Pool Company" application.
 */

export const PRICING_TIERS = {
  LOW: 7,
  MID: 10, // Default
  HIGH: 12,
} as const;

export type PricingTier = keyof typeof PRICING_TIERS;

export const FRONT_SEAT_MAX_PREMIUM_PERCENT = 0.1; // 10%
