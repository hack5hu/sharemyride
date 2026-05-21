import React from 'react';
import { useTheme } from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '@/constants/localization';
import { LocationInputsBento } from '@/components/organisms/LocationInputsBento';
// import { HeaderBar } from '@/components/molecules/HeaderBar';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Button } from '@/components/atoms/Button';
import {
  MainContent,
  HeaderSection,
  TitleContainer,
  TitleHighlight,
  Subtitle,
  FixedFooter,
  ContextualInfoBox,
  ContextualInfoText,
} from './LocationSelectionTemplate.styles';
import { LocationSelectionTemplateProps } from './types.d';
import { moderateScale } from '@/styles';

export const LocationSelectionTemplate: React.FC<LocationSelectionTemplateProps> = ({
  startLocationName,
  destinationLocationName,
  onPressStart,
  onPressDestination,
  onPressContinue,
  canContinue,
  navBar,
}) => {
  const theme = useTheme();
  const { locationSelection, routeSelection } = useLocale();

  return (
    <ScreenShell>
      <MainContent>
        <HeaderSection>
          <TitleContainer>
            {locationSelection.titlePrefix}{' '}
            <TitleHighlight>{locationSelection.titleHighlight}</TitleHighlight>
            {' '}{locationSelection.titleSuffix}
          </TitleContainer>
          <Subtitle>{locationSelection.subtitle}</Subtitle>
        </HeaderSection>

        <LocationInputsBento
          startLocationName={startLocationName}
          destinationLocationName={destinationLocationName}
          onPressStart={onPressStart}
          onPressDestination={onPressDestination}
        />
      </MainContent>

      <FixedFooter>
        <Button
          variant="primary"
          icon="arrow-forward"
          iconPosition="right"
          disabled={!canContinue}
          onPress={onPressContinue}
        >
          {locationSelection.continueJourney}
        </Button>
      </FixedFooter>
      {navBar}
    </ScreenShell>
  );
};
