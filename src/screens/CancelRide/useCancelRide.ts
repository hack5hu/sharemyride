import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';

export const useCancelRide = () => {
  const navigation = useNavigation();
  const { cancelRide } = useLocale();

  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(null);
  const [otherReasonText, setOtherReasonText] = useState<string>('');

  const reasons = useMemo(() => [
    { id: 'driver_far', label: cancelRide.reasonDriverFar },
    { id: 'changed_mind', label: cancelRide.reasonChangedMind },
    { id: 'cheaper_ride', label: cancelRide.reasonCheaperRide },
    { id: 'wait_long', label: cancelRide.reasonWaitLong },
    { id: 'other', label: cancelRide.reasonOther },
  ], [cancelRide]);

  const onSelectReason = useCallback((id: string) => {
    setSelectedReasonId(id);
    if (id !== 'other') {
      setOtherReasonText('');
    }
  }, []);

  const onConfirm = useCallback(() => {
    // Dispatch cancellation logic to API/Store here
    const finalReason = selectedReasonId === 'other' ? otherReasonText : selectedReasonId;
    console.log('Cancelling ride with reason:', finalReason);
    
    // Once cancelled, pop screen and navigate appropriately
    navigation.goBack();
    // navigation.navigate('Home') or similar depending on flow.
  }, [selectedReasonId, otherReasonText, navigation]);

  const onDismiss = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    reasons,
    selectedReasonId,
    onSelectReason,
    otherReasonText,
    onOtherReasonTextChange: setOtherReasonText,
    onConfirm,
    onDismiss,
  };
};
