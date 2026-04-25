import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBookRideStore } from '@/store/useBookRideStore';
import { FIVE_SEATER_ROWS, SEVEN_SEATER_ROWS } from '@/components/organisms/CarFloorPlan/seatConfig';

const ALL_SEAT_IDS = [
  '1A', '2A', '2B', '2C', // 5-seater
  '3A', '3B' // 7-seater extension
];

export const useBookSeatSelection = (rideId: string) => {
  const navigation = useNavigation();
  const { searchResults } = useBookRideStore();
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const rideRaw = useMemo(
    () => searchResults?.find((r: any) => r.id === rideId),
    [searchResults, rideId],
  );

  const vehicleType = useMemo(() => {
    const t = (rideRaw?.vehicleType ?? '').toUpperCase();
    return t.includes('7') ? '7' : '5';
  }, [rideRaw]);

  const basePrice: number = useMemo(
    () => rideRaw?.stops?.reduce((s: number, st: any) => s + (st.priceFromPreviousStop ?? 0), 0) ?? 0,
    [rideRaw],
  );

  const frontPrice: number = useMemo(
    () => rideRaw?.stops?.reduce((s: number, st: any) => s + (st.frontSeatPriceFromPreviousStop ?? 0), 0) ?? basePrice,
    [rideRaw, basePrice],
  );

  const availableSeatsList: string[] = useMemo(
    () => rideRaw?.availableSeats ?? [],
    [rideRaw],
  );

  const occupiedSeats = useMemo(() => {
    const occupied = new Set<string>();
    ALL_SEAT_IDS.forEach(id => {
      if (!availableSeatsList.includes(id)) {
        occupied.add(id);
      }
    });
    return occupied;
  }, [availableSeatsList]);

  const departureDate = useMemo(() => {
    const firstStop = rideRaw?.stops?.[0];
    return firstStop?.arrivalTime
      ? new Date(firstStop.arrivalTime).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        })
      : '-- ---';
  }, [rideRaw]);

  const departureTime = useMemo(() => {
    const firstStop = rideRaw?.stops?.[0];
    if (!firstStop?.arrivalTime) return '--:--';
    const date = new Date(firstStop.arrivalTime);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }, [rideRaw]);

  const prices = useMemo(() => {
    const priceMap: Record<string, number> = {};
    ALL_SEAT_IDS.forEach(id => {
      if (id === '1A') {
        priceMap[id] = frontPrice;
      } else {
        priceMap[id] = basePrice;
      }
    });
    return priceMap;
  }, [frontPrice, basePrice]);

  const totalPrice: number = useMemo(() => {
    let total = 0;
    selectedSeats.forEach(id => {
      total += prices[id] || 0;
    });
    return total;
  }, [selectedSeats, prices]);

  const toggleSeat = useCallback((id: string) => {
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

  const handleConfirm = useCallback(() => {
    if (selectedSeats.size === 0) return;
    (navigation.navigate as any)('BookingConfirmed', { rideId });
  }, [navigation, selectedSeats, rideId]);

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
  };
};
