import { useState, useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MonthData } from '@/components/templates/DateSelectionTemplate';
import { useRidePublishStore } from '@/store/useRidePublishStore';

const getMonthsData = (): MonthData[] => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const monthCount = (maxDate.getFullYear() - currentYear) * 12 + (maxDate.getMonth() - currentMonth) + 1;

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

export const useDateSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as any;
  const { departureDate, setDepartureDate } = useRidePublishStore();

  // Pre-fill with previously selected date from store
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    departureDate ? new Date(departureDate) : new Date()
  );

  const months = useMemo(() => getMonthsData(), []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setDepartureDate(date.toISOString());
    
    // Slight delay to let the user see the selected state
    setTimeout(() => {
      (navigation.navigate as any)('TimeSelection', {
        selectedDate: date.toISOString(),
        returnTo: params?.returnTo,
      });
    }, 200);
  }, [navigation, setDepartureDate, params]);

  return {
    months,
    selectedDate,
    handleBackPress,
    handleSelectDate,
  };
};
