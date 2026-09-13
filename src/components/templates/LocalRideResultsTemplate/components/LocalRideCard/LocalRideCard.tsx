import React, { useCallback } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import * as S from './LocalRideCard.styles';
import { type LocalRideCardProps } from './types.d';

export const LocalRideCard: React.FC<LocalRideCardProps> = React.memo(
  ({ ride, isSelected, onSelect, onPressDetails }) => {
    const theme = useTheme();
    const { localRideResults: t } = useLocale();

    const handleCardPress = useCallback(() => {
      onSelect(ride.id);
    }, [onSelect, ride.id]);

    const handleDetailsPress = useCallback(() => {
      onPressDetails(ride.id);
    }, [onPressDetails, ride.id]);

    const dist = ride.pickupDistanceMeters;
    const formattedDistance =
      dist !== undefined
        ? dist >= 1000
          ? `${(dist / 1000).toFixed(1)} km`
          : `${Math.round(dist)}m`
        : null;

    const ratingText = ride.driverRating > 0 ? ride.driverRating.toFixed(1) : '5.0';
    const timeText = ride.duration ? `${ride.startTime} (${ride.duration})` : ride.startTime;

    return (
      <S.CardContainer isSelected={isSelected} onPress={handleCardPress}>
        <S.TopRow>
          <S.DriverInfo>
            <Avatar
              source={ride.driverPhotoUrl ? { uri: ride.driverPhotoUrl } : undefined}
              placeholder={ride.driverName.charAt(0).toUpperCase()}
              size="sm"
              isVerified
            />
            <S.DriverTextCol>
              <S.DriverNameRow>
                <Typography variant="label" size="md" weight="bold" color={theme.colors.on_surface} numberOfLines={1}>
                  {ride.driverName}
                </Typography>
              </S.DriverNameRow>
              <S.RatingChip>
                <MaterialIcons name="star" size={moderateScale(12)} color="#F59E0B" />
                <S.SpacedLabel>
                  <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface}>
                    {ratingText}
                  </Typography>
                </S.SpacedLabel>
              </S.RatingChip>
            </S.DriverTextCol>
          </S.DriverInfo>

          <S.PriceTag>
            <Typography variant="title" size="lg" weight="heavy" color={theme.colors.primary}>
              ₹{ride.price}
            </Typography>
            <S.SeatsBadge>
              <Typography variant="label" size="xs" weight="medium" color={theme.colors.on_secondary_container}>
                {t.seatsAvailable.replace('{count}', String(ride.availableSeats))}
              </Typography>
            </S.SeatsBadge>
          </S.PriceTag>
        </S.TopRow>

        <S.DetailsDivider />

        <S.InfoGrid>
          <S.InfoItem>
            <MaterialIcons name="schedule" size={moderateScale(15)} color={theme.colors.on_surface_variant} />
            <S.SpacedLabel>
              <Typography variant="body" size="sm" weight="medium" color={theme.colors.on_surface}>
                {timeText}
              </Typography>
            </S.SpacedLabel>
          </S.InfoItem>

          <S.InfoItem>
            <MaterialIcons name="directions-car" size={moderateScale(15)} color={theme.colors.on_surface_variant} />
            <S.SpacedLabel>
              <Typography variant="body" size="sm" weight="medium" color={theme.colors.on_surface}>
                {ride.vehicleModel || 'Car'}
              </Typography>
            </S.SpacedLabel>
          </S.InfoItem>
        </S.InfoGrid>

        <S.BottomRow>
          {formattedDistance ? (
            <S.DistanceBadge>
              <MaterialIcons name="directions-walk" size={moderateScale(14)} color={theme.colors.primary} />
              <S.SpacedLabel>
                <Typography variant="label" size="xs" weight="medium" color={theme.colors.primary} numberOfLines={1}>
                  {formattedDistance} {t.walkToPickup}
                </Typography>
              </S.SpacedLabel>
            </S.DistanceBadge>
          ) : (
            <S.DriverNameRow>
              <MaterialIcons name="place" size={moderateScale(14)} color={theme.colors.primary} />
              <S.SpacedLabel>
                <Typography variant="label" size="xs" color={theme.colors.on_surface_variant} numberOfLines={1}>
                  {t.estimatedPickup}
                </Typography>
              </S.SpacedLabel>
            </S.DriverNameRow>
          )}

          <S.ActionButton onPress={handleDetailsPress}>
            <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_primary}>
              {t.viewDetails}
            </Typography>
            <MaterialIcons name="chevron-right" size={moderateScale(16)} color={theme.colors.on_primary} />
          </S.ActionButton>
        </S.BottomRow>
      </S.CardContainer>
    );
  },
);

LocalRideCard.displayName = 'LocalRideCard';
