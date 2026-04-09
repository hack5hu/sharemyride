import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';

export const useSeatSelection = () => {
  const navigation = useNavigation();
  const { selectSeat: t } = useLocale();

  // We default to No Selection as per design
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const handleSeatPress = useCallback((id: string) => {
    setSelectedSeats((prev) => {
      // For this booking demo, we might allow multiple or single selection.
      // The design shows "1 Seat selected", suggesting multi-select is possible but summary updates.
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinue = useCallback(() => {
    if (selectedSeats.size > 0) {
      // In a real app, this would lead to checkout/payment.
      // For now, we'll navigate to a success summary or back.
      navigation.goBack();
    }
  }, [selectedSeats, navigation]);

  return {
    selectedSeats,
    handleSeatPress,
    handleBackPress,
    handleContinue,
    t,
  };
};
