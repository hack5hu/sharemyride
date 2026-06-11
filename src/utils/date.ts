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
  if (
    text.length < prevText.length &&
    prevText.endsWith('/') &&
    !text.endsWith('/')
  ) {
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

  // Handle cross-platform iOS spaces and enforce UTC parsing for timezone-less ISO strings
  if (typeof dateStr === 'string') {
    let normalized = dateStr.trim().replace(' ', 'T');
    if (normalized.includes('T')) {
      const parts = normalized.split('T');
      const timePart = parts[1];
      // Check if timePart does not contain timezone indicator Z or offset (+/-)
      if (
        timePart &&
        !timePart.includes('Z') &&
        !timePart.includes('+') &&
        !timePart.includes('-')
      ) {
        normalized += 'Z';
      }
    }
    const d = new Date(normalized);
    if (isValid(d)) return d;
  }

  const d = new Date(dateStr);
  return isValid(d) ? d : null;
};

/**
 * Safely formats a date/time string to localized time.
 */
export const formatTimeSafely = (
  dateStr: any,
  options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' },
  fallback = 'TBD',
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
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  },
  fallback = 'TBD',
): string => {
  const parsed = safeParseDate(dateStr);
  if (!parsed) return fallback;
  try {
    return parsed.toLocaleDateString([], options);
  } catch (e) {
    return fallback;
  }
};

/**
 * Extract epoch milliseconds from any message date representation (timestamp or createdAt).
 */
export const parseChatTimestamp = (message: {
  timestamp?: number | string;
  createdAt?: string;
}): number => {
  if (message.timestamp) {
    const parsed =
      typeof message.timestamp === 'number'
        ? new Date(message.timestamp)
        : safeParseDate(message.timestamp);
    if (parsed) return parsed.getTime();
  }
  if (message.createdAt) {
    const parsed = safeParseDate(message.createdAt);
    if (parsed) return parsed.getTime();
  }
  return Date.now();
};
