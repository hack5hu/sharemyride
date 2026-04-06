import React from 'react';
import { useTheme } from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { TimeDial } from '@/components/molecules/TimeDial';
import {
  CardContainer,
  SelectedTimeLabel,
  BigTimeRow,
  BigTimeText,
  ColonText,
  FormatBadge,
  FormatBadgeText,
  DialRow,
  DialSeparator,
} from './TimePickerCard.styles';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

export interface TimePickerCardProps {
  selectedHour: number;
  selectedMinute: number;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  minHour?: number;
  minMinute?: number;
}

export const TimePickerCard: React.FC<TimePickerCardProps> = ({
  selectedHour,
  selectedMinute,
  onHourChange,
  onMinuteChange,
  minHour,
  minMinute,
}) => {
  const theme = useTheme();
  const { timeSelection: t } = useLocale();

  const pad = (n: number) => String(n).padStart(2, '0');
  const disabledBeforeMinute = selectedHour === minHour ? minMinute : undefined;

  return (
    <CardContainer>
      <SelectedTimeLabel>{t.selectedTimeLabel}</SelectedTimeLabel>

      {/* Big display */}
      <BigTimeRow>
        <BigTimeText>{pad(selectedHour)}</BigTimeText>
        <ColonText>:</ColonText>
        <BigTimeText>{pad(selectedMinute)}</BigTimeText>
      </BigTimeRow>

      {/* 24-hour badge */}
      <FormatBadge>
        <MaterialIcons name="schedule" size={moderateScale(14)} color={theme.colors.on_primary_fixed_variant} />
        <FormatBadgeText>{t.formatLabel}</FormatBadgeText>
      </FormatBadge>

      {/* Dials */}
      <DialRow>
        <TimeDial
          values={HOURS}
          selectedValue={selectedHour}
          onValueChange={onHourChange}
          formatter={pad}
          disabledBefore={minHour}
        />
        <DialSeparator>:</DialSeparator>
        <TimeDial
          values={MINUTES}
          selectedValue={selectedMinute}
          onValueChange={onMinuteChange}
          formatter={pad}
          disabledBefore={disabledBeforeMinute}
        />
      </DialRow>
      
    </CardContainer>
  );
};
