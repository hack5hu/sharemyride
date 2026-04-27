import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useSummaryMappers } from './useSummaryMappers';
import { useSummaryActions } from './useSummaryActions';

export const useSummaryPublish = () => {
  const navigation = useNavigation();
  const publishStore = useRidePublishStore();
  const [isPublishing, setIsPublishing] = useState(false);

  const {
    startLocation,
    destinationLocation,
    middleStops,
    departureDate,
    departureTime,
  } = publishStore;

  const {
    formattedDate,
    vehicleData,
    pricingData,
    preferencesData,
  } = useSummaryMappers(publishStore);

  const {
    handlePublish,
    handleSave,
  } = useSummaryActions(publishStore, setIsPublishing);

  const validationError = useMemo(() => {
    if (!departureDate || !departureTime) return null;
    
    const dateObj = new Date(departureDate);
    const [timeStr, ampm] = departureTime.split(' ');
    const [hours, minutes] = timeStr.split(':').map(Number);
    let h = hours;
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    dateObj.setHours(h, minutes, 0, 0);

    if (dateObj < new Date()) {
      return 'Please select a future date and time for your ride.';
    }
    return null;
  }, [departureDate, departureTime]);

  const canPublish = useMemo(() => {
    return !!(startLocation && destinationLocation && departureDate && departureTime && !validationError);
  }, [startLocation, destinationLocation, departureDate, departureTime, validationError]);

  return {
    routeData: {
      start: startLocation?.address || 'Unknown',
      end: destinationLocation?.address || 'Unknown',
      middleStops: middleStops.map(s => s.address),
    },
    schedule: {
      date: formattedDate,
      time: departureTime,
    },
    vehicleData,
    pricingData,
    preferencesData,
    isPublishing,
    validationError,
    canPublish,
    handleBack: () => navigation.goBack(),
    handleSave,
    handlePublish,
    handleEditRoute: () =>
      (navigation.navigate as any)('LocationSelection', {
        flow: 'publish',
        returnTo: 'SummaryPublish',
      }),
    handleEditSchedule: () =>
      (navigation.navigate as any)('DateSelection', {
        returnTo: 'SummaryPublish',
      }),
    handleEditVehicle: () =>
      (navigation.navigate as any)('SeatSelection', {
        returnTo: 'SummaryPublish',
      }),
    handleEditSeats: () =>
      (navigation.navigate as any)('PriceSelection', {
        flow: 'publish',
        returnTo: 'SummaryPublish',
      }),
    handleEditPreferences: () =>
      (navigation.navigate as any)('TravelPreferences', {
        returnTo: 'SummaryPublish',
      }),
  };
};
