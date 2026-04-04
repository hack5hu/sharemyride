import React from 'react';
import { CancelRideTemplate } from '@/components/templates/CancelRideTemplate';
import { useCancelRide } from './useCancelRide';

export const CancelRideScreen: React.FC = () => {
  const {
    reasons,
    selectedReasonId,
    onSelectReason,
    otherReasonText,
    onOtherReasonTextChange,
    onConfirm,
    onDismiss,
  } = useCancelRide();

  return (
    <CancelRideTemplate
      reasons={reasons}
      selectedReasonId={selectedReasonId}
      onSelectReason={onSelectReason}
      otherReasonText={otherReasonText}
      onOtherReasonTextChange={onOtherReasonTextChange}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
    />
  );
};
