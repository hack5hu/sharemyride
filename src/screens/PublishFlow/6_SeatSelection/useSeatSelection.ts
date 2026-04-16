import { useState, useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { RootStackParamList } from '@/navigation/types.d';
import { useRidePublishStore } from '@/store/useRidePublishStore';

export const useSeatSelection = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'SeatSelection'>>();
  const { selectSeat: tSelect, seatSelection: tPublish } = useLocale();

  const flow = route.params?.flow || 'publish';
  const returnTo = (route.params as any)?.returnTo;
  const t = flow === 'book' ? tSelect : tPublish;

  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [vehicleType, setVehicleType] = useState<'5' | '7'>('5');

  const handleSeatPress = useCallback((id: string) => {
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

  const handleVehicleTypeChange = useCallback((type: '5' | '7') => {
    setVehicleType(type);
    setSelectedSeats(new Set()); // Reset selection when car layout changes
  }, []);

  const seatIdsLabel = useMemo(() => {
    return Array.from(selectedSeats).join(', ');
  }, [selectedSeats]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const { setSeatCount, setSelectedSeatIds, setPublishVehicleType } = useRidePublishStore();

  const handleContinue = useCallback(() => {
    if (selectedSeats.size > 0) {
      if (flow === 'publish') {
        setSeatCount(selectedSeats.size);
        setSelectedSeatIds(Array.from(selectedSeats));
        setPublishVehicleType(vehicleType);
        (navigation.navigate as any)('PriceSelection', { returnTo });
      } else {
        // For booking, either go back or to a payment screen
        navigation.goBack();
      }
    }
  }, [selectedSeats, navigation, flow, setSeatCount, setSelectedSeatIds, setPublishVehicleType, vehicleType, returnTo]);

  return {
    flow,
    selectedSeats,
    vehicleType,
    seatIdsLabel,
    handleSeatPress,
    handleVehicleTypeChange,
    handleBackPress,
    handleContinue,
    t,
  };
};
