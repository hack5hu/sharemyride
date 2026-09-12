import React, { useCallback } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { RideType } from '@/constants/enums';
import { type BookRideInfoTranslations } from '@/constants/localization/types';
import { moderateScale } from '@/styles';
import * as S from './RideTypeTabs.styles';

export interface RideTypeTabsProps {
  selected: RideType;
  onSelect: (type: RideType) => void;
  disabled?: boolean;
  t: BookRideInfoTranslations;
}

export const RideTypeTabs: React.FC<RideTypeTabsProps> = React.memo(
  ({ selected, onSelect, disabled, t }) => {
    const theme = useTheme();

    const handleSelectIntercity = useCallback(() => {
      if (!disabled) {
        onSelect(RideType.INTERCITY);
      }
    }, [disabled, onSelect]);

    const handleSelectLocal = useCallback(() => {
      if (!disabled) {
        onSelect(RideType.LOCAL);
      }
    }, [disabled, onSelect]);

    const isIntercity = selected === RideType.INTERCITY;
    const isLocal = selected === RideType.LOCAL;

    return (
      <S.TabsContainer>
        <S.TabButton
          $isActive={isIntercity}
          activeOpacity={disabled ? 1 : 0.8}
          onPress={handleSelectIntercity}
        >
          <S.IconContainer $isActive={isIntercity}>
            <MaterialIcons
              name="alt-route"
              size={moderateScale(18)}
              color={
                isIntercity
                  ? theme.colors.primary
                  : theme.colors.on_surface_variant
              }
            />
          </S.IconContainer>
          <S.TextColumn>
            <S.TabTitle $isActive={isIntercity}>
              {t.cityToCityTitle}
            </S.TabTitle>
            <S.TabSubtitle $isActive={isIntercity}>
              {t.cityToCitySubtitle}
            </S.TabSubtitle>
          </S.TextColumn>
        </S.TabButton>

        <S.TabButton
          $isActive={isLocal}
          activeOpacity={disabled ? 1 : 0.8}
          onPress={handleSelectLocal}
        >
          <S.IconContainer $isActive={isLocal}>
            <MaterialIcons
              name="location-city"
              size={moderateScale(18)}
              color={
                isLocal
                  ? theme.colors.primary
                  : theme.colors.on_surface_variant
              }
            />
          </S.IconContainer>
          <S.TextColumn>
            <S.TabTitle $isActive={isLocal}>
              {t.withinCityTitle}
            </S.TabTitle>
            <S.TabSubtitle $isActive={isLocal}>
              {t.withinCitySubtitle}
            </S.TabSubtitle>
          </S.TextColumn>
        </S.TabButton>
      </S.TabsContainer>
    );
  },
);

RideTypeTabs.displayName = 'RideTypeTabs';
