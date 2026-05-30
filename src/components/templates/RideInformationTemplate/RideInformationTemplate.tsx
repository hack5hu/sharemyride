import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { RideInformationTemplateProps } from './types.d';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './RideInformationTemplate.styles';
import { moderateScale } from '@/styles';
import { Loader } from '@/components/atoms/Loader';
import { RideStatsStrip } from '@/components/organisms/RideStatsStrip/RideStatsStrip';
import { RideComfortSection } from '@/components/organisms/RideComfortSection/RideComfortSection';
import { PassengerManagement } from '@/components/organisms/PassengerManagement/PassengerManagement';
import { RideFareCard } from '@/components/organisms/RideFareCard/RideFareCard';
import { RideVehicleCard } from '@/components/organisms/RideVehicleCard/RideVehicleCard';
import { useLocale } from '@/constants/localization';
import { useAuthStore } from '@/store/useAuthStore';

// Subcomponents
import { CancellationReasonBox } from './components/CancellationReasonBox';
import { DriverCard } from './components/DriverCard';
import { FareSummaryRow } from './components/FareSummaryRow';
import { FixedFooterCTA } from './components/FixedFooterCTA';

export const RideInformationTemplate: React.FC<RideInformationTemplateProps> = React.memo(({
  ride,
  handleBack,
  handleBook,
  handleViewRoute,
  handleCopyAddress,
  handleDriverProfile,
  handleChat,
  isLoading,
  showBookButton = true,
  isDriver = false,
  onCancelRide,
  onCancelPassenger,
  showVehicleDetails = false,
  onReportRide,
}) => {
  const theme = useTheme();
  const translations = useLocale();
  const { user } = useAuthStore();

  const isMyRide = useMemo(() => {
    return isDriver || ride?.driver?.id === user?.id || ride?.driver?.id === user?.userId;
  }, [isDriver, ride?.driver?.id, user?.id, user?.userId]);

  const departureTime = useMemo(() => {
    return ride?.timeline?.[0]?.time ?? '--:--';
  }, [ride]);

  const departureDateLabel = useMemo(() => {
    return ride?.departureDate ?? translations.common.today;
  }, [ride, translations.common.today]);

  const durationLabel = useMemo(() => {
    if (!ride) return '';
    const durationHours = Math.floor(ride.totalDuration / 60);
    const durationMins = ride.totalDuration % 60;
    return durationHours > 0
      ? `${durationHours}h ${durationMins}m`
      : `${durationMins}m`;
  }, [ride]);

  const isArchived = useMemo(() => {
    if (!ride) return false;
    return ride.status === 'COMPLETED' || ride.status === 'CANCELLED' || ride.status === 'REJECTED';
  }, [ride]);

  if (isLoading) {
    return (
      <ScreenShell title={translations.rideDetails.headerTitle} onBack={handleBack}>
        <Loader message={translations.rideDetails.fetchingDetails} />
      </ScreenShell>
    );
  }

  if (!ride) return null;

  const showFooter = !isArchived && (showBookButton || isDriver || !showBookButton);

  return (
    <S.Root>
      <ScreenShell 
        title={translations.rideDetails.headerTitle} 
        onBack={handleBack}
        rightElement={!isArchived && onReportRide ? (
          <S.ReportButton onPress={onReportRide} activeOpacity={0.7}>
            <Icon name="flag" size={moderateScale(22)} color={theme.colors.error} />
          </S.ReportButton>
        ) : undefined}
      >
        <S.ScrollContent showsVerticalScrollIndicator={false}>
          <S.ContentPadding>
            {/* ── Cancellation Reason (If archived & cancelled) ── */}
            {isArchived && ride.cancellationReason && (
              <CancellationReasonBox cancellationReason={ride.cancellationReason} />
            )}

            {/* ── Route Timeline ── */}
            <S.SectionCard>
              <S.SectionLabelRow>
                <S.SectionDot />
                <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                  {translations.rideDetails.timelineTitle.toUpperCase()}
                </Typography>
              </S.SectionLabelRow>
              <RideTimeline
                points={ride.timeline}
                showActions={true}
                onMapPress={handleViewRoute}
                onCopyAddress={handleCopyAddress}
              />
            </S.SectionCard>


            {/* ── Stats Strip ── */}
            {/* <RideStatsStrip
              departureDate={departureDateLabel}
              departureTime={departureTime}
              durationLabel={durationLabel}
              seatsLeft={ride.seatsLeft}
              t={translations.rideDetails}
            /> */}

            {/* ── Driver Card (hidden for driver) ── */}
            {!isDriver && (
              <DriverCard 
                driver={ride.driver}
                handleDriverProfile={handleDriverProfile}
                handleChat={handleChat}
                showChat={!isMyRide}
              />
            )}

           
            

            {/* ── Journey Comfort ── */}
            <RideComfortSection features={ride.features} t={translations.rideDetails} />


             {/* ── Fare Info ── */}
            {/* {showVehicleDetails && (
              <FareSummaryRow ride={ride} />
            ) } */}


            {/* ── Vehicle Details ── */}
              <RideVehicleCard vehicle={ride.vehicle} t={translations.rideDetails as unknown as Record<string, string>} />

            {/* ── Fellow Travelers ── */}
            <PassengerManagement
              isDriver={isDriver}
              passengers={ride.passengers}
              seatsLeft={ride.seatsLeft}
              onCancelPassenger={onCancelPassenger}
              hideActions={isArchived}
              vehicleType={ride.vehicle?.type}
            />


          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom CTA ── */}
        {showFooter && (
          <FixedFooterCTA 
            isDriver={isDriver}
            showBookButton={showBookButton}
            onCancelRide={onCancelRide}
            handleBook={handleBook}
            onCancelPassenger={onCancelPassenger}
          />
        )}
      </ScreenShell>
    </S.Root>
  );
});
