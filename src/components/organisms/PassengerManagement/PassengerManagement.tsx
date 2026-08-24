/* eslint-disable max-lines */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { storage } from '@/utils/storage';
import { getCityName, getShortLocationName } from '@/utils/address';
import * as S from './PassengerManagement.styles';

export interface Passenger {
  id?: string;
  bookingId?: string;
  name: string;
  photoUrl?: string;
  segment?: string;
  seatsBooked?: number;
  seatNames?: string[];
  seatId?: string[];
  seatIds?: (string | number)[];
  hasRated?: boolean;
}

interface PassengerManagementProps {
  isDriver: boolean;
  passengers?: Passenger[];
  seatsLeft: number;
  onCancelPassenger?: (id: string) => void;
  onPassengerPress?: (id: string) => void;
  hideActions?: boolean;
  vehicleType?: string;
  onRatePassenger?: (id: string, name: string, avatarUrl?: string) => void;
  isCompleted?: boolean;
}

const formatSegment = (segment?: string) => {
  if (!segment) return 'Full Trip';
  const delimiter = segment.includes('→')
    ? '→'
    : segment.includes('->')
    ? '->'
    : null;
  if (delimiter) {
    const parts = segment.split(delimiter);
    const start = getCityName(parts[0]) || getShortLocationName(parts[0]);
    const end = parts[1] ? (getCityName(parts[1]) || getShortLocationName(parts[1])) : '';
    return end ? `${start} → ${end}` : start;
  }
  return getCityName(segment) || getShortLocationName(segment);
};

export const PassengerManagement: React.FC<PassengerManagementProps> =
  React.memo(
    ({
      isDriver,
      passengers = [],
      onCancelPassenger,
      onPassengerPress,
      hideActions = false,
      vehicleType,
      onRatePassenger,
      isCompleted = false,
    }) => {
      const theme = useTheme();
      const locale = useLocale();
      const t = locale.rideDetails;
      const bookedCount = passengers.length;

      const getSeatDescription = (seatId: string | number): string => {
        const id = String(seatId).trim().toUpperCase();
        const is7Seater = vehicleType === 'CAR_7_SEATER';
        const sPos = locale.bookingConfirmed.seatPositions;

        // Direct mapping for standard IDs
        if (id === '1' || id === 'DRIVER') return sPos.driver;
        if (id === '2' || id === '1A') return sPos.frontPassenger;

        // Row 2 mapping
        if (id === '3' || id === '2A') return sPos.middleLeft;
        if (id === '4' || id === '2B') {
          return is7Seater ? sPos.middleCenter : sPos.backCenter;
        }
        if (id === '5' || id === '2C') {
          return is7Seater ? sPos.middleRight : sPos.backRight;
        }

        // Row 3 mapping
        if (id === '6' || id === '3A') return sPos.backLeft;
        if (id === '7' || id === '3B') {
          return is7Seater
            ? sPos.backCenter
            : sPos.defaultSeat.replace('{id}', id);
        }
        if (id === '3C') return sPos.backRight;

        return sPos.defaultSeat.replace('{id}', id);
      };

      const getFormattedSeats = (p: Passenger) => {
        const seats = p.seatNames || p.seatIds || p.seatId;
        if (!seats || seats.length === 0) return 'N/A';
        return seats.map(s => getSeatDescription(s)).join(', ');
      };

      return (
        <S.SectionCard>
          <S.SectionLabelRow>
            <S.SectionDot color={theme.colors.tertiary} />
            <Typography
              variant="label"
              size="xs"
              weight="bold"
              color="on_surface_variant"
            >
              {(isDriver
                ? t.passengerDetailsTitle || 'PASSENGER DETAILS'
                : t.fellowTravelersTitle || 'YOUR FELLOW TRAVELERS'
              ).toUpperCase()}
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
                {isCompleted
                  ? 'This completed ride had no booked passengers, so there are no co-riders to rate.'
                  : isDriver
                  ? 'Your seat inventory is wide open. Once passengers book, their details will display here.'
                  : 'Be the first one to book a seat and give the host company on this journey!'}
              </Typography>
            </S.EmptyStateContainer>
          ) : isDriver ? (
            <S.PassengerList>
              {passengers.map((p, i) => {
                const passengerId = p.id || p.bookingId || '';
                let ratedUsers: string[] = [];
                try {
                  ratedUsers = JSON.parse(
                    storage.getString('rated_users') || '[]',
                  ).map((id: any) => String(id));
                } catch {
                  ratedUsers = [];
                }
                const hasBeenRated =
                  p.hasRated ||
                  (passengerId ? ratedUsers.includes(String(passengerId)) : false);

                return (
                  <S.PassengerCard
                    key={p.bookingId || p.id || i}
                    onPress={() => onPassengerPress?.(passengerId)}
                    disabled={!onPassengerPress}
                    activeOpacity={0.7}
                  >
                    <S.PassengerInfo>
                      <Typography variant="title" size="sm" weight="bold">
                        {p.name}
                      </Typography>

                      <S.SegmentRow>
                        <Typography
                          variant="body"
                          size="sm"
                          weight="medium"
                          color="on_surface_variant"
                          numberOfLines={1}
                        >
                          {formatSegment(p.segment)}
                        </Typography>
                      </S.SegmentRow>

                      <S.SeatBadge>
                        <Icon
                          name="event-seat"
                          size={moderateScale(11)}
                          color={theme.colors.primary}
                        />
                        <Typography
                          variant="label"
                          size="xs"
                          weight="bold"
                          color="primary"
                        >
                          {p.seatsBooked}{' '}
                          {p.seatsBooked === 1
                            ? t.seatLabelSingular || 'seat'
                            : t.seatsLabelPlural || 'seats'}
                          : {getFormattedSeats(p)}
                        </Typography>
                      </S.SeatBadge>
                    </S.PassengerInfo>

                    <S.RightMetaGroup>
                      {!hideActions && (
                        <S.RemoveButton
                          icon="person-remove"
                          variant="surface"
                          onPress={() =>
                            onCancelPassenger?.(passengerId)
                          }
                        />
                      )}
                      {isCompleted && onRatePassenger && (
                        hasBeenRated ? (
                          <S.RatedBadge>
                            <Icon
                              name="check-circle"
                              size={moderateScale(16)}
                              color={theme.colors.on_surface_variant}
                            />
                            <Typography
                              variant="label"
                              size="xs"
                              weight="bold"
                              color="on_surface_variant"
                            >
                              {locale.rating.ratedStatus || 'Rated'}
                            </Typography>
                          </S.RatedBadge>
                        ) : (
                          <S.RateButton
                            activeOpacity={0.8}
                            onPress={() =>
                              onRatePassenger?.(passengerId, p.name, p.photoUrl)
                            }
                          >
                            <Icon
                              name="star"
                              size={moderateScale(16)}
                              color={theme.colors.warning}
                            />
                            <Typography
                              variant="label"
                              size="xs"
                              weight="bold"
                              color={theme.colors.warning}
                            >
                              Rate
                            </Typography>
                          </S.RateButton>
                        )
                      )}
                      <Avatar
                        source={{ uri: p.photoUrl }}
                        placeholder={p.name}
                        size="md"
                      />
                      {onPassengerPress && (
                        <Icon
                          name="chevron-right"
                          size={moderateScale(20)}
                          color={theme.colors.on_surface_variant}
                        />
                      )}
                    </S.RightMetaGroup>
                  </S.PassengerCard>
                );
              })}
            </S.PassengerList>
          ) : (
            <S.PassengerList>
              {passengers.map((p, i) => (
                <S.PassengerCard
                  key={p.bookingId || p.id || i}
                  onPress={() => onPassengerPress?.(p.id || p.bookingId || '')}
                  disabled={!onPassengerPress}
                  activeOpacity={0.7}
                >
                  <S.PassengerInfo>
                    <Typography variant="title" size="sm" weight="bold">
                      {p.name}
                    </Typography>

                    <S.SegmentRow>
                      <Typography
                        variant="body"
                        size="sm"
                        weight="medium"
                        color="on_surface_variant"
                        numberOfLines={1}
                      >
                        {formatSegment(p.segment)}
                      </Typography>
                    </S.SegmentRow>

                    <S.SeatBadge>
                      <Icon
                        name="event-seat"
                        size={moderateScale(11)}
                        color={theme.colors.primary}
                      />
                      <Typography
                        variant="label"
                        size="xs"
                        weight="bold"
                        color="primary"
                      >
                        {p.seatsBooked}{' '}
                        {p.seatsBooked === 1
                          ? t.seatLabelSingular || 'seat'
                          : t.seatsLabelPlural || 'seats'}
                        : {getFormattedSeats(p)}
                      </Typography>
                    </S.SeatBadge>
                  </S.PassengerInfo>

                  <S.RightMetaGroup>
                    <Avatar
                      source={{ uri: p.photoUrl }}
                      placeholder={p.name}
                      size="md"
                    />
                    {onPassengerPress && (
                      <Icon
                        name="chevron-right"
                        size={moderateScale(20)}
                        color={theme.colors.on_surface_variant}
                      />
                    )}
                  </S.RightMetaGroup>
                </S.PassengerCard>
              ))}
            </S.PassengerList>
          )}
        </S.SectionCard>
      );
    },
  );
