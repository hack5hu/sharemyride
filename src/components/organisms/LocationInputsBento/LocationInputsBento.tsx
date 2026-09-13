import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  Container,
  VisualPathLine,
  InputsWrapper,
  InputGroup,
  StartIconContainer,
  DestinationIconContainer,
  InputContent,
  InputLabel,
  MockInput,
  MockInputText,
  SwapButton,
} from './LocationInputsBento.styles';

export interface LocationInputsBentoProps {
  startLocationName?: string;
  destinationLocationName?: string;
  onPressStart: () => void;
  onPressDestination: () => void;
  onSwapLocations?: () => void;
}

export const LocationInputsBento: React.FC<LocationInputsBentoProps> = React.memo(
  ({
    startLocationName,
    destinationLocationName,
    onPressStart,
    onPressDestination,
    onSwapLocations,
  }) => {
    const theme = useTheme();
    const { locationSelection } = useLocale();

    return (
      <Container>
        <VisualPathLine />
        <InputsWrapper>
          {/* Source Input */}
          <InputGroup activeOpacity={0.7} onPress={onPressStart}>
            <StartIconContainer>
              <MaterialIcons
                name="my-location"
                size={moderateScale(13)}
                color={theme.colors.on_primary}
              />
            </StartIconContainer>
            <InputContent>
              <InputLabel>{locationSelection.startLabel}</InputLabel>
              <MockInput $hasValue={!!startLocationName}>
                <MockInputText
                  $hasValue={!!startLocationName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {startLocationName || locationSelection.startPlaceholder}
                </MockInputText>
              </MockInput>
            </InputContent>
          </InputGroup>

          {/* Destination Input */}
          <InputGroup activeOpacity={0.7} onPress={onPressDestination}>
            <DestinationIconContainer>
              <MaterialIcons
                name="location-on"
                size={moderateScale(14)}
                color={theme.colors.on_primary || '#fff'}
              />
            </DestinationIconContainer>
            <InputContent>
              <InputLabel>{locationSelection.destinationLabel}</InputLabel>
              <MockInput $hasValue={!!destinationLocationName}>
                <MockInputText
                  $hasValue={!!destinationLocationName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {destinationLocationName ||
                    locationSelection.destinationPlaceholder}
                </MockInputText>
              </MockInput>
            </InputContent>
          </InputGroup>

          {/* Interactive Swap Button */}
          {onSwapLocations && (
            <SwapButton
              onPress={onSwapLocations}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name="swap-vert"
                size={moderateScale(20)}
                color={theme.colors.primary}
              />
            </SwapButton>
          )}
        </InputsWrapper>
      </Container>
    );
  },
);
