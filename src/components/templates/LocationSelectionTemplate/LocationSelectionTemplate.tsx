import React from 'react';
import { useTheme } from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '@/constants/localization';
import { LocationInputsBento } from '@/components/organisms/LocationInputsBento';
import { format } from 'date-fns';
// import { HeaderBar } from '@/components/molecules/HeaderBar';
import { ScreenShell } from '@/components/molecules/ScreenShell';

import {
  MainContent,
  HeaderSection,
  TitleContainer,
  TitleHighlight,
  Subtitle,
  ContinueButtonSection,
  ContinueGradient,
  ContinueButton,
  ContinueText,
  RecentRidesSection,
  RecentRidesHeader,
  RecentRidesTitle,
  RecentRideCard,
  RecentRideLeft,
  RecentRideIconBox,
  RecentRideTextContainer,
  RecentRideRouteText,
  RecentRideSubText,
} from './LocationSelectionTemplate.styles';
import { LocationSelectionTemplateProps } from './types.d';
import { moderateScale } from '@/styles';

export const LocationSelectionTemplate: React.FC<
  LocationSelectionTemplateProps
> = ({
  startLocationName,
  destinationLocationName,
  onPressStart,
  onPressDestination,
  onPressContinue,
  canContinue,
  recentRides,
  onSelectRecentRide,
  navBar,
}) => {
  const theme = useTheme();
  const { locationSelection, common } = useLocale();

  return (
    <ScreenShell>
      <MainContent>
        <HeaderSection>
          <TitleContainer>
            {locationSelection.titlePrefix}{' '}
            <TitleHighlight>{locationSelection.titleHighlight}</TitleHighlight>{' '}
            {locationSelection.titleSuffix}
          </TitleContainer>
          <Subtitle>{locationSelection.subtitle}</Subtitle>
        </HeaderSection>

        <LocationInputsBento
          startLocationName={startLocationName}
          destinationLocationName={destinationLocationName}
          onPressStart={onPressStart}
          onPressDestination={onPressDestination}
        />

        <ContinueButtonSection>
          <ContinueGradient style={{ opacity: canContinue ? 1 : 0.6 }}>
            <ContinueButton
              onPress={onPressContinue}
              disabled={!canContinue}
              activeOpacity={0.8}
            >
              <ContinueText>{locationSelection.continueJourney}</ContinueText>
              <MaterialIcons
                name="arrow-forward"
                size={moderateScale(20)}
                color={theme.colors.on_primary}
              />
            </ContinueButton>
          </ContinueGradient>
        </ContinueButtonSection>
        {recentRides && recentRides.length > 0 && (
          <RecentRidesSection>
            <RecentRidesHeader>
              <RecentRidesTitle>
                {locationSelection.recentRidesTitle}
              </RecentRidesTitle>
            </RecentRidesHeader>
            {recentRides.map((ride, index) => {
              const startShort =
                ride.startLocation?.address?.split(',')[0] || '';
              const destShort =
                ride.destinationLocation?.address?.split(',')[0] || '';
              const formattedPublishDateTime = ride.departureDate
                ? `${format(new Date(ride.departureDate), 'MMM dd, yyyy')} • ${
                    ride.departureTime
                  }`
                : '';
              return (
                <RecentRideCard
                  key={index}
                  onPress={() => onSelectRecentRide?.(ride)}
                  activeOpacity={0.7}
                >
                  <RecentRideLeft>
                    <RecentRideIconBox>
                      <MaterialIcons
                        name="history"
                        size={moderateScale(20)}
                        color={theme.colors.primary}
                      />
                    </RecentRideIconBox>
                    <RecentRideTextContainer>
                      <RecentRideRouteText numberOfLines={1}>
                        {startShort} to {destShort}
                      </RecentRideRouteText>
                      <RecentRideSubText numberOfLines={1}>
                        {ride.vehicleDetails
                          ? `${ride.vehicleDetails.company} ${ride.vehicleDetails.model} • `
                          : ''}
                        {ride.seatCount}{' '}
                        {ride.seatCount === 1 ? common.seat : common.seats}
                        {formattedPublishDateTime
                          ? ` • ${formattedPublishDateTime}`
                          : ''}
                      </RecentRideSubText>
                    </RecentRideTextContainer>
                  </RecentRideLeft>
                  <MaterialIcons
                    name="chevron-right"
                    size={moderateScale(20)}
                    color={theme.colors.on_surface_variant}
                  />
                </RecentRideCard>
              );
            })}
          </RecentRidesSection>
        )}
      </MainContent>

      {navBar}
    </ScreenShell>
  );
};
