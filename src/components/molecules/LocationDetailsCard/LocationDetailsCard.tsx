import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import {
  BottomSheetContainer,
  CardSurface,
  LocationHeader,
  IconContainer,
  TextContainer,
  LabelSubtitle,
  LocationTitle,
  LocationSubtitle,
  SelectButtonContainer,
  SelectGradient,
  SelectButton,
  SelectButtonText,
} from './LocationDetailsCard.styles';
import { moderateScale } from '@/styles';

export interface LocationDetailsCardProps {
  locationName?: string;
  locationAddress?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export const LocationDetailsCard: React.FC<LocationDetailsCardProps> = ({
  locationName,
  locationAddress,
  onSelect,
  disabled
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();

  return (
    <BottomSheetContainer edges={['bottom']}>
      <CardSurface>
        <LocationHeader>
          <IconContainer>
            <MaterialIcons 
              name="place" 
              size={moderateScale(20)} 
              color={theme.colors.on_primary_fixed_variant} 
            />
          </IconContainer>
          <TextContainer>
            <LabelSubtitle>{mapPicker.selectedArea}</LabelSubtitle>
            <LocationTitle numberOfLines={1}>
              {locationName || 'Searching...'}
            </LocationTitle>
            <LocationSubtitle numberOfLines={1}>
              {locationAddress || 'Drag map to move pin'}
            </LocationSubtitle>
          </TextContainer>
        </LocationHeader>

        <SelectButtonContainer>
          <SelectButton onPress={onSelect} disabled={disabled || !locationName} activeOpacity={0.9}>
            <SelectGradient style={{ opacity: (disabled || !locationName) ? 0.6 : 1 }}>
              <SelectButtonText>{mapPicker.selectLocation}</SelectButtonText>
            </SelectGradient>
          </SelectButton>
        </SelectButtonContainer>
      </CardSurface>
    </BottomSheetContainer>
  );
};
