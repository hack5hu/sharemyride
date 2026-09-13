import { addSeconds, format } from 'date-fns';
import { RideType } from '@/constants/enums';
import {
  type PublishRidePayload,
  type RouteStop,
} from '@/serviceManager/RideService';
import { type PublishSnapshot } from '@/store/types/publish';
import {
  allocateFrontSeatPrices,
  buildJourneyPricing,
  isValidJourneyPrice,
} from '@/utils/journeyPricing';
import { isPublishRouteValid } from '@/utils/publishRouteValidation';

export type BuildPayloadParams = PublishSnapshot;

export enum PublishValidationError {
  INVALID_ROUTE = 'INVALID_ROUTE',
  INVALID_PRICE = 'INVALID_PRICE',
  INVALID_SCHEDULE = 'INVALID_SCHEDULE',
  MISSING_DETAILS = 'MISSING_DETAILS',
}

/** Validate and serialize the same quote used by the price and summary screens. */
export const buildPublishRidePayload = (
  params: BuildPayloadParams,
): PublishRidePayload => {
  const {
    rideType,
    startLocation,
    destinationLocation,
    routeDetails,
    selectedRoute,
  } = params;
  if (
    !startLocation ||
    !destinationLocation ||
    !params.vehicleId ||
    !params.selectedSeatIds.length
  ) {
    throw new Error(PublishValidationError.MISSING_DETAILS);
  }
  const stops = [
    startLocation,
    ...(rideType === RideType.LOCAL ? [] : params.middleStops),
    destinationLocation,
  ];
  if (
    !routeDetails ||
    !selectedRoute?.polylineString ||
    !isPublishRouteValid(routeDetails, rideType, stops.length)
  ) {
    throw new Error(PublishValidationError.INVALID_ROUTE);
  }
  if (
    !isValidJourneyPrice(
      params.price,
      routeDetails.totalDistanceMeters / 1000,
      rideType,
      params.publishVehicleType,
    )
  ) {
    throw new Error(PublishValidationError.INVALID_PRICE);
  }
  const dates = params.departureDates.length
    ? params.departureDates
    : params.departureDate
    ? [params.departureDate]
    : [];
  const time = params.departureTime?.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
  if (
    !dates.length ||
    !time ||
    Number(time[1]) < 1 ||
    Number(time[1]) > 12 ||
    Number(time[2]) > 59
  ) {
    throw new Error(PublishValidationError.INVALID_SCHEDULE);
  }
  const hours = (Number(time[1]) % 12) + (time[3] === 'PM' ? 12 : 0);
  const dateObjects = dates.map(date => {
    const result = new Date(date);
    result.setHours(hours, Number(time[2]), 0, 0);

    return result;
  });
  if (
    dateObjects.some(
      date => !Number.isFinite(date.getTime()) || date.getTime() <= Date.now(),
    )
  ) {
    throw new Error(PublishValidationError.INVALID_SCHEDULE);
  }
  const dateObj = dateObjects[0];
  const quote = buildJourneyPricing(
    params.price,
    routeDetails.legs,
    rideType,
    params.premiumEnabled,
    params.premiumPercentage,
    params.segmentPrices,
  );
  const step = rideType === RideType.LOCAL ? 5 : 10;
  const frontPrices = allocateFrontSeatPrices(
    quote.segmentPrices,
    quote.premiumPercentage,
    step,
  );
  let cumulativePrice = 0;
  let cumulativeFrontSeatPrice = 0;
  let cumulativeDuration = 0;
  const routeStops: RouteStop[] = stops.map((stop, index) => {
    const leg = index > 0 ? routeDetails.legs[index - 1] : undefined;
    if (leg) {
      const segmentPrice = quote.segmentPrices['seg-' + (index - 1)];
      cumulativePrice += segmentPrice;
      cumulativeFrontSeatPrice += frontPrices['seg-' + (index - 1)];
      cumulativeDuration += leg.durationSeconds;
    }

    return {
      name: stop.address,
      lat: stop.latitude,
      lon: stop.longitude,
      sequence: index + 1,
      distanceFromPreviousStop: leg ? leg.distanceMeters / 1000 : 0,
      priceFromPreviousStop: cumulativePrice,
      frontSeatPriceFromPreviousStop: cumulativeFrontSeatPrice,
      arrivalTime: format(
        addSeconds(dateObj, cumulativeDuration),
        "yyyy-MM-dd'T'HH:mm:ss",
      ),
    };
  });

  return {
    vehicleId: params.vehicleId,
    startTime: format(dateObj, "yyyy-MM-dd'T'HH:mm:ss"),
    endTime: format(
      addSeconds(dateObj, routeDetails.totalDurationSeconds),
      "yyyy-MM-dd'T'HH:mm:ss",
    ),
    offeredSeatIds: params.selectedSeatIds,
    routePath: selectedRoute.polylineString,
    routeStops,
    fullJourneyPrice: String(quote.fullJourneyPrice),
    frontSeatPrice: String(quote.frontSeatPrice),
    rideDates: dateObjects.map(date => format(date, 'yyyy-MM-dd')),
    rideType,
  };
};
