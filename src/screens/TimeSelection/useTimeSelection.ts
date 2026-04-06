import { useState, useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const getNextRounded5 = (date: Date) => {
  const minutes = date.getMinutes();
  const rounded = Math.ceil(minutes / 5) * 5;
  if (rounded >= 60) {
    return { h: date.getHours() + 1, m: 0 };
  }
  return { h: date.getHours(), m: rounded };
};

export const useTimeSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params as any;
  const selectedDateISO: string | undefined = params?.selectedDate;

  // Determine if the selected date is today
  const isToday = useMemo(() => {
    if (!selectedDateISO) return false;
    const selected = new Date(selectedDateISO);
    const today = new Date();
    return (
      selected.getFullYear() === today.getFullYear() &&
      selected.getMonth() === today.getMonth() &&
      selected.getDate() === today.getDate()
    );
  }, [selectedDateISO]);

  // Earliest allowed time if today; otherwise unrestricted
  const { minHour, minMinute } = useMemo(() => {
    if (!isToday) return { minHour: undefined, minMinute: undefined };
    const now = new Date();
    const { h, m } = getNextRounded5(now);
    return { minHour: h, minMinute: m };
  }, [isToday]);

  const initialTime = useMemo(() => {
    if (minHour !== undefined && minMinute !== undefined) {
      return { h: minHour, m: minMinute };
    }
    // Default to 08:00
    return { h: 8, m: 0 };
  }, [minHour, minMinute]);

  const [selectedHour, setSelectedHour] = useState(initialTime.h);
  const [selectedMinute, setSelectedMinute] = useState(initialTime.m);

  const handleHourChange = useCallback(
    (h: number) => {
      setSelectedHour(h);
      // If we change to the min hour and current minute is too early, snap forward
      if (minHour !== undefined && minMinute !== undefined && h === minHour) {
        setSelectedMinute((prev) => (prev < minMinute ? minMinute : prev));
      }
    },
    [minHour, minMinute]
  );

  const handleMinuteChange = useCallback((m: number) => {
    setSelectedMinute(m);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinuePress = useCallback(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    console.log(`Proceeding with time: ${pad(selectedHour)}:${pad(selectedMinute)}`);
    // navigation.navigate('NextStep');
  }, [selectedHour, selectedMinute]);

  return {
    selectedHour,
    selectedMinute,
    minHour,
    minMinute,
    handleHourChange,
    handleMinuteChange,
    handleBackPress,
    handleContinuePress,
  };
};
