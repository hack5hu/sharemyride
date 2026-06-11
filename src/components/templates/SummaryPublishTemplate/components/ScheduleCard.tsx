import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { 
  GlassCard, 
  SectionHeader, 
  SectionLabel, 
  EditButton, 
  DateTimeValue 
} from './ScheduleCard.styles';

interface ScheduleCardProps {
  schedule: {
    date: string | null;
    time: string | null;
  };
  validationError?: string | null;
  onEdit: () => void;
  t: any;
  disabled?: boolean;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ 
  schedule, 
  validationError, 
  onEdit, 
  t,
  disabled,
}) => {
  const theme = useTheme();

  return (
    <GlassCard hasError={!!validationError}>
      <SectionHeader>
        <SectionLabel>{t.departureScheduleLabel}</SectionLabel>
        <EditButton onPress={onEdit} activeOpacity={0.7} disabled={disabled}>
          <Icon name="edit" size={moderateScale(16)} color={theme.colors.primary} style={{ opacity: disabled ? 0.4 : 1 }} />
        </EditButton>
      </SectionHeader>
      <DateTimeValue>
        {schedule.date && schedule.time 
          ? `${schedule.time}, ${schedule.date}`
          : 'Select date and time'}
      </DateTimeValue>
    </GlassCard>
  );
};
