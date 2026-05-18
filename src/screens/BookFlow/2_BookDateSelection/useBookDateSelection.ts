import { useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { MonthData } from '@/components/templates/DateSelectionTemplate';
import { useBookRideStore } from '@/store/useBookRideStore';
import { useAppNavigation } from '@/hooks/useAppNavigation';

const getMonthsData = (): MonthData[] => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const months: MonthData[] = [];

  for (let i = 0; i < 2; i++) {
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

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    travelDate ? new Date(travelDate) : new Date()
  );

  const months = useMemo(() => getMonthsData(), []);

  const handleBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    useBookRideStore.getState().setTravelDate(format(date, "yyyy-MM-dd'T'HH:mm:ss"));
    
    // Auto navigation back
    setTimeout(() => {
      goBack();
    }, 200);
  }, [goBack]);

  return {
    months,
    selectedDate,
    handleBackPress,
    handleSelectDate,
  };
};
