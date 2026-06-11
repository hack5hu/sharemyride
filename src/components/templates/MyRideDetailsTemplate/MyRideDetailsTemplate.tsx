import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { MyRideDetailsTemplateProps } from './types.d';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './MyRideDetailsTemplate.styles';
import { moderateScale, verticalScale } from '@/styles';
import { Loader } from '@/components/atoms/Loader';
import { RideComfortSection } from '@/components/organisms/RideComfortSection/RideComfortSection';
import { PassengerManagement } from '@/components/organisms/PassengerManagement/PassengerManagement';
import { RideVehicleCard } from '@/components/organisms/RideVehicleCard/RideVehicleCard';
import { RouteJourney } from '@/components/organisms/RouteJourney';
import { useLocale } from '@/constants/localization';
import { Button } from '@/components/atoms/Button';
import { DriverCard } from '@/components/templates/RideInformationTemplate/components/DriverCard';
import { CancellationReasonBox } from '@/components/templates/RideInformationTemplate/components/CancellationReasonBox';
import { FareSummaryRow } from '@/components/templates/RideInformationTemplate/components/FareSummaryRow';
import { RideStatsStrip } from '@/components/organisms/RideStatsStrip/RideStatsStrip';
import { RideStatus } from '@/constants/enums';

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
      t,
    }) => {
      const theme = useTheme();
      const translations = useLocale();

      const departureDateLabel = useMemo(() => {
        if (!ride?.startTime) return translations.common.today;
        const date = new Date(ride.startTime);
        return date.toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }, [ride?.startTime, translations.common.today]);

      const departureTime = useMemo(() => {
        if (!ride?.startTime) return '--:--';
        const date = new Date(ride.startTime);
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      }, [ride?.startTime]);

      const durationLabel = useMemo(() => {
        return ride?.duration ?? '';
      }, [ride?.duration]);

      const seatsLeft = useMemo(() => {
        return ride?.availableSeats ?? ride?.seatsLeft ?? 0;
      }, [ride?.availableSeats, ride?.seatsLeft]);

      const passengerPrice = useMemo(() => {
        const booking = ride.myBooking;
        const priceVal = booking?.price ?? ride.bookingPrice ?? ride.price ?? 0;
        return Number(priceVal).toFixed(0);
      }, [ride]);

      const passengerSeatInfo = useMemo(() => {
        const booking = ride.myBooking;
        const seatsCount = booking?.seatCount ?? ride.seatsBooked ?? 0;
        const vType = ride.vehicle?.type || ride.vehicleType;
        const seatIds = booking?.seatIds || ride.seatIds || [];

        const getSeatDescription = (
          seatId: string | number,
          vehicleType?: string,
        ): string => {
          const id = String(seatId);
          const typeStr = (vehicleType || '').toUpperCase();
          const is7Seater = typeStr.includes('7') || typeStr === '7';
          const positions = translations.bookingConfirmed.seatPositions;

          if (id === '1' || id === 'driver') return positions.driver;
          if (id === '2') return positions.frontPassenger;

          if (is7Seater) {
            switch (id) {
              case '3':
                return positions.middleLeft;
              case '4':
                return positions.middleCenter;
              case '5':
                return positions.middleRight;
              case '6':
                return positions.backLeft;
              case '7':
                return positions.backRight;
            }
          } else {
            switch (id) {
              case '3':
                return positions.backLeft;
              case '4':
                return positions.backCenter;
              case '5':
                return positions.backRight;
            }
          }

          return positions.defaultSeat.replace('{id}', id);
        };

        if (ride.seatNames && ride.seatNames.length > 0) {
          return ride.seatNames.join(', ');
        } else if (seatIds && seatIds.length > 0) {
          return seatIds
            .map((id: string | number) => getSeatDescription(id, vType))
            .join(', ');
        } else {
          return `${seatsCount} ${translations.rideDetails.seatLabel}`;
        }
      }, [ride, translations]);

      const timelinePoints = useMemo(() => {
        if (!ride?.stops) return [];
        const sourceId = ride.myBooking?.sourceStopId ?? ride.sourceStopId;
        const destId =
          ride.myBooking?.destinationStopId ?? ride.destinationStopId;

        return ride.stops.map((stop: any) => {
          const isHighlighted =
            isDriver || stop.id === sourceId || stop.id === destId;
          const address = stop.stopName || stop.name || '';
          let displayLocation = address.trim();

          if (!isHighlighted) {
            const parts = address.split(',').map((p: string) => p.trim());
            if (parts.length >= 4) {
              displayLocation = parts[parts.length - 4];
            } else if (parts.length >= 3) {
              displayLocation = parts[parts.length - 3];
            } else {
              displayLocation = parts[0] || '';
            }
          }

          return {
            location: displayLocation,
            time: stop.arrivalTime
              ? new Date(stop.arrivalTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '',
            lat: stop.lat,
            lon: stop.lon,
            stopId: stop.id,
            isHighlighted,
            type:
              stop.id === sourceId
                ? 'pickup'
                : stop.id === destId
                ? 'destination'
                : 'stop',
          };
        });
      }, [
        ride?.stops,
        ride?.myBooking,
        ride?.sourceStopId,
        ride?.destinationStopId,
        isDriver,
      ]);

      const comfortFeatures = useMemo((): string[] => {
        if (!ride?.preferences) return [];
        const list: string[] = [];
        const prefs = ride.preferences;
        if (prefs.nonSmoking) list.push('noSmoking');
        if (prefs.petFriendly) list.push('petFriendly');
        if (prefs.luggageAllowed) list.push('luggageAllowed');
        if (prefs.ladiesOnly) list.push('ladiesOnly');
        if (prefs.manualApproval) {
          list.push('manualApproval');
        } else {
          list.push('autoApproval');
        }
        if (prefs.musicPreference) {
          list.push(`music:${prefs.musicPreference}`);
        }
        return list;
      }, [ride?.preferences]);

      const driverData = useMemo(() => {
        if (!ride?.driver) return null;
        return {
          id: ride.driver.driverId || ride.driver.userId || 'driver-1',
          name: ride.driver.name,
          avatar: ride.driver.photoUrl,
          rating: ride.driver.rating || 5,
          rideCount: 0, // Fallback if missing
        };
      }, [ride?.driver]);

      const passengerData = useMemo(() => {
        if (!ride?.passengers) return [];
        return ride.passengers.map((p: any) => ({
          bookingId: p.bookingId,
          id: p.passengerId,
          name: p.name,
          photoUrl: p.photoUrl,
          segment:
            p.segment ||
            `${p.sourceStopName?.split(',')[0].trim() || 'Unknown'} → ${
              p.destinationStopName?.split(',')[0].trim() || 'Unknown'
            }`,
          seatsBooked: p.seatCount || p.seatsBooked || 1,
          seatId: (p.seatIds || p.seatId || []).map(String),
        }));
      }, [ride?.passengers]);

      const isArchived = useMemo(() => {
        if (!ride) return false;
        const status = ride.rideStatus || ride.status;
        return (
          status === RideStatus.COMPLETED ||
          status === RideStatus.CANCELLED ||
          status === 'REJECTED'
        );
      }, [ride]);

      const isCompleted = useMemo(() => {
        if (!ride) return false;
        const status = ride.rideStatus || ride.status;
        return status === RideStatus.COMPLETED;
      }, [ride]);

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

      const showFooter = !isArchived;

      return (
        <S.Root>
          <ScreenShell
            title={translations.rideDetails.headerTitle}
            onBack={handleBack}
            rightElement={
              !isArchived && onReportRide ? (
                <S.ReportButton onPress={onReportRide} activeOpacity={0.7}>
                  <Icon
                    name="flag"
                    size={moderateScale(22)}
                    color={theme.colors.error}
                  />
                </S.ReportButton>
              ) : undefined
            }
          >
            <S.ScrollContent showsVerticalScrollIndicator={false}>
              <S.ContentPadding>
                {/* Cancellation Reason */}
                {isArchived && ride.cancellationReason && (
                  <CancellationReasonBox
                    cancellationReason={ride.cancellationReason}
                  />
                )}

                {/* Rating Invitation for Passenger */}
                {isCompleted && !isDriver && onRateDriver && (
                  <S.SectionCard
                    style={{ backgroundColor: theme.colors.warning + '1A' }}
                  >
                    <S.SectionLabelRow>
                      <S.SectionDot color={theme.colors.warning} />
                      <Typography
                        variant="label"
                        size="xs"
                        weight="bold"
                        color="on_surface"
                      >
                        {translations.rating.ratingCardTitle.toUpperCase()}
                      </Typography>
                    </S.SectionLabelRow>
                    <Typography
                      variant="body"
                      size="sm"
                      color="on_surface_variant"
                      style={{ marginBottom: verticalScale(12) }}
                    >
                      {translations.rating.ratingCardSubtitle.replace(
                        '{{name}}',
                        ride.driver?.name || 'Driver',
                      )}
                    </Typography>
                    <Button variant="primary" onPress={onRateDriver}>
                      {translations.rating.rateButtonText}
                    </Button>
                  </S.SectionCard>
                )}

                {/* Route Timeline */}
                <S.SectionCard>
                  <S.SectionLabelRow>
                    <S.SectionDot />
                    <Typography
                      variant="label"
                      size="xs"
                      weight="bold"
                      color="on_surface_variant"
                    >
                      {translations.rideDetails.timelineTitle.toUpperCase()}
                    </Typography>
                  </S.SectionLabelRow>
                  <RideTimeline
                    points={timelinePoints}
                    showActions={true}
                    onMapPress={handleViewRoute}
                    onCopyAddress={handleCopyAddress}
                    isDriver={isDriver}
                  />
                </S.SectionCard>

                {/* Stats / Summary Cards */}
                {isDriver ? (
                  <RideStatsStrip
                    departureDate={departureDateLabel}
                    departureTime={departureTime}
                    durationLabel={durationLabel}
                    seatsLeft={seatsLeft}
                    t={translations.rideDetails}
                  />
                ) : (
                  <S.PassengerSummaryCard>
                    <S.SummaryRow>
                      <S.SummaryItem>
                        <Icon
                          name="calendar-today"
                          size={moderateScale(16)}
                          color={theme.colors.primary}
                        />
                        <Typography variant="body" size="sm" weight="bold">
                          {departureDateLabel}
                        </Typography>
                        <Typography
                          variant="label"
                          size="xs"
                          color="on_surface_variant"
                        >
                          {translations.rideDetails.date || 'Date'}
                        </Typography>
                      </S.SummaryItem>
                      <S.SummaryDivider />
                      <S.SummaryItem>
                        <Icon
                          name="schedule"
                          size={moderateScale(16)}
                          color={theme.colors.primary}
                        />
                        <Typography variant="body" size="sm" weight="bold">
                          {departureTime}
                        </Typography>
                        <Typography
                          variant="label"
                          size="xs"
                          color="on_surface_variant"
                        >
                          {translations.rideDetails.time || 'Time'}
                        </Typography>
                      </S.SummaryItem>
                      <S.SummaryDivider />
                      <S.SummaryItem>
                        <Icon
                          name="timer"
                          size={moderateScale(16)}
                          color={theme.colors.primary}
                        />
                        <Typography variant="body" size="sm" weight="bold">
                          {durationLabel}
                        </Typography>
                        <Typography
                          variant="label"
                          size="xs"
                          color="on_surface_variant"
                        >
                          {translations.rideDetails.duration || 'Duration'}
                        </Typography>
                      </S.SummaryItem>
                    </S.SummaryRow>

                    <S.HorizontalDivider />

                    <S.SummaryRow>
                      <S.SummaryItem>
                        <Icon
                          name="event-seat"
                          size={moderateScale(16)}
                          color={theme.colors.primary}
                        />
                        <Typography variant="body" size="sm" weight="bold">
                          {passengerSeatInfo}
                        </Typography>
                        <Typography
                          variant="label"
                          size="xs"
                          color="on_surface_variant"
                        >
                          {translations.rideDetails.seatsLabel || 'Seats'}
                        </Typography>
                      </S.SummaryItem>
                      <S.SummaryDivider />
                      <S.SummaryItem>
                        <Icon
                          name="currency-rupee"
                          size={moderateScale(16)}
                          color={theme.colors.primary}
                        />
                        <Typography variant="body" size="sm" weight="bold">
                          ₹{passengerPrice}
                        </Typography>
                        <Typography
                          variant="label"
                          size="xs"
                          color="on_surface_variant"
                        >
                          {translations.rideDetails.bookingTotal || 'Price'}
                        </Typography>
                      </S.SummaryItem>
                    </S.SummaryRow>
                  </S.PassengerSummaryCard>
                )}

                {/* Driver Card (for passengers) */}
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

                {/* Journey Comfort / Preferences */}
                <RideComfortSection
                  features={comfortFeatures}
                  t={translations.rideDetails}
                />

                {/* Vehicle Details */}
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

                {/* Passenger Management (Fellow Travelers) */}
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

            {/* Footer Actions */}
            {showFooter && (
              <S.FixedFooter>
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
              </S.FixedFooter>
            )}
          </ScreenShell>
        </S.Root>
      );
    },
  );
