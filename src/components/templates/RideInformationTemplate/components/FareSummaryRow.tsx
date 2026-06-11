import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import { useLocale } from '@/constants/localization';
import * as S from '../RideInformationTemplate.styles';

export interface FareSummaryRowProps {
  ride: any;
}

export const FareSummaryRow: React.FC<FareSummaryRowProps> = React.memo(({ ride }) => {
  const theme = useTheme();
  const translations = useLocale();

  const booking = ride.myBooking;
  const priceVal = booking?.price ?? ride.bookingPrice ?? ride.price ?? 0;
  const price = Number(priceVal).toFixed(0);
  
  const seatsCount = booking?.seatCount ?? ride.seatsBooked ?? 0;

  const getSeatDescription = (seatId: string | number, vehicleType?: string): string => {
    const id = String(seatId);
    const typeStr = (vehicleType || '').toUpperCase();
    const is7Seater = typeStr.includes('7') || typeStr === '7';

    const positions = translations.bookingConfirmed.seatPositions;

    if (id === '1' || id === 'driver') return positions.driver;
    if (id === '2') return positions.frontPassenger;
    
    if (is7Seater) {
      switch (id) {
        case '3': return positions.middleLeft;
        case '4': return positions.middleCenter;
        case '5': return positions.middleRight;
        case '6': return positions.backLeft;
        case '7': return positions.backRight;
      }
    } else {
      switch (id) {
        case '3': return positions.backLeft;
        case '4': return positions.backCenter;
        case '5': return positions.backRight;
      }
    }

    return positions.defaultSeat.replace('{id}', id);
  };

  const vType = ride.vehicle?.type || ride.vehicleType;
  const seatIds = booking?.seatIds || ride.seatIds || [];
  
  let seatInfo = '';
  if (ride.seatNames && ride.seatNames.length > 0) {
    seatInfo = ride.seatNames.join(', ');
  } else if (seatIds && seatIds.length > 0) {
    seatInfo = seatIds.map((id: string | number) => getSeatDescription(id, vType)).join(', ');
  } else {
    seatInfo = `${seatsCount} ${translations.rideDetails.seatLabel}`;
  }

  const paymentMethod = ride.paymentMethod ?? translations.rideDetails.cashLabel;

  return (
    <S.FareSummaryRow>
      <S.FareSummaryItem>
        <Icon name="currency-rupee" size={moderateScale(18)} color={theme.colors.primary} />
        <S.FareSummaryText>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {translations.rideDetails.bookingTotal}
          </Typography>
          <Typography variant="title" size="sm" weight="bold">
            ₹{price}
          </Typography>
        </S.FareSummaryText>
      </S.FareSummaryItem>
      
      <S.FareDivider />
      
      <S.FareSummaryItem>
        <Icon name="event-seat" size={moderateScale(18)} color={theme.colors.primary} />
        <S.FareSummaryText>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {translations.rideDetails.seatsLabel}
          </Typography>
          <Typography variant="title" size="sm" weight="bold">
            {seatInfo}
          </Typography>
        </S.FareSummaryText>
      </S.FareSummaryItem>
      
      <S.FareDivider />
      
      <S.FareSummaryItem>
        <Icon name="payments" size={moderateScale(18)} color={theme.colors.primary} />
        <S.FareSummaryText>
          <Typography variant="label" size="xs" color="on_surface_variant">
            {translations.rideDetails.paymentLabel}
          </Typography>
          <Typography variant="title" size="sm" weight="bold">
            {paymentMethod}
          </Typography>
        </S.FareSummaryText>
      </S.FareSummaryItem>
    </S.FareSummaryRow>
  );
});
