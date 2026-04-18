import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
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
} from './LocationInputsBento.styles';
import { moderateScale } from '@/styles';

export interface LocationInputsBentoProps {
  startLocationName?: string;
  destinationLocationName?: string;
  onPressStart: () => void;
  onPressDestination: () => void;
}

export const LocationInputsBento: React.FC<LocationInputsBentoProps> = ({
  startLocationName,
  destinationLocationName,
  onPressStart,
  onPressDestination,
}) => {
  const theme = useTheme();
  const { locationSelection } = useLocale();
  console.log(startLocationName)
  return (
    <Container>
      <VisualPathLine />
      <InputsWrapper>
        {/* Source Input */}
        <InputGroup activeOpacity={0.7} onPress={onPressStart}>
          <StartIconContainer>
            <MaterialIcons
              name="my-location"
              size={moderateScale(14)}
              color={theme.colors.on_primary}
            />
          </StartIconContainer>
          <InputContent>
            <InputLabel>{locationSelection.startLabel}</InputLabel>
            <MockInput>
              <MockInputText $hasValue={!!startLocationName} numberOfLines={1} ellipsizeMode="tail">
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
              color={theme.colors.primary}
            />
          </DestinationIconContainer>
          <InputContent>
            <InputLabel>{locationSelection.destinationLabel}</InputLabel>
            <MockInput>
              <MockInputText $hasValue={!!destinationLocationName} numberOfLines={1} ellipsizeMode="tail">
                {destinationLocationName || locationSelection.destinationPlaceholder}
              </MockInputText>
            </MockInput>
          </InputContent>
        </InputGroup>
      </InputsWrapper>
    </Container>
  );
};
