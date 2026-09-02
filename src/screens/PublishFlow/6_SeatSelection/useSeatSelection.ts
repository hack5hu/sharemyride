import { useRoute, type RouteProp, useIsFocused } from '@react-navigation/native';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { type RootStackParamList } from '@/navigation/types.d';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useVehicleStore } from '@/store/useVehicleStore';

export const getDefaultSelectedSeats = (
  seater?: '5' | '7' | string,
): Set<string | number> => {
  if (seater === '7') {
    // 7-seater: 2 (1A Front), 3 (2A Middle Left), 5 (2C Middle Right), 6 (3A Back Left), 7 (3B Back Right)
    // Excludes center seat 4 (2B)
    return new Set([2, 3, 5, 6, 7]);
  }

  // 5-seater: 2 (1A Front), 3 (2A Back Left), 5 (2C Back Right)
  // Excludes center seat 4 (2B)
  return new Set([2, 3, 5]);
};

export const useSeatSelection = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'SeatSelection'>>();
  const isFocused = useIsFocused();
  const { selectSeat: tSelect, seatSelection: tPublish } = useLocale();

  const flow = route.params?.flow || 'publish';
  const returnTo = (route.params as any)?.returnTo;
  const t = flow === 'book' ? tSelect : tPublish;

  const {
    selectedSeatIds,
    setSelectedSeatIds,
    publishVehicleType,
    setPublishVehicleType,
    setVehicleDetails,
    setSeatCount,
    setVehicleId,
    vehicleId,
  } = useRidePublishStore();

  const { vehicles, selectedVehicleId, setSelectedVehicle } = useVehicleStore();
  const [selectedSeats, setSelectedSeats] = useState<Set<string | number>>(
    () => {
      if (selectedSeatIds && selectedSeatIds.length > 0) {
        return new Set(selectedSeatIds);
      }

      return getDefaultSelectedSeats(publishVehicleType);
    },
  );

  const handleVehicleSelect = useCallback(
    (id: string) => {
      const vehicle = vehicles.find(v => v.id === id);
      if (vehicle) {
        setSelectedVehicle(id);
        setVehicleId(id);
        setPublishVehicleType(vehicle.seater);
        setVehicleDetails({
          company: vehicle.company,
          model: vehicle.model,
          numberPlate: vehicle.numberPlate,
          type: vehicle.type,
          color: vehicle.color,
          seater: vehicle.seater,
        });
        setSelectedSeats(getDefaultSelectedSeats(vehicle.seater));
      }
    },
    [
      vehicles,
      setSelectedVehicle,
      setVehicleId,
      setPublishVehicleType,
      setVehicleDetails,
    ],
  );

  useEffect(() => {
    if (isFocused && vehicles.length > 0) {
      if (!selectedVehicleId) {
        handleVehicleSelect(vehicles[0].id);
      } else {
        // If one is selected, ensure publish store is synced with it
        const vehicle = vehicles.find(v => v.id === selectedVehicleId);
        if (
          vehicle &&
          (publishVehicleType !== vehicle.seater || vehicleId !== vehicle.id)
        ) {
          setPublishVehicleType(vehicle.seater);
          setVehicleId(vehicle.id);
          setVehicleDetails({
            company: vehicle.company,
            model: vehicle.model,
            numberPlate: vehicle.numberPlate,
            type: vehicle.type,
            color: vehicle.color,
            seater: vehicle.seater,
          });
          setSelectedSeats(getDefaultSelectedSeats(vehicle.seater));
        }
      }
    }
  }, [
    isFocused,
    vehicles,
    selectedVehicleId,
    handleVehicleSelect,
    publishVehicleType,
    vehicleId,
    setVehicleId,
    setPublishVehicleType,
    setVehicleDetails,
  ]);

  const onSeatPress = useCallback((id: string | number) => {
    const numId = typeof id === 'string' && !isNaN(Number(id)) ? Number(id) : id;
    const strId = String(id);
    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(numId) || next.has(strId)) {
        next.delete(numId);
        next.delete(strId);
      } else {
        next.add(numId);
      }

      return next;
    });
  }, []);

  const onAddNewVehicle = useCallback(() => {
    (navigation.navigate as any)('VehicleDetails');
  }, [navigation]);

  const seatIdsLabel = useMemo(() => {
    return Array.from(selectedSeats).join(', ');
  }, [selectedSeats]);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onContinue = useCallback(() => {
    if (selectedSeats.size > 0 && selectedVehicleId) {
      if (flow === 'publish') {
        setSeatCount(selectedSeats.size);
        setSelectedSeatIds(Array.from(selectedSeats) as number[]);
        setPublishVehicleType(publishVehicleType);

        if (returnTo) {
          (navigation.navigate as any)(returnTo, {
            returnTo: (route.params as any)?.nextReturnTo,
          });
        } else {
          (navigation.navigate as any)('PriceSelection');
        }
      } else {
        // For booking, either go back or to a payment screen
        navigation.goBack();
      }
    }
  }, [
    selectedSeats,
    selectedVehicleId,
    navigation,
    flow,
    setSeatCount,
    setSelectedSeatIds,
    setPublishVehicleType,
    publishVehicleType,
    returnTo,
  ]);

  return {
    flow,
    selectedSeats,
    vehicleType: publishVehicleType,
    seatIdsLabel,
    onSeatPress,
    vehicles,
    selectedVehicleId,
    onVehicleSelect: handleVehicleSelect,
    onAddNewVehicle,
    onBackPress,
    onContinue,
    t,
  };
};
