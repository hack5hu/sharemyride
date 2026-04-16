import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useTheme } from 'styled-components/native';
import { getColorLabel } from '@/constants/ride';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import rideService, { PublishRidePayload, RouteStop } from '@/serviceManager/rideService';
import { addSeconds } from 'date-fns';

export const useSummaryPublish = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const publishStore = useRidePublishStore();
  const { addDraft } = useMyRidesStore();
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
    preferences,
    price,
    routeDetails,
    segmentPrices,
    clearPublishState,
    selectedRoute,
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
      subText: `${colorLabel} • ${vehicleDetails.numberPlate}`,
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
    if (!startLocation || !destinationLocation || !departureDate || !departureTime) return;

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
      
      const startTime = dateObj.toISOString();
      const endTime = addSeconds(dateObj, routeDetails?.totalDurationSeconds || 0).toISOString();

      // 2. Map Offered Seats
      const offeredSeats = selectedSeatIds.map(id => mapSeatId(id, publishVehicleType));

      // 3. Map Route Stops
      const allStops = [startLocation, ...middleStops, destinationLocation];
      const routeStops: RouteStop[] = allStops.map((stop, index) => {
        const prevStop = index > 0 ? allStops[index - 1] : null;
        const segmentKey = prevStop ? `${prevStop.id}|${stop.id}` : '';
        const segmentPrice = index > 0 ? (segmentPrices[segmentKey] || Math.round(price / (allStops.length - 1))) : 0;
        const stopLeg = index > 0 && routeDetails?.legs ? routeDetails.legs[index - 1] : null;
        
        let arrivalTime = startTime;
        if (index > 0 && routeDetails?.legs) {
          let accumulatedDuration = 0;
          for (let i = 0; i < index; i++) {
            accumulatedDuration += routeDetails.legs[i].durationSeconds;
          }
          arrivalTime = addSeconds(dateObj, accumulatedDuration).toISOString();
        }

        return {
          name: stop.name,
          lat: stop.latitude,
          lon: stop.longitude,
          sequence: index + 1,
          distanceFromPreviousStop: stopLeg ? stopLeg.distanceMeters / 1000 : 0,
          priceFromPreviousStop: segmentPrice,
          arrivalTime,
        };
      });

      const payload: PublishRidePayload = {
        vehicleType: publishVehicleType === '7' ? 'CAR_7_SEATER' : 'CAR_5_SEATER',
        startTime,
        endTime,
        offeredSeats,
        routePath: selectedRoute?.coordinates || [],
        routeStops,
      };
      console.log('payload======>',payload)
      await rideService.publishRide(payload);
      
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
    selectedRoute
  ]);

  return {
    routeData: {
      start: startLocation?.name || 'Unknown',
      end: destinationLocation?.name || 'Unknown',
      stopsCount: middleStops.length,
    },
    schedule: {
      date: formattedDate,
      time: departureTime,
    },
    vehicleData,
    pricingData,
    preferencesData: [], // Preferences logic can be restored if needed
    isPublishing,
    handleBack: () => navigation.goBack(),
    handleSave: () => { /* reuse existing save logic if needed */ },
    handlePublish,
    handleEditRoute: () => (navigation.navigate as any)('LocationSelection', { flow: 'publish', returnTo: 'SummaryPublish' }),
    handleEditSchedule: () => (navigation.navigate as any)('DateSelection', { returnTo: 'SummaryPublish' }),
    handleEditVehicle: () => (navigation.navigate as any)('VehicleDetails', { returnTo: 'SummaryPublish' }),
    handleEditSeats: () => (navigation.navigate as any)('SeatSelection', { flow: 'publish', returnTo: 'SummaryPublish' }),
    handleEditPreferences: () => (navigation.navigate as any)('TravelPreferences', { returnTo: 'SummaryPublish' }),
  };
};
