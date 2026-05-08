import { useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { MonthData } from '@/components/templates/DateSelectionTemplate';
import { useBookRideStore } from '@/store/useBookRideStore';

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
  const navigation = useNavigation();
  const { travelDate, setTravelDate } = useBookRideStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    travelDate ? new Date(travelDate) : new Date()
  );

  const months = useMemo(() => getMonthsData(), []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setTravelDate(format(date, "yyyy-MM-dd'T'HH:mm:ss"));
    
    // Auto navigation back
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  }, [setTravelDate, navigation]);

  return {
    months,
    selectedDate,
    handleBackPress,
    handleSelectDate,
  };
};
