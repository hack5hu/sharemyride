import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { Box } from '@/components/atoms/Box';
import { useLocale } from '@/constants/localization';
import * as S from './PassengerManagement.styles';

interface PassengerManagementProps {
  isDriver: boolean;
  passengers: any[];
  seatsLeft: number;
  onCancelPassenger?: (id: string) => void;
  t?: any;
  hideActions?: boolean;
}

export const PassengerManagement: React.FC<PassengerManagementProps> = React.memo(({
  isDriver,
  passengers,
  seatsLeft,
  onCancelPassenger,
  t: propT,
  hideActions = false,
}) => {
  const theme = useTheme();
  const locale = useLocale();
  const t = locale.rideDetails;
  const bookedCount = passengers.length;

  return (
    <S.SectionCard>
      <S.SectionLabelRow>
        <S.SectionDot color={theme.colors.tertiary} />
        <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
          {isDriver 
            ? t.passengerDetailsTitle.toUpperCase() 
            : t.fellowTravelersTitle.toUpperCase()}
        </Typography>
      </S.SectionLabelRow>
      
      {bookedCount === 0 ? (
        <Box padding={16} alignItems="center">
          <Typography 
            variant="body" 
            size="sm" 
            color="on_surface_variant" 
            align="center"
          >
            {isDriver 
              ? t.noPassengersBooked 
              : t.noCoRidersYet}
          </Typography>
        </Box>
      ) : isDriver ? (
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
                  {p.seatsBooked} {p.seatsBooked === 1 ? t.seatLabelSingular : t.seatsLabelPlural}: {p.seatNames?.join(', ')}
                </Typography>
              </S.SeatBadge>
            </S.PassengerInfo>
            {!hideActions && (
              <S.RemoveButton 
                icon="person-remove" 
                variant="surface"
                onPress={() => onCancelPassenger?.(p.bookingId || p.id)} 
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
});

