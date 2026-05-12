import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideStatsStrip.styles';

interface RideStatsStripProps {
  departureDate: string;
  departureTime: string;
  durationLabel: string;
  seatsLeft: number;
  t: any;
}

export const RideStatsStrip: React.FC<RideStatsStripProps> = ({
  departureDate,
  departureTime,
  durationLabel,
  seatsLeft,
  t,
}) => {
  const theme = useTheme();

  return (
    <S.StatsStrip>
      <S.StatPill>
        <S.StatPillIcon>
          <Icon name="calendar-today" size={moderateScale(15)} color={theme.colors.on_primary} />
        </S.StatPillIcon>
        <Typography variant="label" size="sm" weight="bold" numberOfLines={1}>
          {departureDate}
        </Typography>
        <Typography variant="label" size="xs" color="on_surface_variant">
          {t.date || 'Date'}
        </Typography>
      </S.StatPill>

      <S.StatPill>
        <S.StatPillIcon>
          <Icon name="schedule" size={moderateScale(15)} color={theme.colors.on_primary} />
        </S.StatPillIcon>
        <Typography variant="label" size="sm" weight="bold">
          {departureTime}
        </Typography>
        <Typography variant="label" size="xs" color="on_surface_variant">
          {t.time || 'Time'}
        </Typography>
      </S.StatPill>

      <S.StatPill>
        <S.StatPillIcon>
          <Icon name="timer" size={moderateScale(15)} color={theme.colors.on_primary} />
        </S.StatPillIcon>
        <Typography variant="label" size="sm" weight="bold">
          {durationLabel}
        </Typography>
        <Typography variant="label" size="xs" color="on_surface_variant">
          {t.duration || 'Duration'}
        </Typography>
      </S.StatPill>

      <S.StatPill>
        <S.StatPillIcon>
          <Icon name="event-seat" size={moderateScale(15)} color={theme.colors.on_primary} />
        </S.StatPillIcon>
        <Typography variant="label" size="sm" weight="bold">
          {seatsLeft}
        </Typography>
        <Typography variant="label" size="xs" color="on_surface_variant">
          {t.seatsLeftLabel || 'Seats Left'}
        </Typography>
      </S.StatPill>
    </S.StatsStrip>
  );
};

