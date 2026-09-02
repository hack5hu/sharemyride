import { useMemo, useState } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { formatDisplayAddress } from '@/utils/address';
import { useSummaryActions } from './useSummaryActions';
import { useSummaryMappers } from './useSummaryMappers';

export const useSummaryPublish = () => {
  const navigation = useAppNavigation();
  const publishStore = useRidePublishStore();
  const [isPublishing, setIsPublishing] = useState(false);

  const {
    startLocation,
    destinationLocation,
    middleStops,
    departureDate,
    departureTime,
  } = publishStore;

  const { formattedDate, vehicleData, pricingData, preferencesData } =
    useSummaryMappers(publishStore);

  const { handlePublish, handleSave } = useSummaryActions(
    publishStore,
    setIsPublishing,
  );

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
    return !!(
      startLocation &&
      destinationLocation &&
      departureDate &&
      departureTime &&
      !validationError
    );
  }, [
    startLocation,
    destinationLocation,
    departureDate,
    departureTime,
    validationError,
  ]);

  return {
    routeData: {
      start: formatDisplayAddress(startLocation?.address) || 'Unknown',
      end: formatDisplayAddress(destinationLocation?.address) || 'Unknown',
      middleStops: middleStops.map(s => formatDisplayAddress(s.address)),
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
    handleEditSchedule: () =>
      (navigation.navigate as any)('DateSelection', {
        returnTo: 'SummaryPublish',
      }),
    handleEditVehicle: () =>
      (navigation.navigate as any)('SeatSelection', {
        flow: 'publish',
        returnTo: 'PriceSelection',
        nextReturnTo: 'SummaryPublish',
      }),
    handleEditSeats: () =>
      (navigation.navigate as any)('SeatSelection', {
        flow: 'publish',
        returnTo: 'PriceSelection',
        nextReturnTo: 'SummaryPublish',
      }),
    handleEditPreferences: () =>
      (navigation.navigate as any)('TravelPreferences', {
        returnTo: 'SummaryPublish',
      }),
  };
};
