import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { ColorChip } from '@/components/atoms/ColorChip';
import { DefaultTheme } from 'styled-components/native';
import * as S from '../VehicleDetailsTemplate.styles';

interface ColorSectionProps {
  carColors: { label: string; value: string }[];
  selectedColor: string;
  setColor: (color: string) => void;
  error?: string;
  touched?: boolean;
  isLoading: boolean;
  theme: DefaultTheme;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const ColorSection: React.FC<ColorSectionProps> = React.memo(
  ({
    carColors,
    selectedColor,
    setColor,
    error,
    touched,
    isLoading,
    theme,
    t,
  }) => {
    const selectedColorObj = carColors.find(c => c.value === selectedColor);

    return (
      <S.CardSection>
        <S.SectionHeader>
          <S.SectionTitleRow>
            <Icon name="palette" size={18} color={theme.colors.primary} />
            <S.SectionTitleText>{t('vehicleDetails.color')}</S.SectionTitleText>
          </S.SectionTitleRow>
          {selectedColorObj && (
            <S.ActiveValuePill>
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color="primary"
              >
                {selectedColorObj.label}
              </Typography>
            </S.ActiveValuePill>
          )}
        </S.SectionHeader>

        <S.ColorScroll horizontal showsHorizontalScrollIndicator={false}>
          <S.ColorRow>
            {carColors.map(color => (
              <ColorChip
                key={color.value}
                color={color.value}
                selected={selectedColor === color.value}
                onPress={isLoading ? () => {} : () => setColor(color.value)}
                label={color.label}
              />
            ))}
          </S.ColorRow>
        </S.ColorScroll>
        {touched && error && (
          <S.SectionError>{error}</S.SectionError>
        )}
      </S.CardSection>
    );
  },
);
