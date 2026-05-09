import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale } from '@/styles';
import * as S from './PassengerManagement.styles';

interface PassengerManagementProps {
  isDriver: boolean;
  passengers: any[];
  seatsLeft: number;
  onCancelPassenger?: (id: string) => void;
  t: any;
}

export const PassengerManagement: React.FC<PassengerManagementProps> = ({
  isDriver,
  passengers,
  seatsLeft,
  onCancelPassenger,
  t,
}) => {
  const theme = useTheme();
  const bookedCount = passengers.length;

  if (bookedCount === 0) return null;

  return (
    <S.SectionCard>
      <S.SectionLabelRow>
        <S.SectionDot color={theme.colors.tertiary} />
        <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
          {isDriver ? 'PASSENGER DETAILS' : 'YOUR FELLOW TRAVELERS'}
        </Typography>
      </S.SectionLabelRow>
      
      {isDriver ? (
        passengers.map((p: any, i: number) => (
          <S.PassengerItem key={i}>
            <Avatar source={{ uri: p.photoUrl }} size="sm" />
            <S.PassengerInfo>
              <Typography variant="body" size="sm" weight="bold">
                {p.name}
              </Typography>
              <Typography variant="label" size="xs" color="on_surface_variant" numberOfLines={1}>
                {p.segment}
              </Typography>
              <S.SeatBadge>
                <Typography variant="label" size="xs" weight="bold" color="primary">
                  {p.seatsBooked} {p.seatsBooked === 1 ? 'Seat' : 'Seats'}: {p.seatNames?.join(', ')}
                </Typography>
              </S.SeatBadge>
            </S.PassengerInfo>
            <S.CancelPassengerButton onPress={() => onCancelPassenger?.(p.id)}>
              <Icon name="person-remove" size={moderateScale(20)} color={theme.colors.error} />
            </S.CancelPassengerButton>
          </S.PassengerItem>
        ))
      ) : (
        passengers.map((p: any, i: number) => (
          <S.CoRiderRow key={i}>
            <Avatar source={{ uri: p.photoUrl }} size="sm" />
            <Typography variant="body" size="sm" weight="medium">
              {p.name}
            </Typography>
          </S.CoRiderRow>
        ))
      )}
    </S.SectionCard>
  );
};
