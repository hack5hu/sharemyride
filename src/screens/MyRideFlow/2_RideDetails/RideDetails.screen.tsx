import React, { memo } from 'react';
import { MyRideDetailsTemplate } from '@/components/templates/MyRideDetailsTemplate';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Loader } from '@/components/atoms/Loader';
import { useRideDetails } from './useRideDetails';
import { RideDetailsScreenProps } from './types';
import { CancelRideModal } from '@/components/organisms/CancelRideModal';
import { Container, Overlay } from './RideDetails.styles';
import { Box } from '@/components/atoms/Box';
import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';

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
      <MyRideDetailsTemplate
        t={t}
        handleBack={handleBack}
        ride={ride}
        handleViewRoute={handleViewRoute}
        handleCopyAddress={handleCopyAddress}
        handleChat={handleChat}
        isDriver={isDriver}
        onCancelRide={handleCancelRide}
        onCancelPassenger={(id) => (isDriver ? handleCancelPassenger(id) : handleCancelOwnBooking())}
        onReportRide={handleReportRide}
      />

      {isCancelModalVisible && (
        <CancelRideModal
          isVisible={isCancelModalVisible}
          onClose={() => setIsCancelModalVisible(false)}
          onSubmit={handleConfirmCancel}
          bookingId={cancelTarget?.id?.toString() || ride.myBookingId || ride.id || 'Ride'}
          isDriver={isDriver}
          isSpecificUser={cancelTarget?.type === 'BOOKING' && !cancelTarget?.isSelf}
          isLoading={isCancelling}
        />
      )}

      {isReportModalVisible && (
        <ReportIssueModal
          isVisible={isReportModalVisible}
          onClose={() => setIsReportModalVisible(false)}
          onSubmit={handleReportSubmit}
          bookingId={ride.myBookingId || ride.id || 'Ride'}
        />
      )}
    </Container>
  );
});

