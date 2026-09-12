import { useRoute } from '@react-navigation/native';
import { useState, useCallback, useMemo } from 'react';
import { type MonthData } from '@/components/templates/DateSelectionTemplate';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRidePublishStore } from '@/store/useRidePublishStore';
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

export const useDateSelection = () => {
  const navigation = useAppNavigation();
  const route = useRoute();
  const params = route.params as any;
  const { departureDate, departureDates, setDepartureDates } =
    useRidePublishStore();

  // Initialize selected dates array from store
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (departureDates && departureDates.length > 0) {
      return departureDates.map(d => new Date(d));
    }
    if (departureDate) {
      return [new Date(departureDate)];
    }
    return [new Date()];
  });

  const months = useMemo(() => getMonthsData(), []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

    const isoDates = selectedDates.map(d => d.toISOString());
    setDepartureDates(isoDates);

    (navigation.navigate as any)('TimeSelection', {
      selectedDates: isoDates,
      selectedDate: isoDates[0],
      returnTo: params?.returnTo,
    });
  }, [selectedDates, setDepartureDates, navigation, params]);

  return {
    months,
    selectedDates,
    selectedDate: selectedDates[0] ?? null,
    handleBackPress,
    handleSelectDate,
    handleContinue,
  };
};
