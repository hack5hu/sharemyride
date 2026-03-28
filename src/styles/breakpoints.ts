import { SCREEN_WIDTH, isTablet } from './scale';

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414 && !isTablet;

export const selectBySize = <T>(values: {
  small?: T;
  medium?: T;
  large?: T;
  tablet?: T;
  default: T;
}): T => {
  if (isTablet && values.tablet !== undefined) return values.tablet;
  if (isLargeDevice && values.large !== undefined) return values.large;
  if (isMediumDevice && values.medium !== undefined) return values.medium;
  if (isSmallDevice && values.small !== undefined) return values.small;
  return values.default;
};

// Backwards compatibility alias
export const selectByWidth = selectBySize;
