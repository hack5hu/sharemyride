import { useMemo } from 'react';
import { getColorLabel } from '@/constants/ride';
import { useTravelPrefStore } from '@/store/useTravelPrefStore';
import { useLocale } from '@/constants/localization';

export const useSummaryMappers = (publishStore: any) => {
  const {
    departureDate,
    seatCount,
    price,
    vehicleDetails,
  } = publishStore;

  const { preferences: storedPrefs } = useTravelPrefStore();
  const { travelPreferences: pt } = useLocale();

  const formattedDate = useMemo(() => {
    if (!departureDate) return null;
    const date = new Date(departureDate);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [departureDate]);

  const vehicleData = useMemo(() => {
    if (!vehicleDetails) return null;
    const colorLabel = getColorLabel(vehicleDetails.color);
    return {
      name: `${vehicleDetails.company} ${vehicleDetails.model}`,
      subText: `${vehicleDetails.seater}-Seater • ${colorLabel}`,
      numberplate: vehicleDetails.numberPlate,
      icon: vehicleDetails.type === 'bike' ? 'motorcycle' : 'directions-car',
    };
  }, [vehicleDetails]);

  const pricingData = useMemo(() => ({
    seatCount,
    pricePerSeat: `₹${price}`,
  }), [seatCount, price]);

  const preferencesData = useMemo(() => {
    if (!storedPrefs) return [];
    
    const data = [];
    
    if (storedPrefs.nonSmoking) {
      data.push({ id: 'smoking', label: pt.nonSmoking, icon: 'smoke-free' });
    }
    
    if (storedPrefs.womenOnly) {
      data.push({ id: 'women', label: pt.womenOnly, icon: 'female' });
    }
    
    if (storedPrefs.manualApproval) {
      data.push({ id: 'approval', label: pt.manualApproval, icon: 'verified-user' });
    }
    
    if (storedPrefs.musicPreference) {
      data.push({ id: 'music', label: storedPrefs.musicPreference, icon: 'library-music' });
    }
    
    if (storedPrefs.luggageAllowed) {
      data.push({ id: 'luggage', label: pt.luggageAllowed, icon: 'luggage' });
    }
    
    if (storedPrefs.petFriendly) {
      data.push({ id: 'pets', label: pt.petFriendly, icon: 'pets' });
    }

    if (storedPrefs.waitingTime) {
      data.push({ id: 'waiting', label: `${storedPrefs.waitingTime}m wait`, icon: 'timer' });
    }
    
    return data;
  }, [storedPrefs, pt]);

  return {
    formattedDate,
    vehicleData,
    pricingData,
    preferencesData,
  };
};
