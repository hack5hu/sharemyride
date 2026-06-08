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
  const { travelPreferences: pt, summaryPublish: spt } = useLocale();

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
    const prefs = {
      nonSmoking: publishStore.preferences?.nonSmoking ?? storedPrefs?.nonSmoking ?? true,
      womenOnly: publishStore.preferences?.womenOnly ?? storedPrefs?.womenOnly ?? false,
      musicPreference: publishStore.preferences?.music ?? storedPrefs?.musicPreference ?? 'Pop',
      luggageAllowed: publishStore.preferences?.luggage ?? storedPrefs?.luggageAllowed ?? true,
      petFriendly: publishStore.preferences?.pets ?? storedPrefs?.petFriendly ?? false,
      waitingTime: storedPrefs?.waitingTime ?? 10,
      manualApproval: publishStore.preferences?.manualApproval ?? storedPrefs?.manualApproval ?? true,
    };
    
    
    const data = [];
    
    if (prefs.nonSmoking) {
      data.push({ id: 'smoking', label: pt.nonSmoking, icon: 'smoke-free' });
    }
    
    if (prefs.womenOnly) {
      data.push({ id: 'women', label: pt.womenOnly, icon: 'female' });
    }
    
    if (prefs.manualApproval) {
      data.push({ id: 'approval', label: spt.approvalRequired, icon: 'verified-user' });
    } else {
      data.push({ id: 'approval', label: spt.instantBooking, icon: 'flash-on' });
    }
    
    if (prefs.musicPreference) {
      data.push({ id: 'music', label: prefs.musicPreference, icon: 'library-music' });
    }
    
    if (prefs.luggageAllowed) {
      data.push({ id: 'luggage', label: pt.luggageAllowed, icon: 'luggage' });
    }
    
    if (prefs.petFriendly) {
      data.push({ id: 'pets', label: pt.petFriendly, icon: 'pets' });
    }

    if (prefs.waitingTime) {
      data.push({ id: 'waiting', label: `${prefs.waitingTime}m wait`, icon: 'timer' });
    }
    
    return data;
  }, [storedPrefs, publishStore.preferences, pt]);

  return {
    formattedDate,
    vehicleData,
    pricingData,
    preferencesData,
  };
};
