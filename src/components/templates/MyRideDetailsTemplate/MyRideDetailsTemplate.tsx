import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { MyRideDetailsTemplateProps } from './types.d';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './MyRideDetailsTemplate.styles';
import { moderateScale } from '@/styles';
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

export const MyRideDetailsTemplate: React.FC<MyRideDetailsTemplateProps> = React.memo(({
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
  t,
}) => {
  const theme = useTheme();
  const translations = useLocale();

  const timelinePoints = useMemo(() => {
    if (!ride?.stops) return [];
    const sourceId = ride.myBooking?.sourceStopId ?? ride.sourceStopId;
    const destId = ride.myBooking?.destinationStopId ?? ride.destinationStopId;

    return ride.stops.map((stop: any) => {
      const isHighlighted = stop.id === sourceId || stop.id === destId;
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
          ? new Date(stop.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : '',
        lat: stop.lat,
        lon: stop.lon,
        stopId: stop.id,
        isHighlighted,
        type: stop.id === sourceId ? 'pickup' : (stop.id === destId ? 'destination' : 'stop'),
      };
    });
  }, [ride?.stops, ride?.myBooking, ride?.sourceStopId, ride?.destinationStopId]);

  const routeJourneyStops = useMemo(() => {
    if (!ride?.stops) return [];
    return ride.stops.map((stop: any, index: number) => {
      let type: 'pickup' | 'stop' | 'destination' = 'stop';
      if (index === 0) type = 'pickup';
      else if (index === ride.stops.length - 1) type = 'destination';

      return {
        type,
        label: stop.arrivalTime
          ? new Date(stop.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : '',
        address: stop.stopName.split(',')[0].trim(),
      };
    });
  }, [ride?.stops]);

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
      segment: p.segment || `${p.sourceStopName?.split(',')[0].trim() || 'Unknown'} → ${p.destinationStopName?.split(',')[0].trim() || 'Unknown'}`,
      seatsBooked: p.seatCount || p.seatsBooked || 1,
      seatId: (p.seatIds || p.seatId || []).map(String),
    }));
  }, [ride?.passengers]);

  const isArchived = useMemo(() => {
    if (!ride) return false;
    const status = ride.rideStatus || ride.status;
    return status === 'COMPLETED' || status === 'CANCELLED' || status === 'REJECTED';
  }, [ride]);

  if (isLoading) {
    return (
      <ScreenShell title={translations.rideDetails.headerTitle} onBack={handleBack}>
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
              <Icon name="flag" size={moderateScale(22)} color={theme.colors.error} />
            </S.ReportButton>
          ) : undefined
        }
      >
        <S.ScrollContent showsVerticalScrollIndicator={false}>
          <S.ContentPadding>
            {/* Cancellation Reason */}
            {isArchived && ride.cancellationReason && (
              <CancellationReasonBox cancellationReason={ride.cancellationReason} />
            )}

            {/* Fare Summary */}
            {!isDriver && <FareSummaryRow ride={ride} />}

            {/* Route Timeline */}
            <S.SectionCard>
              <S.SectionLabelRow>
                <S.SectionDot />
                <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                  {translations.rideDetails.timelineTitle.toUpperCase()}
                </Typography>
              </S.SectionLabelRow>
              {isDriver ? (
                <RouteJourney stops={routeJourneyStops} />
              ) : (
                <RideTimeline
                  points={timelinePoints}
                  showActions={true}
                  onMapPress={handleViewRoute}
                  onCopyAddress={handleCopyAddress}
                />
              )}
            </S.SectionCard>

            {/* Driver Card (for passengers) */}
            {!isDriver && driverData && (
              <DriverCard
                driver={driverData}
                handleDriverProfile={() => handleDriverProfile?.(driverData.id)}
                handleChat={handleChat}
                showChat={true}
              />
            )}

            {/* Journey Comfort / Preferences */}
            <RideComfortSection features={comfortFeatures} t={translations.rideDetails} />

            {/* Vehicle Details */}
            {ride.vehicle && (
              <RideVehicleCard
                vehicle={ride.vehicle}
                t={translations.rideDetails as unknown as Record<string, string>}
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
            />
          </S.ContentPadding>
        </S.ScrollContent>

        {/* Footer Actions */}
        {showFooter && (
          <S.FixedFooter>
            <Button
              variant="outline"
              icon={isDriver ? "cancel" : "person-remove"}
              iconPosition="left"
              onPress={isDriver ? onCancelRide : () => onCancelPassenger('')}
            >
              {isDriver ? translations.rideDetails.cancelRide : translations.rideDetails.cancelBooking}
            </Button>
          </S.FixedFooter>
        )}
      </ScreenShell>
    </S.Root>
  );
});
