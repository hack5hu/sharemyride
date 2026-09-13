import { format } from 'date-fns';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { LocationInputsBento } from '@/components/organisms/LocationInputsBento';
import { RideType } from '@/constants/enums';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { getShortLocationName, formatDisplayAddress } from '@/utils/address';
import {
  MainContent,
  HeaderSection,
  HeroBadge,
  HeroBadgeText,
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
  RecentRideRouteRow,
  RecentRideLocationText,
  RecentRideMetaRow,
  RecentRideTag,
  RecentRideTagText,
  RecentRideSubText,
  RecentRideActionBox,
} from './LocationSelectionTemplate.styles';
import { type LocationSelectionTemplateProps } from './types.d';

export const LocationSelectionTemplate: React.FC<
  LocationSelectionTemplateProps
> = React.memo(
  ({
    startLocationName,
    destinationLocationName,
    onPressStart,
    onPressDestination,
    onSwapLocations,
    onPressContinue,
    canContinue,
    recentRides,
    onSelectRecentRide,
    navBar,
  }) => {
    const theme = useTheme();
    const { locationSelection, common } = useLocale();

    return (
      <ScreenShell noPaddingBottom={Boolean(navBar)}>
        <MainContent>
          <HeaderSection>
            <HeroBadge>
              <MaterialIcons
                name="directions-car"
                size={moderateScale(14)}
                color={theme.colors.primary}
              />
              <HeroBadgeText>{locationSelection.heroBadge}</HeroBadgeText>
            </HeroBadge>
            <TitleContainer>
              {locationSelection.titlePrefix}{' '}
              <TitleHighlight>
                {locationSelection.titleHighlight}
              </TitleHighlight>{' '}
              {locationSelection.titleSuffix}
            </TitleContainer>
            <Subtitle>{locationSelection.subtitle}</Subtitle>
          </HeaderSection>

          <LocationInputsBento
            startLocationName={startLocationName}
            destinationLocationName={destinationLocationName}
            onPressStart={onPressStart}
            onPressDestination={onPressDestination}
            onSwapLocations={onSwapLocations}
          />

          <ContinueButtonSection>
            <ContinueGradient $disabled={!canContinue}>
              <ContinueButton
                onPress={onPressContinue}
                disabled={!canContinue}
                activeOpacity={0.8}
              >
                <ContinueText>{locationSelection.continueJourney}</ContinueText>
                <MaterialIcons
                  name="arrow-forward"
                  size={moderateScale(18)}
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
                  getShortLocationName(
                    formatDisplayAddress(ride.startLocation?.address),
                  ) || '';
                const destShort =
                  getShortLocationName(
                    formatDisplayAddress(ride.destinationLocation?.address),
                  ) || '';
                const formattedPublishDateTime = ride.departureDate
                  ? `${format(
                      new Date(ride.departureDate),
                      'MMM dd',
                    )} • ${ride.departureTime}`
                  : '';
                const isLocal = ride.rideType === RideType.LOCAL;

                return (
                  <RecentRideCard
                    key={index}
                    onPress={() => onSelectRecentRide?.(ride)}
                    activeOpacity={0.7}
                  >
                    <RecentRideLeft>
                      <RecentRideRouteRow>
                        <RecentRideLocationText numberOfLines={1}>
                          {startShort}
                        </RecentRideLocationText>
                        <MaterialIcons
                          name="arrow-forward"
                          size={moderateScale(12)}
                          color={theme.colors.outline}
                        />
                        <RecentRideLocationText numberOfLines={1}>
                          {destShort}
                        </RecentRideLocationText>
                      </RecentRideRouteRow>
                      <RecentRideMetaRow>
                        <RecentRideTag $isLocal={isLocal}>
                          <RecentRideTagText $isLocal={isLocal}>
                            {isLocal
                              ? locationSelection.localTab
                              : locationSelection.intercityTab}
                          </RecentRideTagText>
                        </RecentRideTag>
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
                      </RecentRideMetaRow>
                    </RecentRideLeft>
                    <RecentRideActionBox>
                      <MaterialIcons
                        name="repeat"
                        size={moderateScale(16)}
                        color={theme.colors.primary}
                      />
                    </RecentRideActionBox>
                  </RecentRideCard>
                );
              })}
            </RecentRidesSection>
          )}
        </MainContent>

        {navBar}
      </ScreenShell>
    );
  },
);
