import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideFiltersModal.styles';
import { type Translations } from '@/constants/localization/types';

interface RadiusSectionProps {
  radiusKm: number;
  onSelectRadius: (radius: number) => void;
  onStepRadius: (delta: number) => void;
  t: Translations['rideFilters'];
}

const PRESET_DISTANCES = [5, 10, 20, 25, 30, 40, 50];

export const RadiusSection: React.FC<RadiusSectionProps> = ({
  radiusKm,
  onSelectRadius,
  onStepRadius,
  t,
}) => {
  const theme = useTheme();

  return (
    <S.Section>
      <S.SectionTitle>
        <Typography
          variant="label"
          size="xs"
          weight="bold"
          color={theme.colors.on_surface_variant}
        >
          {(t.searchRadiusTitle || 'SEARCH RADIUS').toUpperCase()}
        </Typography>
      </S.SectionTitle>

      <S.RadiusCard>
        <S.RadiusTopRow>
          <Typography variant="title" size="md" weight="bold">
            {radiusKm} {t.searchRadiusUnit || 'km'}
          </Typography>

          <S.StepperGroup>
            <S.StepperBtn
              disabled={radiusKm <= 5}
              onPress={() => onStepRadius(-5)}
              activeOpacity={0.7}
            >
              <Icon
                name="remove"
                size={moderateScale(18)}
                color={
                  radiusKm <= 5
                    ? theme.colors.outline_variant
                    : theme.colors.primary
                }
              />
            </S.StepperBtn>

            <S.StepperBtn
              $primary
              disabled={radiusKm >= 50}
              onPress={() => onStepRadius(5)}
              activeOpacity={0.7}
            >
              <Icon
                name="add"
                size={moderateScale(18)}
                color={
                  radiusKm >= 50
                    ? theme.colors.outline_variant
                    : theme.colors.on_primary
                }
              />
            </S.StepperBtn>
          </S.StepperGroup>
        </S.RadiusTopRow>

        <S.PresetsScroll>
          {PRESET_DISTANCES.map(preset => {
            const isSelected = radiusKm === preset;
            return (
              <S.PresetChip
                key={preset}
                $selected={isSelected}
                onPress={() => onSelectRadius(preset)}
                activeOpacity={0.7}
              >
                <S.PresetText $selected={isSelected}>
                  {preset} {t.searchRadiusUnit || 'km'}
                </S.PresetText>
              </S.PresetChip>
            );
          })}
        </S.PresetsScroll>
      </S.RadiusCard>
    </S.Section>
  );
};
