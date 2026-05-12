import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { RideInformationTemplateProps } from './types.d';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './RideInformationTemplate.styles';
import { moderateScale, verticalScale } from '@/styles';
import { Loader } from '@/components/atoms/Loader';
import { RideStatsStrip } from '@/components/organisms/RideStatsStrip/RideStatsStrip';
import { RideComfortSection } from '@/components/organisms/RideComfortSection/RideComfortSection';
import { PassengerManagement } from '@/components/organisms/PassengerManagement/PassengerManagement';
import { RideFareCard } from '@/components/organisms/RideFareCard/RideFareCard';
import { RideVehicleCard } from '@/components/organisms/RideVehicleCard/RideVehicleCard';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';

export const RideInformationTemplate: React.FC<RideInformationTemplateProps> = React.memo(({
  ride,
  t,
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
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <ScreenShell title={t.title} onBack={handleBack}>
        <Loader message={t.loaderMessage} />
      </ScreenShell>
    );
  }

  if (!ride) return null;

  const rideAny = ride as any;
  const departureTime = ride.timeline[0]?.time ?? '--:--';
  const departureDateLabel: string = rideAny.departureDate ?? t.today ?? 'Today';

  const durationHours = Math.floor(ride.totalDuration / 60);
  const durationMins = ride.totalDuration % 60;
  const durationLabel = durationHours > 0
    ? `${durationHours}h ${durationMins}m`
    : `${durationMins}m`;
  const isArchived = (ride.status === 'COMPLETED' || ride.status === 'CANCELLED' || ride.status === 'REJECTED') || ride.userRole === 'VIEWER'

  return (
    <S.Root>
      <ScreenShell 
        title={t.title} 
        onBack={true}
        rightElement={!isArchived ? (
          <S.ReportButton onPress={() => {}} activeOpacity={0.7}>
            <Icon name="flag" size={moderateScale(22)} color={theme.colors.error} />
          </S.ReportButton>
        ) : undefined}
      >
        <S.ScrollContent showsVerticalScrollIndicator={false}>
          <S.ContentPadding>
            {/* ── Cancellation Reason (If archived & cancelled) ── */}
            {isArchived && ride.cancellationReason && (
              <Box 
                backgroundColor={theme.colors.error + '10'} 
                padding={moderateScale(12)} 
                borderRadius={moderateScale(12)}
                marginBottom={verticalScale(16)}
                flexDirection="row"
                alignItems="center"
              >
                <Icon name="error-outline" size={moderateScale(20)} color={theme.colors.error} />
                <Box marginLeft={moderateScale(8)} flex={1}>
                  <Typography variant="label" size="xs" weight="bold" color="error">
                    CANCELLATION REASON
                  </Typography>
                  <Typography variant="body" size="sm" color="on_surface">
                    {ride.cancellationReason}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* ── Driver Card (hidden for driver) ── */}
            {!isDriver && (
              <S.DriverCard>
                <S.DriverInfoGroup onPress={handleDriverProfile}>
                  <S.AvatarWrapper>
                    <Avatar
                      source={{ uri: ride.driver.driverPhotoUrl || ride.driver.avatar }}
                      size="md"
                      border
                    />
                    <S.BadgePin>
                      <VerifiedBadge size={14} />
                    </S.BadgePin>
                  </S.AvatarWrapper>

                  <S.DriverTextGroup>
                    <Typography variant="title" size="sm" weight="bold">
                      {ride.driver.name}
                    </Typography>
                    <S.VerifiedRow>
                      <Icon name="star" size={moderateScale(13)} color="#EAB308" />
                      <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                        {ride.driver.rating} · {ride.driver.rideCount} {t.ridesLabel || 'rides'}
                      </Typography>
                    </S.VerifiedRow>
                  </S.DriverTextGroup>
                </S.DriverInfoGroup>

                <S.ChatButton onPress={handleChat} activeOpacity={0.8}>
                  <Icon name="chat-bubble-outline" size={moderateScale(20)} color={theme.colors.primary} />
                </S.ChatButton>
              </S.DriverCard>
            )}

            {/* ── Stats Strip ── */}
            <RideStatsStrip
              departureDate={departureDateLabel}
              departureTime={departureTime}
              durationLabel={durationLabel}
              seatsLeft={ride.seatsLeft}
              t={t}
            />

            {/* ── Fare Info ── */}
            {showVehicleDetails ? (
              <S.FareSummaryRow>
                <S.FareSummaryItem>
                  <Icon name="currency-rupee" size={moderateScale(18)} color={theme.colors.primary} />
                  <S.FareSummaryText>
                    <Typography variant="label" size="xs" color="on_surface_variant">{t.bookingTotal || 'Booking Total'}</Typography>
                    <Typography variant="title" size="sm" weight="bold">₹{rideAny.bookingPrice?.toFixed(0) ?? ride.price.toFixed(0)}</Typography>
                  </S.FareSummaryText>
                </S.FareSummaryItem>
                <S.FareDivider />
                <S.FareSummaryItem>
                  <Icon name="event-seat" size={moderateScale(18)} color={theme.colors.primary} />
                  <S.FareSummaryText>
                    <Typography variant="label" size="xs" color="on_surface_variant">{t.seatsLabel || 'Seats'}</Typography>
                    <Typography variant="title" size="sm" weight="bold">{rideAny.seatNames?.join(', ') || `${rideAny.seatsBooked} ${t.seatLabel || 'seat(s)'}`}</Typography>
                  </S.FareSummaryText>
                </S.FareSummaryItem>
                <S.FareDivider />
                <S.FareSummaryItem>
                  <Icon name="payments" size={moderateScale(18)} color={theme.colors.primary} />
                  <S.FareSummaryText>
                    <Typography variant="label" size="xs" color="on_surface_variant">{t.paymentLabel || 'Payment'}</Typography>
                    <Typography variant="title" size="sm" weight="bold">{rideAny.paymentMethod ?? t.cashLabel ?? 'Cash'}</Typography>
                  </S.FareSummaryText>
                </S.FareSummaryItem>
              </S.FareSummaryRow>
            ) : (
              <RideFareCard price={ride.price} t={t} />
            )}

            {/* ── Route Timeline ── */}
            <S.SectionCard>
              <S.SectionLabelRow>
                <S.SectionDot />
                <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                  {t.timelineTitle.toUpperCase()}
                </Typography>
              </S.SectionLabelRow>
              <RideTimeline
                points={ride.timeline}
                showActions={true}
                onMapPress={handleViewRoute}
                onCopyAddress={handleCopyAddress}
              />
            </S.SectionCard>

            {/* ── Journey Comfort ── */}
            <RideComfortSection features={ride.features} t={t} />

            {/* ── Vehicle Details ── */}
            {showVehicleDetails && ride.vehicle && (
              <RideVehicleCard vehicle={ride.vehicle} t={t} />
            )}

            {/* ── Fellow Travelers ── */}
            <PassengerManagement
              isDriver={isDriver}
              passengers={ride.passengers}
              seatsLeft={ride.seatsLeft}
              onCancelPassenger={onCancelPassenger}
              t={t}
              hideActions={isArchived}
            />

          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom CTA ── */}
        {!isArchived && (showBookButton || isDriver || !showBookButton) && (
          <S.FixedFooter>
            {isDriver ? (
              <Button
                variant="outline"
                icon="cancel"
                iconPosition="left"
                onPress={onCancelRide}
              >
                {t.cancelRide || 'Cancel Whole Ride'}
              </Button>
            ) : showBookButton ? (
              <Button
                variant="primary"
                icon="airline-seat-recline-normal"
                iconPosition="left"
                onPress={handleBook}
              >
                {t.selectSeat || 'Select a Seat'}
              </Button>
            ) : (
              <Button
                variant="outline"
                icon="person-remove"
                iconPosition="left"
                onPress={() => onCancelPassenger?.('')}
              >
                {t.cancelBooking || 'Cancel My Booking'}
              </Button>
            )}
          </S.FixedFooter>
        )}
      </ScreenShell>
    </S.Root>
  );
});

