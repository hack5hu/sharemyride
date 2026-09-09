import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideFiltersModal.styles';
import { type FilterPreferenceState } from './types.d';
import { type Translations } from '@/constants/localization/types';

interface PreferencesSectionProps {
  preferences: FilterPreferenceState;
  onToggle: (key: keyof FilterPreferenceState) => void;
  t: Translations['rideFilters'];
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  preferences,
  onToggle,
  t,
}) => {
  const theme = useTheme();

  const items: Array<{
    key: keyof FilterPreferenceState;
    label: string;
    icon: string;
    color: string;
    checked: boolean;
  }> = [
    {
      key: 'noSmoking',
      label: t.noSmoking,
      icon: 'smoke-free',
      color: theme.colors.error,
      checked: preferences.noSmoking,
    },
    {
      key: 'ladiesOnly',
      label: t.ladiesOnly,
      icon: 'female',
      color: theme.colors.tertiary,
      checked: preferences.ladiesOnly,
    },
    {
      key: 'verifiedOnly',
      label: t.verifiedDrivers,
      icon: 'verified-user',
      color: theme.colors.primary,
      checked: preferences.verifiedOnly,
    },
    {
      key: 'petFriendly',
      label: t.petFriendly,
      icon: 'pets',
      color: theme.colors.secondary,
      checked: preferences.petFriendly,
    },
    {
      key: 'luggageAllowed',
      label: t.luggageAllowed,
      icon: 'luggage',
      color: theme.colors.outline,
      checked: preferences.luggageAllowed,
    },
  ];

  return (
    <S.Section>
      <S.SectionTitle>
        <Typography
          variant="label"
          size="xs"
          weight="bold"
          color={theme.colors.on_surface_variant}
        >
          {t.preferencesTitle.toUpperCase()}
        </Typography>
      </S.SectionTitle>

      {items.map(item => (
        <S.PreferenceItem
          key={item.key}
          $active={item.checked}
          onPress={() => onToggle(item.key)}
          activeOpacity={0.7}
        >
          <S.PreferenceLeft>
            <S.IconBadge $color={item.color}>
              <Icon
                name={item.icon}
                size={moderateScale(20)}
                color={item.color}
              />
            </S.IconBadge>
            <Typography variant="label" size="md" weight="bold">
              {item.label}
            </Typography>
          </S.PreferenceLeft>

          <Checkbox
            checked={item.checked}
            onToggle={() => onToggle(item.key)}
          />
        </S.PreferenceItem>
      ))}
    </S.Section>
  );
};
