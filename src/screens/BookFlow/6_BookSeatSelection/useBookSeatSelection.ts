import { useState, useCallback, useMemo } from 'react';
import { useBookRideStore } from '@/store/useBookRideStore';
import { FIVE_SEATER_ROWS, SEVEN_SEATER_ROWS } from '@/components/organisms/CarFloorPlan/seatConfig';
import rideService, { RouteStop } from '@/serviceManager/rideService';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

import { BookSeat, Passenger } from './types';

export const useBookSeatSelection = (
  rideId: string,
  sourceStopId?: number,
  destinationStopId?: number,
  passedSeats?: BookSeat[],
  passedPassengers?: Passenger[],
  passedVehicleType?: string,
  passedDate?: string,
  passedTime?: string
) => {
  const { navigate, goBack } = useAppNavigation();
  const { t: translate } = useTranslation();
  const searchResults = useBookRideStore(state => state.searchResults);
  const [selectedSeats, setSelectedSeats] = useState<Set<string | number>>(new Set());
  const [isBooking, setIsBooking] = useState(false);

  const rideRaw = useMemo(
    () => searchResults?.find((r: { id: string; vehicleType?: string; stops?: RouteStop[]; driverName?: string; vehicleRegistration?: string }) => r.id === rideId),
    [searchResults, rideId],
  );

  const vehicleType = useMemo(() => {
    const t = (passedVehicleType || rideRaw?.vehicleType || '').toUpperCase();
    return t.includes('7') ? '7' : '5';
  }, [passedVehicleType, rideRaw]);

  const occupiedSeats = useMemo(() => {
    const occupied = new Set<string>();
    const availableIds = new Set((passedSeats || []).map((s: BookSeat) => String(s.seatId)));

    // 1. Any standard seat ID that is not in the backend's returned seats list is unavailable/occupied
    const allIds = vehicleType === '7' ? [2, 3, 4, 5, 6, 7] : [2, 3, 4, 5];
    allIds.forEach(id => {
      if (!availableIds.has(String(id))) {
        occupied.add(String(id));
      }
    });

    // 2. Any seat in the backend returned seats list that is explicitly marked as not available is occupied
    (passedSeats || []).forEach((s: BookSeat) => {
      if (!s.available) {
        occupied.add(String(s.seatId));
      }
    });

    return occupied;
  }, [passedSeats, vehicleType]);

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
    (passedSeats || []).forEach((s: BookSeat) => {
      priceMap[s.seatId] = s.price;
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
    if (id === 'driver' || occupiedSeats.has(String(id))) return;
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

  const handleBack = useCallback(() => goBack(), [goBack]);

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
      navigate('BookingConfirmed', {
        rideId,
        bookedSeats: Array.from(selectedSeats).map(String),
        pickupTime: departureTime,
      });
    } catch (error: any) {
      console.error('Booking confirmation failed:', error);
      showNotification(
        NotificationType.ERROR,
        translate('notification.defaultErrorTitle'),
        getErrorMessage(error, translate('notification.defaultErrorMessage'))
      );
    } finally {
      setIsBooking(false);
    }
  }, [navigate, selectedSeats, rideId, isBooking, sourceStopId, destinationStopId]);

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
    driverName: rideRaw?.driverName ?? 'Host',
    vehicleRegistration: rideRaw?.vehicleRegistration ?? '',
    vehicleType,
    departureDate,
    departureTime,
    passengers: passedPassengers || [],
    isBooking,
  };
};
