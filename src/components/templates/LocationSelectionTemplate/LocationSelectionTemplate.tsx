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
  ContinueButtonSection,
  ContinueGradient,
  ContinueButton,
  ContinueText,
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
                <ContinueButtonSection>
          <ContinueGradient 
            style={{ opacity: canContinue ? 1 : 0.6 }}
          >
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
      </MainContent>

    
      {navBar}
    </ScreenShell>
  );
};
