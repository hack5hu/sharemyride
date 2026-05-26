import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import * as S from './PassengerManagement.styles';

export interface Passenger {
  id?: string;
  bookingId?: string;
  name: string;
  photoUrl?: string;
  segment?: string;
  seatsBooked?: number;
  seatNames?: string[];
}

interface PassengerManagementProps {
  isDriver: boolean;
  passengers?: Passenger[];
  seatsLeft: number;
  onCancelPassenger?: (id: string) => void;
  hideActions?: boolean;
}

export const PassengerManagement: React.FC<PassengerManagementProps> = React.memo(({
  isDriver,
  passengers = [],
  seatsLeft,
  onCancelPassenger,
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
          {(isDriver 
            ? t.passengerDetailsTitle || 'PASSENGER DETAILS'
            : t.fellowTravelersTitle || 'YOUR FELLOW TRAVELERS').toUpperCase()}
        </Typography>
      </S.SectionLabelRow>
      
      {bookedCount === 0 ? (
        <S.EmptyStateContainer>
          <S.EmptyIconCircle>
            <Icon 
              name="people-outline" 
              size={moderateScale(32)} 
              color={theme.colors.tertiary} 
            />
          </S.EmptyIconCircle>
          <Typography 
            variant="title" 
            size="xs" 
            weight="bold" 
            color="on_surface" 
            align="center"
          >
            {isDriver 
              ? t.noPassengersBooked || 'No passengers booked'
              : t.noCoRidersYet || 'No co-riders yet'}
          </Typography>
          <Typography 
            variant="body" 
            size="xs" 
            color="on_surface_variant" 
            align="center"
          >
            {isDriver 
              ? 'Your seat inventory is wide open. Once passengers book, their details will display here.'
              : 'Be the first one to book a seat and give the host company on this journey!'}
          </Typography>
        </S.EmptyStateContainer>
      ) : isDriver ? (
        <S.PassengerList>
          {passengers.map((p, i) => (
            <S.PassengerCard key={p.bookingId || p.id || i}>
              <Avatar source={{ uri: p.photoUrl }} placeholder={p.name} size="sm" />
              <S.PassengerInfo>
                <Typography variant="body" size="sm" weight="bold">
                  {p.name}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant" numberOfLines={1}>
                  {p.segment || 'Full Trip'}
                </Typography>
                <S.SeatBadge>
                  <Typography variant="label" size="xs" weight="bold" color="primary">
                    {p.seatsBooked} {p.seatsBooked === 1 ? t.seatLabelSingular || 'seat' : t.seatsLabelPlural || 'seats'}: {p.seatNames?.join(', ') || 'N/A'}
                  </Typography>
                </S.SeatBadge>
              </S.PassengerInfo>
              {!hideActions && (
                <S.RemoveButton 
                  icon="person-remove" 
                  variant="surface"
                  onPress={() => onCancelPassenger?.(p.bookingId || p.id || '')} 
                />
              )}
            </S.PassengerCard>
          ))}
        </S.PassengerList>
      ) : (
        <S.CoRidersList>
          {passengers.map((p, i) => (
            <S.CoRiderCapsule key={p.id || i}>
              <Avatar source={{ uri: p.photoUrl }} placeholder={p.name} size="sm" />
              <Typography variant="body" size="sm" weight="semibold" color="on_surface">
                {p.name}
              </Typography>
            </S.CoRiderCapsule>
          ))}
        </S.CoRidersList>
      )}
    </S.SectionCard>
  );
});


