import { Platform } from 'react-native';
import { responsiveFont, isSmallDevice, selectByWidth } from './responsive';

const IOS_BASE = 16;
const ANDROID_BASE = 16;

/**
 * Slightly reduce on very small phones, slightly increase on tablets
 */
const BASE_FONT = selectByWidth({
  small: Platform.OS === 'ios' ? 14 : 13,
  tablet: 18,
  default: Platform.OS === 'ios' ? IOS_BASE : ANDROID_BASE,
});

/**
 * Font sizes
 * - Uses responsiveFont (NOT moderateScale)
 * - Safe for readability
 */
export const FontSize = {
  XS: responsiveFont(BASE_FONT * 0.75),
  SM: responsiveFont(BASE_FONT * 0.875),
  MD: responsiveFont(BASE_FONT),
  LG: responsiveFont(BASE_FONT * 1.25),
  XL: responsiveFont(BASE_FONT * 1.5),
  XXL: responsiveFont(BASE_FONT * 2),
};

/**
 * Line heights
 * - Derived from final font size
 * - Platform-safe
 */
export const LineHeight = {
  XS: Math.round(FontSize.XS * 1.4),
  SM: Math.round(FontSize.SM * 1.4),
  MD: Math.round(FontSize.MD * 1.45),
  LG: Math.round(FontSize.LG * 1.4),
  XL: Math.round(FontSize.XL * 1.35),
  XXL: Math.round(FontSize.XXL * 1.3),
};

export const FontWeight = {
  REGULAR: '400' as const,
  MEDIUM: '500' as const,
  SEMI_BOLD: '600' as const,
  BOLD: '700' as const,
};