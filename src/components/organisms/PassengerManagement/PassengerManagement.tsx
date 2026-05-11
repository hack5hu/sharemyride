import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { IconButton } from '@/components/atoms/IconButton';
import * as S from './PassengerManagement.styles';

interface PassengerManagementProps {
  isDriver: boolean;
  passengers: any[];
  seatsLeft: number;
  onCancelPassenger?: (id: string) => void;
  t: any;
  hideActions?: boolean;
}

export const PassengerManagement: React.FC<PassengerManagementProps> = ({
  isDriver,
  passengers,
  seatsLeft,
  onCancelPassenger,
  t,
  hideActions = false,
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
            {!hideActions && (
              <IconButton 
                icon="person-remove" 
                variant="surface"
                onPress={() => onCancelPassenger?.(p.id)} 
                style={{ borderColor: theme.colors.error }}
              />
            )}
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
