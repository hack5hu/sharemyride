import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VehicleType } from '@/components/molecules/VehicleToggle';

const PRICE_PER_SEAT = 112.5; // ₹112.50 per seat (₹450 / 4 seats)

export const useSeatSelection = () => {
  const navigation = useNavigation();

  const [vehicleType, setVehicleType] = useState<VehicleType>('5');
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const handleVehicleTypeChange = useCallback((type: VehicleType) => {
    setVehicleType(type);
    // Reset selection when switching layout — seat IDs may differ
    setSelectedSeats(new Set());
  }, []);

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

  const estEarnings = useMemo(() => {
    const total = selectedSeats.size * PRICE_PER_SEAT;
    return `₹${total.toFixed(2)}`;
  }, [selectedSeats]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinue = useCallback(() => {
    if (selectedSeats.size > 0) {
      (navigation.navigate as any)('PriceSelection');
    }
  }, [selectedSeats, navigation]);

  return {
    vehicleType,
    selectedSeats,
    estEarnings,
    handleVehicleTypeChange,
    handleSeatPress,
    handleBackPress,
    handleContinue,
  };
};
