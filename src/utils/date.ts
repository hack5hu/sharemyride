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
export const safeParseDate = (dateStr: any, isUtc = true): Date | null => {
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
        isUtc &&
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
  isUtc = true,
): string => {
  const parsed = safeParseDate(dateStr, isUtc);
  if (!parsed) return fallback;
  try {
    return parsed.toLocaleTimeString([], options);
  } catch {
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
  isUtc = true,
): string => {
  const parsed = safeParseDate(dateStr, isUtc);
  if (!parsed) return fallback;
  try {
    return parsed.toLocaleDateString([], options);
  } catch {
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

/**
 * Retrieves the days of a specific month.
 * Returns an array of day numbers, with nulls padding the beginning to align with weekdays.
 * Array starts on Monday (1) through Sunday (7).
 */
export const getMonthDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // js Date: 0 is Sun, 1 is Mon. Our UI header starts with Sun, so we want Sun=0.
  let firstDayIndex = new Date(year, month, 1).getDay();

  const result: Array<number | null> = [];
  for (let i = 0; i < firstDayIndex; i++) {
    result.push(null);
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  maxDate.setHours(23, 59, 59, 999);

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month, i);
    if (
      currentDate.getTime() < today.getTime() ||
      currentDate.getTime() > maxDate.getTime()
    ) {
      result.push(null);
    } else {
      result.push(i);
    }
  }
  return result;
};

/**
 * Gets the localized month name
 */
export const getMonthName = (year: number, month: number, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month));
};

export const isSameDate = (date1: Date | null, date2: Date | null) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isDatePast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() < today.getTime();
};

export const formatSelectedDate = (date: Date | null) => {
  if (!date) return '';
  // e.g. "Friday, 24 May 2024"
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};
