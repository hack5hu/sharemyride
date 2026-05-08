import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp, useIsFocused } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { RootStackParamList } from '@/navigation/types.d';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useVehicleStore } from '@/store/useVehicleStore';

export const useSeatSelection = () => {
  const navigation = useNavigation();
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
  const [selectedSeats, setSelectedSeats] = useState<Set<string | number>>(new Set(selectedSeatIds));

  const handleVehicleSelect = useCallback((id: string) => {
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
        year: (vehicle as any).year,
        color: vehicle.color,
        seater: vehicle.seater,
      });
      setSelectedSeats(new Set());
    }
  }, [vehicles, setSelectedVehicle, setVehicleId, setPublishVehicleType, setVehicleDetails]);

  useEffect(() => {
    if (isFocused && vehicles.length > 0) {
      if (selectedVehicleId) {
        // If one is selected, ensure publish store is synced with it
        const vehicle = vehicles.find(v => v.id === selectedVehicleId);
        if (vehicle && (publishVehicleType !== vehicle.seater || vehicleId !== vehicle.id)) {
          setPublishVehicleType(vehicle.seater);
          setVehicleId(vehicle.id);
          setVehicleDetails({
            company: vehicle.company,
            model: vehicle.model,
            numberPlate: vehicle.numberPlate,
            type: vehicle.type,
            year: (vehicle as any).year,
            color: vehicle.color,
            seater: vehicle.seater,
          });
        }
      }
    }
  }, [isFocused, vehicles, selectedVehicleId, publishVehicleType, vehicleId, setVehicleId, setPublishVehicleType, setVehicleDetails]);

  const onSeatPress = useCallback((id: string | number) => {
    setSelectedSeats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
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
          (navigation.navigate as any)(returnTo);
        } else {
          (navigation.navigate as any)('PriceSelection');
        }
      } else {
        // For booking, either go back or to a payment screen
        navigation.goBack();
      }
    }
  }, [selectedSeats, selectedVehicleId, navigation, flow, setSeatCount, setSelectedSeatIds, setPublishVehicleType, publishVehicleType, returnTo]);

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
