import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideFiltersModal.styles';
import { type TimeSlotOption } from './types.d';
import { type Translations } from '@/constants/localization/types';

interface TimeSlotSectionProps {
  timeSlots: TimeSlotOption[];
  selectedSlots: string[];
  onToggleSlot: (id: string) => void;
  t: Translations['rideFilters'];
}

export const TimeSlotSection: React.FC<TimeSlotSectionProps> = ({
  timeSlots,
  selectedSlots,
  onToggleSlot,
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
          {t.departureTimeTitle.toUpperCase()}
        </Typography>
      </S.SectionTitle>

      <S.TimeGrid>
        {timeSlots.map(slot => {
          const isActive = selectedSlots.includes(slot.id);
          return (
            <S.TimeCell
              key={slot.id}
              $active={isActive}
              onPress={() => onToggleSlot(slot.id)}
              activeOpacity={0.7}
            >
              <Icon
                name={slot.icon}
                size={moderateScale(22)}
                color={
                  isActive
                    ? theme.colors.primary
                    : theme.colors.on_surface_variant
                }
              />
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color={
                  isActive
                    ? theme.colors.primary
                    : theme.colors.on_surface_variant
                }
              >
                {slot.label}
              </Typography>
            </S.TimeCell>
          );
        })}
      </S.TimeGrid>
    </S.Section>
  );
};
