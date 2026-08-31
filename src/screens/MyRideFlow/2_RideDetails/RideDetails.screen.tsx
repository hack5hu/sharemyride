import React, { memo } from 'react';
import { useRideDetails } from './useRideDetails';
import { RideDetailsScreenProps } from './types';
import { RideDetailsTemplate } from '@/components/templates/RideDetailsTemplate';

export const RideDetailsScreen: React.FC<RideDetailsScreenProps> = memo(() => {
  const {
    ride,
    isLoading,
    isDriver,
    t,
    handleBack,
    handleViewRoute,
    handleCopyAddress,
    handleChat,
    handleCall,
    handleDriverProfile,
    handlePassengerProfile,
    handleCancelRide,
    handleCancelPassenger,
    handleCancelOwnBooking,
    isCancelModalVisible,
    setIsCancelModalVisible,
    cancellationReasons,
    handleConfirmCancel,
    isCancelling,
    cancelTarget,
    handleReportRide,
    isReportModalVisible,
    setIsReportModalVisible,
    handleReportSubmit,
    handleRateDriver,
    handleRatePassenger,
  } = useRideDetails();

  return (
    <RideDetailsTemplate
      ride={ride}
      isLoading={isLoading}
      isDriver={isDriver}
      t={t}
      handleBack={handleBack}
      handleViewRoute={handleViewRoute}
      handleCopyAddress={handleCopyAddress}
      handleChat={handleChat}
      handleCall={handleCall}
      handleDriverProfile={handleDriverProfile}
      handlePassengerProfile={handlePassengerProfile}
      handleCancelRide={handleCancelRide}
      handleCancelPassenger={handleCancelPassenger}
      handleCancelOwnBooking={handleCancelOwnBooking}
      isCancelModalVisible={isCancelModalVisible}
      setIsCancelModalVisible={setIsCancelModalVisible}
      cancellationReasons={cancellationReasons}
      handleConfirmCancel={handleConfirmCancel}
      isCancelling={isCancelling}
      cancelTarget={cancelTarget}
      handleReportRide={handleReportRide}
      isReportModalVisible={isReportModalVisible}
      setIsReportModalVisible={setIsReportModalVisible}
      handleReportSubmit={handleReportSubmit}
      handleRateDriver={handleRateDriver}
      handleRatePassenger={handleRatePassenger}
    />
  );
});
