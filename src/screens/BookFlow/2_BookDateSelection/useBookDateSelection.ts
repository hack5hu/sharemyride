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
  const travelDates = useBookRideStore(state => state.travelDates);

  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (travelDates && travelDates.length > 0) {
      return travelDates.map(d => new Date(d));
    }
    if (travelDate) {
      return [new Date(travelDate)];
    }
    return [new Date()];
  });

  const months = useMemo(() => getMonthsData(), []);

  const handleBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDates(prev => {
      const exists = prev.some(d => isSameDate(d, date));
      if (exists) {
        return prev.filter(d => !isSameDate(d, date));
      }
      return [...prev, date].sort((a, b) => a.getTime() - b.getTime());
    });
  }, []);

  const handleContinue = useCallback(() => {
    if (selectedDates.length === 0) {
      return;
    }

    const formattedDates = selectedDates.map(d =>
      format(d, "yyyy-MM-dd'T'HH:mm:ss"),
    );
    useBookRideStore.getState().setTravelDates(formattedDates);

    goBack();
  }, [selectedDates, goBack]);

  return {
    months,
    selectedDates,
    selectedDate: selectedDates[0] ?? null,
    handleBackPress,
    handleSelectDate,
    handleContinue,
  };
};
