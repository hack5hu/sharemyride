import { format } from 'date-fns';
import { useState, useCallback, useMemo } from 'react';
import { type MonthData } from '@/components/templates/DateSelectionTemplate';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useBookRideStore } from '@/store/useBookRideStore';
import { isSameDate } from '@/utils/date';

const getMonthsData = (): MonthData[] => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const monthCount =
    (maxDate.getFullYear() - currentYear) * 12 +
    (maxDate.getMonth() - currentMonth) +
    1;

  const months: MonthData[] = [];

  for (let i = 0; i < monthCount; i++) {
    const date = new Date(currentYear, currentMonth + i, 1);
    months.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      isCurrentMonth: i === 0,
    });
  }

  return months;
};

export const useBookDateSelection = () => {
  const { goBack } = useAppNavigation();
  const travelDate = useBookRideStore(state => state.travelDate);

  const selectedDate = useMemo(() => {
    if (travelDate) {
      return new Date(travelDate);
    }
    return new Date();
  }, [travelDate]);

  const months = useMemo(() => getMonthsData(), []);

  const handleBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectDate = useCallback(
    (date: Date) => {
      const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
      useBookRideStore.getState().setTravelDate(formattedDate);
      goBack();
    },
    [goBack],
  );

  return {
    months,
    selectedDate,
    handleBackPress,
    handleSelectDate,
  };
};
