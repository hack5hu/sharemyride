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
import { moderateScale } from '@/styles';
import { Loader } from '@/components/atoms/Loader';
import { RideStatsStrip } from '@/components/organisms/RideStatsStrip/RideStatsStrip';
import { RideComfortSection } from '@/components/organisms/RideComfortSection/RideComfortSection';
import { PassengerManagement } from '@/components/organisms/PassengerManagement/PassengerManagement';
import { RideFareCard } from '@/components/organisms/RideFareCard/RideFareCard';
import { RideVehicleCard } from '@/components/organisms/RideVehicleCard/RideVehicleCard';

export const RideInformationTemplate: React.FC<RideInformationTemplateProps> = ({
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
        <Loader message="Curating ride details for you..." />
      </ScreenShell>
    );
  }

  if (!ride) return null;

  const rideAny = ride as any;
  const departureTime = ride.timeline[0]?.time ?? '--:--';
  const departureDateLabel: string = rideAny.departureDate ?? 'Today';

  const durationHours = Math.floor(ride.totalDuration / 60);
  const durationMins = ride.totalDuration % 60;
  const durationLabel = durationHours > 0
    ? `${durationHours}h ${durationMins}m`
    : `${durationMins}m`;

  return (
    <S.Root>
      <ScreenShell title={t.title} onBack={true}>
        <S.ScrollContent showsVerticalScrollIndicator={false}>
          <S.ContentPadding>
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
                        {ride.driver.rating} · {ride.driver.rideCount} rides
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
            />

            {/* ── Fare Info ── */}
            {showVehicleDetails ? (
              <S.FareSummaryRow>
                <S.FareSummaryItem>
                  <Icon name="currency-rupee" size={moderateScale(18)} color={theme.colors.primary} />
                  <S.FareSummaryText>
                    <Typography variant="label" size="xs" color="on_surface_variant">Booking Total</Typography>
                    <Typography variant="title" size="sm" weight="bold">₹{rideAny.bookingPrice?.toFixed(0) ?? ride.price.toFixed(0)}</Typography>
                  </S.FareSummaryText>
                </S.FareSummaryItem>
                <S.FareDivider />
                <S.FareSummaryItem>
                  <Icon name="event-seat" size={moderateScale(18)} color={theme.colors.primary} />
                  <S.FareSummaryText>
                    <Typography variant="label" size="xs" color="on_surface_variant">Seats</Typography>
                    <Typography variant="title" size="sm" weight="bold">{rideAny.seatNames?.join(', ') || `${rideAny.seatsBooked} seat(s)`}</Typography>
                  </S.FareSummaryText>
                </S.FareSummaryItem>
                <S.FareDivider />
                <S.FareSummaryItem>
                  <Icon name="payments" size={moderateScale(18)} color={theme.colors.primary} />
                  <S.FareSummaryText>
                    <Typography variant="label" size="xs" color="on_surface_variant">Payment</Typography>
                    <Typography variant="title" size="sm" weight="bold">{rideAny.paymentMethod ?? 'Cash'}</Typography>
                  </S.FareSummaryText>
                </S.FareSummaryItem>
              </S.FareSummaryRow>
            ) : (
              <RideFareCard price={ride.price} />
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
            <RideComfortSection features={ride.features} />

            {/* ── Vehicle Details ── */}
            {showVehicleDetails && ride.vehicle && (
              <RideVehicleCard vehicle={ride.vehicle} />
            )}

            {/* ── Fellow Travelers ── */}
            <PassengerManagement
              isDriver={isDriver}
              passengers={ride.passengers}
              seatsLeft={ride.seatsLeft}
              onCancelPassenger={onCancelPassenger}
              t={t}
            />

           

           

          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom CTA ── */}
        {(showBookButton || isDriver) && (
          <S.FixedFooter>
            {isDriver ? (
              <S.CancelWholeRideButton onPress={onCancelRide} activeOpacity={0.85}>
                <Icon name="cancel" size={moderateScale(20)} color={theme.colors.error} />
                <Typography variant="title" size="sm" weight="bold" color="error">
                  Cancel Whole Ride
                </Typography>
              </S.CancelWholeRideButton>
            ) : (
              <S.BookButton onPress={handleBook} activeOpacity={0.85}>
                <Icon name="airline-seat-recline-normal" size={moderateScale(20)} color={theme.colors.on_primary} />
                <Typography variant="title" size="sm" weight="bold" color="on_primary">
                  Select a Seat
                </Typography>
              </S.BookButton>
            )}
          </S.FixedFooter>
        )}
      </ScreenShell>
    </S.Root>
  );
};
