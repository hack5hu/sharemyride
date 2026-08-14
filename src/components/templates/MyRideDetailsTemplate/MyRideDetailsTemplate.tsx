import React from 'react';
import { useLocale } from '@/constants/localization';
import { MyRideDetailsTemplateProps } from './types.d';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { FixedFooter } from '@/components/molecules/FixedFooter';
import * as S from './MyRideDetailsTemplate.styles';
import { Button } from '@/components/atoms/Button';
import { Loader } from '@/components/atoms/Loader';
import { RideComfortSection } from '@/components/organisms/RideComfortSection/RideComfortSection';
import { PassengerManagement } from '@/components/organisms/PassengerManagement/PassengerManagement';
import { RideVehicleCard } from '@/components/organisms/RideVehicleCard/RideVehicleCard';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { RideStatsStrip } from '@/components/organisms/RideStatsStrip/RideStatsStrip';
import { DriverCard } from '@/components/templates/RideInformationTemplate/components/DriverCard';
import { CancellationReasonBox } from '@/components/templates/RideInformationTemplate/components/CancellationReasonBox';
import { mapRideDetailsData } from './utils/rideMapper';
import { RatingInvitationCard } from './components/RatingInvitationCard';
import { PassengerSummarySection } from './components/PassengerSummarySection';

export const MyRideDetailsTemplate: React.FC<MyRideDetailsTemplateProps> =
  React.memo(
    ({
      ride,
      handleBack,
      handleViewRoute,
      handleCopyAddress,
      handleChat,
      isLoading,
      isDriver,
      onCancelRide,
      onCancelPassenger,
      onReportRide,
      handlePassengerProfile,
      handleDriverProfile,
      onRateDriver,
      onRatePassenger,
    }) => {
      const translations = useLocale();

      if (isLoading) {
        return (
          <ScreenShell
            title={translations.rideDetails.headerTitle}
            onBack={handleBack}
          >
            <Loader message={translations.rideDetails.fetchingDetails} />
          </ScreenShell>
        );
      }

      if (!ride) return null;

      const {
        departureDateLabel,
        departureTime,
        durationLabel,
        seatsLeft,
        passengerPrice,
        passengerSeatInfo,
        timelinePoints,
        comfortFeatures,
        driverData,
        passengerData,
        isArchived,
        isCompleted,
      } = mapRideDetailsData(ride, translations, isDriver);

      const showFooter = !isArchived;

      return (
        <S.Root>
          <ScreenShell
            title={translations.rideDetails.headerTitle}
            onBack={handleBack}
            rightElement={
              !isArchived && onReportRide ? (
                <Button
                  variant="text"
                  icon="flag"
                  iconPosition="left"
                  onPress={onReportRide}
                />
              ) : undefined
            }
          >
            <S.ScrollContent showsVerticalScrollIndicator={false}>
              <S.ContentPadding>
                {isArchived && ride.cancellationReason && (
                  <CancellationReasonBox
                    cancellationReason={ride.cancellationReason}
                  />
                )}

                {isCompleted &&
                  !isDriver &&
                  onRateDriver &&
                  driverData && (
                    <RatingInvitationCard
                      hasRated={driverData.hasRated}
                      driverName={ride.driver?.name || 'Driver'}
                      onRateDriver={onRateDriver}
                      t={translations.rating}
                    />
                  )}

                <S.SectionCard>
                  <S.SectionLabelRow>
                    <S.SectionDot />
                    <Button variant="text" size="small" disabled>
                      {translations.rideDetails.timelineTitle.toUpperCase()}
                    </Button>
                  </S.SectionLabelRow>
                  <RideTimeline
                    points={timelinePoints}
                    showActions={true}
                    onMapPress={handleViewRoute}
                    onCopyAddress={handleCopyAddress}
                    isDriver={isDriver}
                  />
                </S.SectionCard>

                {isDriver ? (
                  <RideStatsStrip
                    departureDate={departureDateLabel}
                    departureTime={departureTime}
                    durationLabel={durationLabel}
                    seatsLeft={seatsLeft}
                    t={translations.rideDetails}
                  />
                ) : (
                  <PassengerSummarySection
                    departureDateLabel={departureDateLabel}
                    departureTime={departureTime}
                    durationLabel={durationLabel}
                    passengerSeatInfo={passengerSeatInfo}
                    passengerPrice={passengerPrice}
                    t={translations.rideDetails}
                  />
                )}

                {!isDriver && driverData && (
                  <DriverCard
                    driver={driverData}
                    handleDriverProfile={() =>
                      handleDriverProfile?.(driverData.id)
                    }
                    handleChat={handleChat}
                    showChat={true}
                  />
                )}

                <RideComfortSection
                  features={comfortFeatures}
                  t={translations.rideDetails}
                />

                {ride.vehicle && (
                  <RideVehicleCard
                    vehicle={ride.vehicle}
                    t={
                      translations.rideDetails as unknown as Record<
                        string,
                        string
                      >
                    }
                  />
                )}

                <PassengerManagement
                  isDriver={isDriver}
                  passengers={passengerData}
                  seatsLeft={ride.availableSeats ?? ride.seatsLeft ?? 0}
                  onCancelPassenger={onCancelPassenger}
                  onPassengerPress={handlePassengerProfile}
                  hideActions={isArchived}
                  vehicleType={ride.vehicle?.type}
                  onRatePassenger={onRatePassenger}
                  isCompleted={isCompleted}
                />
              </S.ContentPadding>
            </S.ScrollContent>

            {showFooter && (
              <FixedFooter>
                <Button
                  variant="outline"
                  icon={isDriver ? 'cancel' : 'person-remove'}
                  iconPosition="left"
                  onPress={
                    isDriver ? onCancelRide : () => onCancelPassenger('')
                  }
                >
                  {isDriver
                    ? translations.rideDetails.cancelRide
                    : translations.rideDetails.cancelBooking}
                </Button>
              </FixedFooter>
            )}
          </ScreenShell>
        </S.Root>
      );
    },
  );

MyRideDetailsTemplate.displayName = 'MyRideDetailsTemplate';
