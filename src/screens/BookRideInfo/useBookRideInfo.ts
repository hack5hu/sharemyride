import { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';

export const useBookRideInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookRideInfo: t } = useLocale();

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [peopleCount, setPeopleCount] = useState(1);

  const handlePressPickup = useCallback(() => {
    navigation.navigate('MapPicker' as any, {
      type: 'start',
      returnTo: 'BookRideInfo',
    });
  }, [navigation]);

  const handlePressDestination = useCallback(() => {
    navigation.navigate('MapPicker' as any, {
      type: 'destination',
      returnTo: 'BookRideInfo',
    });
  }, [navigation]);

  useEffect(() => {
    const params = route.params as any;
    if (params?.updatedLocation && params?.type) {
      if (params.type === 'start') {
        setPickup(params.updatedLocation.name);
      } else if (params.type === 'destination') {
        setDestination(params.updatedLocation.name);
      }
      // Reset params
      navigation.setParams({
        updatedLocation: undefined,
        type: undefined,
      } as any);
    }
  }, [route.params, navigation]);

  const handleOpenDatePicker = useCallback(() => setIsDatePickerOpen(true), []);
  const handleCloseDatePicker = useCallback(
    () => setIsDatePickerOpen(false),
    [],
  );
  const handleDateConfirm = useCallback((date: Date) => {
    setIsDatePickerOpen(false);
    setTravelDate(date);
  }, []);

  const incrementPeople = useCallback(
    () => setPeopleCount(prev => Math.min(prev + 1, 8)),
    [],
  );
  const decrementPeople = useCallback(
    () => setPeopleCount(prev => Math.max(prev - 1, 1)),
    [],
  );

  const handleSearchRides = useCallback(() => {
    navigation.navigate('AvailableRides' as any);
  }, [navigation]);

  const handleRecentSearchPress = useCallback((item: any) => {
    // Populate form with recent search
    setPickup(item.pickup);
    setDestination(item.destination);
    setPeopleCount(item.peopleCount);
  }, []);

  return {
    pickup,
    destination,
    travelDate,
    isDatePickerOpen,
    peopleCount,
    handlePressPickup,
    handlePressDestination,
    handleOpenDatePicker,
    handleCloseDatePicker,
    handleDateConfirm,
    incrementPeople,
    decrementPeople,
    handleSearchRides,
    handleRecentSearchPress,
    t,
  };
};
