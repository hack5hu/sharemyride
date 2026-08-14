import { MappedDriverData, MappedPassengerData } from './rideMapper';

interface Passenger {
  bookingId?: string;
  passengerId?: string;
  name?: string;
  photoUrl?: string;
  segment?: string;
  sourceStopName?: string;
  destinationStopName?: string;
  seatCount?: number;
  seatsBooked?: number;
  seatIds?: (string | number)[];
  seatId?: (string | number)[];
  hasRated?: boolean;
}

export const mapDriverData = (
  ride: any,
): MappedDriverData | null => {
  if (!ride?.driver) return null;
  return {
    id:
      ride.driver.id ||
      ride.driver.driverId ||
      ride.driver.userId ||
      ride.driverId ||
      ride.userId ||
      'driver-1',
    name: ride.driver.name,
    avatar: ride.driver.photoUrl,
    rating: ride.driver.rating || 5,
    rideCount: ride.driver.rideCount || 0,
    isVerified: ride.driver.isVerified || false,
    hasRated: ride.driver.hasRated || ride.myBooking?.hasRatedDriver || false,
  };
};

export const mapPassengerData = (
  ride: any,
): MappedPassengerData[] => {
  if (!ride?.passengers) return [];
  return (ride.passengers as Passenger[]).map((p: Passenger) => ({
    bookingId: p.bookingId,
    id: p.passengerId,
    name: p.name,
    photoUrl: p.photoUrl,
    segment:
      p.segment ||
      `${p.sourceStopName?.split(',')[0].trim() || 'Unknown'} → ${
        p.destinationStopName?.split(',')[0].trim() || 'Unknown'
      }`,
    seatsBooked: p.seatCount || p.seatsBooked || 1,
    seatId: (p.seatIds || p.seatId || []).map(String),
    hasRated: p.hasRated || false,
  }));
};
