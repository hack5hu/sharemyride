import React, { memo } from 'react';
import { RideInformationTemplate } from '@/components/templates/RideInformationTemplate/RideInformationTemplate';
import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';
import { useRideInformation } from './useRideInformation';
import { RideInformationProps } from './types';

export const RideInformationScreen: React.FC<RideInformationProps> = memo(
  ({ route }) => {
    const {
      t,
      handleBack,
      handleBook,
      handleChat,
      handleDriverProfile,
      handlePassengerProfile,
      handleViewRoute,
      handleCopyAddress,
      ride,
      isLoading,
      isReportModalVisible,
      setIsReportModalVisible,
      handleReportRide,
      handleReportSubmit,
    } = useRideInformation(
      route.params.rideId,
      route.params.sourceStopId,
      route.params.destinationStopId,
    );

    return (
      <>
        <RideInformationTemplate
          ride={ride}
          t={t}
          handleBack={handleBack}
          handleBook={handleBook}
          handleChat={handleChat}
          handleDriverProfile={handleDriverProfile}
          handlePassengerProfile={handlePassengerProfile}
          handleViewRoute={handleViewRoute}
          handleCopyAddress={handleCopyAddress}
          isLoading={isLoading}
          onReportRide={handleReportRide}
        />

        {isReportModalVisible && (
          <ReportIssueModal
            isVisible={isReportModalVisible}
            onClose={() => setIsReportModalVisible(false)}
            onSubmit={handleReportSubmit}
            bookingId={ride?.id || 'Ride'}
          />
        )}
      </>
    );
  },
);
