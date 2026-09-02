import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from '../MyRideDetailsTemplate.styles';

export interface PassengerSummarySectionProps {
  departureDateLabel: string;
  departureTime: string;
  durationLabel: string;
  passengerSeatInfo: string;
  passengerPrice: string;
  t: {
    date?: string;
    time?: string;
    duration?: string;
    seatsLabel?: string;
    bookingTotal?: string;
  };
}

export const PassengerSummarySection: React.FC<PassengerSummarySectionProps> = ({
  departureDateLabel,
  departureTime,
  durationLabel,
  passengerSeatInfo,
  passengerPrice,
  t,
}) => {
  const theme = useTheme();

  return (
    <S.PassengerSummaryGrid>
      <S.SummaryRow>
        <S.SummaryTile>
          <S.SummaryTileIcon>
            <Icon
              name="calendar-today"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
          </S.SummaryTileIcon>
          <Typography variant="label" size="sm" weight="bold" numberOfLines={1}>
            {departureDateLabel}
          </Typography>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {t.date || 'Date'}
          </Typography>
        </S.SummaryTile>

        <S.SummaryTile>
          <S.SummaryTileIcon>
            <Icon
              name="schedule"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
          </S.SummaryTileIcon>
          <Typography variant="label" size="sm" weight="bold">
            {departureTime}
          </Typography>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {t.time || 'Time'}
          </Typography>
        </S.SummaryTile>

        <S.SummaryTile>
          <S.SummaryTileIcon>
            <Icon
              name="timer"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
          </S.SummaryTileIcon>
          <Typography variant="label" size="sm" weight="bold">
            {durationLabel}
          </Typography>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {t.duration || 'Duration'}
          </Typography>
        </S.SummaryTile>
      </S.SummaryRow>

      <S.SummaryRow>
        <S.SummaryTile>
          <S.SummaryTileIcon>
            <Icon
              name="event-seat"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
          </S.SummaryTileIcon>
          <Typography variant="label" size="sm" weight="bold" numberOfLines={1}>
            {passengerSeatInfo}
          </Typography>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {t.seatsLabel || 'Seats'}
          </Typography>
        </S.SummaryTile>

        <S.SummaryTile>
          <S.SummaryTileIcon>
            <Icon
              name="currency-rupee"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
          </S.SummaryTileIcon>
          <Typography variant="title" size="sm" weight="bold" color="primary">
            ₹{passengerPrice}
          </Typography>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {t.bookingTotal || 'Booking Total'}
          </Typography>
        </S.SummaryTile>
      </S.SummaryRow>
    </S.PassengerSummaryGrid>
  );
};
