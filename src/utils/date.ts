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
