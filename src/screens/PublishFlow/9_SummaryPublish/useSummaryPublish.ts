import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
// removed unused useTheme
import { getColorLabel } from '@/constants/ride';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import rideService, { PublishRidePayload, RouteStop } from '@/serviceManager/rideService';
import { addSeconds, format } from 'date-fns';
import { useTravelPrefStore } from '@/store/useTravelPrefStore';
import { useLocale } from '@/constants/localization';
import { roundToNearest } from '@/utils/pricing';

export const useSummaryPublish = () => {
  const navigation = useNavigation();
  const publishStore = useRidePublishStore();
  const { addDraft, removeDraft } = useMyRidesStore();
  const [isPublishing, setIsPublishing] = useState(false);

  const {
    startLocation,
    destinationLocation,
    middleStops,
    departureDate,
    departureTime,
    seatCount,
    selectedSeatIds,
    publishVehicleType,
    vehicleDetails,
    vehicleId,
    preferences,
    price,
    fullJourneyPrice,
    frontSeatPrice,
    premiumEnabled,
    premiumPercentage,
    routeDetails,
    segmentPrices,
    clearPublishState,
    selectedRoute,
    editingDraftId,
  } = publishStore;

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
      numberplate:vehicleDetails.numberPlate,
      icon: vehicleDetails.type === 'bike' ? 'motorcycle' : 'directions-car',
    };
  }, [vehicleDetails]);

  const pricingData = useMemo(() => ({
    seatCount,
    pricePerSeat: `₹${price}`,
  }), [seatCount, price]);

  const mapSeatId = (id: string, vType: '5' | '7'): string => {
    if (vType === '5') {
      const mapping: Record<string, string> = { 'A1': '1A', 'B1': '2A', 'B2': '2B', 'B3': '2C' };
      return mapping[id] || id;
    } else {
      const mapping: Record<string, string> = {
        'front-passenger': '1A',
        'mid-left': '2A',
        'mid-mid': '2B',
        'mid-right': '2C',
        'back-left': '3A',
        'back-right': '3B'
      };
      return mapping[id] || id;
    }
  };

  const handlePublish = useCallback(async () => {
    if (!startLocation || !destinationLocation || !departureDate || !departureTime || !vehicleId) return;

    setIsPublishing(true);
    try {
      // 1. Calculate Start Time
      const dateObj = new Date(departureDate);
      const [time, ampm] = departureTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let h = hours;
      if (ampm === 'PM' && h !== 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      dateObj.setHours(h, minutes, 0, 0);
      const startTime = format(dateObj, "yyyy-MM-dd'T'HH:mm:ss");
      const endDateObj = addSeconds(dateObj, routeDetails?.totalDurationSeconds || 0);
      const endTime = format(endDateObj, "yyyy-MM-dd'T'HH:mm:ss");

      // 2. Map Offered Seats
      const offeredSeats = selectedSeatIds.map(id => mapSeatId(id, publishVehicleType));

      // 3. Map Route Stops with Cumulative Pricing (Prefix Algo)
      const allStops = [startLocation, ...middleStops, destinationLocation];
      let cumulativePrice = 0;
      let cumulativeFrontSeatPrice = 0;

      const routeStops: RouteStop[] = allStops.map((stop, index) => {
        const segmentId = index > 0 ? `seg-${index - 1}` : '';
        const segmentPrice = index > 0 ? (Number(segmentPrices[segmentId]) || Math.round(price / (allStops.length - 1))) : 0;
        
        // Calculate front seat price for this segment (round to nearest 10)
        const frontSeatSegmentPrice = premiumEnabled ? roundToNearest(segmentPrice * (1 + (premiumPercentage || 0) / 100), 10) : segmentPrice;

        // Update cumulative prices
        cumulativePrice += segmentPrice;
        cumulativeFrontSeatPrice += frontSeatSegmentPrice;

        const stopLeg = index > 0 && routeDetails?.legs ? routeDetails.legs[index - 1] : null;

        let arrivalTime = startTime;
        if (index > 0 && routeDetails?.legs) {
          let accumulatedDuration = 0;
          for (let i = 0; i < index; i++) {
            accumulatedDuration += routeDetails.legs[i].durationSeconds;
          }
          arrivalTime = format(addSeconds(dateObj, accumulatedDuration), "yyyy-MM-dd'T'HH:mm:ss");
        }

        return {
          name: stop.address,
          lat: stop.latitude,
          lon: stop.longitude,
          sequence: index + 1,
          distanceFromPreviousStop: stopLeg ? stopLeg.distanceMeters / 1000 : 0,
          priceFromPreviousStop: cumulativePrice,
          frontSeatPriceFromPreviousStop: cumulativeFrontSeatPrice,
          arrivalTime,
        };
      });

      const payload: PublishRidePayload = {
        vehicleId,
        startTime,
        endTime,
        offeredSeats,
        routePath: selectedRoute?.polylineString || '',
        routeStops,
        fullJourneyPrice,
        frontSeatPrice,
      };
      console.log('payload======>',payload)
      await rideService.publishRide(payload);
      
      // If we were editing a draft, remove it now that it is published
      if (editingDraftId) {
        removeDraft(editingDraftId);
      }

      (navigation.navigate as any)('PublishSuccess');
      clearPublishState();
    } catch (error) {
      console.error('Publish failed:', error);
      // Add toast or error alert here in a real app
    } finally {
      setIsPublishing(false);
    }
  }, [
    navigation, 
    startLocation, 
    destinationLocation, 
    middleStops, 
    departureDate, 
    departureTime, 
    publishVehicleType, 
    selectedSeatIds, 
    routeDetails, 
    segmentPrices, 
    price, 
    clearPublishState,
    selectedRoute,
    removeDraft,
    editingDraftId,
    premiumEnabled,
    premiumPercentage,
    fullJourneyPrice,
    frontSeatPrice,
    vehicleId,
  ]);

  const validationError = useMemo(() => {
    if (!departureDate || !departureTime) return null;
    
    // Combine date and time
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

  const handleSave = useCallback(() => {
    // Capture state to save as draft
    const currentState = {
      startLocation,
      destinationLocation,
      middleStops,
      departureDate,
      departureTime,
      seatCount,
      selectedSeatIds,
      publishVehicleType,
      vehicleDetails,
      preferences,
      price,
      routeDetails,
      segmentPrices,
      selectedRoute,
      requestType: publishStore.requestType,
    };

    addDraft(currentState, editingDraftId);
    clearPublishState();
    (navigation.navigate as any)('MyRides');
  }, [
    addDraft, 
    editingDraftId,
    navigation, 
    startLocation, 
    destinationLocation, 
    middleStops, 
    departureDate, 
    departureTime, 
    seatCount, 
    selectedSeatIds, 
    publishVehicleType, 
    vehicleDetails, 
    preferences, 
    price, 
    routeDetails, 
    segmentPrices, 
    selectedRoute,
    publishStore.requestType,
    clearPublishState,
  ]);

  const { preferences: storedPrefs } = useTravelPrefStore();
  const { travelPreferences: pt } = useLocale();
  // removed unused summaryPublish st

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
