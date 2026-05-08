import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addSeconds, format } from 'date-fns';
import rideService, { PublishRidePayload, RouteStop } from '@/serviceManager/rideService';
import { roundToNearest } from '@/utils/pricing';
import { useMyRidesStore } from '@/store/useMyRidesStore';

export const useSummaryActions = (publishStore: any, setIsPublishing: (v: boolean) => void) => {
  const navigation = useNavigation();
  const { addDraft, removeDraft } = useMyRidesStore();

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
    requestType,
  } = publishStore;

  const handlePublish = useCallback(async () => {
    if (!startLocation || !destinationLocation || !departureDate || !departureTime || !vehicleId) return;
    console.log('hello')
    setIsPublishing(true);
    try {
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

      const offeredSeatIds = selectedSeatIds;

      const allStops = [startLocation, ...middleStops, destinationLocation];
      let cumulativePrice = 0;
      let cumulativeFrontSeatPrice = 0;

      const routeStops: RouteStop[] = allStops.map((stop, index) => {
        const segmentId = index > 0 ? `seg-${index - 1}` : '';
        const segmentPrice = index > 0 ? (Number(segmentPrices[segmentId]) || Math.round(price / (allStops.length - 1))) : 0;
        const frontSeatSegmentPrice = premiumEnabled ? roundToNearest(segmentPrice * (1 + (premiumPercentage || 0) / 100), 10) : segmentPrice;

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
        offeredSeatIds,
        routePath: selectedRoute?.polylineString || '',
        routeStops,
        fullJourneyPrice: String(fullJourneyPrice),
        frontSeatPrice: String(frontSeatPrice),
      };
      await rideService.publishRide(payload);
      
      if (editingDraftId) {
        removeDraft(editingDraftId);
      }

      (navigation.navigate as any)('PublishSuccess');
      clearPublishState();
    } catch (error) {
      console.error('Publish failed:', error);
    } finally {
      setIsPublishing(false);
    }
  }, [
    navigation, startLocation, destinationLocation, middleStops, departureDate, departureTime, 
    publishVehicleType, selectedSeatIds, routeDetails, segmentPrices, price, clearPublishState,
    selectedRoute, removeDraft, editingDraftId, premiumEnabled, premiumPercentage, fullJourneyPrice, 
    frontSeatPrice, vehicleId, setIsPublishing
  ]);

  const handleSave = useCallback(() => {
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
      requestType,
    };

    addDraft(currentState, editingDraftId);
    clearPublishState();
    (navigation.navigate as any)('MyRides');
  }, [
    addDraft, editingDraftId, navigation, startLocation, destinationLocation, middleStops, 
    departureDate, departureTime, seatCount, selectedSeatIds, publishVehicleType, vehicleDetails, 
    preferences, price, routeDetails, segmentPrices, selectedRoute, requestType, clearPublishState
  ]);

  return {
    handlePublish,
    handleSave,
  };
};
