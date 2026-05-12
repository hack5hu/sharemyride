import React, { memo } from 'react';
import { RideInformationTemplate } from '@/components/templates/RideInformationTemplate/RideInformationTemplate';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Loader } from '@/components/atoms/Loader';
import { useRideDetails } from './useRideDetails';
import { RideDetailsScreenProps } from './types';
import { CancelRideTemplate } from '@/components/templates/CancelRideTemplate';
import { Container, Overlay } from './RideDetails.styles';
import { Box } from '@/components/atoms/Box';

export const RideDetailsScreen: React.FC<RideDetailsScreenProps> = memo(() => {
  const { 
    ride, 
    isLoading, 
    isDriver,
    t, 
    handleBack, 
    handleBook, 
    handleViewRoute, 
    handleCopyAddress,
    handleDriverProfile,
    handleChat,
    handleCancelRide,
    handleCancelPassenger,
    handleCancelOwnBooking,
    isCancelModalVisible,
    setIsCancelModalVisible,
    selectedReasonId,
    setSelectedReasonId,
    otherReasonText,
    setOtherReasonText,
    cancellationReasons,
    handleConfirmCancel,
  } = useRideDetails();

  if (isLoading) {
    return (
      <ScreenShell title={t.title} onBack={handleBack}>
        <Loader message={t.loaderMessage} />
      </ScreenShell>
    );
  }

  if (!ride) return null;

  return (
    <Container>
      <RideInformationTemplate
        t={t}
        handleBack={handleBack}
        ride={ride}
        handleBook={handleBook}
        handleViewRoute={handleViewRoute}
        handleCopyAddress={handleCopyAddress}
        handleDriverProfile={handleDriverProfile}
        handleChat={handleChat}
        showBookButton={false}
        isDriver={isDriver}
        onCancelRide={handleCancelRide}
        onCancelPassenger={(id) => (isDriver ? handleCancelPassenger(id) : handleCancelOwnBooking())}
        showVehicleDetails={true}
      />

      {isCancelModalVisible && (
        <Overlay>
          <CancelRideTemplate
            reasons={cancellationReasons}
            selectedReasonId={selectedReasonId}
            onSelectReason={setSelectedReasonId}
            otherReasonText={otherReasonText}
            onOtherReasonTextChange={setOtherReasonText}
            onConfirm={handleConfirmCancel}
            onDismiss={() => setIsCancelModalVisible(false)}
          />
        </Overlay>
      )}
    </Container>
  );
});

