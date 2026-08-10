import { RideStatus } from '@/constants/enums';
import { getSeatDescription } from './seatDescription';
import { mapDriverData, mapPassengerData } from './peopleMapper';

export interface MappedDriverData {
  id: string;
  name?: string;
  avatar?: string;
  rating: number;
  rideCount: number;
  isVerified: boolean;
  hasRated: boolean;
}

export interface MappedPassengerData {
  bookingId?: string;
  id?: string;
  name?: string;
  photoUrl?: string;
  segment: string;
  seatsBooked: number;
  seatId: string[];
  hasRated: boolean;
}

export interface MappedRideTimelinePoint {
  location: string;
  time: string;
  lat?: number;
  lon?: number;
  stopId?: string;
  isHighlighted: boolean;
  type: 'pickup' | 'destination' | 'stop';
}

export interface MappedRideDetails {
  departureDateLabel: string;
  departureTime: string;
  durationLabel: string;
  seatsLeft: number;
  passengerPrice: string;
  passengerSeatInfo: string;
  timelinePoints: MappedRideTimelinePoint[];
  comfortFeatures: string[];
  driverData: MappedDriverData | null;
  passengerData: MappedPassengerData[];
  isArchived: boolean;
  isCompleted: boolean;
}

import { MyRideDetailsData, MyRideStop } from '../types.d';

interface MyRideTranslations {
  common: {
    today: string;
    seat: string;
    seats: string;
  };
  bookingConfirmed: {
    seatPositions: Record<string, string>;
  };
  rideDetails: {
    seatLabel: string;
    timelineTitle: string;
    date?: string;
    time?: string;
    duration?: string;
    seatsLabel?: string;
    bookingTotal?: string;
    cancelRide: string;
    cancelBooking: string;
  };
  rating: {
    ratingCardTitle: string;
    ratingCardSubtitle: string;
    rateButtonText: string;
  };
}

export const mapRideDetailsData = (
  ride: MyRideDetailsData | null,
  translations: MyRideTranslations,
  isDriver: boolean,
): MappedRideDetails => {
  const departureDateLabel = ride?.startTime
    ? new Date(ride.startTime).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : translations.common.today;

  const departureTime = ride?.startTime
    ? new Date(ride.startTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '--:--';

  const durationLabel = ride?.duration ?? '';

  const seatsLeft = ride?.availableSeats ?? ride?.seatsLeft ?? 0;

  const passengerPrice = Number(
    ride?.myBooking?.price ?? ride?.bookingPrice ?? ride?.price ?? 0
  ).toFixed(0);

  const passengerSeatInfo = (() => {
    const booking = ride?.myBooking;
    const seatsCount = booking?.seatCount ?? ride?.seatsBooked ?? 0;
    const vType = ride?.vehicle?.type || ride?.vehicleType;
    const seatIds = booking?.seatIds || ride?.seatIds || [];

    if (ride?.seatNames && ride.seatNames.length > 0) {
      return ride.seatNames.join(', ');
    } else if (seatIds && seatIds.length > 0) {
      return seatIds
        .map((id: string | number) => getSeatDescription(id, vType, translations))
        .join(', ');
    } else {
      return `${seatsCount} ${translations.rideDetails.seatLabel}`;
    }
  })();

  const timelinePoints = (() => {
    if (!ride?.stops) return [];
    const sourceId = ride.myBooking?.sourceStopId ?? ride.sourceStopId;
    const destId =
      ride.myBooking?.destinationStopId ?? ride.destinationStopId;

    return (ride.stops as MyRideStop[]).map((stop: MyRideStop) => {
      const isHighlighted =
        isDriver || stop.id === sourceId || stop.id === destId;
      const address = stop.stopName || stop.name || '';
      let displayLocation = address.trim();

      if (!isHighlighted) {
        const parts = address.split(',').map((p: string) => p.trim());
        if (parts.length >= 4) {
          displayLocation = parts[parts.length - 4];
        } else if (parts.length >= 3) {
          displayLocation = parts[parts.length - 3];
        } else {
          displayLocation = parts[0] || '';
        }
      }

      return {
        location: displayLocation,
        time: stop.arrivalTime
          ? new Date(stop.arrivalTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '',
        lat: stop.lat,
        lon: stop.lon,
        stopId: stop.id,
        isHighlighted,
        type:
          stop.id === sourceId
            ? 'pickup'
            : stop.id === destId
            ? 'destination'
            : 'stop',
      };
    });
  })();

  const comfortFeatures = (() => {
    if (!ride?.preferences) return [];
    const list: string[] = [];
    const prefs = ride.preferences;
    if (prefs.nonSmoking) list.push('noSmoking');
    if (prefs.petFriendly) list.push('petFriendly');
    if (prefs.luggageAllowed) list.push('luggageAllowed');
    if (prefs.ladiesOnly) list.push('ladiesOnly');
    if (prefs.manualApproval) {
      list.push('manualApproval');
    } else {
      list.push('autoApproval');
    }
    if (prefs.musicPreference) {
      list.push(`music:${prefs.musicPreference}`);
    }
    return list;
  })();

  const driverData = mapDriverData(ride);

  const passengerData = mapPassengerData(ride);

  const isArchived = (() => {
    if (!ride) return false;
    const status = ride.rideStatus || ride.status;
    return (
      status === RideStatus.COMPLETED ||
      status === RideStatus.CANCELLED ||
      status === 'REJECTED'
    );
  })();

  const isCompleted = (() => {
    if (!ride) return false;
    const status = ride.rideStatus || ride.status;
    return status === RideStatus.COMPLETED;
  })();

  return {
    departureDateLabel,
    departureTime,
    durationLabel,
    seatsLeft,
    passengerPrice,
    passengerSeatInfo,
    timelinePoints,
    comfortFeatures,
    driverData,
    passengerData,
    isArchived,
    isCompleted,
  };
};
