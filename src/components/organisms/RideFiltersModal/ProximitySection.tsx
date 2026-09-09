import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideFiltersModal.styles';
import { type Translations } from '@/constants/localization/types';

interface ProximitySectionProps {
  proximity: 'pickup' | 'dropoff';
  onSelect: (type: 'pickup' | 'dropoff') => void;
  t: Translations['rideFilters'];
}

export const ProximitySection: React.FC<ProximitySectionProps> = ({
  proximity,
  onSelect,
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
          {t.proximityTitle.toUpperCase()}
        </Typography>
      </S.SectionTitle>
      <S.ProximityGrid>
        <S.ProximityButton
          $active={proximity === 'pickup'}
          onPress={() => onSelect('pickup')}
          activeOpacity={0.7}
        >
          <Typography
            variant="label"
            size="md"
            weight="bold"
            color={
              proximity === 'pickup'
                ? theme.colors.primary
                : theme.colors.on_surface_variant
            }
          >
            {t.nearPickup}
          </Typography>
          <Icon
            name={proximity === 'pickup' ? 'check-circle' : 'radio-button-unchecked'}
            size={moderateScale(20)}
            color={
              proximity === 'pickup'
                ? theme.colors.primary
                : theme.colors.outline_variant
            }
          />
        </S.ProximityButton>

        <S.ProximityButton
          $active={proximity === 'dropoff'}
          onPress={() => onSelect('dropoff')}
          activeOpacity={0.7}
        >
          <Typography
            variant="label"
            size="md"
            weight="bold"
            color={
              proximity === 'dropoff'
                ? theme.colors.primary
                : theme.colors.on_surface_variant
            }
          >
            {t.nearDropoff}
          </Typography>
          <Icon
            name={proximity === 'dropoff' ? 'check-circle' : 'radio-button-unchecked'}
            size={moderateScale(20)}
            color={
              proximity === 'dropoff'
                ? theme.colors.primary
                : theme.colors.outline_variant
            }
          />
        </S.ProximityButton>
      </S.ProximityGrid>
    </S.Section>
  );
};
