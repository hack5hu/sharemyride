import { MappedDriverData, MappedPassengerData } from './rideMapper';
import { storage } from '@/utils/storage';
import { getCityName } from '@/utils/address';

interface Passenger {
  bookingId?: string;
  passengerId?: string;
  id?: string;
  userId?: string;
  name?: string;
  photoUrl?: string;
  avatar?: string;
  segment?: string;
  sourceStopName?: string;
  destinationStopName?: string;
  seatCount?: number;
  seatsBooked?: number;
  seatIds?: (string | number)[];
  seatId?: (string | number)[];
  seatNames?: string[];
  hasRated?: boolean;
}

export const mapDriverData = (ride: any): MappedDriverData | null => {
  if (!ride?.driver) return null;
  const driverId = String(
    ride.driver.id ||
      ride.driver.driverId ||
      ride.driver.userId ||
      ride.driverId ||
      ride.userId ||
      'driver-1',
  );
  const rideId = String(ride.id || ride.rideId || ride.bookingId || '');

  let ratedUsers: string[] = [];
  let ratedRides: string[] = [];
  try {
    ratedUsers = JSON.parse(storage.getString('rated_users') || '[]').map(
      (id: any) => String(id),
    );
    ratedRides = JSON.parse(storage.getString('rated_rides') || '[]').map(
      (id: any) => String(id),
    );
  } catch {
    ratedUsers = [];
    ratedRides = [];
  }

  const hasBeenRated =
    ride.driver.hasRated ||
    ride.myBooking?.hasRatedDriver ||
    ride.hasRated ||
    ratedUsers.includes(driverId) ||
    (rideId ? ratedRides.includes(rideId) : false) ||
    false;

  return {
    id: driverId,
    name: ride.driver.name || 'Driver',
    avatar: ride.driver.photoUrl || ride.driver.avatar,
    driverPhotoUrl: ride.driver.photoUrl || ride.driver.avatar,
    phoneNumber: ride.driver.phoneNumber || ride.driver.phone || undefined,
    rating:
      ride.driver.rating && Number(ride.driver.rating) > 0
        ? Number(ride.driver.rating)
        : 5,
    rideCount:
      ride.driver.rideCount ||
      ride.driver.totalRidesAsDriver ||
      ride.driver.totalRides ||
      0,
    isVerified: Boolean(ride.driver.isVerified || ride.driver.verified),
    hasRated: hasBeenRated,
  };
};

export const mapPassengerData = (ride: any): MappedPassengerData[] => {
  const rawList =
    ride?.coPassengers ||
    ride?.co_passengers ||
    ride?.passengers;
  if (!rawList || !Array.isArray(rawList)) return [];

  const rideId = String(ride.id || ride.rideId || ride.bookingId || '');

  let ratedUsers: string[] = [];
  try {
    ratedUsers = JSON.parse(storage.getString('rated_users') || '[]').map(
      (id: any) => String(id),
    );
  } catch {
    ratedUsers = [];
  }

  return rawList.map((p: Passenger) => {
    const pId = String(p.passengerId || p.id || p.userId || p.bookingId || '');
    const isRated =
      p.hasRated ||
      (pId ? ratedUsers.includes(pId) : false) ||
      (rideId && pId ? ratedUsers.includes(`${rideId}_${pId}`) : false) ||
      false;

    const sourceCity = getCityName(p.sourceStopName) || p.sourceStopName?.split(',')[0].trim();
    const destCity = getCityName(p.destinationStopName) || p.destinationStopName?.split(',')[0].trim();
    const segmentText =
      p.segment ||
      (sourceCity && destCity
        ? `${sourceCity} → ${destCity}`
        : sourceCity || destCity || undefined);

    const seatList = (p.seatIds || p.seatId || p.seatNames || []).map(String);
    const seatsCount =
      p.seatCount ||
      p.seatsBooked ||
      (seatList.length > 0 ? seatList.length : 1);

    return {
      bookingId: p.bookingId,
      passengerId: p.passengerId,
      id: p.passengerId || p.id || p.userId,
      name: p.name || 'Passenger',
      photoUrl: p.photoUrl || p.avatar,
      segment: segmentText || 'Trip Segment',
      seatsBooked: seatsCount,
      seatId: seatList,
      hasRated: isRated,
    };
  });
};
