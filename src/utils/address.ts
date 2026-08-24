/**
 * Address formatting utilities for Ola Maps addresses.
 *
 * Ola Maps `formatted_address` follows this structure:
 *   "[Place], [Internal Detail], [Building], [Area], [City], [State], [Pincode], [Country]"
 *
 * These helpers strip noise and return what a rider needs to physically
 * find the location.
 */

/** Matches a 5-6 digit Indian pincode. */
const PINCODE_REGEX = /^\d{5,6}$/;

/** Matches internal venue details like "7th Floor", "Platform 2-3". */
const INTERNAL_DETAIL_REGEX =
  /^((\d+\w*\s*)?(floor|platform|gate|wing|level)\s*[a-z0-9-]*|level\s*\d+)$/i;

/**
 * Matches parts that refer to a physical building/structure.
 * When found, everything before it (business names) can be dropped
 * because the building IS the navigation target.
 */
const BUILDING_KEYWORD_REGEX =
  /\b(building|tower|complex|mall|plaza|centre|center|bhawan|bhavan|arcade|mansion|heights|enclave)\b/i;

/** Country names to strip. */
const COUNTRIES = new Set(['india', 'भारत']);

/** Indian state / UT names to strip (lowercase). */
const STATES = new Set([
  'andhra pradesh',
  'arunachal pradesh',
  'assam',
  'bihar',
  'chhattisgarh',
  'goa',
  'gujarat',
  'haryana',
  'himachal pradesh',
  'jharkhand',
  'karnataka',
  'kerala',
  'madhya pradesh',
  'maharashtra',
  'manipur',
  'meghalaya',
  'mizoram',
  'nagaland',
  'odisha',
  'punjab',
  'rajasthan',
  'sikkim',
  'tamil nadu',
  'telangana',
  'tripura',
  'uttar pradesh',
  'uttarakhand',
  'west bengal',
  'delhi',
  'new delhi',
  'jammu and kashmir',
  'ladakh',
  'chandigarh',
  'puducherry',
  'lakshadweep',
  'dadra and nagar haveli and daman and diu',
  'andaman and nicobar islands',
  // Short state/UT codes
  'up',
  'hr',
  'dl',
  'ka',
  'mh',
  'tn',
  'ts',
  'wb',
  'rj',
  'mp',
  'gj',
  'pb',
  'uk',
  'ut',
  'ap',
  'br',
  'cg',
  'ga',
  'hp',
  'jh',
  'kl',
  'ml',
  'mn',
  'mz',
  'nl',
  'od',
  'or',
  'py',
  'sk',
  'tr',
]);

/** Returns true if a part is tail noise (country, state, pincode, or combined state+pincode). */
const isTailNoise = (part: string): boolean => {
  const clean = part.trim().toLowerCase();
  if (COUNTRIES.has(clean) || STATES.has(clean) || PINCODE_REGEX.test(clean)) {
    return true;
  }
  // Check combined state + pincode (e.g., "UP 201301", "Haryana 122001")
  const subParts = clean.split(/\s+/);
  if (
    subParts.length === 2 &&
    (STATES.has(subParts[0]) || COUNTRIES.has(subParts[0])) &&
    PINCODE_REGEX.test(subParts[1])
  ) {
    return true;
  }
  return false;
};

/** Returns true if a part is an internal venue detail. */
const isInternalDetail = (part: string): boolean =>
  INTERNAL_DETAIL_REGEX.test(part);

/**
 * Formats a full Ola Maps address for compact display.
 *
 * Strategy:
 *  1. Strip tail noise (country, state, pincode).
 *  2. Strip internal venue details (floors, platforms).
 *  3. If a building/tower keyword is found after the first
 *     part, drop everything before it — the business name is
 *     redundant when you have the building.
 *  4. If NO building keyword exists, the first part IS the
 *     physical landmark — keep everything.
 *
 * @example
 * // Building detected → drop business name, keep from building
 * formatDisplayAddress(
 *   "Cars24 Corporate Head Office, 7th Floor, SAS Building Tower C, Sector 67, Noida, Uttar Pradesh, 201301, India"
 * )
 * // => "SAS Building Tower C, Sector 67, Noida"
 *
 * @example
 * // No building → first part IS the landmark, keep all
 * formatDisplayAddress(
 *   "Nattho Yadav Lassi Wale, Ghiya Mandi, Chowk Bazar, Mathura, Uttar Pradesh, 281001, India"
 * )
 * // => "Nattho Yadav Lassi Wale, Ghiya Mandi, Chowk Bazar, Mathura"
 */
export const formatDisplayAddress = (
  address: string | null | undefined,
): string => {
  if (!address) return '';

  const parts = address
    .split(',')
    .map(p => p.trim())
    .filter(Boolean);

  // Step 1: strip tail noise (country, state, pincode)
  const withoutTail = parts.filter(part => !isTailNoise(part));
  if (withoutTail.length === 0) return address;

  // Step 2: strip internal venue details (floors, platforms)
  const meaningful = withoutTail.filter(
    part => !isInternalDetail(part),
  );
  if (meaningful.length === 0) return withoutTail.join(', ');

  // Step 3: if a building/tower exists after index 0,
  // drop the business name(s) before it
  if (meaningful.length > 1) {
    const buildingIdx = meaningful.findIndex(
      (part, idx) => idx > 0 && BUILDING_KEYWORD_REGEX.test(part),
    );

    if (buildingIdx > 0) {
      return meaningful.slice(buildingIdx).join(', ');
    }
  }

  // No building found — the first part IS the landmark
  return meaningful.join(', ');
};

/**
 * Returns just the first comma-separated part (the place name).
 * Useful for compact single-line labels like ride cards / banners.
 *
 * @example
 * getShortLocationName("Mathura Railway Station, Platform 2-3, ...")
 * // => "Mathura Railway Station"
 */
export const getShortLocationName = (
  address: string | null | undefined,
): string => {
  if (!address) return '';
  return address.split(',')[0].trim();
};
