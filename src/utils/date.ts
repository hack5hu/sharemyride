import { format, parse, isValid } from 'date-fns';

/**
 * Formats a DOB string as the user types, automatically adding slashes.
 * @param text Current input text
 * @param prevText Previous input text (to detect deletion)
 */
export const formatDOBInput = (text: string, prevText: string): string => {
  // Only allow digits and slashes
  let cleaned = text.replace(/[^0-9/]/g, '');

  // Handle deletion - if user is deleting a slash, let them
  if (text.length < prevText.length && prevText.endsWith('/') && !text.endsWith('/')) {
    return cleaned;
  }

  // Auto-slash logic
  if (cleaned.length === 2 && !cleaned.includes('/')) {
    cleaned += '/';
  } else if (cleaned.length === 5 && cleaned.split('/').length === 2) {
    cleaned += '/';
  }

  // Limit to 10 characters (DD/MM/YYYY)
  return cleaned.slice(0, 10);
};

/**
 * Formats a Date object to DD/MM/YYYY string.
 */
export const formatDateToDDMMYYYY = (date: Date): string => {
  return format(date, 'dd/MM/yyyy');
};

/**
 * Parses a DD/MM/YYYY string into a Date object.
 * Returns current date if invalid.
 */
export const parseDateFromDDMMYYYY = (text: string): Date => {
  const parsed = parse(text, 'dd/MM/yyyy', new Date());
  return isValid(parsed) ? parsed : new Date();
};

/**
 * Safely parses any date string and returns a valid Date object.
 * If the date is invalid, it returns null instead of crashing.
 */
export const safeParseDate = (dateStr: any): Date | null => {
  if (!dateStr) return null;
  if (dateStr instanceof Date) {
    return isValid(dateStr) ? dateStr : null;
  }
  let d = new Date(dateStr);
  if (isValid(d)) return d;

  // Handle cross-platform iOS spaces: "2026-05-23 14:30:00" -> "2026-05-23T14:30:00"
  if (typeof dateStr === 'string') {
    const withT = dateStr.trim().replace(' ', 'T');
    d = new Date(withT);
    if (isValid(d)) return d;
  }

  return null;
};

/**
 * Safely formats a date/time string to localized time.
 */
export const formatTimeSafely = (
  dateStr: any,
  options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' },
  fallback = 'TBD'
): string => {
  const parsed = safeParseDate(dateStr);
  if (!parsed) return fallback;
  try {
    return parsed.toLocaleTimeString([], options);
  } catch (e) {
    return fallback;
  }
};

/**
 * Safely formats a date/time string to localized date.
 */
export const formatDateSafely = (
  dateStr: any,
  options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' },
  fallback = 'TBD'
): string => {
  const parsed = safeParseDate(dateStr);
  if (!parsed) return fallback;
  try {
    return parsed.toLocaleDateString([], options);
  } catch (e) {
    return fallback;
  }
};
