import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBookRideStore } from '@/store/useBookRideStore';
import { FIVE_SEATER_ROWS, SEVEN_SEATER_ROWS } from '@/components/organisms/CarFloorPlan/seatConfig';
import rideService from '@/serviceManager/rideService';

const ALL_SEAT_IDS = [
  '1A', '2A', '2B', '2C', // 5-seater
  '3A', '3B' // 7-seater extension
];

export const useBookSeatSelection = (
  rideId: string, 
  sourceStopId?: number, 
  destinationStopId?: number,
  passedSeats?: any[],
  passedPassengers?: any[],
  passedVehicleType?: string,
  passedDate?: string,
  passedTime?: string
) => {
  const navigation = useNavigation();
  const { searchResults } = useBookRideStore();
  const [selectedSeats, setSelectedSeats] = useState<Set<string | number>>(new Set());
  const [isBooking, setIsBooking] = useState(false);

  const rideRaw = useMemo(
    () => searchResults?.find((r: any) => r.id === rideId),
    [searchResults, rideId],
  );

  const vehicleType = useMemo(() => {
    const t = (passedVehicleType || rideRaw?.vehicleType || '').toUpperCase();
    return t.includes('7') ? '7' : '5';
  }, [passedVehicleType, rideRaw]);

  const seatNameIdMap = useMemo(() => {
    const map: Record<string, number> = {};
    (passedSeats || []).forEach((s: any) => {
      map[s.seatName] = s.id;
    });
    return map;
  }, [passedSeats]);

  const occupiedSeats = useMemo(() => {
    const occupied = new Set<string | number>();
    (passedSeats || []).forEach((s: any) => {
      if (!s.available) {
        occupied.add(s.id);
      }
    });
    return occupied;
  }, [passedSeats]);

  const departureDate = useMemo(() => {
    if (passedDate) return passedDate;
    const firstStop = rideRaw?.stops?.[0];
    return firstStop?.arrivalTime
      ? new Date(firstStop.arrivalTime).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        })
      : '-- ---';
  }, [rideRaw, passedDate]);

  const departureTime = useMemo(() => {
    if (passedTime) return passedTime;
    const firstStop = rideRaw?.stops?.[0];
    if (!firstStop?.arrivalTime) return '--:--';
    const date = new Date(firstStop.arrivalTime);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }, [rideRaw, passedTime]);

  const prices = useMemo(() => {
    const priceMap: Record<string | number, number> = {};
    (passedSeats || []).forEach((s: any) => {
      priceMap[s.id] = s.price;
    });
    return priceMap;
  }, [passedSeats]);

  const totalPrice: number = useMemo(() => {
    let total = 0;
    selectedSeats.forEach(id => {
      total += prices[id] || 0;
    });
    return total;
  }, [selectedSeats, prices]);

  const toggleSeat = useCallback((id: string | number) => {
    if (id === 'driver' || occupiedSeats.has(id)) return;
    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, [occupiedSeats]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleConfirm = useCallback(async () => {
    if (selectedSeats.size === 0 || isBooking) return;
    
    setIsBooking(true);
    try {
      const payload = {
        requestedSeatIds: Array.from(selectedSeats) as number[],
        sourceStopId: Number(sourceStopId),
        destinationStopId: Number(destinationStopId),
      };

      await rideService.bookRide(rideId, payload);
      navigation.navigate('BookingConfirmed', { 
        rideId,
        bookedSeats: Array.from(selectedSeats)
      });
    } catch (error) {
      console.error('Booking confirmation failed:', error);
    } finally {
      setIsBooking(false);
    }
  }, [navigation, selectedSeats, rideId, seatNameIdMap, isBooking, sourceStopId, destinationStopId]);

  return {
    rows: vehicleType === '7' ? SEVEN_SEATER_ROWS : FIVE_SEATER_ROWS,
    selectedSeats,
    occupiedSeats,
    prices,
    totalPrice,
    seatCount: selectedSeats.size,
    toggleSeat,
    handleBack,
    handleConfirm,
    driverName: rideRaw?.driverName ?? 'Driver',
    vehicleRegistration: rideRaw?.vehicleRegistration ?? '',
    vehicleType,
    departureDate,
    departureTime,
    passengers: passedPassengers || [],
    isBooking,
  };
};
