import { responsiveSize } from './responsive';

const BASE_SPACING = 8;

/**
 * Core spacing scale
 * ❗ Always use these directly in styled-components
 */
export const Spacing = {
  XS: responsiveSize(BASE_SPACING * 0.5), // 4
  SM: responsiveSize(BASE_SPACING), // 8
  MD: responsiveSize(BASE_SPACING * 2), // 16
  LG_20: responsiveSize(BASE_SPACING * 2.5), // 20
  LG: responsiveSize(BASE_SPACING * 3), // 24
  XL: responsiveSize(BASE_SPACING * 4), // 32
  XXL: responsiveSize(BASE_SPACING * 5), // 40
};

/**
 * Margin helpers
 * ❗ Pass RAW numbers only (NOT Spacing.MD)
 */
export const Margin = {
  ALL: (v: number) => ({ margin: responsiveSize(v) }),
  V: (v: number) => ({ marginVertical: responsiveSize(v) }),
  H: (v: number) => ({ marginHorizontal: responsiveSize(v) }),
  T: (v: number) => ({ marginTop: responsiveSize(v) }),
  B: (v: number) => ({ marginBottom: responsiveSize(v) }),
  L: (v: number) => ({ marginLeft: responsiveSize(v) }),
  R: (v: number) => ({ marginRight: responsiveSize(v) }),
};

/**
 * Padding helpers
 * ❗ Pass RAW numbers only (NOT Spacing.MD)
 */
export const Padding = {
  ALL: (v: number) => ({ padding: responsiveSize(v) }),
  V: (v: number) => ({ paddingVertical: responsiveSize(v) }),
  H: (v: number) => ({ paddingHorizontal: responsiveSize(v) }),
  T: (v: number) => ({ paddingTop: responsiveSize(v) }),
  B: (v: number) => ({ paddingBottom: responsiveSize(v) }),
  L: (v: number) => ({ paddingLeft: responsiveSize(v) }),
  R: (v: number) => ({ paddingRight: responsiveSize(v) }),
};

/**
 * Gap tokens (for flex gap usage)
 */
export const Gap = {
  XS: Spacing.XS,
  SM: Spacing.SM,
  MD: Spacing.MD,
  LG: Spacing.LG,
  XL: Spacing.XL,
};
