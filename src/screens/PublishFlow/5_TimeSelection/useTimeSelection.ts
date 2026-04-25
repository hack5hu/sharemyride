import { useState, useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';

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

  const { setDepartureTime, departureTime } = useRidePublishStore();

  // Parse previously stored time (e.g. "08:30 AM") to pre-fill the picker
  const storedTime = useMemo(() => {
    if (!departureTime) return null;
    const match = departureTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const isPM = match[3].toUpperCase() === 'PM';
    if (isPM && h !== 12) h += 12;
    if (!isPM && h === 12) h = 0;
    return { h, m };
  }, [departureTime]);

  const initialTime = useMemo(() => {
    // Prefer previously stored time (when returning from Summary)
    if (storedTime) return storedTime;
    if (minHour !== undefined && minMinute !== undefined) {
      return { h: minHour, m: minMinute };
    }
    return { h: 8, m: 0 };
  }, [storedTime, minHour, minMinute]);

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
    // removed unused timeString
    // Simple 12h conversion would be better but let's keep it consistent
    const hour12 = selectedHour % 12 || 12;
    const ampm = selectedHour >= 12 ? 'PM' : 'AM';
    const displayTime = `${hour12.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')} ${ampm}`;
    
    setDepartureTime(displayTime);

    if (params?.returnTo === 'SummaryPublish') {
      (navigation.navigate as any)('SummaryPublish');
    } else {
      (navigation.navigate as any)('SeatSelection', { flow: 'publish' });
    }
  }, [selectedHour, selectedMinute, navigation, setDepartureTime, params]);

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
