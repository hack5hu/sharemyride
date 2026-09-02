import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { type BookRideInfoTranslations } from '@/constants/localization/types';
import { moderateScale } from '@/styles';
import * as S from './LocationStepper.styles';

export interface LocationStepperProps {
  peopleCount: number;
  isSearching: boolean;
  onIncrementPeople: () => void;
  onDecrementPeople: () => void;
  t: BookRideInfoTranslations;
}

export const LocationStepper: React.FC<LocationStepperProps> = ({
  peopleCount,
  isSearching,
  onIncrementPeople,
  onDecrementPeople,
  t,
}) => {
  const theme = useTheme();

  return (
    <S.StepperContainer>
      <S.StepperLabelGroup>
        <S.StepperLabel>{t.peopleCountLabel}</S.StepperLabel>
        <S.StepperSub numberOfLines={2}>{t.peopleCountSub}</S.StepperSub>
      </S.StepperLabelGroup>

      <S.StepperControls>
        <S.StepperButton
          activeOpacity={isSearching || peopleCount <= 1 ? 1 : 0.7}
          onPress={isSearching ? undefined : onDecrementPeople}
          disabled={isSearching || peopleCount <= 1}
        >
          <MaterialIcons
            name="remove"
            size={moderateScale(18)}
            color={
              isSearching || peopleCount <= 1
                ? theme.colors.outline
                : theme.colors.primary
            }
          />
        </S.StepperButton>
        <S.StepperValue>{peopleCount}</S.StepperValue>
        <S.StepperButton
          primary
          activeOpacity={isSearching || peopleCount >= 6 ? 1 : 0.7}
          onPress={isSearching ? undefined : onIncrementPeople}
          disabled={isSearching || peopleCount >= 6}
        >
          <MaterialIcons
            name="add"
            size={moderateScale(18)}
            color={
              isSearching || peopleCount >= 6
                ? theme.colors.outline
                : theme.colors.on_primary
            }
          />
        </S.StepperButton>
      </S.StepperControls>
    </S.StepperContainer>
  );
};
