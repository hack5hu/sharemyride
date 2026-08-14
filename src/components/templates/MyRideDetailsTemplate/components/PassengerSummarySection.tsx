import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    <S.PassengerSummaryCard>
      <S.SummaryRow>
        <S.SummaryItem>
          <Icon
            name="calendar-today"
            size={moderateScale(16)}
            color={theme.colors.primary}
          />
          <Typography variant="body" size="sm" weight="bold">
            {departureDateLabel}
          </Typography>
          <Typography
            variant="label"
            size="xs"
            color="on_surface_variant"
          >
            {t.date || 'Date'}
          </Typography>
        </S.SummaryItem>
        <S.SummaryDivider />
        <S.SummaryItem>
          <Icon
            name="schedule"
            size={moderateScale(16)}
            color={theme.colors.primary}
          />
          <Typography variant="body" size="sm" weight="bold">
            {departureTime}
          </Typography>
          <Typography
            variant="label"
            size="xs"
            color="on_surface_variant"
          >
            {t.time || 'Time'}
          </Typography>
        </S.SummaryItem>
        <S.SummaryDivider />
        <S.SummaryItem>
          <Icon
            name="timer"
            size={moderateScale(16)}
            color={theme.colors.primary}
          />
          <Typography variant="body" size="sm" weight="bold">
            {durationLabel}
          </Typography>
          <Typography
            variant="label"
            size="xs"
            color="on_surface_variant"
          >
            {t.duration || 'Duration'}
          </Typography>
        </S.SummaryItem>
      </S.SummaryRow>

      <S.HorizontalDivider />

      <S.SummaryRow>
        <S.SummaryItem>
          <Icon
            name="event-seat"
            size={moderateScale(16)}
            color={theme.colors.primary}
          />
          <Typography variant="body" size="sm" weight="bold">
            {passengerSeatInfo}
          </Typography>
          <Typography
            variant="label"
            size="xs"
            color="on_surface_variant"
          >
            {t.seatsLabel || 'Seats'}
          </Typography>
        </S.SummaryItem>
        <S.SummaryDivider />
        <S.SummaryItem>
          <Icon
            name="currency-rupee"
            size={moderateScale(16)}
            color={theme.colors.primary}
          />
          <Typography variant="body" size="sm" weight="bold">
            ₹{passengerPrice}
          </Typography>
          <Typography
            variant="label"
            size="xs"
            color="on_surface_variant"
          >
            {t.bookingTotal || 'Price'}
          </Typography>
        </S.SummaryItem>
      </S.SummaryRow>
    </S.PassengerSummaryCard>
  );
};
