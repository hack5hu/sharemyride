import React from 'react';
import { Loader } from '@/components/atoms/Loader';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { CancelRideModal } from '@/components/organisms/CancelRideModal';
import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';
import { MyRideDetailsTemplate } from '@/components/templates/MyRideDetailsTemplate';
import * as S from './RideDetailsTemplate.styles';
import { type RideDetailsTemplateProps } from './types.d';

export const RideDetailsTemplate: React.FC<RideDetailsTemplateProps> = ({
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
  _cancellationReasons,
  handleConfirmCancel,
  isCancelling,
  cancelTarget,
  handleReportRide,
  isReportModalVisible,
  setIsReportModalVisible,
  handleReportSubmit,
  handleRateDriver,
  handleRatePassenger,
}) => {
  if (isLoading) {
    return (
      <ScreenShell title={t.title} onBack={handleBack}>
        <Loader message={t.loaderMessage} />
      </ScreenShell>
    );
  }

  if (!ride) return null;

  return (
    <S.Container>
      <MyRideDetailsTemplate
        t={t}
        handleBack={handleBack}
        ride={ride}
        handleViewRoute={handleViewRoute}
        handleCopyAddress={handleCopyAddress}
        handleChat={handleChat}
        handleCall={handleCall}
        handleDriverProfile={handleDriverProfile}
        handlePassengerProfile={handlePassengerProfile}
        isDriver={isDriver}
        onCancelRide={handleCancelRide}
        onCancelPassenger={id =>
          isDriver ? handleCancelPassenger(id) : handleCancelOwnBooking()
        }
        onReportRide={handleReportRide}
        onRateDriver={handleRateDriver}
        onRatePassenger={handleRatePassenger}
      />

      {isCancelModalVisible && (
        <CancelRideModal
          isVisible={isCancelModalVisible}
          onClose={() => setIsCancelModalVisible(false)}
          onSubmit={handleConfirmCancel}
          bookingId={
            cancelTarget?.id?.toString() ||
            ride.myBookingId ||
            ride.id ||
            'Ride'
          }
          isDriver={isDriver}
          isSpecificUser={
            cancelTarget?.type === 'BOOKING' && !cancelTarget?.isSelf
          }
          isLoading={isCancelling}
        />
      )}

      {isReportModalVisible && (
        <ReportIssueModal
          isVisible={isReportModalVisible}
          onClose={() => setIsReportModalVisible(false)}
          onSubmit={handleReportSubmit}
          bookingId={ride.myBookingId || ride.id || 'Ride'}
          reportType="RIDE"
        />
      )}
    </S.Container>
  );
};
