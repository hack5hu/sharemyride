import React, { useCallback } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { BookRideInfoTranslations } from '@/constants/localization/types';
import * as S from './SearchRadiusSelector.styles';

export interface SearchRadiusSelectorProps {
  radiusKm: number;
  isSearching: boolean;
  onIncrementRadius: () => void;
  onDecrementRadius: () => void;
  onSelectRadius: (radius: number) => void;
  t: BookRideInfoTranslations;
}

const PRESET_OPTIONS = [5, 10, 20, 25, 30, 40, 50];

export const SearchRadiusSelector: React.FC<SearchRadiusSelectorProps> =
  React.memo(
    ({
      radiusKm,
      isSearching,
      onIncrementRadius,
      onDecrementRadius,
      onSelectRadius,
      t,
    }) => {
      const theme = useTheme();

      const handlePresetPress = useCallback(
        (preset: number) => {
          if (!isSearching) {
            onSelectRadius(preset);
          }
        },
        [isSearching, onSelectRadius],
      );

      return (
        <S.Container>
          <S.TopRow>
            <S.LabelGroup>
              <S.Label>{t.searchRadiusLabel}</S.Label>
              <S.Subtitle numberOfLines={1}>{t.searchRadiusSub}</S.Subtitle>
            </S.LabelGroup>

            <S.StepperControls>
              <S.StepperButton
                activeOpacity={isSearching || radiusKm <= 1 ? 1 : 0.7}
                onPress={isSearching ? undefined : onDecrementRadius}
                disabled={isSearching || radiusKm <= 1}
              >
                <MaterialIcons
                  name="remove"
                  size={moderateScale(16)}
                  color={
                    isSearching || radiusKm <= 1
                      ? theme.colors.outline
                      : theme.colors.primary
                  }
                />
              </S.StepperButton>

              <S.ValueContainer>
                <S.ValueText>
                  {radiusKm} {t.searchRadiusUnit}
                </S.ValueText>
              </S.ValueContainer>

              <S.StepperButton
                $primary
                activeOpacity={isSearching || radiusKm >= 50 ? 1 : 0.7}
                onPress={isSearching ? undefined : onIncrementRadius}
                disabled={isSearching || radiusKm >= 50}
              >
                <MaterialIcons
                  name="add"
                  size={moderateScale(16)}
                  color={
                    isSearching || radiusKm >= 50
                      ? theme.colors.outline
                      : theme.colors.on_primary
                  }
                />
              </S.StepperButton>
            </S.StepperControls>
          </S.TopRow>

          <S.PresetsScroll>
            <S.PresetsContainer>
              {PRESET_OPTIONS.map(preset => {
                const isSelected = radiusKm === preset;
                return (
                  <S.PresetChip
                    key={preset}
                    $selected={isSelected}
                    activeOpacity={isSearching ? 1 : 0.7}
                    onPress={() => handlePresetPress(preset)}
                    disabled={isSearching}
                  >
                    <S.PresetText $selected={isSelected}>
                      {preset} {t.searchRadiusUnit}
                    </S.PresetText>
                  </S.PresetChip>
                );
              })}
            </S.PresetsContainer>
          </S.PresetsScroll>
        </S.Container>
      );
    },
  );

SearchRadiusSelector.displayName = 'SearchRadiusSelector';
