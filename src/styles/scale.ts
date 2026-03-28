import { Dimensions, PixelRatio } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

const BASE_WIDTH = 375; // Using standard iPhone width as base
const BASE_HEIGHT = 812; // Using standard iPhone height as base

export const isTablet = SCREEN_WIDTH >= 768;

/**
 * Returns a responsive width based on the given value.
 */
export const scale = (size: number) => {
  const newSize = (SCREEN_WIDTH / BASE_WIDTH) * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Returns a responsive height based on the given value.
 */
export const verticalScale = (size: number) => {
  const newSize = (SCREEN_HEIGHT / BASE_HEIGHT) * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Returns a responsive size based on the given value, with a scaling factor.
 * Good for icons, padding, and elements that shouldn't scale as aggressively as width.
 */
export const moderateScale = (size: number, factor = 0.5) => {
  const newSize = size + (scale(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Keeping existing aliases for backwards compatibility
export const responsiveHeight = verticalScale;
export const responsiveWidth = scale;
export const responsiveSize = moderateScale;

export const responsiveFont = (size: number) => {
  const factor = isTablet ? 0.3 : 0.4; // Scale fonts less on tablets to prevent giant text
  return moderateScale(size, factor);
};
