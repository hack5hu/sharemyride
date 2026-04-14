import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MonthData } from '@/components/templates/DateSelectionTemplate';

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

export const useDateSelection = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const months = useMemo(() => getMonthsData(), []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleNextPress = useCallback(() => {
    if (selectedDate) {
      (navigation.navigate as any)('TimeSelection', { selectedDate: selectedDate.toISOString() });
    }
  }, [selectedDate, navigation]);

  return {
    months,
    selectedDate,
    handleBackPress,
    handleSelectDate,
    handleNextPress,
  };
};
