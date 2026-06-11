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
