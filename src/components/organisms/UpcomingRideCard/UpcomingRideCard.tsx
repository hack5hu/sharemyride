import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { type UpcomingRideCardProps } from './types.d';
import * as S from './UpcomingRideCard.styles';

export const UpcomingRideCard: React.FC<UpcomingRideCardProps> = React.memo(
  ({
    timerLabel,
    driverName,
    carModel,
    rating,
    price,
    avatarUri,
    isVerified = true,
    pickupTime,
    pickupLocation,
    dropoffTime,
    dropoffLocation,
    onPress,
    statusTag,
    isDriver = false,
  }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const hostTitle = isDriver
      ? t('myRides.youAreDriver') || 'Ride Host'
      : driverName || 'Driver';

    const vehicleSubtitle =
      carModel || (isDriver ? t('myRides.yourVehicle') || 'Your Vehicle' : undefined);

    return (
      <S.CardContainer onPress={onPress} activeOpacity={0.88}>
        {/* Top Header: Timer + Price / Status */}
        <S.TopMetaRow>
          {timerLabel ? (
            <S.TimerPill>
              <Icon
                name="schedule"
                size={moderateScale(13)}
                color={theme.colors.primary}
              />
              <S.TimerPillText>{timerLabel}</S.TimerPillText>
            </S.TimerPill>
          ) : (
            <S.Box />
          )}

          <S.HeaderRight>
            {statusTag && (
              <S.StatusBadge $status={statusTag.toUpperCase()}>
                <S.StatusBadgeText $status={statusTag.toUpperCase()}>
                  {statusTag}
                </S.StatusBadgeText>
              </S.StatusBadge>
            )}
            {price ? <S.PriceLabel>{price}</S.PriceLabel> : null}
          </S.HeaderRight>
        </S.TopMetaRow>

        {/* Route Journey Flow */}
        <S.RouteSection>
          {/* Pickup Stop */}
          <S.RouteRow>
            <S.TimeColumn>
              <S.TimeText numberOfLines={1}>{pickupTime || '09:00 AM'}</S.TimeText>
            </S.TimeColumn>
            <S.TrackColumn>
              <S.OriginDot />
            </S.TrackColumn>
            <S.LocationColumn>
              <S.LocationText numberOfLines={1}>
                {pickupLocation || 'Pickup Stop'}
              </S.LocationText>
            </S.LocationColumn>
          </S.RouteRow>

          {/* Track Line */}
          <S.RouteRow>
            <S.TimeColumn />
            <S.TrackColumn>
              <S.TrackLine />
            </S.TrackColumn>
            <S.LocationColumn />
          </S.RouteRow>

          {/* Dropoff Stop */}
          <S.RouteRow>
            <S.TimeColumn>
              <S.TimeText numberOfLines={1}>{dropoffTime || '11:00 AM'}</S.TimeText>
            </S.TimeColumn>
            <S.TrackColumn>
              <S.DestinationDot />
            </S.TrackColumn>
            <S.LocationColumn>
              <S.LocationText numberOfLines={1}>
                {dropoffLocation || 'Destination Stop'}
              </S.LocationText>
            </S.LocationColumn>
          </S.RouteRow>
        </S.RouteSection>

        {/* Bottom Driver / Host Info Bar */}
        <S.FooterDivider />
        <S.FooterRow>
          <S.DriverInfoGroup>
            <Avatar
              source={avatarUri ? { uri: avatarUri } : undefined}
              placeholder={hostTitle}
              size="sm"
              isVerified={!isDriver && isVerified}
              iconName={isDriver ? 'directions-car' : undefined}
            />
            <S.DriverTextGroup>
              <S.DriverNameRow>
                <S.DriverNameText numberOfLines={1}>
                  {hostTitle}
                </S.DriverNameText>
                {!isDriver && rating > 0 && (
                  <S.RatingBadge>
                    <Icon
                      name="star"
                      size={moderateScale(10)}
                      color={theme.colors.warning || '#f59e0b'}
                    />
                    <S.RatingText>{rating.toFixed(1)}</S.RatingText>
                  </S.RatingBadge>
                )}
              </S.DriverNameRow>
              {vehicleSubtitle ? (
                <S.VehicleSubText numberOfLines={1}>
                  {vehicleSubtitle}
                </S.VehicleSubText>
              ) : null}
            </S.DriverTextGroup>
          </S.DriverInfoGroup>

          <S.ActionIconGroup>
            <Icon
              name="chevron-right"
              size={moderateScale(20)}
              color={theme.colors.on_surface_variant}
            />
          </S.ActionIconGroup>
        </S.FooterRow>
      </S.CardContainer>
    );
  },
);
